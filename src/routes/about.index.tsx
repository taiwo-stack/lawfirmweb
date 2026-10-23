import { createFileRoute, Link } from '@tanstack/react-router'
import { BookOpen, Building2, MonitorSmartphone } from 'lucide-react'
import { Img } from '~/components/ui/Img'
import { Section } from '~/components/ui/Container'
import { Reveal } from '~/components/ui/Reveal'
import { ButtonLink } from '~/components/ui/Button'
import { PageHeader } from '~/components/blocks/PageHeader'
import { CTASection } from '~/components/blocks/CTASection'
import { groupId, groups, practices } from '~/content/practices'
import { history } from '~/content/history'
import { personBySlug } from '~/content/people'
import { site } from '~/content/site'
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

const pillars = [
  {
    icon: BookOpen,
    title: 'Law library',
    body: 'An in-house library of law reports and authorities, including Nigerian Supreme Court Cases, the Nigerian Weekly Law Reports, the All England Law Reports and Halsbury’s Laws of England.',
  },
  {
    icon: MonitorSmartphone,
    title: 'Modern IT',
    body: 'The firm is equipped with modern, up-to-date IT facilities and provides legal services in real time, which makes it easy to deliver world-class service to our clients.',
  },
  {
    icon: Building2,
    title: 'Our office',
    body: `Our Abuja office is at ${site.address.lines.join(', ')}. The firm also runs an office in Lagos.`,
  },
]

const gallery = [
  { src: '/images/brand/library-wide.jpg', alt: 'All England Law Reports and Halsbury’s Laws of England', span: 'sm:col-span-2' },
  { src: '/images/office/exterior-1.jpg', alt: 'The Zest Partners office building, Abuja', span: 'sm:row-span-2' },
  { src: '/images/brand/library-tall.jpg', alt: 'Nigerian Supreme Court Cases and Nigerian Weekly Law Reports', span: 'sm:row-span-2' },
  { src: '/images/office/library-1.jpg', alt: 'Law reports in the library', span: '' },
  { src: '/images/office/library-2.jpg', alt: 'Bound law reports on library shelves', span: '' },
  { src: '/images/office/exterior-2.jpg', alt: 'Entrance to the Zest Partners office', span: '' },
  { src: '/images/office/library-3.jpg', alt: 'Shelves of the Zest Partners library', span: 'sm:col-span-3' },
]

const mp = personBySlug('chinedu-obienu')!
const barService = mp.positions!.filter((p) => /bar|nba|legal aid|clasfon|community policing/i.test(`${p.org} ${p.role}`))

function About() {
  return (
    <>
      <PageHeader
        eyebrow="The firm"
        image="/images/brand/library-wide.jpg"
        title={
          <>
            Established {site.founded}. <span className="text-paper/60">Corporate practice and litigation.</span>
          </>
        }
        intro="Zest Partners is a full-service corporate practice and litigation law firm established in Nigeria, with a selection of lawyers of outstanding training and experience."
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
            <Img
              src={'/images/events/about-principal-podium.jpg'}
              alt="Dr. Chinedu Obienu speaking at the podium"
              sizes="(min-width: 1024px) 40vw, 100vw"
              // He stands left of centre in the landscape photo; keep him in the portrait crop.
              className="aspect-[4/5] w-full object-cover object-[35%_center] lg:sticky lg:top-40"
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
            <ButtonLink to="/about/" hash="history" variant="ghost" className="mt-2">
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
                  <Link to="/practice-areas/" hash={groupId(g.name)} className="inline-block py-1.5 text-xs font-semibold tracking-[0.15em] text-brass uppercase hover:text-green">
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

      <Section id="history">
        <Reveal>
          <p className="eyebrow">Our history</p>
          <h2 className="mt-6 max-w-3xl text-4xl leading-tight">
            {new Date().getFullYear() - site.founded} years of practice, scholarship and service.
          </h2>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
            From our founding in {site.founded} to a seat on the Governing Council of the Legal Aid Council of Nigeria: the
            milestones that shaped the firm and its leadership.
          </p>
        </Reveal>
        <ol className="relative mx-auto mt-16 max-w-4xl">
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
                <h3 className="mt-1 text-2xl sm:text-3xl">{h.title}</h3>
                <p className="mt-3 max-w-2xl leading-relaxed text-ink/75">{h.body}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </Section>

      <Section id="facilities" tone="deep">
        <Reveal>
          <p className="eyebrow">Facilities & library</p>
          <h2 className="mt-6 text-4xl leading-tight">Our office and law library.</h2>
        </Reveal>
        <div className="mt-12 grid gap-10 md:grid-cols-3">
          {pillars.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.08} className="border-t border-line pt-8">
              <p.icon className="size-7 text-brass" aria-hidden />
              <h3 className="mt-6 text-2xl">{p.title}</h3>
              <p className="mt-3 leading-relaxed text-ink/75">{p.body}</p>
            </Reveal>
          ))}
        </div>
        <div className="mt-16 grid auto-rows-[220px] gap-4 sm:grid-cols-3 sm:auto-rows-[260px]">
          {gallery.map((g) => (
            <figure key={g.src} className={`group overflow-hidden bg-paper ${g.span}`}>
              <Img
                src={g.src}
                alt={g.alt}
                sizes="(min-width: 640px) 33vw, 100vw"
                className="size-full object-cover transition duration-700 group-hover:scale-[1.04]"
              />
            </figure>
          ))}
        </div>
      </Section>

      <Section id="community">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <p className="eyebrow">Pro bono & community</p>
            <h2 className="mt-6 text-4xl leading-tight">Human Rights and Public Interest Litigation.</h2>
            <div className="prose-firm mt-8">
              <p>
                Public interest litigation is our corporate social responsibility and how we promote good governance and the
                rule of law in Nigeria. Our Human Rights and Public Interest Litigation department champions that cause.
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
              In August 2026, our Principal/Managing Partner was inaugurated to the Governing Council of the Legal Aid Council of
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
            <h2 className="mt-6 text-4xl leading-tight">Leadership positions held.</h2>
            <figure className="mt-10">
              <Img
                src={'/images/events/nba-abuja-law-week-2026-stage.jpg'}
                alt="Guests on stage at the NBA Abuja Branch 2026 Law Week"
                sizes="(min-width: 1024px) 30vw, 100vw"
                className="aspect-[3/2] w-full object-cover"
              />
              <figcaption className="mt-3 text-sm text-muted">
                NBA Abuja Branch 2026 Law Week. Dr. Chinedu Obienu chaired the Law Week Planning Committee.{' '}
                <Link to="/insights/news/$slug/" params={{ slug: 'nba-abuja-law-week-2026' }} className="font-semibold text-ink underline underline-offset-4 hover:text-green">
                  More photos
                </Link>
              </figcaption>
            </figure>
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
            <p className="mt-6 text-sm text-muted">Positions held by our Principal/Managing Partner, Dr. Chinedu Obienu.</p>
          </Reveal>
        </div>
      </Section>

      <CTASection />
    </>
  )
}
