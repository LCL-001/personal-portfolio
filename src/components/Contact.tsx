import SectionHeading from './SectionHeading'
import { profile } from '../data/profile'

/**
 * 联系。刻意去掉原来的 mailto 表单：它依赖本地邮件客户端，
 * 在浏览器里体验不稳定，而且对"面试官想聊聊"这个场景没有帮助——
 * 直接给邮箱和 GitHub 更快，也少一整块会出错的代码。
 */
function Contact() {
  return (
    <section id="contact" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          index="03"
          title="联系"
          lede="如果上面的项目里有你想追问的地方，欢迎直接邮件或 GitHub 上找我。"
        />

        <div className="mt-14 grid gap-px sm:grid-cols-2">
          <a
            href={`mailto:${profile.email}`}
            className="group border-t border-rule pt-6 sm:pr-10"
          >
            <p className="font-mono text-xs tracking-[0.16em] text-muted">邮箱</p>
            <p className="mt-3 font-serif text-2xl text-white transition-colors group-hover:text-accent sm:text-3xl">
              {profile.email}
            </p>
          </a>

          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            className="group border-t border-rule pt-6 sm:pl-10"
          >
            <p className="font-mono text-xs tracking-[0.16em] text-muted">代码</p>
            <p className="mt-3 font-serif text-2xl text-white transition-colors group-hover:text-accent sm:text-3xl">
              github.com/LCL-001
            </p>
          </a>
        </div>

        <p className="measure mt-10 text-sm leading-7 text-muted">{profile.contactNote}</p>
      </div>
    </section>
  )
}

export default Contact
