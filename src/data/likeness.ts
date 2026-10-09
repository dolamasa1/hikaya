import { faces } from './faces'

const parentFaces = {
  mom: faces.find((face) => face.id === 'laila')?.cartoon,
  dad: faces.find((face) => face.id === 'adam')?.cartoon,
}

export function getParentLikeness(id: string) {
  return id === 'mom' || id === 'dad' ? parentFaces[id] : undefined
}
