import { Link, useRouterState } from '@tanstack/react-router'
import { Menu, Phone, X } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useState } from 'react'
import { nav, site } from '~/content/site'
import { cn } from '~/lib/utils'
import { Container } from '~/components/ui/Container'
import { ButtonLink } from '~/components/ui/Button'
import { Logo } from './Logo'

export function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = useRouterState({ select: (s) => s.location.pathname })

  useEffect(() => setOpen(false), [pathname])
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
  }, [open])

  return (
    <header
      className={cn(
        'sticky top-0 z-50 transition-all duration-300',
        scrolled || open ? 'border-b border-line bg-paper/90 backdrop-blur-md' : 'bg-paper',
      )}
    >
      <div className="hidden border-b border-line bg-ink text-paper/80 md:block">
        <Container className="flex h-9 items-center justify-between text-xs">
          <span>Abuja · Lagos · Established {site.founded}</span>
          <a href={`tel:${site.phones[0].replace(/\s/g, '')}`} className="inline-flex items-center gap-2 hover:text-brass-soft">
            <Phone className="size-3.5" aria-hidden /> {site.phones[0]}
          </a>
        </Container>
      </div>
      <Container className="flex h-18 items-center justify-between gap-6 py-3">
        <Logo />
        <nav aria-label="Main" className="hidden items-center gap-8 lg:flex">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="relative text-sm font-medium text-ink/75 transition-colors hover:text-ink"
              activeProps={{ className: 'text-ink after:absolute after:-bottom-1.5 after:left-0 after:h-px after:w-full after:bg-brass' }}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="hidden lg:block">
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
      </Container>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-nav"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'calc(100dvh - 72px)' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden bg-paper lg:hidden"
          >
            <Container className="flex flex-col gap-1 pt-6 pb-10">
              {nav.map((item) => (
                <Link key={item.to} to={item.to} className="border-b border-line py-4 font-display text-3xl">
                  {item.label}
                </Link>
              ))}
              <ButtonLink to="/contact" className="mt-8 justify-center">
                Book a consultation
              </ButtonLink>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
