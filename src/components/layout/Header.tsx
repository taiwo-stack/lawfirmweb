import { Link, useRouterState } from '@tanstack/react-router'
import { ArrowRight, ChevronDown, Menu, Phone, Search, X } from 'lucide-react'
import { lazy, Suspense, useEffect, useState } from 'react'
import { nav, site, type NavItem } from '~/content/site'
import { groupId, groups, practices } from '~/content/practices'
import { cn } from '~/lib/utils'
import { Container } from '~/components/ui/Container'
import { ButtonLink } from '~/components/ui/Button'
import { Logo } from './Logo'

// Dropdown panels open on hover or keyboard focus. The ::before strip bridges the gap
// between the menu link and the panel so the pointer can travel without the menu closing.
// Loaded on first open so its content index (insights, people) stays out of the main bundle.
const SearchDialog = lazy(() => import('~/components/blocks/SearchDialog').then((m) => ({ default: m.SearchDialog })))

const panel =
  "invisible absolute top-full z-50 translate-y-1 opacity-0 transition-[opacity,transform,visibility] duration-200 before:absolute before:inset-x-0 before:-top-3 before:h-3 before:content-[''] group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100"

const linkClass =
  'relative inline-flex h-full items-center gap-1 text-sm font-medium text-ink/70 transition-colors hover:text-ink after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 after:scale-x-0 after:bg-brass after:transition-transform'
const activeLink = { className: 'text-ink after:scale-x-100' }

function Chevron() {
  return <ChevronDown className="size-3.5 transition-transform group-hover:rotate-180 group-focus-within:rotate-180" aria-hidden />
}

function DesktopItem({ item }: { item: NavItem }) {
  if (item.mega) {
    return (
      <li className="group flex h-full">
        <Link to={item.to} className={linkClass} activeProps={activeLink} aria-haspopup="true">
          {item.label} <Chevron />
        </Link>
        <div className={cn(panel, 'inset-x-0 border-y border-line bg-paper shadow-xl shadow-ink/5')}>
          <Container className="grid grid-cols-5 gap-8 pt-10 pb-8">
            {groups.map((g, i) => (
              <div key={g.name}>
                <Link
                  to="/practice-areas/"
                  hash={groupId(g.name)}
                  className="block border-b border-line pb-3 font-display text-lg leading-tight hover:text-green"
                >
                  <span className="mr-2 text-xs text-brass">{String(i + 1).padStart(2, '0')}</span>
                  {g.name}
                </Link>
                <ul className="mt-4 space-y-2.5">
                  {practices
                    .filter((p) => p.group === g.name)
                    .map((p) => (
                      <li key={p.slug}>
                        <Link
                          to="/practice-areas/$slug/"
                          params={{ slug: p.slug }}
                          className="text-sm text-ink/70 transition-colors hover:text-ink"
                          activeProps={{ className: '!text-ink font-semibold' }}
                        >
                          {p.title}
                        </Link>
                      </li>
                    ))}
                </ul>
              </div>
            ))}
          </Container>
          <div className="border-t border-line bg-paper-deep">
            <Container className="flex items-center justify-between py-4 text-sm">
              <Link to="/practice-areas/" className="inline-flex items-center gap-2 font-semibold hover:text-green">
                View all {practices.length} practice areas <ArrowRight className="size-4" aria-hidden />
              </Link>
              <span className="text-muted">
                Not sure where your matter fits?{' '}
                <Link to="/contact/" className="font-semibold text-ink underline underline-offset-4 hover:text-green">
                  Ask us
                </Link>
              </span>
            </Container>
          </div>
        </div>
      </li>
    )
  }

  if (item.children) {
    return (
      <li className="group relative flex h-full">
        <Link to={item.to} className={linkClass} activeProps={activeLink} aria-haspopup="true">
          {item.label} <Chevron />
        </Link>
        <div className={cn(panel, '-left-6 w-80 border border-line bg-paper p-3 shadow-xl shadow-ink/5')}>
          <ul>
            {item.children.map((c) => (
              <li key={c.label}>
                <Link
                  to={c.to}
                  search={c.search}
                  activeOptions={{ exact: true, includeSearch: !!c.search }}
                  className="block rounded px-4 py-3 transition-colors hover:bg-paper-deep"
                  activeProps={{ className: 'bg-paper-deep' }}
                >
                  <span className="block text-sm font-semibold">{c.label}</span>
                  <span className="mt-0.5 block text-xs text-muted">{c.description}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </li>
    )
  }

  return (
    <li className="flex h-full">
      <Link to={item.to} className={linkClass} activeProps={activeLink}>
        {item.label}
      </Link>
    </li>
  )
}

function MobileNav() {
  const sub = 'block py-1.5 text-ink/80'
  const overview = 'mt-1 inline-flex items-center gap-2 py-1.5 text-sm font-semibold text-green'
  return (
    <nav aria-label="Mobile" className="flex flex-col">
      {nav.map((item) =>
        item.children || item.mega ? (
          <details key={item.label} className="group border-b border-line">
            <summary className="flex cursor-pointer list-none items-center justify-between py-4 font-display text-2xl">
              {item.label}
              <ChevronDown className="size-5 transition-transform group-open:rotate-180" aria-hidden />
            </summary>
            <div className="pb-5">
              {item.mega ? (
                <>
                  {groups.map((g) => (
                    <div key={g.name} className="mt-3">
                      <Link to="/practice-areas/" hash={groupId(g.name)} className="text-xs font-semibold tracking-[0.15em] text-brass uppercase">
                        {g.name}
                      </Link>
                      <ul className="mt-1 border-l border-line pl-4">
                        {practices
                          .filter((p) => p.group === g.name)
                          .map((p) => (
                            <li key={p.slug}>
                              <Link to="/practice-areas/$slug/" params={{ slug: p.slug }} className={sub}>
                                {p.title}
                              </Link>
                            </li>
                          ))}
                      </ul>
                    </div>
                  ))}
                  <Link to="/practice-areas/" className={cn(overview, 'mt-4')}>
                    All practice areas <ArrowRight className="size-4" aria-hidden />
                  </Link>
                </>
              ) : (
                <ul>
                  {item.children!.map((c) => (
                    <li key={c.label}>
                      <Link to={c.to} search={c.search} className={sub}>
                        {c.label}
                      </Link>
                    </li>
                  ))}
                  {item.to === '/insights/' && (
                    <li>
                      <Link to="/insights/" className={overview}>
                        All insights <ArrowRight className="size-4" aria-hidden />
                      </Link>
                    </li>
                  )}
                </ul>
              )}
            </div>
          </details>
        ) : (
          <Link key={item.label} to={item.to} className="border-b border-line py-4 font-display text-2xl">
            {item.label}
          </Link>
        ),
      )}
    </nav>
  )
}

export function Header() {
  const [open, setOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useRouterState({ select: (s) => s.location.href })

  useEffect(() => {
    setOpen(false)
    setSearchOpen(false)
    // Close hover/focus menus after navigating by moving focus out of them.
    if (document.activeElement instanceof HTMLElement) document.activeElement.blur()
  }, [location])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setSearchOpen((v) => !v)
      }
      if (e.key === 'Escape' && document.activeElement instanceof HTMLElement) document.activeElement.blur()
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('keydown', onKey)
    }
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
  }, [open])

  return (
    <header
      className={cn(
        'sticky top-0 z-50 transition-colors duration-300',
        scrolled || open ? 'border-b border-line bg-paper/95 backdrop-blur-md' : 'bg-paper',
      )}
    >
      <div className="hidden h-9 bg-ink text-paper/75 md:block">
        <Container className="flex h-full items-center justify-between text-xs">
          <span>{site.descriptor}</span>
          <div className="flex items-center gap-6">
            <span>Abuja · Lagos · Est. {site.founded}</span>
            <a href={`tel:${site.phones[0].replace(/\s/g, '')}`} className="inline-flex items-center gap-2 hover:text-brass-soft">
              <Phone className="size-3.5" aria-hidden /> {site.phones[0]}
            </a>
          </div>
        </Container>
      </div>
      <Container className="flex h-16 items-center justify-between gap-6 sm:h-18">
        <Logo />
        <nav aria-label="Main" className="hidden h-full lg:block">
          <ul className="flex h-full items-stretch gap-8">
            {nav.map((item) => (
              <DesktopItem key={item.label} item={item} />
            ))}
          </ul>
        </nav>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setSearchOpen(true)}
            className="inline-flex size-11 items-center justify-center rounded-full text-ink/70 transition-colors hover:bg-paper-deep hover:text-ink lg:w-auto lg:gap-2 lg:border lg:border-line lg:px-4"
            aria-label="Search the site"
          >
            <Search className="size-4" aria-hidden />
            <span className="hidden text-xs text-muted lg:inline">Search</span>
            <kbd className="hidden rounded border border-line px-1.5 text-[10px] text-muted lg:inline">Ctrl K</kbd>
          </button>
          <div className="hidden xl:block">
            <ButtonLink to="/contact/" className="px-5 py-2.5">
              Book a consultation
            </ButtonLink>
          </div>
          <button
            type="button"
            className="-mr-2 inline-flex size-11 items-center justify-center rounded-full lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>
      </Container>

      {open && (
        <div id="mobile-nav" className="h-[calc(100dvh-4rem)] overflow-y-auto border-t border-line bg-paper sm:h-[calc(100dvh-4.5rem)] lg:hidden">
          <Container className="pt-4 pb-12">
            <MobileNav />
            <ButtonLink to="/contact/" className="mt-8 w-full justify-center">
              Book a consultation
            </ButtonLink>
          </Container>
        </div>
      )}

      {searchOpen && (
        <Suspense fallback={null}>
          <SearchDialog open onClose={() => setSearchOpen(false)} />
        </Suspense>
      )}
    </header>
  )
}
