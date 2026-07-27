import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { translations } from '../data/locale'
import { usePreferences } from '../contexts/usePreferences'

/** Provides accessible in-page navigation for desktop and mobile screens. */
function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { language, setLanguage, theme, toggleTheme } = usePreferences()
  const location = useLocation()
  const copy = translations[language]
  const sectionHref = (sectionId: string) => (location.pathname === '/' ? `#${sectionId}` : `/#${sectionId}`)
  const navigationItems = [
    { label: copy.nav.home, href: sectionHref('home') },
    { label: copy.nav.about, href: sectionHref('about') },
    { label: copy.nav.projects, href: sectionHref('projects') },
    { label: copy.nav.contact, href: sectionHref('contact') },
  ]

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsMenuOpen(false)
    }
    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [])

  const closeMenu = () => setIsMenuOpen(false)

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[color:var(--header-background)] backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4">
        <a className="text-sm font-semibold tracking-[0.18em] text-[var(--text)] transition hover:text-cyan-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-300" href={sectionHref('home')} onClick={closeMenu}>
          PORTFOLIO
        </a>
        <nav className="hidden items-center gap-7 md:flex" aria-label="Primary navigation">
          {navigationItems.map((item) => (
            <a key={item.href} className="text-sm text-[var(--muted)] transition hover:text-[var(--text)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-300" href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <button className="grid h-9 min-w-9 place-items-center rounded-full border border-[var(--border)] px-2 text-xs font-semibold text-[var(--text)] transition hover:border-cyan-300/60 hover:text-cyan-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-300" type="button" aria-label={language === 'zh' ? 'Switch language to English' : '切换语言为中文'} onClick={() => setLanguage(language === 'zh' ? 'en' : 'zh')}>
            {language === 'zh' ? 'EN' : '中文'}
          </button>
          <button className="grid h-9 w-9 place-items-center rounded-full border border-[var(--border)] text-sm text-[var(--text)] transition hover:border-cyan-300/60 hover:text-cyan-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-300" type="button" aria-label={theme === 'dark' ? copy.switchToLight : copy.switchToDark} onClick={toggleTheme}>
            <span aria-hidden="true">{theme === 'dark' ? '☀' : '☾'}</span>
          </button>
          <button className="grid h-9 w-9 place-items-center rounded-full border border-[var(--border)] text-[var(--text)] transition hover:border-cyan-300/60 hover:text-cyan-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-300 md:hidden" type="button" aria-label={isMenuOpen ? copy.closeMenu : copy.openMenu} aria-controls="mobile-navigation" aria-expanded={isMenuOpen} onClick={() => setIsMenuOpen((previousValue) => !previousValue)}>
            <span aria-hidden="true" className="text-xl leading-none">{isMenuOpen ? '×' : '☰'}</span>
          </button>
        </div>
      </div>
      <nav id="mobile-navigation" className={`${isMenuOpen ? 'grid' : 'hidden'} border-t border-[var(--border)] px-6 py-4 md:hidden`} aria-label="Mobile navigation">
        {navigationItems.map((item) => (
          <a key={item.href} className="rounded-lg px-3 py-3 text-sm text-[var(--muted)] transition hover:bg-[var(--surface-hover)] hover:text-[var(--text)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300" href={item.href} onClick={closeMenu}>
            {item.label}
          </a>
        ))}
      </nav>
    </header>
  )
}

export default Header
