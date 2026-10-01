import { news } from './news'
import { displayName, people } from './people'
import { inferTopics, type Topic } from './topics'

export type InsightKind = 'news' | 'talk' | 'publication'

export const kindLabels: Record<InsightKind, string> = {
  news: 'Firm news',
  talk: 'Speaking',
  publication: 'Publications',
}

export const kindRoutes = {
  news: '/insights/news/',
  talk: '/insights/talks/',
  publication: '/insights/publications/',
} as const satisfies Record<InsightKind, string>

export type Insight = {
  id: string
  kind: InsightKind
  /** e.g. "News", "Book", "Article", "Paper" */
  label: string
  title: string
  detail: string
  date: string
  when: string
  year: string
  topics: Topic[]
  author?: string
  authorSlug?: string
  /** Where the item lives: its own article page, or its entry on the Speaking/Publications page. */
  href:
    | { to: '/insights/news/$slug/'; params: { slug: string } }
    | { to: '/insights/talks/' | '/insights/publications/'; hash: string }
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
    year: n.date.slice(0, 4),
    topics: n.topics,
    href: { to: '/insights/news/$slug/', params: { slug: n.slug } },
  }))

  for (const p of people) {
    const author = displayName(p)
    p.talks?.forEach((t, i) => {
      const id = `talk-${p.slug}-${i}`
      items.push({
        id,
        kind: 'talk',
        label: 'Paper',
        title: t.title,
        detail: t.event,
        date: t.date,
        when: t.when,
        year: t.date.slice(0, 4),
        topics: inferTopics(t.title, t.event),
        author,
        authorSlug: p.slug,
        href: { to: '/insights/talks/', hash: id },
      })
    })
    // Published works only. Unpublished theses stay on the profile under "Education & research".
    const pubs = [...(p.books ?? []).map((b) => ({ ...b, label: 'Book' })), ...(p.articles ?? []).map((a) => ({ ...a, label: 'Article' }))]
    pubs.forEach((b, i) => {
      const id = `pub-${p.slug}-${i}`
      const year = yearOf(b.detail)
      items.push({
        id,
        kind: 'publication',
        label: b.label,
        title: b.title,
        detail: b.detail,
        date: `${year}-01-01`,
        when: year,
        year,
        topics: inferTopics(b.title, b.detail),
        author,
        authorSlug: p.slug,
        href: { to: '/insights/publications/', hash: id },
      })
    })
  }
  return items.sort((a, b) => b.date.localeCompare(a.date))
}

export const insights = build()
export const byKind = (k: InsightKind) => insights.filter((i) => i.kind === k)

export const insightsForTopics = (t: Topic[], limit = 4) =>
  t.length ? insights.filter((i) => i.kind !== 'news' && i.topics.some((x) => t.includes(x))).slice(0, limit) : []
