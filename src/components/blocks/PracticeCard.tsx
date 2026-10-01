import { Link } from '@tanstack/react-router'
import { cardArrow, cardMuted, cardSurface } from '~/lib/card'
import { ArrowUpRight } from 'lucide-react'
import type { Practice } from '~/content/practices'

export function PracticeCard({ practice, index }: { practice: Practice; index?: number }) {
  return (
    <Link
      to="/practice-areas/$slug/"
      params={{ slug: practice.slug }}
      className={`group relative flex h-full flex-col justify-between gap-10 border border-line bg-paper p-6 sm:p-8 ${cardSurface}`}
    >
      <div className="flex items-start justify-between gap-4">
        <span className="font-display text-sm text-brass">{index !== undefined ? String(index + 1).padStart(2, '0') : practice.group}</span>
        <ArrowUpRight
          className={`size-5 ${cardArrow}`}
          aria-hidden
        />
      </div>
      <div>
        <h3 className="text-2xl leading-tight">{practice.title}</h3>
        <p className={`mt-3 text-sm leading-relaxed ${cardMuted}`}>{practice.summary}</p>
      </div>
    </Link>
  )
}
