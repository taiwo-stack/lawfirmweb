import { createFileRoute, Link, notFound } from '@tanstack/react-router'
import { Container, Section } from '~/components/ui/Container'
import { Breadcrumbs } from '~/components/blocks/Breadcrumbs'
import { InsightCard } from '~/components/blocks/InsightCard'
import { PersonCard } from '~/components/blocks/PersonCard'
import { CTASection } from '~/components/blocks/CTASection'
import { news, newsBySlug } from '~/content/news'
import { insights } from '~/content/insights'
import { personBySlug } from '~/content/people'
import { topics } from '~/content/topics'
import { site } from '~/content/site'
import { asset, seo } from '~/lib/utils'

export const Route = createFileRoute('/insights/$slug')({
  loader: ({ params }) => {
    const item = newsBySlug(params.slug)
    if (!item) throw notFound()
    return item
  },
  head: ({ loaderData }) =>
    loaderData
      ? {
          ...seo({ title: loaderData.title, description: loaderData.summary, image: loaderData.image, path: `/insights/${loaderData.slug}` }),
          scripts: [
            {
              type: 'application/ld+json',
              children: JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'NewsArticle',
                headline: loaderData.title,
                datePublished: loaderData.date,
                description: loaderData.summary,
                publisher: { '@type': 'Organization', name: site.name, url: site.url },
              }),
            },
          ],
        }
      : {},
  component: NewsPage,
})

function NewsPage() {
  const item = Route.useLoaderData()
  const related = insights
    .filter((i) => i.id !== `news-${item.slug}` && i.topics.some((t) => item.topics.includes(t)))
    .slice(0, 3)
  const idx = news.findIndex((n) => n.slug === item.slug)
  const [newer, older] = [news[idx - 1], news[idx + 1]]

  return (
    <>
      <section className="border-b border-line bg-paper">
        <Container className="pt-10 pb-14">
          <Breadcrumbs items={[{ label: 'Insights', link: { to: '/insights' }, path: '/insights' }, { label: 'Firm news' }]} />
          <div className="rise mx-auto mt-14 max-w-3xl">
            <p className="eyebrow">Firm news · {item.when}</p>
            <h1 className="mt-6 text-4xl leading-[1.08] sm:text-5xl">{item.title}</h1>
            <p className="mt-6 text-xl leading-relaxed text-muted">{item.summary}</p>
            <ul className="mt-8 flex flex-wrap gap-2">
              {item.topics.map((t) => (
                <li key={t}>
                  <Link to="/insights" search={{ topic: t }} className="rounded-full border border-line px-3 py-1 text-xs hover:border-ink">
                    {topics[t]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      <Section>
        <article className="mx-auto max-w-3xl">
          {item.image && (
            <img src={asset(item.image)} alt={item.imageAlt ?? ''} className="mb-12 aspect-[16/10] w-full object-cover object-top" />
          )}
          <div className="prose-firm">
            {item.body.map((p) => (
              <p key={p.slice(0, 32)}>{p}</p>
            ))}
          </div>
          {item.people.length > 0 && (
            <div className="mt-14 border-t border-line pt-10">
              <p className="text-xs font-semibold tracking-[0.15em] text-muted uppercase">People</p>
              <div className="mt-6 grid max-w-xs gap-8">
                {item.people.map((s) => {
                  const p = personBySlug(s)
                  return p ? <PersonCard key={s} person={p} /> : null
                })}
              </div>
            </div>
          )}
          <nav aria-label="More news" className="mt-14 grid gap-4 border-t border-line pt-8 sm:grid-cols-2">
            {newer ? (
              <Link to="/insights/$slug" params={{ slug: newer.slug }} className="group">
                <span className="text-xs text-muted">← Newer</span>
                <span className="mt-1 block font-display text-lg group-hover:text-green">{newer.title}</span>
              </Link>
            ) : (
              <span />
            )}
            {older && (
              <Link to="/insights/$slug" params={{ slug: older.slug }} className="group sm:text-right">
                <span className="text-xs text-muted">Older →</span>
                <span className="mt-1 block font-display text-lg group-hover:text-green">{older.title}</span>
              </Link>
            )}
          </nav>
        </article>
      </Section>

      {related.length > 0 && (
        <Section tone="deep">
          <h2 className="text-3xl">Related insights</h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((i) => (
              <InsightCard key={i.id} item={i} />
            ))}
          </div>
        </Section>
      )}
      <CTASection />
    </>
  )
}
