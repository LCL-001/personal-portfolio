import { profile } from '../data/profile'

/** 页脚：发丝线上方给联系信息，语气克制，不放装饰。 */
function SiteFooter() {
  return (
    <footer className="mt-32 border-t border-rule">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-12 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-serif text-lg text-white">{profile.name}</p>
          <p className="mt-2 text-sm text-muted">{profile.eyebrow}</p>
        </div>

        <div className="flex flex-col gap-2 sm:items-end">
          <a
            href={`mailto:${profile.email}`}
            className="font-mono text-sm text-body transition-colors hover:text-accent"
          >
            {profile.email}
          </a>
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            className="font-mono text-sm text-body transition-colors hover:text-accent"
          >
            github.com/LCL-001
          </a>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-6 pb-10">
        <p className="text-xs text-muted">{profile.contactNote}</p>
      </div>
    </footer>
  )
}

export default SiteFooter
