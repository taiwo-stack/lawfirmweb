import { createFileRoute } from '@tanstack/react-router'
import { Section } from '~/components/ui/Container'
import { Reveal } from '~/components/ui/Reveal'
import { PageHeader } from '~/components/blocks/PageHeader'
import { PersonCard } from '~/components/blocks/PersonCard'
import { PrincipalFeature } from '~/components/blocks/PrincipalFeature'
import { CTASection } from '~/components/blocks/CTASection'
import { people, personGroups } from '~/content/people'
import { seo } from '~/lib/utils'

export const Route = createFileRoute('/people/')({
  head: () => seo({ title: 'Our People', description: 'The leadership and partners of Zest Partners in Abuja and Lagos.', path: '/people/' }),
  component: People,
})

function People() {
  // Sections appear automatically as people are added to each group in src/content/people.ts.
  const sections = personGroups.map((g) => ({ group: g, list: people.filter((p) => p.group === g) })).filter((s) => s.list.length)
  return (
    <>
      <PageHeader eyebrow="Our people" title="Our people." intro="A unique selection of lawyers with outstanding training and experience." />
      {sections.map((s, i) => (
        <Section key={s.group} tone={i % 2 ? 'deep' : 'paper'}>
          <div className="flex items-end justify-between gap-6 border-b border-line pb-6">
            <h2 className="text-3xl sm:text-4xl">{s.group === 'Principal' ? 'Leadership' : s.group}</h2>
            {s.group !== 'Principal' && (
              <p className="text-sm text-muted">
                {s.list.length} {s.list.length === 1 ? 'person' : 'people'}
              </p>
            )}
          </div>
          {s.group === 'Principal' ? (
            <div className="mt-12 space-y-16">
              {s.list.map((p) => (
                <PrincipalFeature key={p.slug} person={p} />
              ))}
            </div>
          ) : (
            <div className="mt-12 grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
              {s.list.map((p, j) => (
                <Reveal key={p.slug} delay={j * 0.08}>
                  <PersonCard person={p} />
                </Reveal>
              ))}
            </div>
          )}
        </Section>
      ))}
      <CTASection />
    </>
  )
}
