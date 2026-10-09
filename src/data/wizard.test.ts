import { describe, expect, it } from 'vitest'
import { emptyDraft } from './draft'
import { applyLessonChange, canReach, lessonChangeNeedsConfirm, maxReachableIndex } from './wizard'

function ready() {
  const draft = emptyDraft()
  draft.parentRole = 'mother'
  draft.lessonId = 'anger'
  draft.protocolAccepted = true
  draft.child.name = 'ليلى'
  draft.styleId = 'paper'
  draft.notes.situation.line = 'بيزعل لما الطلب يترفض'
  draft.notes.likes = [{ id: 'blue', label: 'أزرق', degree: 3 }]
  draft.notes.open = 'بيحب القمر قبل النوم كل ليلة'
  return draft
}

describe('wizard reachability', () => {
  it('blocks every later step until the role is chosen', () => {
    const draft = emptyDraft()
    expect(maxReachableIndex(draft)).toBe(0)
    expect(canReach(draft, 'behavior')).toBe(false)
  })

  it('stops at the first invalid step and includes it', () => {
    const draft = emptyDraft()
    draft.parentRole = 'father'
    expect(canReach(draft, 'behavior')).toBe(true)
    expect(canReach(draft, 'protocol')).toBe(false)
  })

  it('makes the protocol unreachable after a lesson change until it is accepted again', () => {
    const next = applyLessonChange(ready(), 'sharing')
    expect(next.protocolAccepted).toBe(false)
    expect(canReach(next, 'notes')).toBe(false)
    expect(canReach(next, 'protocol')).toBe(true)
    expect(canReach(next, 'child')).toBe(false)
    next.protocolAccepted = true
    expect(canReach(next, 'notes')).toBe(true)
    expect(canReach(next, 'cast')).toBe(false)
    next.notes.situation.line = 'المشاركة بتصعب مع أخوه'
    expect(canReach(next, 'review')).toBe(true)
  })

  it('does not invalidate name or gender edits', () => {
    const draft = ready()
    draft.child.name = 'آدم'
    draft.child.gender = 'boy'
    expect(canReach(draft, 'review')).toBe(true)
  })

  it('asks before clearing a filled situation and keeps other notes', () => {
    const draft = ready()
    expect(lessonChangeNeedsConfirm(draft, 'sharing')).toBe(true)
    const next = applyLessonChange(draft, 'sharing')
    expect(next.notes.situation.line).toBe('')
    expect(next.notes.likes).toEqual(draft.notes.likes)
    expect(next.notes.open).toBe(draft.notes.open)
  })
})
