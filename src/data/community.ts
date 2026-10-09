import type { Gender } from './books'
import { communityRecord } from './communityPost'
import type { LessonId } from './lessons'
import type { StoryStyleId } from './styles'

export type CommunityPost = {
  id: string
  lessonId: LessonId
  name: string
  displayName?: string
  gender: Gender
  extraIds: string[]
  animals?: string[]
  styleId?: StoryStyleId
  likenessIds?: string[]
  yours: boolean
  cover: string
  publisher: string
  rating: number
  reviews: number
  publishedAt?: number
}

const key = 'hikaya-community'

const lessonCover: Record<LessonId, string> = {
  separation: '/images/cover-together.jpg',
  anger: '/images/cover-find.jpg',
  novelty: '/images/cover-moon.jpg',
  sharing: '/images/cover-eid.jpg',
}

export function coverFor(lessonId: LessonId) {
  return lessonCover[lessonId]
}

const seed: CommunityPost[] = [
  {
    id: 'seed-nour',
    lessonId: 'separation',
    name: 'نور',
    gender: 'girl',
    extraIds: ['mom', 'cat'],
    styleId: 'paper',
    likenessIds: ['mom'],
    yours: false,
    cover: lessonCover.separation,
    publisher: 'ماما هدى',
    rating: 4.8,
    reviews: 36,
  },
  {
    id: 'seed-adam',
    lessonId: 'anger',
    name: 'آدم',
    gender: 'boy',
    extraIds: ['dad'],
    styleId: 'words',
    likenessIds: [],
    yours: false,
    cover: lessonCover.anger,
    publisher: 'بابا كريم',
    rating: 4.6,
    reviews: 21,
  },
  {
    id: 'seed-salma',
    lessonId: 'novelty',
    name: 'سلمى',
    gender: 'girl',
    extraIds: ['bird'],
    styleId: 'night',
    likenessIds: [],
    yours: false,
    cover: lessonCover.novelty,
    publisher: 'ماما منى',
    rating: 4.9,
    reviews: 18,
  },
  {
    id: 'seed-youssef',
    lessonId: 'sharing',
    name: 'يوسف',
    gender: 'boy',
    extraIds: ['monkey', 'mom'],
    styleId: 'paper',
    likenessIds: ['mom'],
    yours: false,
    cover: lessonCover.sharing,
    publisher: 'بابا ياسين',
    rating: 4.7,
    reviews: 42,
  },
]

function settle(post: CommunityPost): CommunityPost {
  return {
    ...post,
    cover: post.cover || coverFor(post.lessonId),
    publisher: post.publisher || (post.yours ? 'حسابكم' : 'أهالي حكايتك'),
    rating: typeof post.rating === 'number' ? post.rating : 0,
    reviews: typeof post.reviews === 'number' ? post.reviews : 0,
  }
}

function fromSaved(raw: Record<string, unknown>): CommunityPost {
  const record = communityRecord(raw, `saved-${Date.now()}`)
  return settle({
    id: record.id,
    lessonId: record.lessonId,
    name: record.displayName,
    displayName: record.displayName,
    gender: record.gender,
    extraIds: record.animals,
    animals: record.animals,
    styleId: record.styleId,
    yours: true,
    cover: record.cover,
    publisher: record.publisher,
    rating: record.rating,
    reviews: record.reviews,
    publishedAt: record.publishedAt,
  })
}

export function loadCommunity(): CommunityPost[] {
  try {
    const raw = localStorage.getItem(key)
    const saved = raw ? (JSON.parse(raw) as Record<string, unknown>[]) : []
    const yours = saved.filter((post) => post.yours === true).map(fromSaved)
    const privateKey = /"(notes|likenessIds|momName|dadName|dedication|parentRole|faces|faceParents)"/
    if (privateKey.test(raw ?? '')) {
      const clean = yours.map((post) => ({
        id: post.id,
        lessonId: post.lessonId,
        displayName: post.displayName,
        gender: post.gender,
        styleId: post.styleId,
        animals: post.animals,
        publishedAt: post.publishedAt,
        yours: true,
        cover: post.cover,
        publisher: post.publisher,
        rating: post.rating,
        reviews: post.reviews,
      }))
      localStorage.setItem(key, JSON.stringify(clean))
    }
    return [...yours, ...seed]
  } catch {
    return seed
  }
}

export function publishShelf(input: {
  lessonId: LessonId
  displayName: string
  gender: Gender
  styleId: StoryStyleId
  animals: string[]
}) {
  const next = fromSaved({
    id: `yours-${Date.now()}`,
    lessonId: input.lessonId,
    displayName: input.displayName.trim(),
    gender: input.gender,
    styleId: input.styleId,
    animals: input.animals,
    yours: true,
    publisher: 'حسابكم',
    publishedAt: Date.now(),
  })
  const raw = localStorage.getItem(key)
  const saved = raw ? (JSON.parse(raw) as Record<string, unknown>[]) : []
  const stored = {
    id: next.id,
    lessonId: next.lessonId,
    displayName: next.displayName,
    gender: next.gender,
    styleId: next.styleId,
    animals: next.animals,
    publishedAt: next.publishedAt,
    yours: true,
    cover: next.cover,
    publisher: next.publisher,
    rating: 0,
    reviews: 0,
  }
  localStorage.setItem(key, JSON.stringify([stored, ...saved]))
  return next
}

export function postTitle(post: CommunityPost) {
  return post.displayName || post.name
}

export function postExtras(post: CommunityPost) {
  return post.animals ?? post.extraIds ?? []
}

export function getPost(id: string | undefined) {
  return loadCommunity().find((post) => post.id === id)
}
