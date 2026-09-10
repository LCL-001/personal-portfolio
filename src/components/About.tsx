import SectionHeading from './SectionHeading'
import { profile } from '../data/profile'
import { skillGroups } from '../data/skills'

/** 关于：左侧正文、右侧技能，非对称栅格——编辑风不做左右均分。 */
function About() {
  return (
    <section id="about" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          index="02"
          title="关于"
          lede="一段自我描述，和一份只包含真实用过的技术清单。"
        />

        <div className="mt-14 grid gap-14 lg:grid-cols-[minmax(0,1fr)_17rem] lg:gap-20">
          <div className="space-y-6">
            {profile.about.map((paragraph) => (
              <p key={paragraph} className="measure text-base leading-9 text-body">
                {paragraph}
              </p>
            ))}
          </div>

          <dl className="space-y-8">
            {skillGroups.map((group) => (
              <div key={group.category}>
                <dt className="font-mono text-xs tracking-[0.16em] text-accent">{group.category}</dt>
                <dd className="mt-3 text-sm leading-7 text-muted">{group.items.join(' · ')}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}

export default About
