import { createFileRoute, Link } from '@tanstack/react-router'
import { Img } from '~/components/ui/Img'
import { ArrowUpRight } from 'lucide-react'
import { ButtonLink } from '~/components/ui/Button'
import { Container, Section } from '~/components/ui/Container'
import { Reveal } from '~/components/ui/Reveal'
import { CTASection } from '~/components/blocks/CTASection'
import { PersonCard } from '~/components/blocks/PersonCard'
import { PrincipalFeature } from '~/components/blocks/PrincipalFeature'
import { InsightCard } from '~/components/blocks/InsightCard'
import { RotatingText } from '~/components/blocks/RotatingText'
import { groupId, groups, practices } from '~/content/practices'
import { people } from '~/content/people'
import { insights } from '~/content/insights'
import { site } from '~/content/site'
import { seo } from '~/lib/utils'

export const Route = createFileRoute('/')({
  head: () => seo({ path: '/' }),
  component: Home,
})

const years = new Date().getFullYear() - site.founded
const talkCount = insights.filter((i) => i.kind === 'talk').length

const sectors = [
  'Commercial & investment banks',
  'Insurance & finance companies',
  'Private investment funds',
  'Public & private companies',
  'Government agencies',
  'Public institutions',
  'Development partners',
  'Families & individuals',
  'Indigent citizens (pro bono)',
]

// Every point is drawn from the old website or the Managing Partner's profile document.
const reasons = [
  {
    title: 'Solicitors and advocates',
    body: 'We prepare contracts, agreements, debentures, mortgages, powers of attorney and leases, and we litigate civil and criminal matters across Nigeria.',
  },
  {
    title: 'Recognised expertise',
    body: 'Led by a Managing Partner with a PhD in law, MCIArb (UK) and FICMC, who has presented more than twenty papers to bar associations and public institutions.',
  },
  {
    title: 'Modern, real-time practice',
    body: 'Modern, up-to-date IT facilities and real-time legal services, backed by an in-house law library.',
  },
  {
    title: 'Committed to the rule of law',
    body: 'Free services for poor and indigent citizens through our Human Rights and Public Interest Litigation department.',
  },
]

function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-ink text-paper">
        <Img
          src={'/images/brand/library-wide.jpg'}
          alt=""
          className="absolute inset-0 -z-20 size-full object-cover opacity-40"
          priority
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/70 to-ink/30" />
        <Container className="flex min-h-[min(86svh,900px)] flex-col justify-end pt-28 pb-14 sm:pb-20">
          <div className="rise">
            <p className="eyebrow">Welcome to Zest Partners · Est. {site.founded}</p>
            <h1 className="mt-8 max-w-5xl text-5xl leading-[1.04] font-light sm:text-7xl lg:text-8xl">
              Counsel for
              <RotatingText
                className="block text-brass-soft italic"
                items={['business.', 'disputes.', 'energy.', 'families.', 'justice.']}
              />
            </h1>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-paper/75 sm:text-xl">
              A full-service corporate practice and litigation firm, advising businesses, institutions and families across
              Nigeria from Abuja and Lagos.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <ButtonLink to="/contact/" variant="light">
                Book a consultation
              </ButtonLink>
              <ButtonLink
                to="/practice-areas/"
                variant="ghost"
                className="border-paper/30 text-paper hover:border-paper hover:bg-paper hover:text-ink"
              >
                Our expertise
              </ButtonLink>
            </div>
          </div>
          {/* Quick links to practice groups */}
          <ul className="mt-16 hidden grid-cols-5 border-t border-paper/15 lg:grid">
            {groups.map((g, i) => (
              <li key={g.name}>
                <Link
                  to="/practice-areas/"
                  hash={groupId(g.name)}
                  className="group flex items-center justify-between gap-2 border-r border-paper/15 py-5 pr-4 text-sm text-paper/70 last:border-r-0 hover:text-paper"
                >
                  <span>
                    <span className="mr-2 text-brass">{String(i + 1).padStart(2, '0')}</span>
                    {g.name}
                  </span>
                  <ArrowUpRight className="size-4 opacity-0 transition-opacity group-hover:opacity-100" aria-hidden />
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Stats */}
      <div className="border-b border-line bg-paper">
        <Container className="grid grid-cols-2 lg:grid-cols-4 lg:divide-x lg:divide-line">
          {[
            [`${years}+`, 'Years in practice'],
            [String(practices.length), 'Practice areas'],
            [`${talkCount}+`, 'Papers presented'],
            ['2', 'Offices: Abuja & Lagos'],
          ].map(([value, label]) => (
            <div key={label} className="py-8 lg:px-8 lg:first:pl-0">
              <p className="font-display text-3xl sm:text-4xl">{value}</p>
              <p className="mt-2 text-sm text-muted">{label}</p>
            </div>
          ))}
        </Container>
      </div>

      {/* The firm */}
      <Section>
        <div className="grid items-center gap-12 md:grid-cols-12 lg:gap-20">
          <Reveal className="md:col-span-7">
            <p className="eyebrow">About us</p>
            <h2 className="mt-6 text-4xl leading-tight sm:text-5xl">Corporate practice and litigation, since {site.founded}.</h2>
            <div className="mt-10 grid gap-8 sm:grid-cols-2">
              <div className="border-t-2 border-ink pt-5">
                <p className="text-xs font-semibold tracking-[0.15em] text-brass uppercase">Our vision</p>
                <p className="mt-3 font-display text-xl leading-snug">{site.vision}</p>
              </div>
              <div className="border-t-2 border-ink pt-5">
                <p className="text-xs font-semibold tracking-[0.15em] text-brass uppercase">Our mission</p>
                <p className="mt-3 font-display text-xl leading-snug">{site.mission}</p>
              </div>
            </div>
            <div className="prose-firm mt-10">
              <p>
                Zest Partners is a full-service corporate practice and litigation law firm established in Nigeria. We are
                professionals across contracts, debt and loan recovery, corporate compliance and financial services, criminal
                law, election petitions, wills and probate, human rights, intellectual property, interpretation of foreign
                documents, property law, and matrimonial causes, with a selection of lawyers of outstanding training and
                experience.
              </p>
            </div>
            <ButtonLink to="/about/" variant="ghost" className="mt-2">
              Read more about the firm
            </ButtonLink>
          </Reveal>
          <Reveal delay={0.15} className="md:col-span-5">
            <div className="relative">
              <Img
                src={'/images/brand/library-tall.jpg'}
                alt="Nigerian Supreme Court Cases and Nigerian Weekly Law Reports in the firm’s library"
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

      {/* Expertise */}
      <Section tone="deep">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <Reveal>
            <p className="eyebrow">Expertise</p>
            <h2 className="mt-6 max-w-2xl text-4xl leading-tight sm:text-5xl">Five practice groups. {practices.length} practice areas.</h2>
          </Reveal>
          <ButtonLink to="/practice-areas/" variant="ghost">
            View all {practices.length} practice areas
          </ButtonLink>
        </div>
        <div className="mt-14 grid gap-px border border-line bg-line md:grid-cols-2 lg:grid-cols-5">
          {groups.map((g, i) => (
            <Reveal key={g.name} delay={i * 0.06} className="bg-paper-deep">
              <div className="flex h-full flex-col gap-6 p-6">
                <Link to="/practice-areas/" hash={groupId(g.name)} className="group">
                  <span className="font-display text-sm text-brass">{String(i + 1).padStart(2, '0')}</span>
                  <h3 className="mt-4 text-2xl leading-tight group-hover:text-green">{g.name}</h3>
                </Link>
                <p className="text-sm leading-relaxed text-muted">{g.blurb}</p>
                <ul className="mt-auto space-y-1.5 border-t border-line pt-5 text-sm">
                  {practices
                    .filter((p) => p.group === g.name)
                    .map((p) => (
                      <li key={p.slug}>
                        <Link to="/practice-areas/$slug/" params={{ slug: p.slug }} className="-my-1 block py-1 hover:text-green">
                          {p.title}
                        </Link>
                      </li>
                    ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Who we act for + how we work */}
      <Section tone="ink">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
          <Reveal>
            <p className="eyebrow">Who we act for</p>
            <h2 className="mt-6 text-4xl leading-tight sm:text-5xl">From boardrooms to the most vulnerable.</h2>
            <ul className="mt-10 flex flex-wrap gap-2">
              {sectors.map((s) => (
                <li key={s} className="rounded-full border border-paper/20 px-4 py-2 text-sm text-paper/85">
                  {s}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="eyebrow">Why Zest Partners</p>
            <ol className="mt-8 space-y-px">
              {reasons.map((s, i) => (
                <li key={s.title} className="grid grid-cols-[3rem_1fr] gap-4 border-t border-paper/15 py-6">
                  <span className="font-display text-2xl text-brass">{String(i + 1).padStart(2, '0')}</span>
                  <div>
                    <h3 className="text-2xl">{s.title}</h3>
                    <p className="mt-2 leading-relaxed text-paper/65">{s.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </Section>

      {/* Infrastructure */}
      <Section>
        <div className="grid items-end gap-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <p className="eyebrow">Infrastructure</p>
            <h2 className="mt-6 text-4xl leading-tight sm:text-5xl">A law library and modern technology.</h2>
            <p className="mt-6 text-lg leading-relaxed text-muted">
              Our in-house library holds Nigerian and English law reports and authorities, and our modern IT facilities let us
              deliver legal services in real time.
            </p>
            <ButtonLink to="/about/facilities/" variant="ghost" className="mt-8">
              Facilities & library
            </ButtonLink>
          </Reveal>
          <Reveal delay={0.1} className="grid grid-cols-3 gap-3 lg:col-span-7">
            {['/images/office/exterior-1.jpg', '/images/office/library-1.jpg', '/images/office/library-3.jpg'].map((src, i) => (
              <Img
                key={src}
                src={src}
                alt={i === 0 ? 'The Zest Partners office, Abuja' : 'The Zest Partners law library'}
                sizes="(min-width: 1024px) 20vw, 33vw"
                className={`aspect-[3/5] w-full object-cover ${i === 1 ? 'lg:-translate-y-10' : ''}`}
              />
            ))}
          </Reveal>
        </div>
      </Section>

      {/* News & insights */}
      <Section tone="deep">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <Reveal>
            <p className="eyebrow">News & insights</p>
            <h2 className="mt-6 text-4xl leading-tight sm:text-5xl">A voice in Africa’s legal conversation.</h2>
          </Reveal>
          <ButtonLink to="/insights/" variant="ghost">
            All insights
          </ButtonLink>
        </div>
        <div className="mt-14 grid gap-4 lg:grid-cols-3">
          <Reveal className="lg:row-span-2">
            <Link
              to="/insights/news/$slug/"
              params={{ slug: 'afba-2025-accra' }}
              className="group relative flex h-full min-h-[420px] flex-col justify-end overflow-hidden bg-ink p-8 text-paper"
            >
              <Img
                src={'/images/brand/afba-conference.jpg'}
                alt=""
                className="absolute inset-0 size-full object-cover object-top opacity-60 transition duration-700 group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/50 to-transparent" />
              <div className="relative">
                <p className="text-xs font-semibold tracking-[0.15em] text-brass-soft uppercase">Featured</p>
                <h3 className="mt-4 font-display text-2xl leading-snug">
                  A paper at the African Bar Association Annual Conference, Accra
                </h3>
              </div>
            </Link>
          </Reveal>
          {insights
            .filter((i) => i.kind === 'news' && i.id !== 'news-afba-2025-accra')
            .slice(0, 2)
            .concat(insights.filter((i) => i.kind !== 'news').slice(0, 2))
            .map((item, i) => (
              <Reveal key={item.id} delay={i * 0.05} className="h-full">
                <InsightCard item={item} />
              </Reveal>
            ))}
        </div>
      </Section>

      {/* People */}
      <Section>
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <Reveal>
            <p className="eyebrow">Leadership</p>
            <h2 className="mt-6 text-4xl leading-tight sm:text-5xl">Our leadership.</h2>
          </Reveal>
          <ButtonLink to="/people/" variant="ghost">
            Our people
          </ButtonLink>
        </div>
        <div className="mt-14 space-y-16">
          {people
            .filter((p) => p.group === 'Principal')
            .map((p) => (
              <PrincipalFeature key={p.slug} person={p} />
            ))}
          {people.some((p) => p.group !== 'Principal') && (
            <div>
              <h3 className="border-b border-line pb-4 font-sans text-xs font-semibold tracking-[0.2em] text-muted uppercase">Partners</h3>
              <div className="mt-10 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
                {people
                  .filter((p) => p.group !== 'Principal')
                  .map((p) => (
                    <PersonCard key={p.slug} person={p} />
                  ))}
              </div>
            </div>
          )}
        </div>
      </Section>

      <CTASection title="Feel free to ask. We are here." />
    </>
  )
}
