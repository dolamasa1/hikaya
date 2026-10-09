import { describe, expect, it } from 'vitest'
import { childCopy, parentCopy } from './fasl-copy'

describe('fasl copy', () => {
  it('has a mother and father line for every parent key', () => {
    for (const value of Object.values(parentCopy)) {
      expect(value.father.length).toBeGreaterThan(0)
      expect(value.mother.length).toBeGreaterThan(0)
      expect(value.father).not.toBe(value.mother)
    }
  })

  it('has a boy and girl line for every child key', () => {
    for (const value of Object.values(childCopy)) {
      expect(value.boy.length).toBeGreaterThan(0)
      expect(value.girl.length).toBeGreaterThan(0)
      expect(value.boy).not.toBe(value.girl)
    }
  })
})
