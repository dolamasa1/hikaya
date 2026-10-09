import { describe, expect, it } from 'vitest'
import { emptyNotes, plateLikes, seedStage, setDislikeDegree, type DislikeItem } from './notes'

describe('notes', () => {
  it('defaults a strong dislike to omit until the parent touches the toggle', () => {
    const item: DislikeItem = { id: 'dark', label: 'الضلام', degree: 2, mention: 'gentle', mentionTouched: false }
    const strong = setDislikeDegree(item, 3)
    expect(strong.mention).toBe('omit')
    const touched = setDislikeDegree({ ...strong, mention: 'gentle', mentionTouched: true }, 1)
    expect(touched.mention).toBe('gentle')
    expect(touched.degree).toBe(1)
  })

  it('grows the seed without exposing dislikes on the plate', () => {
    const notes = emptyNotes()
    expect(seedStage(notes)).toBe(0)
    notes.situation.line = 'بيحصل كل صباح'
    expect(seedStage(notes)).toBe(1)
    notes.situation.when = 'الصبح'
    expect(seedStage(notes)).toBe(2)
    notes.dislikes = [{ id: 'noise', label: 'الصوت', degree: 3, mention: 'omit', mentionTouched: false }]
    expect(seedStage(notes)).toBe(3)
    notes.open = 'بيحب يسمع حكاية قصيرة قبل النوم'
    expect(seedStage(notes)).toBe(4)
    notes.likes = [
      { id: 'a', label: 'أزرق', degree: 1 },
      { id: 'b', label: 'قمر', degree: 3 },
    ]
    expect(plateLikes(notes.likes).map((item) => item.label)).toEqual(['قمر', 'أزرق'])
    expect(plateLikes(notes.likes).some((item) => item.label === 'الصوت')).toBe(false)
  })
})
