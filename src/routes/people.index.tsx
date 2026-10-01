import { createFileRoute } from '@tanstack/react-router'
import { Section } from '~/components/ui/Container'
import { Reveal } from '~/components/ui/Reveal'
import { PageHeader } from '~/components/blocks/PageHeader'
import { PersonCard } from '~/components/blocks/PersonCard'
import { CTASection } from '~/components/blocks/CTASection'
import { people } from '~/content/people'
import { seo } from '~/lib/utils'

export const Route = createFileRoute('/people/')({
  head: () => seo({ title: 'Our People', description: 'Meet the partners of Zest Partners in Abuja and Lagos.', path: '/people/' }),
  component: People,
})

function People() {
  return (
    <>
      <PageHeader
        eyebrow="Our people"
        title="Our people."
        intro="A unique selection of lawyers with outstanding training and experience."
      />
      <Section>
        <h2 className="sr-only">Partners</h2>
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
          {people.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.08}>
              <PersonCard person={p} />
            </Reveal>
          ))}
        </div>
      </Section>
      <CTASection />
    </>
  )
}
