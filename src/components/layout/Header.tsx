import { Link, useRouterState } from '@tanstack/react-router'
import { ChevronDown, Menu, Phone, Search, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { nav, site, type NavItem } from '~/content/site'
import { groupId, groups, practices } from '~/content/practices'
import { cn } from '~/lib/utils'
import { Container } from '~/components/ui/Container'
import { ButtonLink } from '~/components/ui/Button'
import { SearchDialog } from '~/components/blocks/SearchDialog'
import { Logo } from './Logo'

const panel =
  'invisible absolute top-full z-50 translate-y-2 opacity-0 transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100'

function DesktopItem({ item }: { item: NavItem }) {
  const linkClass = 'inline-flex items-center gap-1 py-6 text-sm font-medium text-ink/75 transition-colors hover:text-ink'
  const active = { className: 'text-ink' }

  if (item.mega) {
    return (
      <li className="group">
        <Link to={item.to} className={linkClass} activeProps={active}>
          {item.label} <ChevronDown className="size-3.5 transition-transform group-hover:rotate-180" aria-hidden />
        </Link>
        <div className={cn(panel, 'inset-x-0 border-y border-line bg-paper shadow-xl shadow-ink/5')}>
          <Container className="grid grid-cols-5 gap-8 py-10">
            {groups.map((g, i) => (
              <div key={g.name}>
                <Link
                  to="/practice-areas"
                  hash={groupId(g.name)}
                  className="block border-b border-line pb-3 font-display text-lg hover:text-green"
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
                          to="/practice-areas/$slug"
                          params={{ slug: p.slug }}
                          className="text-sm text-ink/70 transition-colors hover:text-ink"
                        >
                          {p.title}
                        </Link>
                      </li>
                    ))}
                </ul>
              </div>
            ))}
          </Container>
        </div>
      </li>
    )
  }

  if (item.children) {
    return (
      <li className="group relative">
        <Link to={item.to} className={linkClass} activeProps={active}>
          {item.label} <ChevronDown className="size-3.5 transition-transform group-hover:rotate-180" aria-hidden />
        </Link>
        <div className={cn(panel, '-left-6 w-80 border border-line bg-paper p-3 shadow-xl shadow-ink/5')}>
          <ul>
            {item.children.map((c) => (
              <li key={c.label}>
                <Link to={c.to} search={c.search} className="block rounded px-4 py-3 transition-colors hover:bg-paper-deep">
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
    <li>
      <Link to={item.to} className={linkClass} activeProps={active}>
        {item.label}
      </Link>
    </li>
  )
}

function MobileNav() {
  return (
    <nav aria-label="Mobile" className="flex flex-col">
      {nav.map((item) =>
        item.children || item.mega ? (
          <details key={item.label} className="group border-b border-line">
            <summary className="flex cursor-pointer list-none items-center justify-between py-4 font-display text-2xl">
              {item.label}
              <ChevronDown className="size-5 transition-transform group-open:rotate-180" aria-hidden />
            </summary>
            <ul className="space-y-3 pb-5">
              {item.mega
                ? groups.map((g) => (
                    <li key={g.name}>
                      <p className="mt-2 text-xs font-semibold tracking-[0.15em] text-brass uppercase">{g.name}</p>
                      <ul className="mt-2 space-y-2 border-l border-line pl-4">
                        {practices
                          .filter((p) => p.group === g.name)
                          .map((p) => (
                            <li key={p.slug}>
                              <Link to="/practice-areas/$slug" params={{ slug: p.slug }} className="text-ink/80">
                                {p.title}
                              </Link>
                            </li>
                          ))}
                      </ul>
                    </li>
                  ))
                : item.children!.map((c) => (
                    <li key={c.label}>
                      <Link to={c.to} search={c.search} className="text-ink/80">
                        {c.label}
                      </Link>
                    </li>
                  ))}
            </ul>
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
    // Close hover menus after navigating by moving focus out of them.
    if (document.activeElement instanceof HTMLElement) document.activeElement.blur()
  }, [location])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setSearchOpen((v) => !v)
      }
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
      <div className="hidden bg-ink text-paper/75 md:block">
        <Container className="flex h-9 items-center justify-between text-xs">
          <span>{site.descriptor}</span>
          <div className="flex items-center gap-6">
            <span>Abuja · Lagos · Est. {site.founded}</span>
            <a href={`tel:${site.phones[0].replace(/\s/g, '')}`} className="inline-flex items-center gap-2 hover:text-brass-soft">
              <Phone className="size-3.5" aria-hidden /> {site.phones[0]}
            </a>
          </div>
        </Container>
      </div>
      <Container className="flex items-center justify-between gap-6">
        <Logo className="py-3" />
        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-8">
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
            <ButtonLink to="/contact" className="px-5 py-2.5">
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
        <div id="mobile-nav" className="h-[calc(100dvh-64px)] overflow-y-auto border-t border-line bg-paper lg:hidden">
          <Container className="pt-4 pb-12">
            <MobileNav />
            <ButtonLink to="/contact" className="mt-8 w-full justify-center">
              Book a consultation
            </ButtonLink>
          </Container>
        </div>
      )}

      <SearchDialog open={searchOpen} onClose={() => setSearchOpen(false)} />
    </header>
  )
}
