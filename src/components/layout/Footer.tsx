import { Link } from '@tanstack/react-router'
import { Email } from '~/components/ui/Email'
import { MessageCircle } from 'lucide-react'
import { groupId, groups } from '~/content/practices'
import { firmTabs, insightTabs, site } from '~/content/site'
import { Container } from '~/components/ui/Container'
import { Logo } from './Logo'

const heading = 'font-sans text-xs font-semibold tracking-[0.2em] text-brass uppercase'

export function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="bg-ink text-paper/70">
      <Container className="grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Logo tone="dark" />
          <p className="mt-6 text-xs tracking-[0.15em] text-paper/50 uppercase">{site.descriptor}</p>
          <p className="mt-4 max-w-sm text-sm leading-relaxed">
            A full-service corporate practice and litigation firm established in Nigeria in {site.founded}, with offices in
            Abuja and Lagos.
          </p>
          {site.whatsapp && (
            <a
              href={site.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-full border border-paper/20 px-4 py-2 text-sm hover:border-paper hover:text-paper"
            >
              <MessageCircle className="size-4" aria-hidden /> WhatsApp
            </a>
          )}
        </div>
        <div className="lg:col-span-2">
          <h2 className={heading}>The Firm</h2>
          <ul className="mt-3 text-sm sm:mt-5 sm:space-y-3">
            {firmTabs.map((n) => (
              <li key={n.label}>
                <Link to={n.to} className="block py-2.5 hover:text-paper sm:inline sm:py-0">
                  {n.label}
                </Link>
              </li>
            ))}
            <li>
              <Link to="/people/" className="block py-2.5 hover:text-paper sm:inline sm:py-0">
                Our people
              </Link>
            </li>
          </ul>
        </div>
        <div className="lg:col-span-2">
          <h2 className={heading}>Expertise</h2>
          <ul className="mt-3 text-sm sm:mt-5 sm:space-y-3">
            {groups.map((g) => (
              <li key={g.name}>
                <Link to="/practice-areas/" hash={groupId(g.name)} className="block py-2.5 hover:text-paper sm:inline sm:py-0">
                  {g.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="lg:col-span-2">
          <h2 className={heading}>Insights</h2>
          <ul className="mt-3 text-sm sm:mt-5 sm:space-y-3">
            {insightTabs.slice(1).map((n) => (
              <li key={n.label}>
                <Link to={n.to} search={n.search} className="block py-2.5 hover:text-paper sm:inline sm:py-0">
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <address className="not-italic lg:col-span-2">
          <h2 className={heading}>Abuja office</h2>
          <p className="mt-5 text-sm leading-relaxed">
            {site.address.lines.map((l) => (
              <span key={l} className="block">
                {l}
              </span>
            ))}
          </p>
          <p className="mt-4 space-y-1 text-sm">
            {site.phones.map((p) => (
              <a key={p} href={`tel:${p.replace(/\s/g, '')}`} className="block py-2.5 hover:text-paper sm:py-1">
                {p}
              </a>
            ))}
            {site.emails.map((e) => (
              <a key={e} href={`mailto:${e}`} className="block py-2.5 hover:text-paper sm:py-1">
                <Email value={e} />
              </a>
            ))}
          </p>
          <Link to="/contact/" className="mt-3 inline-block py-2.5 text-sm font-semibold text-paper underline underline-offset-4 hover:text-brass-soft">
            Contact us
          </Link>
        </address>
      </Container>
      <div className="border-t border-paper/10">
        <Container className="flex flex-col gap-2 pt-6 pb-24 text-xs sm:flex-row sm:justify-between sm:pb-6">
          <p>© {year} Zest Partners. All rights reserved.</p>
          <p className="flex gap-6">
            <Link to="/privacy/" className="block py-2.5 hover:text-paper sm:inline sm:py-0">
              Privacy notice
            </Link>
            <span>Nothing on this website constitutes legal advice.</span>
          </p>
        </Container>
      </div>
    </footer>
  )
}
