import { createFileRoute, Link } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { Section } from '~/components/ui/Container'
import { PageHeader } from '~/components/blocks/PageHeader'
import { SectionTabs } from '~/components/blocks/SectionTabs'
import { InsightCard } from '~/components/blocks/InsightCard'
import { CTASection } from '~/components/blocks/CTASection'
import { insights, kindLabels, type InsightKind } from '~/content/insights'
import { insightTabs } from '~/content/site'
import { topics, type Topic } from '~/content/topics'
import { cn, seo } from '~/lib/utils'

type InsightSearch = { type?: InsightKind; topic?: Topic }

export const Route = createFileRoute('/insights/')({
  validateSearch: (s: Record<string, unknown>): InsightSearch => ({
    type: typeof s.type === 'string' && s.type in kindLabels ? (s.type as InsightKind) : undefined,
    topic: typeof s.topic === 'string' && s.topic in topics ? (s.topic as Topic) : undefined,
  }),
  head: () =>
    seo({
      title: 'News & Insights',
      description: 'Firm news, conference papers, books and articles from Zest Partners on tax, energy, dispute resolution and the legal profession.',
      path: '/insights',
    }),
  component: Insights,
})

function Insights() {
  const search = Route.useSearch()
  // The page is prerendered without filters; apply URL filters only after hydration so markup matches.
  const [hydrated, setHydrated] = useState(false)
  useEffect(() => setHydrated(true), [])
  const { type, topic } = hydrated ? search : {}

  const list = insights.filter((i) => (!type || i.kind === type) && (!topic || i.topics.includes(topic)))
  const usedTopics = (Object.keys(topics) as Topic[]).filter((t) =>
    insights.some((i) => (!type || i.kind === type) && i.topics.includes(t)),
  )
  const counts = Object.fromEntries((Object.keys(kindLabels) as InsightKind[]).map((k) => [k, insights.filter((i) => i.kind === k).length]))

  return (
    <>
      <PageHeader
        crumbs={[{ label: 'Insights' }]}
        eyebrow="News & insights"
        title="Ideas from the Bar, the boardroom and the classroom."
        intro={`${counts.news} firm announcements, ${counts.talk} papers presented at conferences and trainings, and ${counts.publication} books, articles and theses.`}
      />
      <SectionTabs items={insightTabs} label="Insights" />

      <Section>
        <div className="flex flex-wrap items-center gap-2">
          <span className="mr-2 text-xs font-semibold tracking-[0.15em] text-muted uppercase">Topic</span>
          <Link
            to="/insights"
            search={{ type }}
            className={cn('rounded-full border px-4 py-1.5 text-sm transition-colors', !topic ? 'border-ink bg-ink text-paper' : 'border-line hover:border-ink')}
          >
            All topics
          </Link>
          {usedTopics.map((t) => (
            <Link
              key={t}
              to="/insights"
              search={{ type, topic: t }}
              className={cn('rounded-full border px-4 py-1.5 text-sm transition-colors', topic === t ? 'border-ink bg-ink text-paper' : 'border-line hover:border-ink')}
            >
              {topics[t]}
            </Link>
          ))}
        </div>

        <p className="mt-10 text-sm text-muted" aria-live="polite">
          {list.length} {list.length === 1 ? 'item' : 'items'}
          {type ? ` in ${kindLabels[type].toLowerCase()}` : ''}
          {topic ? ` on ${topics[topic]}` : ''}
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((i) => (
            <InsightCard key={i.id} item={i} />
          ))}
        </div>
      </Section>
      <CTASection title="Invite us to speak or train." body="We deliver papers, workshops and training for institutions, regulators, companies and the profession." />
    </>
  )
}
