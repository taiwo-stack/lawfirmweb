import { ButtonAnchor, ButtonLink } from '~/components/ui/Button'
import { Container } from '~/components/ui/Container'
import { Reveal } from '~/components/ui/Reveal'
import { site } from '~/content/site'
import { asset } from '~/lib/utils'

export function CTASection({
  title = 'Tell us what you are facing.',
  body = 'Call, email, WhatsApp or send us a message to speak with a partner about your matter.',
}: {
  title?: string
  body?: string
}) {
  return (
    <section className="relative isolate overflow-hidden bg-ink text-paper">
      <img
        src={asset('/images/brand/library-wide.jpg')}
        alt=""
        loading="lazy"
        className="absolute inset-0 -z-10 size-full object-cover opacity-20"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink via-ink/90 to-ink/60" />
      <Container className="py-24 sm:py-32">
        <Reveal className="max-w-2xl">
          <p className="eyebrow">Consultation</p>
          <h2 className="mt-6 text-4xl leading-tight sm:text-5xl">{title}</h2>
          <p className="mt-6 text-lg text-paper/70">{body}</p>
          <div className="mt-10 flex flex-wrap gap-4">
            <ButtonLink to="/contact/" variant="light">
              Contact the firm
            </ButtonLink>
            <ButtonAnchor
              href={site.whatsapp}
              external
              variant="ghost"
              className="border-paper/30 text-paper hover:border-paper hover:bg-paper hover:text-ink"
            >
              WhatsApp us
            </ButtonAnchor>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
