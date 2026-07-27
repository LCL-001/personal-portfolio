import { profile } from '../data/profile'
import { translations } from '../data/locale'
import { usePreferences } from '../contexts/usePreferences'

type HeroProps = { avatarSrc: string }

/** Renders the introductory section displayed at the top of the portfolio. */
function Hero({ avatarSrc }: HeroProps) {
  const { language } = usePreferences()
  const copy = translations[language]

  return (
    <section id="home" className="relative isolate overflow-hidden px-6 py-24 sm:py-32 lg:py-40">
      <div aria-hidden="true" className="absolute top-1/2 right-[-10rem] -z-10 h-80 w-80 -translate-y-1/2 rounded-full bg-violet-500/20 blur-3xl" />
      <div className="mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-[1fr_auto] lg:gap-20">
        <div className="max-w-3xl text-center lg:text-left">
          <p className="mb-5 text-sm font-semibold tracking-[0.28em] text-cyan-300">{copy.heroEyebrow}</p>
          <h1 className="text-balance text-5xl font-bold tracking-tight text-[var(--text)] sm:text-7xl"><span className="bg-linear-to-r from-cyan-300 via-violet-300 to-fuchsia-400 bg-clip-text text-transparent">{profile.heroTitle[language]}</span></h1>
          <p className="mx-auto mt-7 max-w-xl text-pretty text-base leading-8 text-[var(--muted)] sm:text-lg lg:mx-0">{profile.heroDescription[language]}</p>
          <a className="mt-9 inline-flex rounded-full border border-cyan-300/35 bg-cyan-300/10 px-5 py-3 text-sm font-semibold text-cyan-200 transition hover:border-cyan-200 hover:bg-cyan-300/20 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-300" href="#projects">
            {copy.nav.projects} <span aria-hidden="true" className="ml-2">↓</span>
          </a>
        </div>
        <div className="relative mx-auto w-fit">
          <div aria-hidden="true" className="absolute -inset-5 rounded-full bg-linear-to-br from-cyan-400 via-violet-500 to-fuchsia-500 opacity-45 blur-2xl" />
          <img className="relative h-48 w-48 rounded-full border border-[var(--border)] bg-[var(--surface)] object-cover shadow-2xl shadow-violet-950/50 sm:h-60 sm:w-60" src={avatarSrc} alt={profile.avatarAlt[language]} loading="lazy" decoding="async" />
        </div>
      </div>
    </section>
  )
}

export default Hero
