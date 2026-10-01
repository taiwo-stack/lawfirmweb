import { Link } from '@tanstack/react-router'
import type { Insight } from '~/content/insights'
import { topics } from '~/content/topics'

/** Talks grouped by year. Each entry has an id so other pages can link straight to it. */
export function TalkTimeline({ items, showSpeaker = false }: { items: Insight[]; showSpeaker?: boolean }) {
  const byYear = new Map<string, Insight[]>()
  for (const t of items) byYear.set(t.year, [...(byYear.get(t.year) ?? []), t])
  return (
    <div className="space-y-12">
      {[...byYear].map(([year, list]) => (
        <section key={year} aria-labelledby={`y${year}`} className="grid gap-4 sm:grid-cols-[6rem_1fr]">
          <h3 id={`y${year}`} className="font-display text-3xl text-brass">
            {year}
          </h3>
          <ol className="space-y-6 border-l border-line pl-6">
            {list.map((t) => (
              <li key={t.id} id={t.id} className="relative">
                <span className="absolute top-2.5 -left-[1.6rem] size-2 rounded-full bg-brass" aria-hidden />
                <p className="font-semibold leading-snug">“{t.title}”</p>
                <p className="mt-1 text-sm text-muted">
                  {t.detail} · {t.when}
                </p>
                <p className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted">
                  {showSpeaker && t.authorSlug && (
                    <Link to="/people/$slug/" params={{ slug: t.authorSlug }} className="font-semibold text-ink hover:text-green">
                      {t.author}
                    </Link>
                  )}
                  {t.topics.map((x) => (
                    <span key={x}>{topics[x]}</span>
                  ))}
                </p>
              </li>
            ))}
          </ol>
        </section>
      ))}
    </div>
  )
}

/** Published works as citations, grouped by type (Book, Article). */
export function PublicationList({ items }: { items: Insight[] }) {
  const groups = ['Book', 'Article'].map((label) => ({ label, list: items.filter((i) => i.label === label) })).filter((g) => g.list.length)
  return (
    <div className="space-y-12">
      {groups.map((g) => (
        <section key={g.label} aria-labelledby={`pub-${g.label}`}>
          <h3 id={`pub-${g.label}`} className="font-sans text-xs font-semibold tracking-[0.2em] text-brass uppercase">
            {g.label === 'Book' ? 'Books' : 'Journal articles & chapters'}
          </h3>
          <ul className="mt-6 space-y-6">
            {g.list.map((b) => (
              <li key={b.id} id={b.id} className="border-l-2 border-brass pl-6">
                <p className="font-display text-2xl leading-snug italic">{b.title}</p>
                <p className="mt-2 text-sm text-muted">{b.detail}</p>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  )
}
