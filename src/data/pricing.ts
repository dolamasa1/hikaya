import { formatPrice, type Gender } from './books'
import { FASL_BASE } from './lessons'
import { getStoryStyle, type StoryStyleId } from './styles'

export const ANIMAL_PRICE = 30
export const FACE_PRICE = 90

export type FaceParent = 'mom' | 'dad'

export function formatEGP(price: number) {
  return formatPrice(price)
}

export function effectiveFaces(styleId: StoryStyleId | string | null | undefined, faceParents: readonly FaceParent[]) {
  if (getStoryStyle(styleId ?? undefined).textOnly) return [] as FaceParent[]
  const unique = faceParents.filter((id, index) => (id === 'mom' || id === 'dad') && faceParents.indexOf(id) === index)
  return unique
}

export function computeTotal({
  animals,
  effectiveFaces: faces,
}: {
  animals: readonly string[]
  effectiveFaces: readonly string[]
}) {
  return FASL_BASE + ANIMAL_PRICE * animals.length + FACE_PRICE * faces.length
}

export function totalFor(styleId: StoryStyleId | string | null | undefined, animals: readonly string[], faceParents: readonly FaceParent[]) {
  return computeTotal({ animals, effectiveFaces: effectiveFaces(styleId, faceParents) })
}

export type ChildGender = Gender
