import { createFileRoute } from '@tanstack/react-router'
import { Section } from '~/components/ui/Container'
import { Reveal } from '~/components/ui/Reveal'
import { PageHeader } from '~/components/blocks/PageHeader'
import { SectionTabs } from '~/components/blocks/SectionTabs'
import { CTASection } from '~/components/blocks/CTASection'
import { history } from '~/content/history'
import { firmTabs, site } from '~/content/site'
import { seo } from '~/lib/utils'

export const Route = createFileRoute('/about/history')({
  head: () =>
    seo({
      title: 'Our History',
      description: `Milestones of Zest Partners since ${site.founded}: legislation, scholarship, training and service to the Bar.`,
      path: '/about/history/',
    }),
  component: History,
})

function History() {
  return (
    <>
      <PageHeader
        crumbs={[{ label: 'The Firm', to: '/about/' }, { label: 'Our history' }]}
        eyebrow="Our history"
        title={`${new Date().getFullYear() - site.founded} years of practice, scholarship and service.`}
        intro="From our founding in 2006 to a seat on the Governing Council of the Legal Aid Council of Nigeria: the milestones that shaped the firm and its leadership."
      />
      <SectionTabs items={firmTabs} label="The Firm" />
      <Section>
        <ol className="relative mx-auto max-w-4xl">
          <span className="absolute top-2 bottom-2 left-[7rem] hidden w-px bg-line sm:block" aria-hidden />
          {history.map((h, i) => (
            <li key={h.year + h.title} className="relative grid gap-3 pb-14 last:pb-0 sm:grid-cols-[5.5rem_1fr] sm:gap-12">
              <Reveal>
                <p className="font-display text-3xl text-brass sm:text-right sm:text-2xl">{h.year}</p>
              </Reveal>
              <Reveal delay={0.05} className="relative">
                <span
                  className="absolute top-2.5 -left-[calc(1.5rem+6px)] hidden size-3 rounded-full border-2 border-paper bg-brass ring-1 ring-brass sm:block"
                  aria-hidden
                />
                <p className="text-xs text-muted">{String(i + 1).padStart(2, '0')}</p>
                <h2 className="mt-1 text-2xl sm:text-3xl">{h.title}</h2>
                <p className="mt-3 max-w-2xl leading-relaxed text-ink/75">{h.body}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </Section>
      <CTASection />
    </>
  )
}
