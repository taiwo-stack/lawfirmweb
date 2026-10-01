import { createFileRoute } from '@tanstack/react-router'
import { Section } from '~/components/ui/Container'
import { Reveal } from '~/components/ui/Reveal'
import { PageHeader } from '~/components/blocks/PageHeader'
import { PracticeCard } from '~/components/blocks/PracticeCard'
import { CTASection } from '~/components/blocks/CTASection'
import { groupId, groups, practices } from '~/content/practices'
import { seo } from '~/lib/utils'

export const Route = createFileRoute('/practice-areas/')({
  head: () =>
    seo({
      title: 'Practice Areas',
      description:
        'Corporate and commercial, banking and energy, dispute resolution, private client and advisory. Explore the practice areas of Zest Partners.',
      path: '/practice-areas',
    }),
  component: PracticeAreas,
})

function PracticeAreas() {
  return (
    <>
      <PageHeader
        eyebrow="Practice areas"
        title="Depth across the matters that shape business and life."
        intro="Our practice is organised into five groups. Lawyers work across groups so every client has an integrated team."
      >
        <nav aria-label="Practice groups" className="mt-10 flex flex-wrap gap-2">
          {groups.map((g) => (
            <a
              key={g.name}
              href={`#${groupId(g.name)}`}
              className="rounded-full border border-line px-4 py-2 text-sm transition-colors hover:border-ink hover:bg-ink hover:text-paper"
            >
              {g.name}
            </a>
          ))}
        </nav>
      </PageHeader>

      {groups.map((g, gi) => (
        <Section key={g.name} id={groupId(g.name)} tone={gi % 2 ? 'deep' : 'paper'} className="scroll-mt-24">
          <Reveal className="grid gap-6 md:grid-cols-12">
            <span className="font-display text-brass md:col-span-1">{String(gi + 1).padStart(2, '0')}</span>
            <div className="md:col-span-11">
              <h2 className="text-3xl sm:text-4xl">{g.name}</h2>
              <p className="mt-3 max-w-xl text-muted">{g.blurb}</p>
            </div>
          </Reveal>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {practices
              .filter((p) => p.group === g.name)
              .map((p, i) => (
                <Reveal key={p.slug} delay={i * 0.05} className="h-full">
                  <PracticeCard practice={p} index={i} />
                </Reveal>
              ))}
          </div>
        </Section>
      ))}

      <CTASection />
    </>
  )
}
