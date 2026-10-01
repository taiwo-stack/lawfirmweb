import { createFileRoute, notFound } from '@tanstack/react-router'
import { Img } from '~/components/ui/Img'
import { Mail } from 'lucide-react'
import { Breadcrumbs } from '~/components/blocks/Breadcrumbs'
import type { ReactNode } from 'react'
import { Container, Section } from '~/components/ui/Container'
import { Reveal } from '~/components/ui/Reveal'
import { CTASection } from '~/components/blocks/CTASection'
import { displayName, personBySlug, type Person, type Talk } from '~/content/people'
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

type Block = { id: string; label: string; render: () => ReactNode }

function blocksFor(p: Person): Block[] {
  const blocks: (Block | false)[] = [
    !!p.positions?.length && {
      id: 'leadership',
      label: 'Leadership',
      render: () => (
        <ul className="divide-y divide-line border-y border-line">
          {p.positions!.map((x) => (
            <li key={x.role + x.org} className="grid gap-1 py-4 sm:grid-cols-[1fr_auto] sm:gap-6">
              <p>
                <span className="font-semibold">{x.role}</span>
                <span className="text-muted"> · {x.org}</span>
              </p>
              <p className="text-sm text-muted tabular-nums">{x.period}</p>
            </li>
          ))}
        </ul>
      ),
    },
    !!(p.books?.length || p.articles?.length) && {
      id: 'publications',
      label: 'Publications',
      render: () => (
        <div className="space-y-10">
          {[
            { label: 'Books', items: p.books ?? [] },
            { label: 'Articles', items: p.articles ?? [] },
          ]
            .filter((g) => g.items.length)
            .map((g) => (
              <div key={g.label}>
                <h3 className="text-xs font-semibold tracking-[0.2em] text-brass uppercase">{g.label}</h3>
                <ul className="mt-4 space-y-5">
                  {g.items.map((b) => (
                    <li key={b.title} className="border-l-2 border-brass pl-5">
                      <p className="font-display text-xl leading-snug italic">{b.title}</p>
                      <p className="mt-1 text-sm text-muted">{b.detail}</p>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
        </div>
      ),
    },
    !!p.academic?.length && {
      id: 'academic',
      label: 'Academic work',
      render: () => (
        <ul className="space-y-5">
          {p.academic!.map((a) => (
            <li key={a.title}>
              <p className="font-display text-xl leading-snug italic">{a.title}</p>
              <p className="mt-1 text-sm text-muted">{a.detail}</p>
            </li>
          ))}
        </ul>
      ),
    },
    !!p.legislative?.length && {
      id: 'legislative',
      label: 'Legislative work',
      render: () => (
        <ul className="divide-y divide-line border-y border-line">
          {p.legislative!.map((l) => (
            <li key={l.detail} className="py-4">
              <p className="font-semibold">{l.role}</p>
              <p className="mt-1 text-ink/75">{l.detail}</p>
            </li>
          ))}
        </ul>
      ),
    },
    !!p.talks?.length && {
      id: 'speaking',
      label: 'Speaking',
      render: () => <TalkTimeline talks={p.talks!} />,
    },
  ]
  return blocks.filter(Boolean) as Block[]
}

function TalkTimeline({ talks }: { talks: Talk[] }) {
  const byYear = new Map<string, Talk[]>()
  for (const t of [...talks].sort((a, b) => b.date.localeCompare(a.date))) {
    const y = t.date.slice(0, 4)
    byYear.set(y, [...(byYear.get(y) ?? []), t])
  }
  return (
    <div className="space-y-10">
      <p className="text-muted">{talks.length} papers presented at conferences, retreats and training programmes.</p>
      {[...byYear].map(([year, items]) => (
        <div key={year} className="grid gap-4 sm:grid-cols-[5rem_1fr]">
          <p className="font-display text-3xl text-brass">{year}</p>
          <ul className="space-y-5 border-l border-line pl-6">
            {items.map((t) => (
              <li key={t.title} className="relative">
                <span className="absolute top-2.5 -left-[1.6rem] size-2 rounded-full bg-brass" aria-hidden />
                <p className="font-semibold leading-snug">“{t.title}”</p>
                <p className="mt-1 text-sm text-muted">
                  {t.event} · {t.when}
                </p>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}

function PersonPage() {
  const person = Route.useLoaderData()
  const blocks = blocksFor(person)
  const name = displayName(person)

  return (
    <>
      <section className="border-b border-line bg-paper">
        <Container className="pt-10 pb-16 sm:pt-14 sm:pb-20">
          <Breadcrumbs items={[{ label: 'Our People', to: '/people/' }, { label: name }]} />
          <div className="mt-10 grid items-end gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="rise lg:col-span-5">
              <Img src={person.photo} alt={name} priority sizes="(min-width: 1024px) 40vw, 100vw" className="aspect-[4/5] w-full object-cover object-top" />
            </div>
            <div className="rise lg:col-span-7">
              <p className="eyebrow">{person.role}</p>
              <h1 className="mt-6 text-5xl leading-[1.02] sm:text-7xl">{name}</h1>
              {person.credentials && (
                <p className="mt-5 text-lg tracking-wide text-muted">{person.credentials.join(' · ')}</p>
              )}
              {person.focus && (
                <ul className="mt-8 flex flex-wrap gap-2">
                  {person.focus.map((f) => (
                    <li key={f} className="rounded-full border border-line px-4 py-1.5 text-sm">
                      {f}
                    </li>
                  ))}
                </ul>
              )}
              <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm">
                {person.office && <span className="text-muted">{person.office} office</span>}
                {person.email && (
                  <a href={`mailto:${person.email}`} className="inline-flex items-center gap-2 border-b border-ink pb-0.5 hover:text-green">
                    <Mail className="size-4" aria-hidden /> {person.email}
                  </a>
                )}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {person.highlights && (
        <div className="border-b border-line bg-ink text-paper">
          <Container className="grid grid-cols-2 lg:grid-cols-4">
            {person.highlights.map((h) => (
              <div key={h.label} className="border-paper/10 py-8 lg:border-l lg:px-8 lg:first:border-l-0 lg:first:pl-0">
                <p className="font-display text-3xl text-brass-soft sm:text-4xl">{h.value}</p>
                <p className="mt-2 text-sm text-paper/65">{h.label}</p>
              </div>
            ))}
          </Container>
        </div>
      )}

      <Section>
        <div className="grid gap-16 lg:grid-cols-12">
          <Reveal className="lg:col-span-8">
            <p className="eyebrow mb-8">Profile</p>
            <div className="prose-firm">
              {person.bio.map((b) => (
                <p key={b.slice(0, 32)}>{b}</p>
              ))}
            </div>
          </Reveal>
          {blocks.length > 1 && (
            <nav aria-label="Profile sections" className="hidden lg:col-span-3 lg:col-start-10 lg:block">
              <div className="sticky top-32 border-l border-line pl-6">
                <p className="text-xs font-semibold tracking-[0.2em] text-muted uppercase">On this page</p>
                <ul className="mt-4 space-y-3 text-sm">
                  {blocks.map((b) => (
                    <li key={b.id}>
                      <a href={`#${b.id}`} className="hover:text-green">
                        {b.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </nav>
          )}
        </div>
      </Section>

      {blocks.map((b, i) => (
        <Section key={b.id} id={b.id} tone={i % 2 ? 'paper' : 'deep'}>
          <div className="grid gap-10 lg:grid-cols-12">
            <Reveal className="lg:col-span-4">
              <p className="font-display text-sm text-brass">{String(i + 1).padStart(2, '0')}</p>
              <h2 className="mt-3 text-3xl sm:text-4xl">{b.label}</h2>
            </Reveal>
            <Reveal delay={0.05} className="lg:col-span-8">
              {b.render()}
            </Reveal>
          </div>
        </Section>
      ))}

      <CTASection title={`Contact ${name}.`} />
    </>
  )
}
