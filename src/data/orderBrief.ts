import type { FaslDraft } from './draft'
import type { LessonId } from './lessons'
import { cleanText, DEDICATION_MAX, FIELD_MAX, LABEL_MAX, LINE_MAX, NAME_MAX, OPEN_MAX } from './notes'
import { computeTotal, effectiveFaces, type FaceParent } from './pricing'
import { FASL_BASE } from './lessons'
import { draftReady } from './wizard'

export const BACKEND_ENABLED = false
export const ORDER_KEY = 'hikaya.fasl.order.v1'

export type BriefStyle = 'text' | 'paper' | 'night'
export type BriefLesson = 'separation' | 'anger' | 'new_fears' | 'sharing'
export type ShelfChoice = 'private' | 'first_name' | 'nickname'

const placeholders: Record<FaceParent, string> = { mom: 'laila', dad: 'adam' }

export function briefStyle(styleId: FaslDraft['styleId']): BriefStyle {
  if (styleId === 'night') return 'night'
  if (styleId === 'paper') return 'paper'
  return 'text'
}

export function briefLesson(lessonId: LessonId): BriefLesson {
  if (lessonId === 'novelty') return 'new_fears'
  return lessonId
}

export type OrderBrief = {
  schemaVersion: 1
  id: string
  createdAt: number
  status: 'submitted_local'
  lesson: BriefLesson
  parentRole: 'mother' | 'father'
  child: { name: string; gender: 'boy' | 'girl' }
  style: BriefStyle
  characters: { mom: string; dad: string; animals: string[] }
  faces: { mom: boolean; dad: boolean; placeholderIds: string[] }
  notes: FaslDraft['notes']
  dedication: string
  consent: { notesRead: true; shelf: ShelfChoice }
  price: { base: number; animals: number; faces: number; total: number }
}

export function buildOrderBrief(draft: FaslDraft, now: number, id: string, shelf: ShelfChoice = 'private'): OrderBrief {
  if (!draftReady(draft) || !draft.parentRole || !draft.lessonId || !draft.styleId) {
    throw new Error('incomplete draft')
  }
  const faces = effectiveFaces(draft.styleId, draft.cast.faceParents)
  const animals = draft.cast.animals.length * 30
  const faceFee = faces.length * 90
  const notes = {
    situation: {
      line: cleanText(draft.notes.situation.line, LINE_MAX),
      when: cleanText(draft.notes.situation.when, FIELD_MAX),
      where: cleanText(draft.notes.situation.where, FIELD_MAX),
      who: cleanText(draft.notes.situation.who, FIELD_MAX),
      usualResponse: cleanText(draft.notes.situation.usualResponse, FIELD_MAX),
      afterwards: cleanText(draft.notes.situation.afterwards, FIELD_MAX),
    },
    likes: draft.notes.likes.map((item) => ({ ...item, label: cleanText(item.label, LABEL_MAX) })),
    dislikes: draft.notes.dislikes.map((item) => ({ ...item, label: cleanText(item.label, LABEL_MAX) })),
    open: cleanText(draft.notes.open, OPEN_MAX),
  }
  return {
    schemaVersion: 1,
    id,
    createdAt: now,
    status: 'submitted_local',
    lesson: briefLesson(draft.lessonId),
    parentRole: draft.parentRole,
    child: { name: cleanText(draft.child.name, NAME_MAX), gender: draft.child.gender },
    style: briefStyle(draft.styleId),
    characters: {
      mom: cleanText(draft.cast.momName, LABEL_MAX),
      dad: cleanText(draft.cast.dadName, LABEL_MAX),
      animals: [...draft.cast.animals],
    },
    faces: {
      mom: faces.includes('mom'),
      dad: faces.includes('dad'),
      placeholderIds: faces.map((face) => placeholders[face]),
    },
    notes,
    dedication: cleanText(draft.dedication, DEDICATION_MAX),
    consent: { notesRead: true, shelf },
    price: {
      base: FASL_BASE,
      animals,
      faces: faceFee,
      total: computeTotal({ animals: draft.cast.animals, effectiveFaces: faces }),
    },
  }
}

type Store = { getItem(key: string): string | null; setItem(key: string, value: string): void; removeItem(key: string): void }

export function saveOrder(store: Store, brief: OrderBrief) {
  store.setItem(ORDER_KEY, JSON.stringify(brief))
}

export function loadOrder(store: Store): OrderBrief | null {
  const raw = store.getItem(ORDER_KEY)
  if (!raw) return null
  try {
    return JSON.parse(raw) as OrderBrief
  } catch {
    return null
  }
}

export function clearOrder(store: Store) {
  store.removeItem(ORDER_KEY)
}
