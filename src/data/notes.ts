import type { LessonId } from './lessons'
import type { ChildGender } from './pricing'

export type Degree = 1 | 2 | 3
export type Mention = 'omit' | 'gentle'

export type LikeItem = { id: string; label: string; degree: Degree }
export type DislikeItem = { id: string; label: string; degree: Degree; mention: Mention; mentionTouched: boolean }

export type Situation = {
  line: string
  when: string
  where: string
  who: string
  usualResponse: string
  afterwards: string
}

export type Notes = {
  situation: Situation
  likes: LikeItem[]
  dislikes: DislikeItem[]
  open: string
}

export const LABEL_MAX = 30
export const LIKE_MAX = 12
export const LINE_MAX = 400
export const FIELD_MAX = 200
export const OPEN_MAX = 1500
export const DEDICATION_MAX = 140
export const NAME_MAX = 20

export function cleanText(value: string, max: number) {
  let text = ''
  for (const char of value) {
    const code = char.charCodeAt(0)
    if (code === 10 || code === 9) text += ' '
    else if (code >= 32 && code !== 127) text += char
  }
  return text.replace(/ {2,}/g, ' ').trim().slice(0, max)
}

export function emptySituation(): Situation {
  return { line: '', when: '', where: '', who: '', usualResponse: '', afterwards: '' }
}

export function emptyNotes(): Notes {
  return { situation: emptySituation(), likes: [], dislikes: [], open: '' }
}

export function situationFilled(situation: Situation) {
  return Object.values(situation).some((value) => value.trim().length > 0)
}

export function lineValid(line: string) {
  return cleanText(line, LINE_MAX).length >= 8
}

export function defaultMention(degree: Degree): Mention {
  return degree === 3 ? 'omit' : 'gentle'
}

export function setDislikeDegree(item: DislikeItem, degree: Degree): DislikeItem {
  if (item.mentionTouched) return { ...item, degree }
  return { ...item, degree, mention: defaultMention(degree) }
}

export function seedStage(notes: Notes) {
  let stage = 0
  if (lineValid(notes.situation.line)) stage += 1
  const optional = [notes.situation.when, notes.situation.where, notes.situation.who, notes.situation.usualResponse, notes.situation.afterwards]
  if (optional.some((value) => cleanText(value, FIELD_MAX).length > 0)) stage += 1
  if (notes.likes.length > 0 || notes.dislikes.length > 0) stage += 1
  if (cleanText(notes.open, OPEN_MAX).length >= 20) stage += 1
  return stage
}

export function plateLikes(likes: readonly LikeItem[]) {
  return [...likes].sort((a, b) => b.degree - a.degree || a.label.localeCompare(b.label, 'ar')).slice(0, 5)
}

export function childNameValid(name: string) {
  const clean = cleanText(name, NAME_MAX)
  return clean.length >= 1 && clean.length <= NAME_MAX && /^[\p{L}\s-]+$/u.test(clean)
}

const situationChips: Record<LessonId, string[]> = {
  separation: ['عند الذهاب للحضانة أو المدرسة', 'عند النوم', 'عند خروجي من البيت', 'مع الجدة أو المربية'],
  anger: ['عند رفض طلب', 'عند الخسارة في لعبة', 'عند الإرهاق', 'أمام الآخرين'],
  novelty: ['مكان جديد', 'شخص جديد', 'طعام جديد', 'نشاط جديد'],
  sharing: ['مع أخ أو أخت', 'في الحضانة أو المدرسة', 'مع ألعابه المفضلة', 'في الأكل'],
}

export function chipsFor(lessonId: LessonId | string | null) {
  if (lessonId === 'separation' || lessonId === 'anger' || lessonId === 'novelty' || lessonId === 'sharing') {
    return situationChips[lessonId]
  }
  return []
}

export const likeCatalog = [
  { id: 'animals', label: 'حيوانات', items: ['قطة', 'عصفور', 'قرد'] },
  { id: 'colors', label: 'ألوان', items: ['أزرق', 'أخضر', 'أصفر'] },
  { id: 'bedtime', label: 'وقت النوم', items: ['بطانية', 'دمية', 'قصة'] },
  { id: 'foods', label: 'أكل', items: ['تفاح', 'لبن', 'خبز'] },
  { id: 'activities', label: 'لعب', items: ['رسم', 'كرة', 'حديقة'] },
] as const

export function dislikeDegreeLabel(gender: ChildGender, degree: Degree) {
  const boy = ['لا يحبه', 'يضايقه', 'يخيفه'] as const
  const girl = ['لا تحبه', 'يضايقها', 'يخيفها'] as const
  return (gender === 'boy' ? boy : girl)[degree - 1]
}

export function likeDegreeLabel(degree: Degree) {
  return (['قليلًا', 'كثيرًا', 'أكثر شيء في الدنيا'] as const)[degree - 1]
}
