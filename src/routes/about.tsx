import { createFileRoute } from '@tanstack/react-router'
import { Section } from '~/components/ui/Container'
import { Reveal } from '~/components/ui/Reveal'
import { PageHeader } from '~/components/blocks/PageHeader'
import { CTASection } from '~/components/blocks/CTASection'
import { site } from '~/content/site'
import { asset, seo } from '~/lib/utils'

export const Route = createFileRoute('/about')({
  head: () =>
    seo({
      title: 'The Firm',
      description: `Established in Nigeria in ${site.founded}, Zest Partners is a full-service corporate practice and litigation firm.`,
      path: '/about',
    }),
  component: About,
})

const experience = [
  'Arbitration and negotiation',
  'International trade law',
  'International human rights law',
  'Corporate finance and services',
  'Banking and capital markets',
  'Taxation',
  'Privatisations and divestments',
  'Land and property law',
  'Intellectual property',
  'Employee benefits',
  'Mergers and acquisitions',
  'Transnational joint ventures',
]

function About() {
  return (
    <>
      <PageHeader
        eyebrow="The firm"
        title={
          <>
            Established {site.founded}. <span className="text-muted">Built for what comes next.</span>
          </>
        }
        intro="Zest Partners is a full-service corporate practice and litigation firm in Nigeria, with a selection of lawyers of outstanding training and experience."
      />

      <Section>
        <div className="grid gap-12 md:grid-cols-2">
          {[
            ['Our vision', site.vision],
            ['Our mission', site.mission],
          ].map(([label, text], i) => (
            <Reveal key={label} delay={i * 0.1} className="border-t-2 border-ink pt-8">
              <p className="eyebrow">{label}</p>
              <p className="mt-6 font-display text-3xl leading-snug sm:text-4xl">{text}</p>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section tone="deep">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-20">
          <Reveal className="lg:col-span-5">
            <img
              src={asset('/images/brand/library-tall.jpg')}
              alt="Law reports in the Zest Partners library"
              loading="lazy"
              className="aspect-[4/5] w-full object-cover lg:sticky lg:top-32"
            />
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-7">
            <p className="eyebrow">Our story</p>
            <h2 className="mt-6 text-4xl leading-tight">Dynamic by design.</h2>
            <div className="prose-firm mt-8">
              <p>
                Zest Partners was established in Nigeria in {site.founded} by young, progressive and diligent legal
                practitioners. It is a dynamic firm of vibrant lawyers with deep experience in negotiation and
                international trade law, and a strong track record in litigation and commercial practice.
              </p>
              <p>
                We are experienced in loan and debt recovery for individuals, companies and government agencies. As
                solicitors, we prepare legal documents from general contracts, agreements, debentures, mortgages, powers of
                attorney and lease agreements through to arbitration, receivership and allied matters.
              </p>
              <p>
                The firm uses modern, up-to-date IT facilities and delivers legal services in real time, so we can offer
                world-class service to clients wherever they are.
              </p>
              <p>
                Above all, we are dedicated and committed to our clients, which is why we are well placed to give sound,
                professional advice as both solicitors and advocates.
              </p>
            </div>

            <h3 className="mt-14 text-2xl">Wider experience</h3>
            <ul className="mt-6 grid gap-x-8 sm:grid-cols-2">
              {experience.map((e) => (
                <li key={e} className="flex items-center gap-3 border-b border-line py-3 text-ink/80">
                  <span className="size-1.5 shrink-0 rounded-full bg-brass" aria-hidden />
                  {e}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Section>

      <CTASection />
    </>
  )
}
