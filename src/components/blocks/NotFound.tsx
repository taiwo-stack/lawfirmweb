import { useEffect } from 'react'
import { Link, useLocation, useNavigate } from '@tanstack/react-router'
import { ArrowRight } from 'lucide-react'
import { ButtonLink } from '~/components/ui/Button'
import { Container } from '~/components/ui/Container'
import { site, type NavChild } from '~/content/site'

// Pages merged into the single About page. The build also writes redirect stubs for these;
// forwarding here covers the dev server and any URL variant the stubs miss.
const moved: Record<string, string> = {
  '/about/history': 'history',
  '/about/facilities': 'facilities',
  '/about/community': 'community',
}

const suggestions: NavChild[] = [
  { label: 'About the firm', to: '/about/', description: 'Who we are, our history and our office' },
  { label: 'Practice areas', to: '/practice-areas/', description: 'Corporate, finance, energy, disputes and more' },
  { label: 'Our people', to: '/people/', description: 'Partners and associates' },
  { label: 'Insights', to: '/insights/', description: 'News, talks and publications' },
]

export function NotFound() {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const hash = moved[pathname.replace(/\/$/, '')]

  useEffect(() => {
    if (hash) navigate({ to: '/about/', hash, replace: true })
  }, [hash, navigate])

  useEffect(() => {
    document.title = 'Page not found | Zest Partners'
    const robots = document.createElement('meta')
    robots.name = 'robots'
    robots.content = 'noindex'
    document.head.appendChild(robots)
    return () => robots.remove()
  }, [])

  // Blank while forwarding, so the 404 message does not flash.
  if (hash) return <div className="min-h-[60vh]" />

  return (
    <Container className="py-24 sm:py-32">
      <p className="eyebrow">Error 404</p>
      <h1 className="mt-6 max-w-3xl text-5xl leading-tight sm:text-6xl">We can’t find that page.</h1>
      <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
        The link may be out of date, or the page may have moved when we redesigned our website. These are good places to
        start, or contact us and we will point you in the right direction.
      </p>

      <ul className="mt-14 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
        {suggestions.map((s) => (
          <li key={s.label} className="bg-paper">
            <Link to={s.to} className="group flex h-full flex-col p-8 transition-colors hover:bg-paper-deep">
              <span className="flex items-center justify-between gap-4 text-xl font-display">
                {s.label}
                <ArrowRight className="size-4 shrink-0 text-brass transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
              </span>
              <span className="mt-2 text-sm leading-relaxed text-muted">{s.description}</span>
            </Link>
          </li>
        ))}
      </ul>

      <div className="mt-14 flex flex-col gap-6 border-t border-line pt-10 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-muted">
          Need help? Call{' '}
          <a href={`tel:${site.phones[0].replace(/\s/g, '')}`} className="font-semibold text-ink underline underline-offset-4 hover:text-green">
            {site.phones[0]}
          </a>{' '}
          or email{' '}
          <a href={`mailto:${site.emails[0]}`} className="font-semibold text-ink underline underline-offset-4 hover:text-green">
            {site.emails[0]}
          </a>
          .
        </p>
        <div className="flex flex-wrap gap-4">
          <ButtonLink to="/">Back to home</ButtonLink>
          <ButtonLink to="/contact/" variant="ghost">
            Contact us
          </ButtonLink>
        </div>
      </div>
    </Container>
  )
}
