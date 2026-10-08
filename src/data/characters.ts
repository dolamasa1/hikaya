export const CHARACTER_PRICE = 30

export type CharacterGroup = 'family' | 'animals'

export type StoryCharacter = {
  id: string
  label: string
  group: CharacterGroup
  price: number
}

export const characterGroups: { id: CharacterGroup; label: string }[] = [
  { id: 'family', label: 'العيلة' },
  { id: 'animals', label: 'الحيوانات' },
]

export const characters: StoryCharacter[] = [
  { id: 'mom', label: 'ماما', group: 'family', price: CHARACTER_PRICE },
  { id: 'dad', label: 'بابا', group: 'family', price: CHARACTER_PRICE },
  { id: 'monkey', label: 'قرد', group: 'animals', price: CHARACTER_PRICE },
  { id: 'cat', label: 'قطة', group: 'animals', price: CHARACTER_PRICE },
  { id: 'bird', label: 'عصفور', group: 'animals', price: CHARACTER_PRICE },
]

export function chosenCharacters(ids: string[]) {
  return characters.filter((item) => ids.includes(item.id))
}

export function characterTotal(ids: string[]) {
  return chosenCharacters(ids).reduce((sum, item) => sum + item.price, 0)
}
