import { createFileRoute, Link, notFound } from '@tanstack/react-router'
import { ArrowRight, Mail, Phone } from 'lucide-react'
import type { ReactNode } from 'react'
import { Img } from '~/components/ui/Img'
import { Container } from '~/components/ui/Container'
import { ButtonLink } from '~/components/ui/Button'
import { Breadcrumbs } from '~/components/blocks/Breadcrumbs'
import { CTASection } from '~/components/blocks/CTASection'
import { PublicationList, TalkTimeline } from '~/components/blocks/InsightLists'
import { displayName, isCurrent, personBySlug, type Person } from '~/content/people'
import { practiceBySlug } from '~/content/practices'
import { insights } from '~/content/insights'
import { news } from '~/content/news'
import { site } from '~/content/site'
import { seo } from '~/lib/utils'

export const Route = createFileRoute('/people/$slug')({
  loader: ({ params }) => {
    const person = personBySlug(params.slug)
    if (!person) throw notFound()
    return person
  },
  head: ({ loaderData }) =>
    loaderData
      ? {
          ...seo({
            title: `${displayName(loaderData)}, ${loaderData.role}`,
            description: loaderData.bio[0],
            image: loaderData.photo,
            path: `/people/${loaderData.slug}`,
          }),
          scripts: [
            {
              type: 'application/ld+json',
              children: JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'Person',
                name: loaderData.name,
                honorificPrefix: loaderData.honorific,
                jobTitle: loaderData.role,
                email: loaderData.email,
                image: site.url + loaderData.photo,
                worksFor: { '@type': 'LegalService', name: site.name, url: site.url },
                memberOf: loaderData.positions?.map((p) => ({ '@type': 'Organization', name: p.org })),
              }),
            },
          ],
        }
      : {},
  component: PersonPage,
})

type Block = { id: string; label: string; body: ReactNode }

function Positions({ list }: { list: NonNullable<Person['positions']> }) {
  return (
    <ul className="divide-y divide-line border-y border-line">
      {list.map((x) => (
        <li key={x.role + x.org} className="grid gap-1 py-4 sm:grid-cols-[1fr_auto] sm:gap-6">
          <p>
            <span className="font-semibold">{x.role}</span>
            <span className="text-muted"> · {x.org}</span>
          </p>
          <p className="text-sm text-muted tabular-nums">{x.period}</p>
        </li>
      ))}
    </ul>
  )
}

function blocksFor(p: Person): Block[] {
  const mine = insights.filter((i) => i.authorSlug === p.slug)
  const talks = mine.filter((i) => i.kind === 'talk')
  const pubs = mine.filter((i) => i.kind === 'publication')
  const areas = (p.practices ?? []).map(practiceBySlug).filter((x) => x !== undefined)
  const current = (p.positions ?? []).filter((x) => isCurrent(x.period))
  const past = (p.positions ?? []).filter((x) => !isCurrent(x.period))
  const sub = 'mb-4 font-sans text-xs font-semibold tracking-[0.2em] text-brass uppercase'

  const blocks: (Block | false)[] = [
    {
      id: 'overview',
      label: 'Overview',
      body: (
        <div className="prose-firm">
          {p.bio.map((b) => (
            <p key={b.slice(0, 32)}>{b}</p>
          ))}
        </div>
      ),
    },
    areas.length > 0 && {
      id: 'practice-areas',
      label: 'Practice areas',
      body: (
        <ul className="grid gap-3 sm:grid-cols-2">
          {areas.map((a) => (
            <li key={a.slug} className="border border-line bg-paper">
              <Link
                to="/practice-areas/$slug/"
                params={{ slug: a.slug }}
                className="group flex h-full items-center justify-between gap-4 p-5 transition-colors hover:bg-paper-deep"
              >
                <span>
                  <span className="block text-xs text-muted">{a.group}</span>
                  <span className="mt-1 block font-display text-xl group-hover:text-green">{a.title}</span>
                </span>
                <ArrowRight className="size-4 shrink-0 text-ink/30 group-hover:text-brass" aria-hidden />
              </Link>
            </li>
          ))}
        </ul>
      ),
    },
    !!p.memberships?.length && {
      id: 'credentials',
      label: 'Credentials & memberships',
      body: (
        <ul className="grid gap-x-8 sm:grid-cols-2">
          {p.memberships.map((m) => (
            <li key={m} className="flex gap-3 border-b border-line py-3 text-ink/85">
              <span className="mt-2 size-1.5 shrink-0 rounded-full bg-brass" aria-hidden />
              {m}
            </li>
          ))}
        </ul>
      ),
    },
    !!p.positions?.length && {
      id: 'appointments',
      label: 'Appointments',
      body: (
        <div className="space-y-10">
          {current.length > 0 && (
            <div>
              <h3 className={sub}>Current</h3>
              <Positions list={current} />
            </div>
          )}
          {past.length > 0 && (
            <div>
              <h3 className={sub}>Past</h3>
              <Positions list={past} />
            </div>
          )}
        </div>
      ),
    },
    pubs.length > 0 && { id: 'publications', label: 'Publications', body: <PublicationList items={pubs} /> },
    talks.length > 0 && {
      id: 'speaking',
      label: 'Selected speaking',
      body: (
        <>
          <TalkTimeline items={talks.slice(0, 6)} />
          {talks.length > 6 && (
            <ButtonLink to="/insights/talks/" variant="ghost" className="mt-10">
              All {talks.length} papers
            </ButtonLink>
          )}
        </>
      ),
    },
    !!p.legislative?.length && {
      id: 'legislative',
      label: 'Legislative work',
      body: (
        <ul className="divide-y divide-line border-y border-line">
          {p.legislative.map((l) => (
            <li key={l.detail} className="py-4">
              <p className="font-semibold">{l.role}</p>
              <p className="mt-1 text-ink/75">{l.detail}</p>
            </li>
          ))}
        </ul>
      ),
    },
    !!p.academic?.length && {
      id: 'education',
      label: 'Education & research',
      body: (
        <ul className="space-y-5">
          {p.academic.map((a) => (
            <li key={a.title}>
              <p className="font-display text-xl leading-snug italic">{a.title}</p>
              <p className="mt-1 text-sm text-muted">{a.detail}</p>
            </li>
          ))}
        </ul>
      ),
    },
  ]
  return blocks.filter((b): b is Block => !!b)
}

function PersonPage() {
  const person = Route.useLoaderData()
  const name = displayName(person)
  const blocks = blocksFor(person)
  const related = news.filter((n) => n.people.includes(person.slug))

  return (
    <>
      <section className="border-b border-line bg-paper">
        <Container className="pt-10 pb-16 sm:pb-20">
          <Breadcrumbs items={[{ label: 'Our People', to: '/people/' }, { label: name }]} />
          <div className="mt-2 grid items-end gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="rise lg:col-span-5">
              <Img src={person.photo} alt={name} priority sizes="(min-width: 1024px) 40vw, 100vw" className="aspect-[4/5] w-full object-cover object-top" />
            </div>
            <div className="rise lg:col-span-7">
              <p className="eyebrow">{person.role}</p>
              <h1 className="mt-6 text-5xl leading-[1.02] sm:text-7xl">{name}</h1>
              {person.credentials && <p className="mt-5 text-lg tracking-wide text-muted">{person.credentials.join(' · ')}</p>}
              {person.office && <p className="mt-2 text-muted">{person.office} office</p>}
            </div>
          </div>
        </Container>
      </section>

      {person.highlights && (
        <div className="border-b border-line bg-ink text-paper">
          <Container className="grid grid-cols-2 lg:grid-cols-4">
            {person.highlights.map((h) => (
              <div key={h.label} className="border-paper/10 py-8 lg:border-l lg:px-8 lg:first:border-l-0 lg:first:pl-0">
                <p className="font-display text-3xl text-brass sm:text-4xl">{h.value}</p>
                <p className="mt-2 text-sm text-paper/65">{h.label}</p>
              </div>
            ))}
          </Container>
        </div>
      )}

      <Container className="grid gap-16 py-16 sm:py-20 lg:grid-cols-12">
        <div className="space-y-20 lg:col-span-8">
          {blocks.map((b) => (
            <section key={b.id} id={b.id} aria-labelledby={`h-${b.id}`}>
              <h2 id={`h-${b.id}`} className="mb-8 border-b border-line pb-4 text-3xl">
                {b.label}
              </h2>
              {b.body}
            </section>
          ))}
          {related.length > 0 && (
            <section aria-labelledby="h-news">
              <h2 id="h-news" className="mb-8 border-b border-line pb-4 text-3xl">
                In the news
              </h2>
              <ul className="divide-y divide-line">
                {related.map((n) => (
                  <li key={n.slug}>
                    <Link to="/insights/news/$slug/" params={{ slug: n.slug }} className="group block py-4">
                      <span className="text-xs text-muted">{n.when}</span>
                      <span className="mt-1 block font-display text-xl group-hover:text-green">{n.title}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>

        <aside className="lg:col-span-4">
          <div className="space-y-6 lg:sticky lg:top-36">
            <div className="bg-ink p-8 text-paper">
              <p className="text-xs font-semibold tracking-[0.15em] text-brass uppercase">Contact</p>
              <p className="mt-4 font-display text-2xl">{name}</p>
              <div className="mt-6 space-y-3 text-sm">
                {person.email && (
                  <a href={`mailto:${person.email}`} className="flex items-center gap-3 break-all hover:text-brass-soft">
                    <Mail className="size-4 shrink-0 text-brass" aria-hidden /> {person.email}
                  </a>
                )}
                <a href={`tel:${site.phones[0].replace(/\s/g, '')}`} className="flex items-center gap-3 hover:text-brass-soft">
                  <Phone className="size-4 shrink-0 text-brass" aria-hidden /> {site.phones[0]}
                </a>
              </div>
            </div>
            {blocks.length > 2 && (
              <nav aria-label="Profile sections" className="hidden border-l border-line pl-6 lg:block">
                <p className="text-xs font-semibold tracking-[0.2em] text-muted uppercase">On this page</p>
                <ul className="mt-4 space-y-3 text-sm">
                  {blocks.map((b) => (
                    <li key={b.id}>
                      <a href={`#${b.id}`} className="hover:text-green">
                        {b.label}
                      </a>
                    </li>
                  ))}
                  {related.length > 0 && (
                    <li>
                      <a href="#h-news" className="hover:text-green">
                        In the news
                      </a>
                    </li>
                  )}
                </ul>
              </nav>
            )}
          </div>
        </aside>
      </Container>

      <CTASection title={`Contact ${name}.`} />
    </>
  )
}
