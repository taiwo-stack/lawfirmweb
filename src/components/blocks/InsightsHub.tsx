import { Link } from '@tanstack/react-router'
import { cardMuted, cardSurface } from '~/lib/card'
import { ScrollRow } from '~/components/ui/ChipRow'
import { useEffect, useState } from 'react'
import { Section } from '~/components/ui/Container'
import { Img } from '~/components/ui/Img'
import { PageHeader } from './PageHeader'
import { InsightCard } from './InsightCard'
import { PublicationList, TalkTimeline } from './InsightLists'
import { CTASection } from './CTASection'
import { byKind } from '~/content/insights'
import { news } from '~/content/news'
import { topics, type Topic } from '~/content/topics'
import { cn } from '~/lib/utils'

export const validateTopic = (s: { topic?: unknown }): { topic?: Topic } => ({
  topic: typeof s.topic === 'string' && s.topic in topics ? (s.topic as Topic) : undefined,
})

function Heading({ eyebrow, title, intro }: { eyebrow: string; title: string; intro: string }) {
  return (
    <div className="border-b border-line pb-6">
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="mt-6 text-3xl sm:text-4xl">{title}</h2>
      <p className="mt-4 max-w-2xl text-muted">{intro}</p>
    </div>
  )
}

/**
 * The single Insights page: firm news, publications and speaking, each a section (#news, #publications, #talks).
 * `topic` comes from the URL and filters the talks; it is applied after hydration.
 */
export function InsightsHub({ topic: urlTopic }: { topic?: Topic }) {
  // Pages are prerendered without a topic; apply the URL filter only after hydration so markup matches.
  const [hydrated, setHydrated] = useState(false)
  useEffect(() => setHydrated(true), [])
  const topic = hydrated ? urlTopic : undefined

  const [featured, ...moreNews] = byKind('news')
  const featuredItem = news.find((n) => `news-${n.slug}` === featured.id)!
  const publications = byKind('publication')
  const talks = byKind('talk')
  const shownTalks = talks.filter((i) => !topic || i.topics.includes(topic))
  const usedTopics = (Object.keys(topics) as Topic[]).filter((t) => talks.some((i) => i.topics.includes(t)))
  const chip = (active: boolean) =>
    cn('rounded-full border px-4 py-1.5 text-sm transition-colors', active ? 'border-ink bg-ink text-paper' : 'border-line hover:border-ink')

  return (
    <>
      <PageHeader
        eyebrow="Insights"
        title="News & insights."
        intro={`${byKind('news').length} firm announcements, ${publications.length} published works and ${talks.length} papers presented at conferences and trainings.`}
      />

      <Section id="news">
        <Heading eyebrow="Firm news" title="Appointments, events and announcements." intro="News from Zest Partners and our people." />
        <div className="mt-10 grid gap-6 lg:grid-cols-12">
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
              <h3 className="mt-4 max-w-2xl font-display text-3xl leading-snug">{featured.title}</h3>
              <p className="mt-4 max-w-xl text-paper/75">{featured.detail}</p>
            </div>
          </Link>
          <div className="flex flex-col gap-4 lg:col-span-5">
            {moreNews.slice(0, 3).map((n) => (
              <Link key={n.id} {...n.href} className={`group flex flex-1 items-center gap-5 border border-line p-4 ${cardSurface}`}>
                <span>
                  <span className={`block text-xs ${cardMuted}`}>{n.when}</span>
                  <span className="mt-1 block font-display text-lg leading-snug">{n.title}</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
        {moreNews.length > 3 && (
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {moreNews.slice(3).map((i) => (
              <InsightCard key={i.id} item={i} />
            ))}
          </div>
        )}
      </Section>

      <Section id="publications" tone="deep">
        <Heading eyebrow="Publications" title="Books, journal articles and chapters." intro={`${publications.length} published works by our lawyers.`} />
        <div className="mt-10">
          <PublicationList items={publications} />
        </div>
      </Section>

      <Section id="talks">
        <Heading
          eyebrow="Speaking"
          title="Papers presented locally and internationally."
          intro={`${talks.length} papers presented at conferences, retreats and training programmes since 2007.`}
        />
        {usedTopics.length > 1 && (
          <div className="mt-10">
            <p className="mb-3 text-xs font-semibold tracking-[0.15em] text-muted uppercase">Filter by topic</p>
            <ScrollRow label="Filter by topic">
              <Link
                to="/insights/"
                search={{ topic: undefined }}
                hash="talks"
                resetScroll={false}
                activeOptions={{ explicitUndefined: true }}
                className={chip(!topic)}
              >
                All topics
              </Link>
              {usedTopics.map((t) => (
                <Link key={t} to="/insights/" search={{ topic: t }} hash="talks" resetScroll={false} className={chip(topic === t)}>
                  {topics[t]}
                </Link>
              ))}
            </ScrollRow>
          </div>
        )}
        {topic && (
          <p className="mt-8 text-sm text-muted" aria-live="polite">
            {shownTalks.length} {shownTalks.length === 1 ? 'paper' : 'papers'} on {topics[topic]}
          </p>
        )}
        <div className="mt-10">
          <TalkTimeline items={shownTalks} showSpeaker />
        </div>
      </Section>

      <CTASection />
    </>
  )
}
