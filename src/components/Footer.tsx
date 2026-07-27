import { profile } from '../data/profile'
import { translations } from '../data/locale'
import { usePreferences } from '../contexts/usePreferences'

/** Ends the page with a compact attribution and return-to-top action. */
function Footer() {
  const { language } = usePreferences()
  const copy = translations[language]

  return (
    <footer className="border-t border-[var(--border)] px-6 py-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 text-sm text-[var(--muted)] sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} {profile.name}. {copy.footer}</p>
        <a className="w-fit text-[var(--muted-strong)] transition hover:text-cyan-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-300" href="#home">{copy.backToTop}</a>
      </div>
    </footer>
  )
}

export default Footer
