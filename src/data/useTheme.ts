import { createContext, useEffect, useState } from 'react'
import { parseTheme, readTheme, writeTheme, type ThemeId } from './theme'

export const ThemeContext = createContext<{ theme: ThemeId; choose: (theme: ThemeId) => void }>({
  theme: 'default',
  choose: () => undefined,
})

function memory() {
  return {
    getItem: (key: string) => localStorage.getItem(key),
    setItem: (key: string, value: string) => localStorage.setItem(key, value),
  }
}

export function useTheme() {
  const [theme, setTheme] = useState<ThemeId>(() => {
    if (typeof localStorage === 'undefined') return 'default'
    return readTheme(memory())
  })

  useEffect(() => {
    document.documentElement.dataset.theme = theme
  }, [theme])

  function choose(next: ThemeId) {
    const safe = parseTheme(next)
    if (typeof localStorage !== 'undefined') writeTheme(memory(), safe)
    setTheme(safe)
  }

  return [theme, choose] as const
}
