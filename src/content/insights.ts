import { news } from './news'
import { displayName, people } from './people'
import { inferTopics, type Topic } from './topics'

export type InsightKind = 'news' | 'talk' | 'publication'

export const kindLabels: Record<InsightKind, string> = {
  news: 'Firm news',
  talk: 'Talks & papers',
  publication: 'Publications',
}

export type Insight = {
  id: string
  kind: InsightKind
  /** e.g. "Book", "Article", "Paper" */
  label: string
  title: string
  detail: string
  date: string
  when: string
  topics: Topic[]
  author?: string
  /** Internal link for items that have their own page. */
  href?: { to: '/insights/$slug'; params: { slug: string } } | { to: '/people/$slug'; params: { slug: string }; hash: string }
}

const yearOf = (s: string) => s.match(/(19|20)\d{2}(?!.*(19|20)\d{2})/)?.[0] ?? '0000'

function build(): Insight[] {
  const items: Insight[] = news.map((n) => ({
    id: `news-${n.slug}`,
    kind: 'news',
    label: 'News',
    title: n.title,
    detail: n.summary,
    date: n.date,
    when: n.when,
    topics: n.topics,
    href: { to: '/insights/$slug', params: { slug: n.slug } },
  }))

  for (const p of people) {
    const author = displayName(p)
    const profile = (hash: string) => ({ to: '/people/$slug' as const, params: { slug: p.slug }, hash })
    p.talks?.forEach((t, i) =>
      items.push({
        id: `talk-${p.slug}-${i}`,
        kind: 'talk',
        label: 'Paper',
        title: t.title,
        detail: t.event,
        date: t.date,
        when: t.when,
        topics: inferTopics(t.title, t.event),
        author,
        href: profile('speaking'),
      }),
    )
    const pubs = [
      ...(p.books ?? []).map((b) => ({ ...b, label: 'Book' })),
      ...(p.articles ?? []).map((a) => ({ ...a, label: 'Article' })),
      ...(p.academic ?? []).map((a) => ({ ...a, label: 'Thesis' })),
    ]
    pubs.forEach((b, i) => {
      const year = yearOf(b.detail)
      items.push({
        id: `pub-${p.slug}-${i}`,
        kind: 'publication',
        label: b.label,
        title: b.title,
        detail: b.detail,
        date: `${year}-01-01`,
        when: year,
        topics: inferTopics(b.title, b.detail),
        author,
        href: profile(b.label === 'Thesis' ? 'academic' : 'publications'),
      })
    })
  }
  return items.sort((a, b) => b.date.localeCompare(a.date))
}

export const insights = build()

export const insightsForTopics = (t: Topic[], limit = 4) =>
  t.length ? insights.filter((i) => i.kind !== 'news' && i.topics.some((x) => t.includes(x))).slice(0, limit) : []
