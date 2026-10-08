import { describe, expect, it } from 'vitest'
import { faslExtrasTotal, getStoryStyle, PARENT_LIKENESS_PRICE, storyStyles } from './styles'

describe('فصل حكايتك styles', () => {
  it('offers one text-only style and two painted styles', () => {
    expect(storyStyles.map((style) => style.id)).toEqual(['words', 'paper', 'night'])
    expect(getStoryStyle('words').textOnly).toBe(true)
    expect(getStoryStyle('paper').textOnly).toBe(false)
    expect(getStoryStyle('night').textOnly).toBe(false)
  })

  it('keeps parent names free and charges only animals and parent likenesses', () => {
    expect(PARENT_LIKENESS_PRICE).toBe(90)
    expect(faslExtrasTotal(['mom', 'dad'], [])).toBe(0)
    expect(faslExtrasTotal(['mom', 'cat', 'bird'], ['mom'])).toBe(150)
  })

  it('does not charge for a likeness unless that parent is in the story', () => {
    expect(faslExtrasTotal([], ['mom'])).toBe(0)
    expect(faslExtrasTotal(['mom'], ['mom', 'mom', 'cat'])).toBe(90)
  })
})
