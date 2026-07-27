import { createContext } from 'react'
import type { Language } from '../data/locale'

export type Theme = 'dark' | 'light'

export type PreferencesContextValue = {
  language: Language
  setLanguage: (language: Language) => void
  theme: Theme
  toggleTheme: () => void
}

export const PreferencesContext = createContext<PreferencesContextValue | null>(null)
