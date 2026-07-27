import { timeline } from '../data/timeline'
import { translations } from '../data/locale'
import { usePreferences } from '../contexts/usePreferences'

/** Displays education and project delivery milestones. */
function Timeline() {
  const { language } = usePreferences()
  const copy = translations[language]

  return (
    <section className="px-6 py-24 sm:py-32" aria-labelledby="timeline-title">
      <div className="mx-auto max-w-6xl">
        <p className="text-sm font-semibold tracking-[0.28em] text-cyan-300">{copy.timelineEyebrow}</p>
        <h2 id="timeline-title" className="mt-5 text-3xl font-bold tracking-tight text-[var(--text)] sm:text-5xl">
          {copy.timelineTitle}
        </h2>
        <ol className="mt-12 space-y-8 border-l border-[var(--border)] pl-7 sm:ml-4">
          {timeline.map((entry) => (
            <li key={entry.period} className="relative">
              <span aria-hidden="true" className="absolute -left-[35px] top-2 h-4 w-4 rounded-full border-4 border-[var(--page-background)] bg-cyan-300" />
              <p className="text-sm font-medium text-cyan-300">{entry.period}</p>
              <h3 className="mt-2 text-lg font-semibold text-[var(--text)]">{entry.title[language]}</h3>
              <p className="mt-2 max-w-2xl leading-7 text-[var(--muted)]">{entry.description[language]}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

export default Timeline
