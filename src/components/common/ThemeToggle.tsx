'use client'

import { useEffect, useState } from 'react'
import { Moon, Sun } from 'lucide-react'

type ThemeMode = 'dark' | 'light'

const THEME_KEY = 'limac-theme'

const applyTheme = (theme: ThemeMode) => {
  const html = document.documentElement
  if (theme === 'light') {
    html.classList.add('light')
  } else {
    html.classList.remove('light')
  }
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState<ThemeMode>('light')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem(THEME_KEY) as ThemeMode | null
    const initialTheme: ThemeMode = saved === 'dark' ? 'dark' : 'light'
    setTheme(initialTheme)
    applyTheme(initialTheme)
    setMounted(true)
  }, [])

  const toggleTheme = () => {
    const nextTheme: ThemeMode = theme === 'dark' ? 'light' : 'dark'
    setTheme(nextTheme)
    localStorage.setItem(THEME_KEY, nextTheme)
    applyTheme(nextTheme)
  }

  if (!mounted) {
    return (
      <button
        aria-label="Toggle theme"
        className="p-2 rounded-lg border border-gray-700 text-limac-muted"
      >
        <Moon size={16} />
      </button>
    )
  }

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle color theme"
      title={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
      className="p-2 rounded-lg border border-gray-700 text-limac-muted hover:text-limac-green hover:border-limac-green/50 hover:bg-white/5 transition-all duration-200"
    >
      {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
    </button>
  )
}
