import { createFileRoute, Link, notFound } from '@tanstack/react-router'
import { ArrowLeft, Check } from 'lucide-react'
import { Container, Section } from '~/components/ui/Container'
import { Reveal } from '~/components/ui/Reveal'
import { ButtonLink } from '~/components/ui/Button'
import { PracticeCard } from '~/components/blocks/PracticeCard'
import { CTASection } from '~/components/blocks/CTASection'
import { practiceBySlug, practices } from '~/content/practices'
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
      ? seo({ title: loaderData.title, description: loaderData.summary, path: `/practice-areas/${loaderData.slug}` })
      : {},
  component: PracticePage,
})

function PracticePage() {
  const practice = Route.useLoaderData()
  const related = practices.filter((p) => p.group === practice.group && p.slug !== practice.slug).slice(0, 3)

  return (
    <>
      <section className="relative isolate overflow-hidden bg-ink text-paper">
        <img src={asset(practice.image)} alt="" className="absolute inset-0 -z-20 size-full object-cover opacity-25" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/80 to-ink/40" />
        <Container className="pt-16 pb-20 sm:pt-24 sm:pb-28">
          <div className="rise">
            <Link to="/practice-areas" className="inline-flex items-center gap-2 text-sm text-paper/70 hover:text-paper">
              <ArrowLeft className="size-4" aria-hidden /> All practice areas
            </Link>
            <p className="eyebrow mt-10">{practice.group}</p>
            <h1 className="mt-6 max-w-4xl text-4xl leading-[1.05] sm:text-6xl">{practice.title}</h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-paper/75">{practice.summary}</p>
          </div>
        </Container>
      </section>

      <Section>
        <div className="grid gap-16 lg:grid-cols-12">
          <Reveal className="prose-firm lg:col-span-7">
            {practice.body.map((para) => (
              <p key={para.slice(0, 32)}>{para}</p>
            ))}
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-5">
            <aside className="border border-line bg-paper-deep p-8 lg:sticky lg:top-32">
              {practice.services && (
                <>
                  <h2 className="text-2xl">How we help</h2>
                  <ul className="mt-6 space-y-3">
                    {practice.services.map((s) => (
                      <li key={s} className="flex gap-3 text-ink/85">
                        <Check className="mt-0.5 size-5 shrink-0 text-green" aria-hidden />
                        {s}
                      </li>
                    ))}
                  </ul>
                  <hr className="my-8 border-line" />
                </>
              )}
              <p className="text-sm text-muted">Speak with the team about your matter.</p>
              <p className="mt-2 font-display text-2xl">{site.phones[0]}</p>
              <ButtonLink to="/contact" className="mt-6 w-full justify-center">
                Book a consultation
              </ButtonLink>
            </aside>
          </Reveal>
        </div>
      </Section>

      {related.length > 0 && (
        <Section tone="deep">
          <h2 className="text-3xl">Related practice areas</h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => (
              <PracticeCard key={p.slug} practice={p} />
            ))}
          </div>
        </Section>
      )}

      <CTASection />
    </>
  )
}
