import { Link } from '@tanstack/react-router'
import { ScrollRow } from '~/components/ui/ChipRow'
import { ArrowUpRight } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Section } from '~/components/ui/Container'
import { ButtonLink } from '~/components/ui/Button'
import { Img } from '~/components/ui/Img'
import { PageHeader } from './PageHeader'
import { SectionTabs } from './SectionTabs'
import { InsightCard } from './InsightCard'
import { PublicationList, TalkTimeline } from './InsightLists'
import { CTASection } from './CTASection'
import { byKind, kindLabels, kindRoutes, type Insight, type InsightKind } from '~/content/insights'
import { news } from '~/content/news'
import { insightTabs } from '~/content/site'
import { topics, type Topic } from '~/content/topics'
import { cn } from '~/lib/utils'
import type { Crumb } from './Breadcrumbs'

export const validateTopic = (s: { topic?: unknown }): { topic?: Topic } => ({
  topic: typeof s.topic === 'string' && s.topic in topics ? (s.topic as Topic) : undefined,
})

const intro: Record<InsightKind | 'all', { title: string; intro: string }> = {
  all: {
    title: 'News & insights.',
    intro: `${byKind('news').length} firm announcements, ${byKind('publication').length} published works and ${byKind('talk').length} papers presented at conferences and trainings.`,
  },
  news: { title: 'Firm news.', intro: 'Appointments, events and publications from Zest Partners.' },
  talk: { title: 'Speaking.', intro: `${byKind('talk').length} papers presented at conferences, retreats and training programmes since 2007.` },
  publication: { title: 'Publications.', intro: 'Books, journal articles and chapters.' },
}

/** "View all" shown after the content on phones (it sits in the heading on larger screens). */
function MobileViewAll({ to, count }: { to: (typeof kindRoutes)[InsightKind]; count: number }) {
  return (
    <ButtonLink to={to} variant="ghost" className="mt-8 md:hidden">
      View all {count}
    </ButtonLink>
  )
}

function Heading({ title, to, count }: { title: string; to: (typeof kindRoutes)[InsightKind]; count: number }) {
  return (
    <div className="flex flex-col justify-between gap-4 border-b border-line pb-6 sm:flex-row sm:items-end">
      <h2 className="text-3xl sm:text-4xl">{title}</h2>
      <div className="hidden md:block">
        <ButtonLink to={to} variant="ghost">
          View all {count}
        </ButtonLink>
      </div>
    </div>
  )
}

/** Publications beside a photo of the firm's law library (decorative; not a book cover). */
function PublicationsWithImage({ items }: { items: Insight[] }) {
  return (
    <div className="mt-10 grid gap-10 md:grid-cols-12 md:gap-12">
      <div className="md:col-span-4">
        <Img
          src="/images/brand/library-tall.jpg"
          alt="Law reports in the Zest Partners library"
          sizes="(min-width: 768px) 30vw, 100vw"
          className="aspect-[4/3] w-full object-cover md:sticky md:top-40 md:aspect-[3/4]"
        />
      </div>
      <div className="md:col-span-8">
        <PublicationList items={items} />
      </div>
    </div>
  )
}

/** Landing page: featured news, then each collection with a link to its full page. */
function Landing() {
  const [featured, ...moreNews] = byKind('news')
  const featuredItem = news.find((n) => `news-${n.slug}` === featured.id)!
  return (
    <>
      <Section>
        <div className="grid gap-6 lg:grid-cols-12">
          <Link {...featured.href} className="group relative flex min-h-[420px] flex-col justify-end overflow-hidden bg-ink p-8 text-paper lg:col-span-7">
            {featuredItem.image && (
              <Img
                src={featuredItem.image}
                alt=""
                sizes="(min-width: 1024px) 60vw, 100vw"
                className="absolute inset-0 size-full object-cover object-[center_30%] opacity-50 transition duration-700 group-hover:scale-[1.03]"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/60 to-transparent" />
            <div className="relative">
              <p className="text-xs font-semibold tracking-[0.15em] text-brass uppercase">Latest · {featured.when}</p>
              <h2 className="mt-4 max-w-2xl font-display text-3xl leading-snug">{featured.title}</h2>
              <p className="mt-4 max-w-xl text-paper/75">{featured.detail}</p>
            </div>
          </Link>
          <div className="flex flex-col gap-4 lg:col-span-5">
            {moreNews.slice(0, 3).map((n) => (
              <Link key={n.id} {...n.href} className="group flex flex-1 items-center gap-5 border border-line p-4 transition-colors hover:bg-paper-deep">
                {n.image && (
                  <Img src={n.image} alt="" sizes="96px" className="size-20 shrink-0 object-cover object-[center_30%] sm:size-24" />
                )}
                <span>
                  <span className="block text-xs text-muted">{n.when}</span>
                  <span className="mt-1 block font-display text-lg leading-snug group-hover:text-green">{n.title}</span>
                </span>
              </Link>
            ))}
            <Link to="/insights/news/" className="inline-flex items-center gap-2 py-2 text-sm font-semibold hover:text-green">
              All firm news <ArrowUpRight className="size-4" aria-hidden />
            </Link>
          </div>
        </div>
      </Section>

      <Section tone="deep">
        <Heading title="Publications" to="/insights/publications/" count={byKind('publication').length} />
        <PublicationsWithImage items={byKind('publication')} />
        <MobileViewAll to="/insights/publications/" count={byKind('publication').length} />
      </Section>

      <Section>
        <Heading title="Recent speaking" to="/insights/talks/" count={byKind('talk').length} />
        <div className="mt-10">
          <TalkTimeline items={byKind('talk').slice(0, 6)} showSpeaker />
        </div>
        <MobileViewAll to="/insights/talks/" count={byKind('talk').length} />
      </Section>
    </>
  )
}

/** Listing page for one collection. `topic` comes from the URL and is applied after hydration. */
export function InsightsHub({ kind, topic: urlTopic }: { kind?: InsightKind; topic?: Topic }) {
  // Pages are prerendered without a topic; apply the URL filter only after hydration so markup matches.
  const [hydrated, setHydrated] = useState(false)
  useEffect(() => setHydrated(true), [])
  const topic = hydrated ? urlTopic : undefined

  const here = insightTabs.find((t) => t.to === (kind ? kindRoutes[kind] : '/insights/'))!
  const crumbs: Crumb[] | undefined = kind ? [{ label: 'Insights', to: '/insights/' }, { label: here.label }] : undefined
  const copy = intro[kind ?? 'all']

  const pool = kind ? byKind(kind) : []
  const list = pool.filter((i) => !topic || i.topics.includes(topic))
  const usedTopics = (Object.keys(topics) as Topic[]).filter((t) => pool.some((i) => i.topics.includes(t)))
  const chip = (active: boolean) =>
    cn('rounded-full border px-4 py-1.5 text-sm transition-colors', active ? 'border-ink bg-ink text-paper' : 'border-line hover:border-ink')

  return (
    <>
      <PageHeader crumbs={crumbs} eyebrow={kind ? kindLabels[kind] : 'Insights'} title={copy.title} intro={copy.intro} />
      <SectionTabs items={insightTabs} label="Insights" />

      {!kind ? (
        <Landing />
      ) : (
        <Section>
          {/* Topic filters only where there is enough to filter. */}
          {kind === 'talk' && usedTopics.length > 1 && (
            <div className="mb-12">
              <p className="mb-3 text-xs font-semibold tracking-[0.15em] text-muted uppercase">Filter by topic</p>
              <ScrollRow label="Filter by topic">
              <Link to={here.to} search={{ topic: undefined }} activeOptions={{ explicitUndefined: true }} className={chip(!topic)}>
                All topics
              </Link>
              {usedTopics.map((t) => (
                <Link key={t} to={here.to} search={{ topic: t }} className={chip(topic === t)}>
                  {topics[t]}
                </Link>
              ))}
              </ScrollRow>
            </div>
          )}
          <h2 className="sr-only">{topic ? `${topics[topic]}: ${list.length} items` : `${list.length} items`}</h2>
          {topic && (
            <p className="mb-8 text-sm text-muted" aria-live="polite">
              {list.length} {list.length === 1 ? 'paper' : 'papers'} on {topics[topic]}
            </p>
          )}
          {kind === 'news' && (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {list.map((i) => (
                <InsightCard key={i.id} item={i} />
              ))}
            </div>
          )}
          {kind === 'talk' && <TalkTimeline items={list} showSpeaker />}
          {kind === 'publication' && <PublicationsWithImage items={list} />}
        </Section>
      )}

      <CTASection />
    </>
  )
}
