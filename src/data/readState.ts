import type { Gender } from './books'
import { faces } from './faces'

export type ReadState = {
  name: string
  gender: Gender
  faceId: string
  message: string
  page: number
  extraIds: string[]
}

const key = (slug: string) => `hikaya:${slug}`

export function emptyRead(): ReadState {
  return { name: '', gender: 'girl', faceId: faces[0].id, message: '', page: 0, extraIds: [] }
}

export function loadRead(slug: string): ReadState {
  try {
    const raw = sessionStorage.getItem(key(slug))
    if (!raw) return emptyRead()
    const parsed = JSON.parse(raw) as Partial<ReadState>
    return {
      name: parsed.name ?? '',
      gender: parsed.gender === 'boy' ? 'boy' : 'girl',
      faceId: parsed.faceId || faces[0].id,
      message: parsed.message ?? '',
      page: typeof parsed.page === 'number' && parsed.page >= 0 ? parsed.page : 0,
      extraIds: Array.isArray(parsed.extraIds) ? parsed.extraIds.filter((id) => typeof id === 'string') : [],
    }
  } catch {
    return emptyRead()
  }
}

export function saveRead(slug: string, patch: Partial<ReadState>) {
  const current = loadRead(slug)
  sessionStorage.setItem(key(slug), JSON.stringify({ ...current, ...patch }))
}
