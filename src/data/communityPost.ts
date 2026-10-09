import type { Gender } from './books'
import type { LessonId } from './lessons'
import type { StoryStyleId } from './styles'

const privateKeys = ['notes', 'momName', 'dadName', 'dedication', 'parentRole', 'faces', 'likenessIds', 'faceParents', 'open']

export type ShelfPost = {
  id: string
  lessonId: LessonId
  displayName: string
  gender: Gender
  styleId: StoryStyleId
  animals: string[]
  publishedAt: number
  yours: boolean
  cover: string
  publisher: string
  rating: number
  reviews: number
}

const animalIds = new Set(['monkey', 'cat', 'bird'])

function lessonOf(value: unknown): LessonId {
  if (value === 'separation' || value === 'anger' || value === 'novelty' || value === 'sharing') return value
  if (value === 'new_fears') return 'novelty'
  return 'separation'
}

function styleOf(value: unknown): StoryStyleId {
  if (value === 'words' || value === 'paper' || value === 'night') return value
  if (value === 'text') return 'words'
  return 'paper'
}

export function communityRecord(input: Record<string, unknown>, fallbackId: string): ShelfPost {
  const extra = Array.isArray(input.extraIds) ? input.extraIds : []
  const animals = Array.isArray(input.animals) ? input.animals : extra
  const display = typeof input.displayName === 'string' ? input.displayName : typeof input.name === 'string' ? input.name : ''
  return {
    id: typeof input.id === 'string' && input.id ? input.id : fallbackId,
    lessonId: lessonOf(input.lessonId ?? input.lesson),
    displayName: display.trim() || 'طفل',
    gender: input.gender === 'boy' ? 'boy' : 'girl',
    styleId: styleOf(input.styleId ?? input.style),
    animals: animals.filter((id): id is string => typeof id === 'string' && animalIds.has(id)),
    publishedAt: typeof input.publishedAt === 'number' ? input.publishedAt : Date.now(),
    yours: input.yours === true,
    cover: typeof input.cover === 'string' ? input.cover : '',
    publisher: typeof input.publisher === 'string' ? input.publisher : '',
    rating: typeof input.rating === 'number' ? input.rating : 0,
    reviews: typeof input.reviews === 'number' ? input.reviews : 0,
  }
}

export function shelfPayload(post: ShelfPost) {
  const payload = {
    id: post.id,
    lesson: post.lessonId,
    displayName: post.displayName,
    gender: post.gender,
    style: post.styleId,
    animals: post.animals,
    publishedAt: post.publishedAt,
  }
  for (const key of privateKeys) {
    if (key in payload) throw new Error('private field')
  }
  return payload
}
