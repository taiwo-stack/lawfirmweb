import { createFileRoute } from '@tanstack/react-router'
import { Mail, MapPin, MessageCircle, Phone, Plus } from 'lucide-react'
import { Section } from '~/components/ui/Container'
import { Reveal } from '~/components/ui/Reveal'
import { PageHeader } from '~/components/blocks/PageHeader'
import { ContactForm } from '~/components/blocks/ContactForm'
import { MapEmbed } from '~/components/blocks/MapEmbed'
import { site } from '~/content/site'
import { seo } from '~/lib/utils'

export const Route = createFileRoute('/contact')({
  head: () =>
    seo({
      title: 'Contact',
      description: `Contact Zest Partners in Kaura District, Abuja. Call ${site.phones[0]} or send us a message.`,
      path: '/contact/',
    }),
  component: Contact,
})

const faqs = [
  {
    q: 'How do I book a consultation?',
    a: `Send us a message using the form, call ${site.phones.join(' or ')}, email ${site.emails[0]}, or message us on WhatsApp.`,
  },
  {
    q: 'Where are your offices?',
    a: `Our main office is at ${site.address.lines.join(', ')}. We also have an office in Lagos, run by our Partner Edwin Nneamaka Uzoma.`,
  },
  {
    q: 'Do you act outside Abuja and Lagos?',
    a: 'Yes. The firm handles civil and criminal litigation for clients across various states of Nigeria, and advises local and foreign companies.',
  },
  {
    q: 'Do you offer free legal services?',
    a: 'Our Human Rights and Public Interest Litigation department offers free services to poor and indigent citizens whose rights have been grossly infringed but who have no resources to pursue their grievances.',
  },
  {
    q: 'Can you deliver training for our organisation?',
    a: 'Yes. We design and facilitate workshops and training, for example a two-day dispute resolution programme for the Federal Airports Authority of Nigeria in October 2025.',
  },
  {
    q: 'Is information I send through this website confidential?',
    a: 'Please do not send confidential details until we have confirmed that we can act for you. Contacting us does not by itself create a lawyer–client relationship.',
  },
]

function Contact() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Feel free to ask. We are here."
        intro="Send us a message, call, email or reach us on WhatsApp."
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
      <Section tone="deep">
        <div className="grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <p className="eyebrow">FAQs</p>
            <h2 className="mt-6 text-4xl leading-tight">Before you get in touch</h2>
          </Reveal>
          <Reveal delay={0.05} className="lg:col-span-8">
            <div className="divide-y divide-line border-y border-line">
              {faqs.map((f) => (
                <details key={f.q} className="group py-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-lg font-medium">
                    {f.q}
                    <Plus className="size-5 shrink-0 text-brass transition-transform group-open:rotate-45" aria-hidden />
                  </summary>
                  <p className="mt-4 max-w-2xl leading-relaxed text-ink/75">{f.a}</p>
                </details>
              ))}
            </div>
          </Reveal>
        </div>
      </Section>
      <div className="h-[420px] border-t border-line bg-paper-deep">
        <MapEmbed />
      </div>
    </>
  )
}
