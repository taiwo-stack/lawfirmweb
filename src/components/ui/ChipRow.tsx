import type { ReactNode } from 'react'
import { cn } from '~/lib/utils'

/**
 * Horizontal row of chips. On phones it is one swipeable row (scroll-snap, faded right edge)
 * instead of a tall stack; from `sm` up it wraps normally. Keyboard-focusable so it can be
 * scrolled without a pointer. Pass `list` when the children are <li> elements.
 */
export function ScrollRow({ label, children, list = false }: { label: string; children: ReactNode; list?: boolean }) {
  const Inner = list ? 'ul' : 'div'
  return (
    <div
      role="region"
      aria-label={label}
      tabIndex={0}
      className={cn(
        // w-0 + min-width keeps the long row from widening its grid/flex parent; it scrolls instead.
        '-mx-4 w-0 min-w-[calc(100%+2rem)] snap-x snap-mandatory overflow-x-auto scroll-px-4 px-4 pb-2',
        '[scrollbar-width:none] [&::-webkit-scrollbar]:hidden [mask-image:linear-gradient(to_right,black_85%,transparent)]',
        // sm and up: normal wrapped chips.
        'sm:mx-0 sm:w-auto sm:min-w-0 sm:overflow-visible sm:px-0 sm:pb-0 sm:[mask-image:none]',
        'focus-visible:outline-2 focus-visible:outline-brass',
      )}
    >
      <Inner className="flex w-max items-center gap-2 *:shrink-0 *:snap-start *:whitespace-nowrap sm:w-auto sm:flex-wrap">{children}</Inner>
    </div>
  )
}

/** Static tags (e.g. "Who we act for") in a ScrollRow. */
export function ChipRow({ items, label, tone = 'light' }: { items: string[]; label: string; tone?: 'light' | 'dark' }) {
  const chip = tone === 'dark' ? 'border-paper/20 text-paper/85' : 'border-line bg-paper-deep text-ink'
  return (
    <ScrollRow label={label} list>
      {items.map((s) => (
        <li key={s} className={cn('rounded-full border px-4 py-2 text-sm', chip)}>
          {s}
        </li>
      ))}
    </ScrollRow>
  )
}
