import { createFileRoute, Link, notFound } from '@tanstack/react-router'
import { ArrowLeft, ArrowRight, Check, Mail, Phone } from 'lucide-react'
import { Container, Section } from '~/components/ui/Container'
import { Reveal } from '~/components/ui/Reveal'
import { ButtonLink } from '~/components/ui/Button'
import { Breadcrumbs } from '~/components/blocks/Breadcrumbs'
import { InsightCard } from '~/components/blocks/InsightCard'
import { CTASection } from '~/components/blocks/CTASection'
import { groupId, practiceBySlug, practices } from '~/content/practices'
import { displayName, personBySlug } from '~/content/people'
import { insightsForTopics } from '~/content/insights'
import { site } from '~/content/site'
import { asset, seo } from '~/lib/utils'

export const Route = createFileRoute('/practice-areas/$slug')({
  loader: ({ params }) => {
    const practice = practiceBySlug(params.slug)
    if (!practice) throw notFound()
    return practice
  },
  head: ({ loaderData }) =>
    loaderData
      ? {
          ...seo({ title: loaderData.title, description: loaderData.summary, path: `/practice-areas/${loaderData.slug}` }),
          scripts: [
            {
              type: 'application/ld+json',
              children: JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'Service',
                name: loaderData.title,
                description: loaderData.summary,
                serviceType: loaderData.group,
                provider: { '@type': 'LegalService', name: site.name, url: site.url },
                areaServed: 'NG',
              }),
            },
          ],
        }
      : {},
  component: PracticePage,
})

function PracticePage() {
  const practice = Route.useLoaderData()
  const related = practices.filter((p) => p.group === practice.group && p.slug !== practice.slug)
  const lead = personBySlug(practice.lead ?? 'chinedu-obienu')
  const talks = insightsForTopics(practice.topics, 3)
  const i = practices.findIndex((p) => p.slug === practice.slug)
  const prev = practices[(i - 1 + practices.length) % practices.length]
  const next = practices[(i + 1) % practices.length]

  return (
    <>
      <section className="relative isolate overflow-hidden bg-ink text-paper">
        <img src={asset(practice.image)} alt="" className="absolute inset-0 -z-20 size-full object-cover opacity-25" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/85 to-ink/50" />
        <Container className="pt-10 pb-20 sm:pb-24">
          <Breadcrumbs
            tone="dark"
            items={[
              { label: 'Expertise', link: { to: '/practice-areas' }, path: '/practice-areas' },
              { label: practice.group, link: { to: '/practice-areas', hash: groupId(practice.group) } },
              { label: practice.title },
            ]}
          />
          <div className="rise mt-14 sm:mt-20">
            <p className="eyebrow">{practice.group}</p>
            <h1 className="mt-6 max-w-4xl text-4xl leading-[1.05] sm:text-6xl">{practice.title}</h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-paper/75">{practice.summary}</p>
          </div>
        </Container>
      </section>

      <Section>
        <div className="grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="eyebrow mb-8">Overview</p>
              <div className="prose-firm">
                {practice.body.map((para) => (
                  <p key={para.slice(0, 32)}>{para}</p>
                ))}
              </div>
            </Reveal>

            {practice.services && (
              <Reveal className="mt-14">
                <h2 className="text-3xl">How we help</h2>
                <ul className="mt-8 grid gap-x-8 sm:grid-cols-2">
                  {practice.services.map((s) => (
                    <li key={s} className="flex gap-3 border-b border-line py-3.5 text-ink/85">
                      <Check className="mt-0.5 size-5 shrink-0 text-green" aria-hidden />
                      {s}
                    </li>
                  ))}
                </ul>
              </Reveal>
            )}

            {practice.clients && (
              <Reveal className="mt-14">
                <h2 className="text-3xl">Who we act for</h2>
                <ul className="mt-8 flex flex-wrap gap-2">
                  {practice.clients.map((c) => (
                    <li key={c} className="rounded-full border border-line bg-paper-deep px-4 py-2 text-sm">
                      {c}
                    </li>
                  ))}
                </ul>
              </Reveal>
            )}
          </div>

          <aside className="lg:col-span-5">
            <div className="space-y-6 lg:sticky lg:top-32">
              {lead && (
                <div className="border border-line bg-paper-deep p-8">
                  <p className="text-xs font-semibold tracking-[0.15em] text-muted uppercase">Key contact</p>
                  <Link to="/people/$slug" params={{ slug: lead.slug }} className="group mt-5 flex items-center gap-5">
                    <img src={asset(lead.photo)} alt="" className="size-20 shrink-0 object-cover object-top grayscale group-hover:grayscale-0" />
                    <span>
                      <span className="block font-display text-xl group-hover:text-green">{displayName(lead)}</span>
                      <span className="mt-1 block text-sm text-muted">{lead.role}</span>
                      {lead.credentials && <span className="mt-1 block text-xs text-muted">{lead.credentials.join(' · ')}</span>}
                    </span>
                  </Link>
                  <div className="mt-6 space-y-2 border-t border-line pt-6 text-sm">
                    <a href={`tel:${site.phones[0].replace(/\s/g, '')}`} className="flex items-center gap-3 hover:text-green">
                      <Phone className="size-4 text-brass" aria-hidden /> {site.phones[0]}
                    </a>
                    {lead.email && (
                      <a href={`mailto:${lead.email}`} className="flex items-center gap-3 break-all hover:text-green">
                        <Mail className="size-4 shrink-0 text-brass" aria-hidden /> {lead.email}
                      </a>
                    )}
                  </div>
                  <ButtonLink to="/contact" className="mt-6 w-full justify-center">
                    Book a consultation
                  </ButtonLink>
                </div>
              )}
              {related.length > 0 && (
                <div className="border border-line p-8">
                  <p className="text-xs font-semibold tracking-[0.15em] text-muted uppercase">Also in {practice.group}</p>
                  <ul className="mt-4 divide-y divide-line">
                    {related.map((p) => (
                      <li key={p.slug}>
                        <Link
                          to="/practice-areas/$slug"
                          params={{ slug: p.slug }}
                          className="flex items-center justify-between gap-4 py-3 text-sm hover:text-green"
                        >
                          {p.title} <ArrowRight className="size-4 shrink-0 text-ink/30" aria-hidden />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </aside>
        </div>
      </Section>

      {talks.length > 0 && (
        <Section tone="deep">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="eyebrow">Thought leadership</p>
              <h2 className="mt-6 text-3xl sm:text-4xl">Related talks & publications</h2>
            </div>
            <ButtonLink to="/insights" search={{ topic: practice.topics[0] }} variant="ghost">
              More insights
            </ButtonLink>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {talks.map((t) => (
              <InsightCard key={t.id} item={t} />
            ))}
          </div>
        </Section>
      )}

      <nav aria-label="Practice areas" className="border-t border-line bg-paper">
        <Container className="grid sm:grid-cols-2">
          <Link to="/practice-areas/$slug" params={{ slug: prev.slug }} className="group flex items-center gap-4 border-line py-8 sm:border-r sm:pr-8">
            <ArrowLeft className="size-5 shrink-0 text-brass transition-transform group-hover:-translate-x-1" aria-hidden />
            <span>
              <span className="block text-xs text-muted">Previous</span>
              <span className="font-display text-xl">{prev.title}</span>
            </span>
          </Link>
          <Link
            to="/practice-areas/$slug"
            params={{ slug: next.slug }}
            className="group flex items-center justify-end gap-4 border-t border-line py-8 text-right sm:border-t-0 sm:pl-8"
          >
            <span>
              <span className="block text-xs text-muted">Next</span>
              <span className="font-display text-xl">{next.title}</span>
            </span>
            <ArrowRight className="size-5 shrink-0 text-brass transition-transform group-hover:translate-x-1" aria-hidden />
          </Link>
        </Container>
      </nav>

      <CTASection />
    </>
  )
}
