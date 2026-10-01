import { createFileRoute, Link } from '@tanstack/react-router'
import { Img } from '~/components/ui/Img'
import { Section } from '~/components/ui/Container'
import { Reveal } from '~/components/ui/Reveal'
import { ButtonLink } from '~/components/ui/Button'
import { PageHeader } from '~/components/blocks/PageHeader'
import { SectionTabs } from '~/components/blocks/SectionTabs'
import { CTASection } from '~/components/blocks/CTASection'
import { groupId, groups, practices } from '~/content/practices'
import { firmTabs, site } from '~/content/site'
import { seo } from '~/lib/utils'

export const Route = createFileRoute('/about/')({
  head: () =>
    seo({
      title: 'About the Firm',
      description: `Established in Nigeria in ${site.founded}, Zest Partners is a full-service corporate practice and litigation firm.`,
      path: '/about/',
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
  'Acquisitions and mergers',
  'Transnational joint ventures',
]

const documents = [
  'General contracts',
  'Agreements',
  'Debentures',
  'Mortgages',
  'Powers of attorney',
  'Lease agreements',
  'Arbitration',
  'Receivership',
]

const values = [
  { title: 'Ethics', body: 'Top-class legal services without compromise to ethical values. That is our mission.' },
  { title: 'Dedication', body: 'A high level of dedication and commitment to every client, as solicitors and as advocates.' },
  { title: 'Dynamism', body: 'Vibrant lawyers with a wealth of experience in negotiation, international trade law, litigation and commercial practice.' },
  { title: 'Modern practice', body: 'Modern, up-to-date IT facilities and real-time legal services, so we can deliver world-class service to clients.' },
]

function About() {
  return (
    <>
      <PageHeader
        eyebrow="The firm"
        title={
          <>
            Established {site.founded}. <span className="text-muted">Corporate practice and litigation.</span>
          </>
        }
        intro="Zest Partners is a full-service corporate practice and litigation law firm established in Nigeria, with a selection of lawyers of outstanding training and experience."
      />
      <SectionTabs items={firmTabs} label="The Firm" />

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
            <Img
              src={'/images/office/library-4.jpg'}
              alt="Inside the Zest Partners law library"
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="aspect-[4/5] w-full object-cover lg:sticky lg:top-40"
            />
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-7">
            <p className="eyebrow">Who we are</p>
            <h2 className="mt-6 text-4xl leading-tight">Dynamic by every standard.</h2>
            <div className="prose-firm mt-8">
              <p>
                Zest Partners was established in Nigeria in {site.founded}. The firm was founded by young, progressive and
                diligent legal practitioners.
              </p>
              <p>
                By all standards the firm is dynamic. It is home to vibrant lawyers with a wealth of experience in
                negotiation and international trade law, and a good track record in litigation and commercial law practice.
              </p>
              <p>We are also experienced in loan and debt recovery for individuals, companies and government agencies.</p>
              <p>
                The firm is equipped with modern, up-to-date IT facilities and provides legal services in real time, which
                makes it easy to deliver world-class legal services to our clients.
              </p>
              <p>
                Zest Partners shows a high level of dedication and commitment to clients, which makes us well placed to give
                sound, professional legal advice and services as both solicitors and advocates.
              </p>
            </div>
            <ButtonLink to="/about/history/" variant="ghost" className="mt-2">
              Our history
            </ButtonLink>
          </Reveal>
        </div>
      </Section>

      <Section>
        <Reveal>
          <p className="eyebrow">Our values</p>
          <h2 className="mt-6 max-w-2xl text-4xl leading-tight">How we practise.</h2>
        </Reveal>
        <div className="mt-12 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v, i) => (
            <Reveal key={v.title} delay={i * 0.06} className="h-full bg-paper p-8">
              <p className="font-display text-sm text-brass">{String(i + 1).padStart(2, '0')}</p>
              <h3 className="mt-4 text-2xl">{v.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">{v.body}</p>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section tone="deep">
        <div className="grid gap-16 lg:grid-cols-2">
          <Reveal>
            <p className="eyebrow">Our fields</p>
            <h2 className="mt-6 text-3xl">Professionals across {practices.length} practice areas</h2>
            <div className="mt-8 space-y-6">
              {groups.map((g) => (
                <div key={g.name}>
                  <Link to="/practice-areas/" hash={groupId(g.name)} className="text-xs font-semibold tracking-[0.15em] text-brass uppercase hover:text-green">
                    {g.name}
                  </Link>
                  <p className="mt-2 leading-relaxed">
                    {practices
                      .filter((p) => p.group === g.name)
                      .map((p, i, arr) => (
                        <span key={p.slug}>
                          <Link to="/practice-areas/$slug/" params={{ slug: p.slug }} className="underline decoration-line underline-offset-4 hover:decoration-ink">
                            {p.title}
                          </Link>
                          {i < arr.length - 1 ? ', ' : ''}
                        </span>
                      ))}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.1} className="space-y-12">
            <div>
              <h3 className="text-2xl">Other areas of experience</h3>
              <ul className="mt-6 grid gap-x-8 sm:grid-cols-2">
                {experience.map((e) => (
                  <li key={e} className="flex items-center gap-3 border-b border-line py-3 text-ink/80">
                    <span className="size-1.5 shrink-0 rounded-full bg-brass" aria-hidden />
                    {e}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-2xl">As solicitors, we prepare</h3>
              <p className="mt-3 text-sm text-muted">Legal documents including, but not limited to:</p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {documents.map((d) => (
                  <li key={d} className="rounded-full border border-line bg-paper px-4 py-1.5 text-sm">
                    {d}
                  </li>
                ))}
                <li className="rounded-full border border-line bg-paper px-4 py-1.5 text-sm">Other allied matters</li>
              </ul>
            </div>
          </Reveal>
        </div>
      </Section>

      <CTASection />
    </>
  )
}
