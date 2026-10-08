import { chosenCharacters } from './characters'

export const PARENT_LIKENESS_PRICE = 90

export type StoryStyleId = 'words' | 'paper' | 'night'

export type StoryStyle = {
  id: StoryStyleId
  title: string
  note: string
  detail: string
  cover: string
  ink: string
  textOnly: boolean
}

export const storyStyles: StoryStyle[] = [
  {
    id: 'words',
    title: 'الكلام',
    note: 'هدوء الورق والكلمة',
    detail: 'من غير صورة للبطل. الاسم والحكاية هما المشهد.',
    cover: '#f3ede1',
    ink: '#3e342c',
    textOnly: true,
  },
  {
    id: 'paper',
    title: 'ورق',
    note: 'ألوان مائية دافية',
    detail: 'خوخي ومريمي، بنفس هدوء أغلفة حكايتك.',
    cover: '#d7e3c8',
    ink: '#315344',
    textOnly: false,
  },
  {
    id: 'night',
    title: 'ليل',
    note: 'حبر كحلي وضوء كريم',
    detail: 'مشاهد هادية وعميقة للحكايات المسائية.',
    cover: '#1d3a52',
    ink: '#f6f1e7',
    textOnly: false,
  },
]

export function getStoryStyle(id: StoryStyleId | string | undefined) {
  return storyStyles.find((style) => style.id === id) ?? storyStyles[1]
}

export function faslExtrasTotal(extraIds: string[], likenessIds: string[]) {
  const cast = chosenCharacters(extraIds)
  const animalTotal = cast
    .filter((character) => character.group === 'animals')
    .reduce((sum, character) => sum + character.price, 0)
  const selectedParents = new Set(
    cast.filter((character) => character.group === 'family').map((character) => character.id),
  )
  const paidLikenesses = new Set(
    likenessIds.filter((id) => selectedParents.has(id) && (id === 'mom' || id === 'dad')),
  )

  return animalTotal + paidLikenesses.size * PARENT_LIKENESS_PRICE
}
