import type { ReactNode } from 'react'
import { cn } from '~/lib/utils'

/**
 * Continuously scrolls its children right-to-left on one line. The content is rendered twice
 * (the copy is hidden from assistive tech) so the loop is seamless. Pauses on hover/touch/focus;
 * with reduced motion it becomes a plain swipeable row (see .marquee in app.css).
 */
export function Marquee({ children, label, className }: { children: ReactNode; label: string; className?: string }) {
  return (
    <div role="region" aria-label={label} className={cn('marquee overflow-hidden [scrollbar-width:none]', className)}>
      <div className="marquee-track flex w-max">
        <div className="flex shrink-0">{children}</div>
        <div className="marquee-copy flex shrink-0" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  )
}
