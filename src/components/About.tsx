import { profile } from '../data/profile'
import { translations } from '../data/locale'
import { skills, type Skill } from '../data/skills'
import { usePreferences } from '../contexts/usePreferences'

const categoryLabels: Record<Skill['category'], Record<'zh' | 'en', string>> = {
  Backend: { zh: '后端开发', en: 'Backend' },
  Data: { zh: '数据与中间件', en: 'Data & middleware' },
  AI: { zh: 'AI 应用', en: 'AI applications' },
  Engineering: { zh: '工程实践', en: 'Engineering' },
}

const skillGroups = skills.reduce<Record<Skill['category'], Skill[]>>(
  (groups, skill) => {
    groups[skill.category].push(skill)
    return groups
  },
  { Backend: [], Data: [], AI: [], Engineering: [] },
)

/** Introduces the portfolio owner and their core working skills. */
function About() {
  const { language } = usePreferences()
  const copy = translations[language]

  return (
    <section id="about" className="border-y border-[var(--border)] bg-[var(--section-background)] px-6 py-24 sm:py-32" aria-labelledby="about-title">
      <div className="mx-auto grid max-w-6xl gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24">
        <div>
          <p className="text-sm font-semibold tracking-[0.28em] text-cyan-300">{copy.aboutEyebrow}</p>
          <h2 id="about-title" className="mt-5 text-3xl font-bold tracking-tight text-[var(--text)] sm:text-5xl">{copy.aboutTitle}</h2>
        </div>
        <div>
          <div className="space-y-5 text-base leading-8 text-[var(--muted)] sm:text-lg">
            {profile.about.map((paragraph) => <p key={paragraph[language]}>{paragraph[language]}</p>)}
          </div>
          <div className="mt-12 space-y-8">
            {Object.entries(skillGroups).map(([category, categorySkills]) => {
              const label = categoryLabels[category as Skill['category']][language]
              return (
                <div key={category}>
                  <h3 className="text-sm font-semibold tracking-[0.16em] text-[var(--text)]">{label}</h3>
                  <ul className="mt-4 flex flex-wrap gap-2" aria-label={label}>
                    {categorySkills.map((skill) => <li key={skill.name} className="rounded-full border border-[var(--border)] bg-[var(--surface)] px-3 py-1.5 text-sm text-[var(--muted-strong)]">{skill.name}</li>)}
                  </ul>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
