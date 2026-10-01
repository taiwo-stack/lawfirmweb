import { createFileRoute } from '@tanstack/react-router'
import { Mail, MapPin, MessageCircle, Phone } from 'lucide-react'
import { Section } from '~/components/ui/Container'
import { Reveal } from '~/components/ui/Reveal'
import { PageHeader } from '~/components/blocks/PageHeader'
import { ContactForm } from '~/components/blocks/ContactForm'
import { site } from '~/content/site'
import { seo } from '~/lib/utils'

export const Route = createFileRoute('/contact')({
  head: () =>
    seo({
      title: 'Contact',
      description: `Contact Zest Partners in Kaura District, Abuja. Call ${site.phones[0]} or send us a message.`,
      path: '/contact',
    }),
  component: Contact,
})

function Contact() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Let’s talk about your matter."
        intro="Send us a message, call, or reach us on WhatsApp. A member of the firm will respond promptly."
      />
      <Section>
        <div className="grid gap-16 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <h2 className="text-3xl">Send a message</h2>
            <div className="mt-10">
              <ContactForm />
            </div>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-5">
            <div className="space-y-8 bg-ink p-8 text-paper sm:p-10">
              <div className="flex gap-4">
                <MapPin className="mt-1 size-5 shrink-0 text-brass" aria-hidden />
                <address className="not-italic">
                  <p className="text-xs font-semibold tracking-[0.2em] text-brass uppercase">Abuja office</p>
                  <p className="mt-2 leading-relaxed text-paper/80">
                    {site.address.lines.map((l) => (
                      <span key={l} className="block">
                        {l}
                      </span>
                    ))}
                  </p>
                </address>
              </div>
              <div className="flex gap-4">
                <Phone className="mt-1 size-5 shrink-0 text-brass" aria-hidden />
                <div>
                  <p className="text-xs font-semibold tracking-[0.2em] text-brass uppercase">Phone</p>
                  {site.phones.map((p) => (
                    <a key={p} href={`tel:${p.replace(/\s/g, '')}`} className="mt-2 block text-paper/80 hover:text-paper">
                      {p}
                    </a>
                  ))}
                </div>
              </div>
              <div className="flex gap-4">
                <Mail className="mt-1 size-5 shrink-0 text-brass" aria-hidden />
                <div>
                  <p className="text-xs font-semibold tracking-[0.2em] text-brass uppercase">Email</p>
                  {site.emails.map((e) => (
                    <a key={e} href={`mailto:${e}`} className="mt-2 block break-all text-paper/80 hover:text-paper">
                      {e}
                    </a>
                  ))}
                </div>
              </div>
              <a
                href={site.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 rounded-full bg-green px-6 py-3.5 text-sm font-semibold hover:bg-green/85"
              >
                <MessageCircle className="size-5" aria-hidden /> Chat on WhatsApp
              </a>
            </div>
          </Reveal>
        </div>
      </Section>
      <div className="h-[420px] border-t border-line bg-paper-deep">
        <iframe
          title="Map of the Zest Partners Abuja office"
          src={site.mapEmbed}
          className="size-full grayscale"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </>
  )
}
