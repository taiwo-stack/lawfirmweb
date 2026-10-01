import { createFileRoute } from '@tanstack/react-router'
import { Section } from '~/components/ui/Container'
import { Reveal } from '~/components/ui/Reveal'
import { ButtonLink } from '~/components/ui/Button'
import { PageHeader } from '~/components/blocks/PageHeader'
import { SectionTabs } from '~/components/blocks/SectionTabs'
import { CTASection } from '~/components/blocks/CTASection'
import { personBySlug } from '~/content/people'
import { firmTabs } from '~/content/site'
import { asset, seo } from '~/lib/utils'

export const Route = createFileRoute('/about/community')({
  head: () =>
    seo({
      title: 'Pro Bono & Community',
      description:
        'Free legal services for indigent citizens, public interest litigation, legal aid and service to the Nigerian Bar Association.',
      path: '/about/community/',
    }),
  component: Community,
})

const mp = personBySlug('chinedu-obienu')!
const barService = mp.positions!.filter((p) => /bar|nba|legal aid|clasfon|community policing/i.test(`${p.org} ${p.role}`))

function Community() {
  return (
    <>
      <PageHeader
        crumbs={[{ label: 'The Firm', to: '/about/' }, { label: 'Pro bono & community' }]}
        eyebrow="Pro bono & community"
        title="Justice should not depend on the ability to pay."
        intro="Public interest litigation is our corporate social responsibility and how we promote good governance and the rule of law in Nigeria."
      />
      <SectionTabs items={firmTabs} label="The Firm" />

      <Section>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <p className="eyebrow">Pro bono</p>
            <h2 className="mt-6 text-4xl leading-tight">Free representation for those who need it most.</h2>
            <div className="prose-firm mt-8">
              <p>
                We take a keen interest in the observance of the rule of law, and our Human Rights and Public Interest
                Litigation department champions that cause.
              </p>
              <p>
                We offer free services to poor and indigent citizens whose rights have been grossly infringed but who have no
                resources to pursue their grievances in the appropriate forum.
              </p>
            </div>
            <ButtonLink to="/practice-areas/$slug/" params={{ slug: 'human-rights' }} variant="ghost">
              Human rights practice
            </ButtonLink>
          </Reveal>
          <Reveal delay={0.1} className="bg-ink p-10 text-paper">
            <p className="eyebrow">Legal aid</p>
            <p className="mt-6 font-display text-3xl leading-snug">
              In August 2026, our Managing Partner was inaugurated to the Governing Council of the Legal Aid Council of
              Nigeria.
            </p>
            <p className="mt-6 text-paper/70">
              He was also a member of the team that drafted the Fundamental Human Rights (Enforcement Procedure) Rules, and has
              presented at a training for pro bono lawyers organised by the Public and Private Development Centre (PPDC).
            </p>
            <ButtonLink to="/insights/news/$slug/" params={{ slug: 'lacon-governing-council-inauguration' }} variant="light" className="mt-8">
              Read the news
            </ButtonLink>
          </Reveal>
        </div>
      </Section>

      <Section tone="deep">
        <div className="grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <p className="eyebrow">Service to the profession</p>
            <h2 className="mt-6 text-4xl leading-tight">Serving the Bar.</h2>
            <img
              src={asset('/images/brand/afba-conference.jpg')}
              alt="Speaking at the African Bar Association conference"
              loading="lazy"
              className="mt-10 hidden aspect-[4/5] w-full object-cover object-top lg:block"
            />
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-8">
            <ul className="divide-y divide-line border-y border-line">
              {barService.map((p) => (
                <li key={p.role + p.org} className="grid gap-1 py-5 sm:grid-cols-[1fr_auto] sm:gap-6">
                  <p>
                    <span className="font-semibold">{p.role}</span>
                    <span className="text-muted"> · {p.org}</span>
                  </p>
                  <p className="text-sm text-muted tabular-nums">{p.period}</p>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm text-muted">Positions held by our Managing Partner, Dr. Chinedu Obienu.</p>
          </Reveal>
        </div>
      </Section>
      <CTASection />
    </>
  )
}
