import { describe, expect, it } from 'vitest'
import { parseTheme, themeFromStyle } from './theme'

describe('theme', () => {
  it('falls back to the original default theme when the stored value is invalid', () => {
    expect(parseTheme('neon')).toBe('default')
    expect(parseTheme(null)).toBe('default')
    expect(parseTheme('default')).toBe('default')
    expect(parseTheme('night')).toBe('night')
  })

  it('maps the text-only style to the text theme', () => {
    expect(themeFromStyle('words')).toBe('text')
    expect(themeFromStyle('paper')).toBe('paper')
  })
})
