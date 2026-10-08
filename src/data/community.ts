import type { Gender } from './books'
import type { LessonId } from './lessons'
import type { StoryStyleId } from './styles'

export type CommunityPost = {
  id: string
  lessonId: LessonId
  name: string
  gender: Gender
  extraIds: string[]
  styleId?: StoryStyleId
  likenessIds?: string[]
  yours: boolean
  cover: string
  publisher: string
  rating: number
  reviews: number
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

export function loadCommunity(): CommunityPost[] {
  try {
    const raw = localStorage.getItem(key)
    const saved = raw ? (JSON.parse(raw) as CommunityPost[]) : []
    return [...saved.filter((post) => post.yours).map(settle), ...seed]
  } catch {
    return seed
  }
}

export function publishPost(post: Omit<CommunityPost, 'id' | 'yours' | 'cover' | 'publisher' | 'rating' | 'reviews'> & Partial<Pick<CommunityPost, 'cover' | 'publisher'>>) {
  const next: CommunityPost = {
    ...post,
    id: `yours-${Date.now()}`,
    yours: true,
    cover: post.cover || coverFor(post.lessonId),
    publisher: post.publisher || 'حسابكم',
    rating: 0,
    reviews: 0,
  }
  const raw = localStorage.getItem(key)
  const saved = raw ? (JSON.parse(raw) as CommunityPost[]) : []
  localStorage.setItem(key, JSON.stringify([next, ...saved]))
  return next
}

export function getPost(id: string | undefined) {
  return loadCommunity().find((post) => post.id === id)
}
