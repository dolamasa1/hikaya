import { describe, expect, it } from 'vitest'
import { DRAFT_KEY, DRAFT_TTL_MS, emptyDraft, loadDraft, saveDraft } from './draft'

function memory() {
  const data = new Map<string, string>()
  return {
    getItem: (key: string) => data.get(key) ?? null,
    setItem: (key: string, value: string) => {
      data.set(key, value)
    },
    removeItem: (key: string) => {
      data.delete(key)
    },
  }
}

describe('draft persistence', () => {
  it('trims text and reloads within 30 days', () => {
    const store = memory()
    const draft = emptyDraft(1_000)
    draft.parentRole = 'mother'
    draft.child.name = '  ليلى\u0000  '
    draft.notes.situation.line = '  بيحصل   كل يوم  '
    saveDraft(store, draft, 1_000)
    const loaded = loadDraft(store, 1_000)
    expect(store.getItem(DRAFT_KEY)).toBeTruthy()
    expect(loaded?.child.name).toBe('ليلى')
    expect(loaded?.notes.situation.line).toBe('بيحصل كل يوم')
  })

  it('drops a draft older than 30 days', () => {
    const store = memory()
    saveDraft(store, emptyDraft(0), 0)
    expect(loadDraft(store, DRAFT_TTL_MS + 1)).toBeNull()
  })
})
