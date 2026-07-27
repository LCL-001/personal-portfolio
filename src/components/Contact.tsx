import { useState, type FormEvent } from 'react'
import { profile } from '../data/profile'
import { translations } from '../data/locale'
import { usePreferences } from '../contexts/usePreferences'

type ContactFormData = { name: string; email: string; message: string }

/** Offers direct links and a mail-client-backed contact form. */
function Contact() {
  const { language } = usePreferences()
  const copy = translations[language]
  const [formData, setFormData] = useState<ContactFormData>({ name: '', email: '', message: '' })
  const [status, setStatus] = useState('')

  const updateField = (field: keyof ContactFormData, value: string) => setFormData((currentData) => ({ ...currentData, [field]: value }))

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const subject = encodeURIComponent(`Portfolio message from ${formData.name}`)
    const body = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`)
    setStatus(copy.formStatus)
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`
  }

  return (
    <section id="contact" className="px-6 py-24 sm:py-32" aria-labelledby="contact-title">
      <div className="mx-auto grid max-w-6xl gap-12 rounded-3xl border border-violet-300/25 bg-linear-to-br from-violet-500/12 via-transparent to-cyan-400/10 px-6 py-14 sm:px-12 sm:py-20 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="text-sm font-semibold tracking-[0.28em] text-cyan-300">{copy.contactEyebrow}</p>
          <h2 id="contact-title" className="mt-5 text-3xl font-bold tracking-tight text-[var(--text)] sm:text-5xl">{copy.contactTitle}</h2>
          <p className="mt-5 max-w-xl text-base leading-8 text-[var(--muted)] sm:text-lg">{copy.contactDescription}</p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a className="rounded-full bg-[var(--button-background)] px-5 py-3 text-sm font-semibold text-[var(--button-text)] transition hover:bg-cyan-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-300" href={`mailto:${profile.email}`}>{profile.email}</a>
            {profile.contactLinks.map((link) => (
              <a key={link.label} className="rounded-full border border-[var(--border)] px-5 py-3 text-sm font-medium text-[var(--text)] transition hover:border-violet-300/60 hover:bg-[var(--surface-hover)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-300" href={link.href} target={link.external ? '_blank' : undefined} rel={link.external ? 'noreferrer' : undefined}>
                {link.label}
              </a>
            ))}
          </div>
        </div>
        <form className="grid gap-4 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 sm:p-6" onSubmit={handleSubmit}>
          <label className="grid gap-2 text-sm font-medium text-[var(--text)]">
            {copy.formName}
            <input className="rounded-xl border border-[var(--border)] bg-[var(--input-background)] px-3 py-3 text-[var(--text)] outline-none placeholder:text-[var(--muted)] focus:border-cyan-300" value={formData.name} onChange={(event) => updateField('name', event.target.value)} autoComplete="name" required />
          </label>
          <label className="grid gap-2 text-sm font-medium text-[var(--text)]">
            {copy.formEmail}
            <input className="rounded-xl border border-[var(--border)] bg-[var(--input-background)] px-3 py-3 text-[var(--text)] outline-none placeholder:text-[var(--muted)] focus:border-cyan-300" type="email" value={formData.email} onChange={(event) => updateField('email', event.target.value)} autoComplete="email" required />
          </label>
          <label className="grid gap-2 text-sm font-medium text-[var(--text)]">
            {copy.formMessage}
            <textarea className="min-h-28 resize-y rounded-xl border border-[var(--border)] bg-[var(--input-background)] px-3 py-3 text-[var(--text)] outline-none placeholder:text-[var(--muted)] focus:border-cyan-300" value={formData.message} onChange={(event) => updateField('message', event.target.value)} required />
          </label>
          <button className="mt-2 w-fit rounded-full bg-cyan-300 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-300" type="submit">{copy.formSubmit}</button>
          <p className="text-xs leading-5 text-[var(--muted)]" role="status">{status || copy.formNote}</p>
        </form>
      </div>
    </section>
  )
}

export default Contact
