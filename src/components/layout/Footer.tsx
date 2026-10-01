import { Link } from '@tanstack/react-router'
import { groupId, groups } from '~/content/practices'
import { nav, site } from '~/content/site'
import { Container } from '~/components/ui/Container'
import { Logo } from './Logo'

export function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="bg-ink text-paper/70">
      <Container className="grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Logo tone="dark" />
          <p className="mt-6 max-w-sm text-sm leading-relaxed">
            A full-service corporate practice and litigation firm, serving clients across Nigeria since {site.founded}.
          </p>
        </div>
        <div className="lg:col-span-2">
          <h2 className="font-sans text-xs font-semibold tracking-[0.2em] text-brass uppercase">Firm</h2>
          <ul className="mt-5 space-y-3 text-sm">
            {nav.map((n) => (
              <li key={n.to}>
                <Link to={n.to} className="hover:text-paper">
                  {n.label}
                </Link>
              </li>
            ))}
            <li>
              <Link to="/privacy" className="hover:text-paper">
                Privacy
              </Link>
            </li>
          </ul>
        </div>
        <div className="lg:col-span-3">
          <h2 className="font-sans text-xs font-semibold tracking-[0.2em] text-brass uppercase">Practice groups</h2>
          <ul className="mt-5 space-y-3 text-sm">
            {groups.map((g) => (
              <li key={g.name}>
                <Link to="/practice-areas" hash={groupId(g.name)} className="hover:text-paper">
                  {g.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <address className="not-italic lg:col-span-3">
          <h2 className="font-sans text-xs font-semibold tracking-[0.2em] text-brass uppercase">Abuja office</h2>
          <p className="mt-5 text-sm leading-relaxed">
            {site.address.lines.map((l) => (
              <span key={l} className="block">
                {l}
              </span>
            ))}
          </p>
          <p className="mt-4 space-y-1 text-sm">
            {site.phones.map((p) => (
              <a key={p} href={`tel:${p.replace(/\s/g, '')}`} className="block hover:text-paper">
                {p}
              </a>
            ))}
            <a href={`mailto:${site.emails[0]}`} className="block hover:text-paper">
              {site.emails[0]}
            </a>
          </p>
        </address>
      </Container>
      <div className="border-t border-paper/10">
        <Container className="flex flex-col gap-2 py-6 text-xs sm:flex-row sm:justify-between">
          <p>© {year} Zest Partners. All rights reserved.</p>
          <p>Nothing on this website constitutes legal advice.</p>
        </Container>
      </div>
    </footer>
  )
}
