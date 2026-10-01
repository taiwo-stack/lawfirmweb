import { createFileRoute } from '@tanstack/react-router'
import { Section } from '~/components/ui/Container'
import { PageHeader } from '~/components/blocks/PageHeader'
import { site } from '~/content/site'
import { seo } from '~/lib/utils'

export const Route = createFileRoute('/privacy')({
  head: () => seo({ title: 'Privacy Notice', path: '/privacy' }),
  component: Privacy,
})

// TODO: have the firm review this notice against the Nigeria Data Protection Act 2023.
function Privacy() {
  return (
    <>
      <PageHeader crumbs={[{ label: 'Privacy' }]} eyebrow="Legal" title="Privacy notice" />
      <Section>
        <div className="prose-firm max-w-3xl">
          <p>
            {site.name} respects your privacy. This notice explains how we handle personal information collected through
            this website, in line with the Nigeria Data Protection Act 2023.
          </p>
          <h2 className="mt-10 mb-4 text-2xl">What we collect</h2>
          <p>
            When you contact us, we collect the details you provide: your name, email address, phone number and the
            content of your message. We use them only to respond to your enquiry and, where appropriate, to take
            instructions.
          </p>
          <h2 className="mt-10 mb-4 text-2xl">How we use and share it</h2>
          <p>
            We do not sell your information. Form submissions are processed by our form provider solely to deliver
            your message to us. We keep enquiry data only as long as needed for the purpose it was provided for, or as
            the law requires.
          </p>
          <h2 className="mt-10 mb-4 text-2xl">Your rights</h2>
          <p>
            You may ask to access, correct or delete your personal information by emailing{' '}
            <a className="underline" href={`mailto:${site.emails[0]}`}>
              {site.emails[0]}
            </a>
            .
          </p>
          <h2 className="mt-10 mb-4 text-2xl">No legal advice</h2>
          <p>
            Content on this website is general information and does not constitute legal advice. Contacting us through
            this website does not by itself create a lawyer–client relationship.
          </p>
        </div>
      </Section>
    </>
  )
}
