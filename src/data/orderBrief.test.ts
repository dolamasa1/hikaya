import { describe, expect, it } from 'vitest'
import { emptyDraft } from './draft'
import { buildOrderBrief } from './orderBrief'

function ready() {
  const draft = emptyDraft()
  draft.parentRole = 'father'
  draft.lessonId = 'novelty'
  draft.protocolAccepted = true
  draft.child = { name: '  آدم  ', gender: 'boy' }
  draft.styleId = 'paper'
  draft.cast.faceParents = ['mom', 'dad']
  draft.cast.animals = ['cat']
  draft.cast.momName = '  هدى  '
  draft.notes.situation.line = '  بيتخوف من المكان الجديد  '
  draft.notes.open = '  ' + 'ا'.repeat(2000)
  return draft
}

describe('order brief', () => {
  it('maps novelty and words, and drops hidden faces', () => {
    const drawn = buildOrderBrief(ready(), 10, 'ord-1')
    expect(drawn.lesson).toBe('new_fears')
    expect(drawn.style).toBe('paper')
    expect(drawn.faces).toEqual({ mom: true, dad: true, placeholderIds: ['laila', 'adam'] })
    expect(drawn.child.name).toBe('آدم')
    expect(drawn.characters.mom).toBe('هدى')
    expect(drawn.notes.open.length).toBe(1500)
    expect(drawn.price.total).toBe(1290 + 30 + 180)

    const hidden = ready()
    hidden.styleId = 'words'
    const text = buildOrderBrief(hidden, 10, 'ord-2')
    expect(text.style).toBe('text')
    expect(text.faces).toEqual({ mom: false, dad: false, placeholderIds: [] })
    expect(text.price.total).toBe(1320)
  })

  it('throws when the draft is incomplete', () => {
    expect(() => buildOrderBrief(emptyDraft(), 1, 'x')).toThrow(/incomplete/)
  })
})
