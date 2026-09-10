import { Link, useParams } from 'react-router-dom'
import ArchitectureFlow from '../components/ArchitectureFlow'
import DecisionBlock from '../components/DecisionBlock'
import MetricGrid from '../components/MetricGrid'
import { projects } from '../data/projects'

/** 项目长文页：一条可追溯的工程记录，按"读完能开始追问"的顺序组织。 */
function ProjectPage() {
  const { slug } = useParams<{ slug: string }>()
  const project = projects.find((item) => item.slug === slug)

  if (!project) {
    return (
      <div className="mx-auto max-w-6xl px-6 py-32">
        <p className="font-mono text-xs tracking-[0.16em] text-accent">404</p>
        <h1 className="mt-4 font-serif text-3xl text-white">没有这个项目</h1>
        <Link
          to="/#projects"
          className="mt-8 inline-block font-mono text-sm text-accent transition-opacity hover:opacity-75"
        >
          ← 回到项目列表
        </Link>
      </div>
    )
  }

  return (
    <article className="px-6 pt-16 pb-8">
      <div className="mx-auto max-w-6xl">
        <Link
          to="/#projects"
          className="font-mono text-xs tracking-[0.16em] text-muted transition-colors hover:text-accent"
        >
          ← 项目列表
        </Link>

        <header className="mt-10 border-t border-rule-strong pt-10">
          <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
            <p className="font-mono text-xs tracking-[0.16em] text-accent">{project.role}</p>
            <p className="font-mono text-xs tracking-[0.08em] text-muted">{project.period}</p>
          </div>

          <h1 className="mt-6 font-serif text-4xl leading-tight tracking-tight text-white sm:text-5xl">
            {project.title}
          </h1>
          <p className="measure mt-6 text-lg leading-9 text-body">{project.oneLiner}</p>

          <ul className="mt-8 flex flex-wrap gap-x-8 gap-y-3">
            {project.links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="font-mono text-sm text-accent transition-opacity hover:opacity-75"
                >
                  {link.label} →
                </a>
                {link.note ? <p className="mt-1 text-xs text-muted">{link.note}</p> : null}
              </li>
            ))}
          </ul>

          <dl className="mt-10 flex flex-wrap gap-x-10 gap-y-4">
            {project.scale.map((item) => (
              <div key={item.label}>
                <dt className="font-mono text-xs tracking-[0.12em] text-muted">{item.label}</dt>
                <dd className="mt-1 font-mono text-sm text-white">{item.value}</dd>
              </div>
            ))}
          </dl>

          <p className="mt-8 font-mono text-xs leading-6 text-muted">{project.stack.join(' · ')}</p>
        </header>

        <section className="mt-24">
          <h2 className="font-serif text-2xl text-white">性能指标与出处</h2>
          <p className="measure mt-3 text-sm leading-7 text-muted">
            每个数字都标了它的原始来源和测量方法。如果你要问"这是怎么测出来的"，答案在这一行里。
          </p>
          <div className="mt-8">
            <MetricGrid metrics={project.metrics} />
          </div>
        </section>

        <section className="mt-24">
          <h2 className="font-serif text-2xl text-white">架构分层</h2>
          <p className="measure mt-3 text-sm leading-7 text-muted">
            按请求经过的顺序排列，而不是按目录结构。
          </p>
          <div className="mt-8">
            <ArchitectureFlow layers={project.architecture} />
          </div>
        </section>

        <section className="mt-24">
          <h2 className="font-serif text-2xl text-white">关键技术决策</h2>
          <p className="measure mt-3 text-sm leading-7 text-muted">
            每条包含被否掉的方案和这个方案的代价。局限是我主动写出来的，不是等被问出来的。
          </p>
          <div className="mt-10 space-y-12">
            {project.decisions.map((decision, index) => (
              <DecisionBlock key={decision.approach} decision={decision} index={index} />
            ))}
          </div>
        </section>

        <section className="mt-24">
          <h2 className="font-serif text-2xl text-white">压测暴露的瓶颈</h2>
          <div className="mt-8 space-y-8">
            {project.bottlenecks.map((item) => (
              <div key={item.title} className="border-t border-rule pt-6">
                <h3 className="font-mono text-sm text-white">{item.title}</h3>
                <p className="measure mt-3 text-sm leading-7 text-body">{item.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-24">
          <h2 className="font-serif text-2xl text-white">已知短板</h2>
          <ul className="mt-8 space-y-4">
            {project.limitations.map((item) => (
              <li key={item} className="measure flex gap-4 text-sm leading-7 text-body">
                <span aria-hidden="true" className="font-mono text-accent">
                  —
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <footer className="mt-24 border-t border-rule pt-8">
          <Link
            to="/#contact"
            className="font-mono text-sm text-accent transition-opacity hover:opacity-75"
          >
            想追问这个项目？→ 联系方式
          </Link>
        </footer>
      </div>
    </article>
  )
}

export default ProjectPage
