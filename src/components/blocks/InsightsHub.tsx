import { Link } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { Section } from '~/components/ui/Container'
import { PageHeader } from './PageHeader'
import { SectionTabs } from './SectionTabs'
import { InsightCard } from './InsightCard'
import { CTASection } from './CTASection'
import { insights, kindLabels, kindRoutes, type InsightKind } from '~/content/insights'
import { insightTabs } from '~/content/site'
import { topics, type Topic } from '~/content/topics'
import { cn } from '~/lib/utils'
import type { Crumb } from './Breadcrumbs'

export const validateTopic = (s: { topic?: unknown }): { topic?: Topic } => ({
  topic: typeof s.topic === 'string' && s.topic in topics ? (s.topic as Topic) : undefined,
})

const copy: Record<InsightKind | 'all', { title: string; intro: (n: number) => string }> = {
  all: {
    title: 'Ideas from the Bar, the boardroom and the classroom.',
    intro: () => {
      const c = (k: InsightKind) => insights.filter((i) => i.kind === k).length
      return `${c('news')} firm announcements, ${c('talk')} papers presented at conferences and trainings, and ${c('publication')} books, articles and theses.`
    },
  },
  news: { title: 'Firm news.', intro: (n) => `${n} announcements: appointments, events and publications.` },
  talk: { title: 'Talks & papers.', intro: (n) => `${n} papers presented at conferences, retreats and training programmes since 2007.` },
  publication: { title: 'Publications.', intro: (n) => `${n} books, journal articles and academic works.` },
}

/** Listing page for all insights or one kind. `topic` comes from the URL and is applied after hydration. */
export function InsightsHub({ kind, topic: urlTopic }: { kind?: InsightKind; topic?: Topic }) {
  // Pages are prerendered without a topic; apply the URL filter only after hydration so markup matches.
  const [hydrated, setHydrated] = useState(false)
  useEffect(() => setHydrated(true), [])
  const topic = hydrated ? urlTopic : undefined

  const pool = insights.filter((i) => !kind || i.kind === kind)
  const list = pool.filter((i) => !topic || i.topics.includes(topic))
  const usedTopics = (Object.keys(topics) as Topic[]).filter((t) => pool.some((i) => i.topics.includes(t)))
  const here = insightTabs.find((t) => t.to === (kind ? kindRoutes[kind] : '/insights/'))!
  const crumbs: Crumb[] | undefined = kind ? [{ label: 'Insights', to: '/insights/' }, { label: here.label }] : undefined

  const chip = (active: boolean) =>
    cn('rounded-full border px-4 py-1.5 text-sm transition-colors', active ? 'border-ink bg-ink text-paper' : 'border-line hover:border-ink')

  return (
    <>
      <PageHeader crumbs={crumbs} eyebrow={kind ? kindLabels[kind] : 'News & insights'} title={copy[kind ?? 'all'].title} intro={copy[kind ?? 'all'].intro(pool.length)} />
      <SectionTabs items={insightTabs} label="Insights" />

      <Section>
        {usedTopics.length > 1 && (
          <div className="flex flex-wrap items-center gap-2">
            <span className="mr-2 text-xs font-semibold tracking-[0.15em] text-muted uppercase">Topic</span>
            <Link to={here.to} search={{ topic: undefined }} activeOptions={{ explicitUndefined: true }} className={chip(!topic)}>
              All topics
            </Link>
            {usedTopics.map((t) => (
              <Link key={t} to={here.to} search={{ topic: t }} className={chip(topic === t)}>
                {topics[t]}
              </Link>
            ))}
          </div>
        )}
        <h2 className="sr-only">{topic ? `${topics[topic]} items` : 'All items'}</h2>
        <p className="mt-10 text-sm text-muted" aria-live="polite">
          {list.length} {list.length === 1 ? 'item' : 'items'}
          {topic ? ` on ${topics[topic]}` : ''}
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((i) => (
            <InsightCard key={i.id} item={i} />
          ))}
        </div>
      </Section>
      <CTASection
        title="Invite us to speak or train."
        body="Our Managing Partner presents papers and facilitates workshops, seminars and training in diverse areas of law."
      />
    </>
  )
}
