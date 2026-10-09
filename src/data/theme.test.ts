import { describe, expect, it } from 'vitest'
import { parseTheme, themeFromStyle } from './theme'

describe('theme', () => {
  it('falls back to paper when the stored value is invalid', () => {
    expect(parseTheme('neon')).toBe('paper')
    expect(parseTheme(null)).toBe('paper')
    expect(parseTheme('night')).toBe('night')
  })

  it('maps the text-only style to the text theme', () => {
    expect(themeFromStyle('words')).toBe('text')
    expect(themeFromStyle('paper')).toBe('paper')
  })
})
