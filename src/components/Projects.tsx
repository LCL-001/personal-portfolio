import { Link } from 'react-router-dom'
import { projects } from '../data/projects'
import { translations } from '../data/locale'
import { usePreferences } from '../contexts/usePreferences'

/** Displays responsive project cards from the centralized project data. */
function Projects() {
  const { language } = usePreferences()
  const copy = translations[language]
  const description = language === 'zh' ? '围绕服务稳定性、数据性能与 AI 应用的实践项目。' : 'Projects focused on reliable services, data performance, and AI applications.'

  return (
    <section id="projects" className="px-6 py-24 sm:py-32" aria-labelledby="projects-title">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold tracking-[0.28em] text-cyan-300">{copy.projectsEyebrow}</p>
          <h2 id="projects-title" className="mt-5 text-3xl font-bold tracking-tight text-[var(--text)] sm:text-5xl">{copy.projectsTitle}</h2>
          <p className="mt-5 text-base leading-8 text-[var(--muted)] sm:text-lg">{description}</p>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {projects.map((project) => (
            <article key={project.slug} className="group overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] transition duration-300 hover:-translate-y-1 hover:border-violet-300/50 hover:bg-[var(--surface-hover)]">
              <div className="aspect-[16/10] overflow-hidden bg-[var(--surface-hover)]">
                <img className="h-full w-full object-cover transition duration-500 motion-reduce:transition-none group-hover:scale-105" src={project.image} alt={project.imageAlt[language]} loading="lazy" decoding="async" />
              </div>
              <div className="p-6">
                <p className="text-sm text-cyan-300">{project.period}</p>
                <h3 className="mt-2 text-xl font-semibold text-[var(--text)]">{project.title[language]}</h3>
                <p className="mt-3 text-sm leading-7 text-[var(--muted)]">{project.description[language]}</p>
                <ul className="mt-6 flex flex-wrap gap-2" aria-label={`${project.title[language]} ${copy.projectStack}`}>
                  {project.technologies.map((technology) => <li key={technology} className="rounded-full border border-cyan-300/20 bg-cyan-300/7 px-3 py-1 text-xs font-medium text-cyan-200">{technology}</li>)}
                </ul>
                <Link className="mt-6 inline-flex text-sm font-semibold text-cyan-300 transition hover:text-[var(--text)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-300" to={`/projects/${project.slug}`}>
                  {copy.viewProject} <span aria-hidden="true" className="ml-1">→</span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects
