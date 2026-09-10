import { profile } from '../data/profile'

/**
 * 首屏。编辑风的处理方式：眉题 → 发丝线 → 衬线大标题 → 导语 → 数据条。
 * 刻意不用渐变文字、不用光晕色斑、不用圆形头像——这三样是模板指纹。
 */
function Hero() {
  return (
    <section id="home" className="px-6 pt-20 pb-24 sm:pt-28 sm:pb-32">
      <div className="mx-auto max-w-6xl">
        <p className="font-mono text-xs leading-6 tracking-[0.08em] text-muted sm:text-sm">
          {profile.eyebrow}
        </p>

        <div className="mt-8 border-t border-rule-strong pt-10">
          <h1 className="measure font-serif text-5xl font-normal leading-[1.15] tracking-tight text-white sm:text-6xl lg:text-7xl">
            {profile.headline}
          </h1>

          <p className="measure mt-10 text-lg leading-9 text-body">{profile.lede}</p>

          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3">
            <a
              href="#projects"
              className="font-mono text-sm tracking-[0.12em] text-accent transition-opacity hover:opacity-75"
            >
              看三个项目 ↓
            </a>
            <a
              href={`mailto:${profile.email}`}
              className="font-mono text-sm tracking-[0.12em] text-muted transition-colors hover:text-accent"
            >
              {profile.email}
            </a>
          </div>
        </div>

        {/* 数据条：像杂志的 "by the numbers"，让面试官第一眼就抓到可追问的点 */}
        <dl className="mt-20 grid gap-px border-t border-rule sm:grid-cols-3">
          {profile.heroFigures.map((figure) => (
            <div key={figure.label} className="border-t border-rule pt-6 sm:border-t-0 sm:pr-8 sm:pt-8">
              <dt className="font-mono text-3xl tracking-tight text-white sm:text-4xl">
                {figure.value}
                {figure.unit ? (
                  <span className="ml-1 text-sm text-muted">{figure.unit}</span>
                ) : null}
              </dt>
              <dd className="mt-3 text-sm leading-6 text-muted">{figure.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}

export default Hero
