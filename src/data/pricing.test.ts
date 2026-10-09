import { describe, expect, it } from 'vitest'
import { formatPrice } from './books'
import { computeTotal, effectiveFaces, formatEGP, totalFor } from './pricing'

describe('fasl pricing', () => {
  it('charges the base for names in any style', () => {
    expect(totalFor('words', [], [])).toBe(1290)
    expect(totalFor('paper', [], [])).toBe(1290)
    expect(totalFor('night', [], [])).toBe(1290)
  })

  it('follows the price matrix including hide and restore', () => {
    expect(computeTotal({ animals: ['cat', 'bird'], effectiveFaces: [] })).toBe(1350)
    expect(totalFor('paper', [], ['mom'])).toBe(1380)
    expect(totalFor('night', ['cat', 'bird'], ['mom', 'dad'])).toBe(1530)
    expect(totalFor('words', ['cat', 'bird'], ['mom', 'dad'])).toBe(1350)
    expect(totalFor('paper', ['cat', 'bird'], ['mom', 'dad'])).toBe(1530)
  })

  it('keeps the total unchanged when a face cannot be added in text-only', () => {
    const stored = effectiveFaces('words', [])
    expect(stored).toEqual([])
    expect(totalFor('words', [], stored)).toBe(1290)
  })

  it('formats money with the site helper', () => {
    expect(formatEGP(1290)).toBe(formatPrice(1290))
  })
})
