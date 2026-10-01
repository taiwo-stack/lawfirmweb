import { createFileRoute, Link } from '@tanstack/react-router'
import { ButtonLink } from '~/components/ui/Button'
import { Container, Section } from '~/components/ui/Container'
import { Reveal } from '~/components/ui/Reveal'
import { CTASection } from '~/components/blocks/CTASection'
import { PersonCard } from '~/components/blocks/PersonCard'
import { groupId, groups, practices } from '~/content/practices'
import { people } from '~/content/people'
import { site } from '~/content/site'
import { asset, seo } from '~/lib/utils'

export const Route = createFileRoute('/')({
  head: () => seo({ path: '/' }),
  component: Home,
})

const years = new Date().getFullYear() - site.founded

const pillars = [
  {
    title: 'Solicitors and advocates',
    body: 'We draft the contracts, debentures, mortgages and powers of attorney, and we argue the case in court when a matter needs it.',
  },
  {
    title: 'Real-time, modern practice',
    body: 'Up-to-date IT facilities and real-time legal services mean clients get timely answers wherever they are.',
  },
  {
    title: 'Ethics without compromise',
    body: 'Top-class legal services delivered without compromise to ethical values. That is our mission and how we work.',
  },
]

function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-ink text-paper">
        <img
          src={asset('/images/brand/library-wide.jpg')}
          alt="The Zest Partners law library: bound volumes of law reports and Halsbury’s Laws of England"
          className="absolute inset-0 -z-20 size-full object-cover opacity-40"
          fetchPriority="high"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/70 to-ink/30" />
        <Container className="flex min-h-[min(88svh,920px)] flex-col justify-end pt-32 pb-16 sm:pb-24">
          <div className="rise">
            <p className="eyebrow">Zest Partners · Est. {site.founded}</p>
            <h1 className="mt-8 max-w-5xl text-5xl leading-[1.02] font-light sm:text-7xl lg:text-8xl">
              Counsel with <em className="text-brass-soft">conviction.</em>
            </h1>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-paper/75 sm:text-xl">
              A full-service corporate practice and litigation firm, advising businesses, institutions and families across
              Nigeria from Abuja and Lagos.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <ButtonLink to="/contact" variant="light">
                Book a consultation
              </ButtonLink>
              <ButtonLink
                to="/practice-areas"
                variant="ghost"
                className="border-paper/30 text-paper hover:border-paper hover:bg-paper hover:text-ink"
              >
                Our practice areas
              </ButtonLink>
            </div>
          </div>
        </Container>
      </section>

      {/* Stats */}
      <div className="border-b border-line bg-paper">
        <Container className="grid grid-cols-2 divide-line lg:grid-cols-4 lg:divide-x">
          {[
            [`${years}+`, 'Years in practice'],
            [String(practices.length), 'Practice areas'],
            ['2', 'Offices: Abuja & Lagos'],
            ['Pro bono', 'Human rights & public interest'],
          ].map(([value, label]) => (
            <div key={label} className="py-8 lg:px-8 lg:first:pl-0">
              <p className="font-display text-3xl sm:text-4xl">{value}</p>
              <p className="mt-2 text-sm text-muted">{label}</p>
            </div>
          ))}
        </Container>
      </div>

      {/* About teaser */}
      <Section>
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-20">
          <Reveal className="lg:col-span-7">
            <p className="eyebrow">The firm</p>
            <h2 className="mt-6 text-4xl leading-tight sm:text-5xl">
              Built on the conviction that good law is good business.
            </h2>
            <div className="prose-firm mt-8">
              <p>
                Zest Partners was founded in {site.founded} by young, progressive and diligent legal practitioners. Today we
                are a dynamic firm of lawyers with deep experience in negotiation, international trade law, litigation and
                commercial practice.
              </p>
              <p>
                We act as solicitors and advocates for individuals, companies and government agencies, with one unwavering
                aim: {site.vision.toLowerCase().replace(/\.$/, '')}.
              </p>
            </div>
            <ButtonLink to="/about" variant="ghost" className="mt-4">
              About the firm
            </ButtonLink>
          </Reveal>
          <Reveal delay={0.15} className="lg:col-span-5">
            <div className="relative">
              <img
                src={asset('/images/brand/library-tall.jpg')}
                alt="Nigerian Supreme Court Cases and Nigerian Weekly Law Reports in the firm’s library"
                loading="lazy"
                className="aspect-[4/5] w-full object-cover"
              />
              <div className="absolute -bottom-6 -left-6 hidden bg-green p-6 text-paper sm:block">
                <p className="font-display text-4xl">{site.founded}</p>
                <p className="mt-1 text-xs tracking-[0.2em] uppercase">Established</p>
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* Practice groups */}
      <Section tone="deep">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <Reveal>
            <p className="eyebrow">Expertise</p>
            <h2 className="mt-6 max-w-2xl text-4xl leading-tight sm:text-5xl">Five practice groups. One integrated team.</h2>
          </Reveal>
          <ButtonLink to="/practice-areas" variant="ghost">
            All practice areas
          </ButtonLink>
        </div>
        <div className="mt-14 grid gap-px border border-line bg-line md:grid-cols-2 lg:grid-cols-5">
          {groups.map((g, i) => (
            <Reveal key={g.name} delay={i * 0.06} className="bg-paper-deep">
              <Link
                to="/practice-areas"
                hash={groupId(g.name)}
                className="group flex h-full flex-col gap-6 p-6 transition-colors hover:bg-ink hover:text-paper"
              >
                <span className="font-display text-sm text-brass">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="text-2xl leading-tight">{g.name}</h3>
                <p className="text-sm leading-relaxed text-muted group-hover:text-paper/70">{g.blurb}</p>
                <ul className="mt-auto space-y-1.5 border-t border-line pt-5 text-sm group-hover:border-paper/20">
                  {practices
                    .filter((p) => p.group === g.name)
                    .map((p) => (
                      <li key={p.slug}>{p.title}</li>
                    ))}
                </ul>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Why Zest */}
      <Section tone="ink">
        <Reveal>
          <p className="eyebrow">Why Zest</p>
          <h2 className="mt-6 max-w-3xl text-4xl leading-tight sm:text-5xl">Dedicated to our clients, committed to the rule of law.</h2>
        </Reveal>
        <div className="mt-16 grid gap-12 md:grid-cols-3">
          {pillars.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.1} className="border-t border-paper/15 pt-8">
              <h3 className="text-2xl">{p.title}</h3>
              <p className="mt-4 leading-relaxed text-paper/65">{p.body}</p>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Thought leadership */}
      <Section>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <img
              src={asset('/images/brand/afba-conference.jpg')}
              alt="Speaking at the African Bar Association (AFBA) conference podium"
              loading="lazy"
              className="aspect-[4/5] w-full object-cover object-top sm:aspect-[4/3]"
            />
          </Reveal>
          <Reveal delay={0.1}>
            <p className="eyebrow">Thought leadership</p>
            <h2 className="mt-6 text-4xl leading-tight sm:text-5xl">A voice in Africa’s legal conversation.</h2>
            <p className="mt-6 text-lg leading-relaxed text-muted">
              At the 2025 Annual Conference of the African Bar Association in Accra, our Managing Partner presented{' '}
              <em className="text-ink">“Navigating Customs, Excise and Taxation Bottlenecks Towards Improving Trade in Africa”</em>.
              It is one of more than twenty papers he has delivered to bar associations, regulators and public institutions.
            </p>
            <ul className="mt-8 divide-y divide-line border-y border-line">
              {[
                ['Aug 2026', 'Dr. Chinedu Obienu inaugurated to the Governing Council of the Legal Aid Council of Nigeria by the Attorney General of the Federation'],
                ['Oct 2025', 'Zest Partners facilitated dispute-resolution training for staff of the Federal Airports Authority of Nigeria'],
                ['2025', 'Co-editor, The Bar, Bench and Good Governance in Africa: Legal Essays in Honour of Afam Osigwe, SAN'],
              ].map(([when, what]) => (
                <li key={when} className="grid grid-cols-[5.5rem_1fr] gap-4 py-4 text-sm">
                  <span className="font-semibold text-brass">{when}</span>
                  <span className="text-ink/80">{what}</span>
                </li>
              ))}
            </ul>
            <ButtonLink to="/people/$slug" params={{ slug: 'chinedu-obienu' }} hash="speaking" variant="ghost" className="mt-8">
              Talks & publications
            </ButtonLink>
          </Reveal>
        </div>
      </Section>

      {/* People */}
      <Section tone="deep">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <Reveal>
            <p className="eyebrow">Leadership</p>
            <h2 className="mt-6 text-4xl leading-tight sm:text-5xl">Meet the partners.</h2>
          </Reveal>
          <ButtonLink to="/people" variant="ghost">
            Our people
          </ButtonLink>
        </div>
        <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {people.map((p) => (
            <PersonCard key={p.slug} person={p} />
          ))}
        </div>
      </Section>

      <CTASection />
    </>
  )
}
