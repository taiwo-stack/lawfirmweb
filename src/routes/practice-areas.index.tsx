import { createFileRoute } from '@tanstack/react-router'
import { Search, X } from 'lucide-react'
import { useState } from 'react'
import { Section } from '~/components/ui/Container'
import { Reveal } from '~/components/ui/Reveal'
import { PageHeader } from '~/components/blocks/PageHeader'
import { PracticeCard } from '~/components/blocks/PracticeCard'
import { CTASection } from '~/components/blocks/CTASection'
import { groupId, groups, practices, type Practice } from '~/content/practices'
import { seo } from '~/lib/utils'

export const Route = createFileRoute('/practice-areas/')({
  head: () =>
    seo({
      title: 'Expertise',
      description:
        'Corporate and commercial, finance and energy, dispute resolution, private client, and rights and advisory. Explore the practice areas of Zest Partners.',
      path: '/practice-areas/',
    }),
  component: PracticeAreas,
})

const haystack = (p: Practice) => [p.title, p.summary, p.group, ...(p.services ?? []), ...(p.clients ?? [])].join(' ').toLowerCase()

function PracticeAreas() {
  const [q, setQ] = useState('')
  const terms = q.toLowerCase().split(/\s+/).filter(Boolean)
  const matches = (p: Practice) => terms.every((t) => haystack(p).includes(t))
  const total = practices.filter(matches).length

  return (
    <>
      <PageHeader
        eyebrow="Expertise"
        title="We are here to fight against any violation, with experience."
        intro={`${practices.length} practice areas in five groups.`}
      >
        <div className="mt-10 flex max-w-xl items-center gap-3 border-b-2 border-ink pb-2">
          <Search className="size-5 text-muted" aria-hidden />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Filter, e.g. “tax”, “banks”, “divorce”"
            aria-label="Filter practice areas"
            className="flex-1 bg-transparent py-2 text-lg outline-none placeholder:text-muted/70"
          />
          {q && (
            <button type="button" onClick={() => setQ('')} aria-label="Clear filter" className="text-muted hover:text-ink">
              <X className="size-5" />
            </button>
          )}
        </div>
        <nav aria-label="Practice groups" className="mt-8 flex flex-wrap gap-2">
          {groups.map((g, i) => (
            <a
              key={g.name}
              href={`#${groupId(g.name)}`}
              className="rounded-full border border-line px-4 py-2 text-sm transition-colors hover:border-ink hover:bg-ink hover:text-paper"
            >
              <span className="mr-1.5 text-brass">{String(i + 1).padStart(2, '0')}</span>
              {g.name}
            </a>
          ))}
        </nav>
      </PageHeader>

      {terms.length > 0 && (
        <p className="border-b border-line bg-paper-deep py-4 text-center text-sm" aria-live="polite">
          {total ? `${total} practice ${total === 1 ? 'area matches' : 'areas match'} “${q}”` : `No practice areas match “${q}”.`}
        </p>
      )}

      {groups.map((g, gi) => {
        const list = practices.filter((p) => p.group === g.name && matches(p))
        if (!list.length) return null
        return (
          <Section key={g.name} id={groupId(g.name)} tone={gi % 2 ? 'deep' : 'paper'}>
            <Reveal className="grid gap-6 md:grid-cols-12">
              <span className="font-display text-5xl text-brass md:col-span-2">{String(gi + 1).padStart(2, '0')}</span>
              <div className="md:col-span-10">
                <h2 className="text-3xl sm:text-4xl">{g.name}</h2>
                <p className="mt-3 max-w-xl text-muted">{g.blurb}</p>
              </div>
            </Reveal>
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {list.map((p, i) => (
                <Reveal key={p.slug} delay={i * 0.05} className="h-full">
                  <PracticeCard practice={p} index={i} />
                </Reveal>
              ))}
            </div>
          </Section>
        )
      })}

      <CTASection />
    </>
  )
}
