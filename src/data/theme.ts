import type { StoryStyleId } from './styles'

export const THEME_KEY = 'hikaya.theme.v1'
export const THEMES = ['default', 'text', 'paper', 'night'] as const
export type ThemeId = (typeof THEMES)[number]

export function parseTheme(value: string | null | undefined): ThemeId {
  return value === 'default' || value === 'text' || value === 'night' || value === 'paper' ? value : 'default'
}

export function themeFromStyle(styleId: StoryStyleId | string | null | undefined): ThemeId {
  if (styleId === 'words') return 'text'
  if (styleId === 'night') return 'night'
  if (styleId === 'paper') return 'paper'
  return 'paper'
}

type Store = { getItem(key: string): string | null; setItem(key: string, value: string): void }

export function readTheme(store: Store) {
  try {
    return parseTheme(store.getItem(THEME_KEY))
  } catch {
    return 'default' as const
  }
}

export function writeTheme(store: Store, theme: ThemeId) {
  store.setItem(THEME_KEY, parseTheme(theme))
}
