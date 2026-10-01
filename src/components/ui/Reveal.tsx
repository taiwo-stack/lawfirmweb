import { useEffect, useRef, type ReactNode } from 'react'
import { cn } from '~/lib/utils'

/**
 * Fades content up as it scrolls into view.
 * Progressive enhancement: content is only hidden when <html> has the `js` class
 * (set by an inline script in the root), so the prerendered HTML is always readable.
 */
export function Reveal({ children, delay = 0, className }: { children: ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('is-visible')
          io.disconnect()
        }
      },
      { rootMargin: '0px 0px -60px 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div ref={ref} className={cn('reveal', className)} style={delay ? { transitionDelay: `${delay}s` } : undefined}>
      {children}
    </div>
  )
}
