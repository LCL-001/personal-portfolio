import { Link, Navigate, useParams } from 'react-router-dom'
import { projects } from '../data/projects'
import { translations } from '../data/locale'
import { usePreferences } from '../contexts/usePreferences'

/** Presents the technical context and delivery outcomes for one project. */
function ProjectDetail() {
  const { slug } = useParams()
  const { language } = usePreferences()
  const copy = translations[language]
  const project = projects.find((item) => item.slug === slug)

  if (!project) {
    return <Navigate to="/" replace />
  }

  return (
    <article className="px-6 py-20 sm:py-28">
      <div className="mx-auto max-w-5xl">
        <Link className="text-sm font-semibold text-cyan-300 transition hover:text-[var(--text)]" to="/#projects">
          ← {copy.backToProjects}
        </Link>
        <p className="mt-12 text-sm font-semibold tracking-[0.28em] text-cyan-300">{copy.projectDetails}</p>
        <h1 className="mt-5 text-4xl font-bold tracking-tight text-[var(--text)] sm:text-6xl">{project.title[language]}</h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-[var(--muted)]">{project.description[language]}</p>

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5">
            <p className="text-sm text-[var(--muted)]">{copy.projectRole}</p>
            <p className="mt-2 font-semibold text-[var(--text)]">{project.role[language]}</p>
          </div>
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5">
            <p className="text-sm text-[var(--muted)]">{project.period}</p>
            <a className="mt-2 inline-flex font-semibold text-cyan-300 transition hover:text-[var(--text)]" href={project.href} target="_blank" rel="noreferrer">
              {copy.viewProjectSite} <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>

        <img className="mt-10 aspect-[16/9] w-full rounded-3xl border border-[var(--border)] object-cover" src={project.image} alt={project.imageAlt[language]} />

        <div className="mt-16 grid gap-14 lg:grid-cols-[1.15fr_0.85fr]">
          <section>
            <h2 className="text-2xl font-bold text-[var(--text)]">{copy.projectHighlights}</h2>
            <ol className="mt-6 space-y-5">
              {project.highlights.map((highlight, index) => (
                <li key={highlight[language]} className="flex gap-4 leading-7 text-[var(--muted)]">
                  <span className="mt-0.5 font-semibold text-cyan-300">0{index + 1}</span>
                  <span>{highlight[language]}</span>
                </li>
              ))}
            </ol>
          </section>
          <aside className="space-y-10">
            <div>
              <h2 className="text-2xl font-bold text-[var(--text)]">{copy.projectMetrics}</h2>
              <dl className="mt-6 grid grid-cols-3 gap-3">
                {project.metrics.map((metric) => (
                  <div key={metric.value} className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4">
                    <dt className="text-2xl font-bold text-cyan-300">{metric.value}</dt>
                    <dd className="mt-2 text-xs leading-5 text-[var(--muted)]">{metric.label[language]}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-[var(--text)]">{copy.projectStack}</h2>
              <ul className="mt-6 flex flex-wrap gap-2">
                {project.technologies.map((technology) => (
                  <li key={technology} className="rounded-full border border-cyan-300/25 bg-cyan-300/8 px-3 py-1.5 text-sm text-cyan-200">
                    {technology}
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </article>
  )
}

export default ProjectDetail
