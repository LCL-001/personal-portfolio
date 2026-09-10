import { Link } from 'react-router-dom'
import type { Project } from '../types'

/**
 * 项目列表项：一条发丝线、编号、标题、一句定位，
 * 有真实截图的项目先上图——作品集需要有东西可看。
 */
function ProjectCard({ project, index }: { project: Project; index: number }) {
  const headlineMetrics = project.metrics.slice(0, 3)

  return (
    <article className="border-t border-rule pt-8">
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
        <p className="font-mono text-xs tracking-[0.16em] text-accent">
          {String(index + 1).padStart(2, '0')}
        </p>
        <p className="font-mono text-xs tracking-[0.08em] text-muted">
          {project.role} · {project.period}
        </p>
      </div>

      {project.image ? (
        <Link to={`/projects/${project.slug}`} className="mt-6 block">
          <img
            src={project.image}
            alt={project.imageAlt ?? ''}
            loading="lazy"
            decoding="async"
            className="w-full border border-rule transition-opacity hover:opacity-90"
          />
        </Link>
      ) : null}

      <h3 className="mt-6 font-serif text-3xl font-normal tracking-tight text-white sm:text-4xl">
        <Link to={`/projects/${project.slug}`} className="transition-colors hover:text-accent">
          {project.title}
        </Link>
      </h3>

      <p className="measure mt-4 text-base leading-8 text-body">{project.oneLiner}</p>

      <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
        {headlineMetrics.map((metric) => (
          <li key={metric.label} className="font-mono text-sm text-white">
            {metric.value}
            {metric.unit ? <span className="ml-0.5 text-xs text-muted">{metric.unit}</span> : null}
            <span className="ml-2 text-xs text-muted">{metric.label}</span>
          </li>
        ))}
      </ul>

      <p className="mt-5 font-mono text-xs leading-6 text-muted">{project.stack.join(' · ')}</p>

      <Link
        to={`/projects/${project.slug}`}
        className="mt-6 inline-block font-mono text-sm tracking-[0.12em] text-accent transition-opacity hover:opacity-75"
      >
        展开完整工程记录 →
      </Link>
    </article>
  )
}

export default ProjectCard
