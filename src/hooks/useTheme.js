import { useState, useEffect } from 'react'

const STORAGE_KEY = 'leadtracker_theme'

export function useTheme() {
  const [isDark, setIsDark] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) return stored === 'dark'
    } catch { /* ignore */ }
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  })

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    try {
      localStorage.setItem(STORAGE_KEY, isDark ? 'dark' : 'light')
    } catch { /* ignore */ }
  }, [isDark])

  function toggleTheme() {
    setIsDark(prev => !prev)
  }

  return { isDark, toggleTheme }
}
