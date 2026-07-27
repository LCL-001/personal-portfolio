import { useEffect, useState, type ReactNode } from 'react'
import type { Language } from '../data/locale'
import { PreferencesContext, type Theme } from './PreferencesContext'

const getInitialTheme = (): Theme => {
  const savedTheme = localStorage.getItem('portfolio-theme')
  return savedTheme === 'light' || savedTheme === 'dark' ? savedTheme : 'dark'
}

const getInitialLanguage = (): Language => {
  const savedLanguage = localStorage.getItem('portfolio-language')
  if (savedLanguage === 'zh' || savedLanguage === 'en') return savedLanguage
  return navigator.language.startsWith('zh') ? 'zh' : 'en'
}

/** Shares persistent presentation preferences across the portfolio. */
export function PreferencesProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(getInitialTheme)
  const [language, setLanguage] = useState<Language>(getInitialLanguage)

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    localStorage.setItem('portfolio-theme', theme)
  }, [theme])

  useEffect(() => {
    document.documentElement.lang = language === 'zh' ? 'zh-CN' : 'en'
    localStorage.setItem('portfolio-language', language)
  }, [language])

  return (
    <PreferencesContext.Provider
      value={{
        language,
        setLanguage,
        theme,
        toggleTheme: () => setTheme((currentTheme) => (currentTheme === 'dark' ? 'light' : 'dark')),
      }}
    >
      {children}
    </PreferencesContext.Provider>
  )
}
