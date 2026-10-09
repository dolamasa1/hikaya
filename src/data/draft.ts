import type { LessonId } from './lessons'
import {
  cleanText,
  DEDICATION_MAX,
  emptyNotes,
  FIELD_MAX,
  LABEL_MAX,
  LIKE_MAX,
  LINE_MAX,
  NAME_MAX,
  OPEN_MAX,
  type DislikeItem,
  type LikeItem,
  type Notes,
} from './notes'
import type { ChildGender, FaceParent } from './pricing'
import type { StoryStyleId } from './styles'

export type ParentRole = 'mother' | 'father'

export type FaslCast = {
  momName: string
  dadName: string
  animals: string[]
  faceParents: FaceParent[]
}

export type FaslDraft = {
  version: 1
  parentRole: ParentRole | null
  lessonId: LessonId | null
  protocolAccepted: boolean
  child: { name: string; gender: ChildGender }
  styleId: StoryStyleId | null
  cast: FaslCast
  notes: Notes
  dedication: string
  savedAt: number
}

export const DRAFT_KEY = 'hikaya.fasl.draft.v1'
export const DRAFT_TTL_MS = 30 * 24 * 60 * 60 * 1000
export const DRAFT_DEBOUNCE_MS = 400

const lessons = new Set<LessonId>(['separation', 'anger', 'novelty', 'sharing'])
const styles = new Set<StoryStyleId>(['words', 'paper', 'night'])
const animals = new Set(['monkey', 'cat', 'bird'])

export function emptyDraft(now = Date.now()): FaslDraft {
  return {
    version: 1,
    parentRole: null,
    lessonId: null,
    protocolAccepted: false,
    child: { name: '', gender: 'girl' },
    styleId: 'paper',
    cast: { momName: '', dadName: '', animals: [], faceParents: [] },
    notes: emptyNotes(),
    dedication: '',
    savedAt: now,
  }
}

function asDegree(value: unknown): 1 | 2 | 3 {
  return value === 1 || value === 3 ? value : 2
}

function cleanLikes(value: unknown): LikeItem[] {
  if (!Array.isArray(value)) return []
  return value.slice(0, LIKE_MAX).flatMap((item) => {
    if (!item || typeof item !== 'object') return []
    const row = item as Partial<LikeItem>
    const label = cleanText(String(row.label ?? ''), LABEL_MAX)
    if (!label) return []
    return [{ id: cleanText(String(row.id ?? label), 40) || label, label, degree: asDegree(row.degree) }]
  })
}

function cleanDislikes(value: unknown): DislikeItem[] {
  if (!Array.isArray(value)) return []
  return value.slice(0, LIKE_MAX).flatMap((item) => {
    if (!item || typeof item !== 'object') return []
    const row = item as Partial<DislikeItem>
    const label = cleanText(String(row.label ?? ''), LABEL_MAX)
    if (!label) return []
    const degree = asDegree(row.degree)
    const mentionTouched = row.mentionTouched === true
    const mention = row.mention === 'omit' || row.mention === 'gentle' ? row.mention : degree === 3 ? 'omit' : 'gentle'
    return [{ id: cleanText(String(row.id ?? label), 40) || label, label, degree, mention, mentionTouched }]
  })
}

export function sanitizeDraft(input: Partial<FaslDraft> | null | undefined, now = Date.now()): FaslDraft {
  const base = emptyDraft(now)
  const notes = input?.notes
  const situation = notes?.situation
  const lessonId = lessons.has(input?.lessonId as LessonId) ? (input?.lessonId as LessonId) : null
  const styleId = styles.has(input?.styleId as StoryStyleId) ? (input?.styleId as StoryStyleId) : base.styleId
  const faceParents = (input?.cast?.faceParents ?? []).filter((id): id is FaceParent => id === 'mom' || id === 'dad')
  return {
    version: 1,
    parentRole: input?.parentRole === 'mother' || input?.parentRole === 'father' ? input.parentRole : null,
    lessonId,
    protocolAccepted: input?.protocolAccepted === true,
    child: {
      name: cleanText(input?.child?.name ?? '', NAME_MAX),
      gender: input?.child?.gender === 'boy' ? 'boy' : 'girl',
    },
    styleId,
    cast: {
      momName: cleanText(input?.cast?.momName ?? '', LABEL_MAX),
      dadName: cleanText(input?.cast?.dadName ?? '', LABEL_MAX),
      animals: (input?.cast?.animals ?? []).filter((id) => animals.has(id)),
      faceParents: [...new Set(faceParents)],
    },
    notes: {
      situation: {
        line: cleanText(situation?.line ?? '', LINE_MAX),
        when: cleanText(situation?.when ?? '', FIELD_MAX),
        where: cleanText(situation?.where ?? '', FIELD_MAX),
        who: cleanText(situation?.who ?? '', FIELD_MAX),
        usualResponse: cleanText(situation?.usualResponse ?? '', FIELD_MAX),
        afterwards: cleanText(situation?.afterwards ?? '', FIELD_MAX),
      },
      likes: cleanLikes(notes?.likes),
      dislikes: cleanDislikes(notes?.dislikes),
      open: cleanText(notes?.open ?? '', OPEN_MAX),
    },
    dedication: cleanText(input?.dedication ?? '', DEDICATION_MAX),
    savedAt: typeof input?.savedAt === 'number' ? input.savedAt : now,
  }
}

type Store = { getItem(key: string): string | null; setItem(key: string, value: string): void; removeItem(key: string): void }

export function readDraft(raw: string | null, now = Date.now()): FaslDraft | null {
  if (!raw) return null
  try {
    const parsed = JSON.parse(raw) as Partial<FaslDraft>
    if (parsed.version !== 1) return null
    const draft = sanitizeDraft(parsed, now)
    if (now - draft.savedAt > DRAFT_TTL_MS) return null
    return draft
  } catch {
    return null
  }
}

export function loadDraft(store: Store, now = Date.now()) {
  return readDraft(store.getItem(DRAFT_KEY), now)
}

export function saveDraft(store: Store, draft: FaslDraft, now = Date.now()) {
  const next = sanitizeDraft({ ...draft, savedAt: now }, now)
  store.setItem(DRAFT_KEY, JSON.stringify(next))
  return next
}

export function clearDraft(store: Store) {
  store.removeItem(DRAFT_KEY)
}
