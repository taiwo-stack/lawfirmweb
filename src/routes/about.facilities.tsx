import { createFileRoute } from '@tanstack/react-router'
import { Img } from '~/components/ui/Img'
import { BookOpen, Building2, MonitorSmartphone } from 'lucide-react'
import { Section } from '~/components/ui/Container'
import { Reveal } from '~/components/ui/Reveal'
import { PageHeader } from '~/components/blocks/PageHeader'
import { SectionTabs } from '~/components/blocks/SectionTabs'
import { CTASection } from '~/components/blocks/CTASection'
import { firmTabs, site } from '~/content/site'
import { seo } from '~/lib/utils'

export const Route = createFileRoute('/about/facilities')({
  head: () =>
    seo({
      title: 'Facilities & Library',
      description: 'The Zest Partners office in Kaura District, Abuja: our law library, reports collection and modern IT facilities.',
      path: '/about/facilities/',
    }),
  component: Facilities,
})

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

function Facilities() {
  return (
    <>
      <PageHeader
        crumbs={[{ label: 'The Firm', to: '/about/' }, { label: 'Facilities & library' }]}
        eyebrow="Facilities & library"
        title="The infrastructure behind our advice."
        intro="An in-house law library, modern IT facilities and our office in Kaura District, Abuja."
      />
      <SectionTabs items={firmTabs} label="The Firm" />

      <Section>
        <div className="grid gap-10 md:grid-cols-3">
          {pillars.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.08} className="border-t border-line pt-8">
              <p.icon className="size-7 text-brass" aria-hidden />
              <h2 className="mt-6 text-2xl">{p.title}</h2>
              <p className="mt-3 leading-relaxed text-ink/75">{p.body}</p>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section tone="deep">
        <Reveal>
          <p className="eyebrow">Gallery</p>
          <h2 className="mt-6 text-4xl">Inside Zest Partners</h2>
        </Reveal>
        <div className="mt-12 grid auto-rows-[220px] gap-4 sm:grid-cols-3 sm:auto-rows-[260px]">
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
      <CTASection title="Visit us in Abuja." body="Book a consultation at our office in Kaura District, or speak with us by phone or WhatsApp." />
    </>
  )
}
