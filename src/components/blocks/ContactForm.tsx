import { useState, type FormEvent } from 'react'
import { site } from '~/content/site'
import { cn } from '~/lib/utils'

const accessKey = import.meta.env.VITE_WEB3FORMS_KEY as string | undefined

type Status = 'idle' | 'sending' | 'sent' | 'error'

const field =
  'w-full border-0 border-b border-line bg-transparent px-0 py-3 text-base placeholder:text-muted/70 focus:border-ink focus:outline-none'

/**
 * Posts to Web3Forms when VITE_WEB3FORMS_KEY is set at build time.
 * Without a key it falls back to opening the visitor's email client, addressed to every firm address in site.emails.
 */
export function ContactForm() {
  const [status, setStatus] = useState<Status>('idle')

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)
    if (data.get('botcheck')) return

    if (!accessKey) {
      const subject = encodeURIComponent(String(data.get('subject') || 'Enquiry from website'))
      const body = encodeURIComponent(`${data.get('message')}\n\n${data.get('name')}\n${data.get('email')}\n${data.get('phone')}`)
      window.location.href = `mailto:${site.emails.join(',')}?subject=${subject}&body=${body}`
      return
    }

    setStatus('sending')
    data.append('access_key', accessKey)
    data.append('from_name', 'zestpartnersng.com')
    try {
      const res = await fetch('https://api.web3forms.com/submit', { method: 'POST', body: data })
      const json = await res.json()
      setStatus(json.success ? 'sent' : 'error')
      if (json.success) form.reset()
    } catch {
      setStatus('error')
    }
  }

  if (status === 'sent') {
    return (
      <div className="border border-line bg-paper p-8" role="status">
        <h3 className="text-2xl">Thank you. Your message has been received.</h3>
        <p className="mt-3 text-muted">A member of the firm will be in touch.</p>
      </div>
    )
  }

  const label = 'text-xs font-semibold tracking-[0.15em] uppercase'

  return (
    <form onSubmit={onSubmit} className="grid gap-6 sm:grid-cols-2">
      <input type="checkbox" name="botcheck" className="hidden" tabIndex={-1} autoComplete="off" />
      <label className="block">
        <span className={label}>Full name</span>
        <input name="name" required autoComplete="name" className={field} placeholder="Your name" />
      </label>
      <label className="block">
        <span className={label}>Email</span>
        <input name="email" type="email" required autoComplete="email" className={field} placeholder="you@example.com" />
      </label>
      <label className="block">
        <span className={label}>Phone</span>
        <input name="phone" type="tel" autoComplete="tel" className={field} placeholder="Optional" />
      </label>
      <label className="block">
        <span className={label}>Subject</span>
        <input name="subject" className={field} placeholder="What is this about?" />
      </label>
      <label className="block sm:col-span-2">
        <span className={label}>Message</span>
        <textarea name="message" required rows={5} className={cn(field, 'resize-y')} placeholder="Briefly describe your matter" />
      </label>
      <div className="flex flex-col gap-4 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-md text-xs text-muted">
          Please do not send confidential information until we have confirmed we can act for you.
        </p>
        <button
          type="submit"
          disabled={status === 'sending'}
          className="rounded-full bg-ink px-8 py-3.5 text-sm font-semibold text-paper transition-colors hover:bg-green disabled:opacity-60"
        >
          {status === 'sending' ? 'Sending…' : 'Send message'}
        </button>
      </div>
      {status === 'error' && (
        <p className="text-sm text-oxblood sm:col-span-2" role="alert">
          Something went wrong. Please email {site.emails[0]} or call {site.phones[0]}.
        </p>
      )}
    </form>
  )
}
