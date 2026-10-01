import { useState, type ReactNode } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '~/lib/utils'

/**
 * Long text that shows about five lines on phones with a "Read more" toggle; from `md` up it is
 * shown in full with no toggle. All text is always in the HTML (search engines, screen readers).
 */
export function ExpandText({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false)
  return (
    <div>
      <div className={cn('relative md:max-h-none md:overflow-visible', !open && 'max-h-[9.5rem] overflow-hidden')}>
        {children}
        {!open && (
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-paper to-transparent md:hidden" aria-hidden />
        )}
      </div>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="mt-2 inline-flex items-center gap-1.5 py-2 text-sm font-semibold text-green md:hidden"
      >
        {open ? 'Show less' : 'Continue reading'}
        <ChevronDown className={cn('size-4 transition-transform', open && 'rotate-180')} aria-hidden />
      </button>
    </div>
  )
}
