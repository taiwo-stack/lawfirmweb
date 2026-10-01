import { Link } from '@tanstack/react-router'
import { cardArrow, cardMuted, cardSurface } from '~/lib/card'
import { ArrowUpRight } from 'lucide-react'
import { Img } from '~/components/ui/Img'
import type { Insight } from '~/content/insights'
import { topics } from '~/content/topics'

export function InsightCard({ item }: { item: Insight }) {
  const inner = (
    <>
      {item.image && (
        <div className="-mx-6 -mt-6 mb-6 aspect-[16/9] overflow-hidden bg-paper-deep">
          <Img
            src={item.image}
            alt=""
            sizes="(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw"
            className="size-full object-cover object-[center_30%] transition duration-700 group-hover:scale-[1.03]"
          />
        </div>
      )}
      <div className="flex items-center justify-between gap-4 text-xs">
        <span className="font-semibold tracking-[0.15em] text-brass uppercase">{item.label}</span>
        <span className={cardMuted}>{item.when}</span>
      </div>
      <h3 className="mt-5 font-display text-xl leading-snug">{item.kind === 'talk' ? `“${item.title}”` : item.title}</h3>
      <p className={`mt-3 line-clamp-3 text-sm leading-relaxed ${cardMuted}`}>{item.detail}</p>
      <div className="mt-auto flex items-end justify-between gap-4 pt-6">
        <ul className="flex flex-wrap gap-1.5">
          {item.topics.slice(0, 2).map((t) => (
            <li key={t} className="rounded-full bg-paper-deep px-2.5 py-1 text-xs text-ink/70 transition-colors group-hover:bg-paper/10 group-hover:text-paper/80 group-focus-visible:bg-paper/10 group-focus-visible:text-paper/80">
              {topics[t]}
            </li>
          ))}
        </ul>
        <ArrowUpRight className={`size-5 shrink-0 ${cardArrow}`} aria-hidden />
      </div>
    </>
  )
  return (
    <Link {...item.href} className={`group flex h-full flex-col overflow-hidden border border-line bg-paper p-6 ${cardSurface}`}>
      {inner}
    </Link>
  )
}
