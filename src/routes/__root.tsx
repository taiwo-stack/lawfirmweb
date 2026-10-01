/// <reference types="vite/client" />
import { HeadContent, Outlet, Scripts, createRootRoute } from '@tanstack/react-router'
import type { ReactNode } from 'react'
import appCss from '~/styles/app.css?url'
import { Header } from '~/components/layout/Header'
import { Footer } from '~/components/layout/Footer'
import { WhatsAppButton } from '~/components/layout/WhatsAppButton'
import { NotFound } from '~/components/blocks/NotFound'
import { site } from '~/content/site'
import { asset, seo } from '~/lib/utils'

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LegalService',
  name: site.name,
  url: site.url,
  logo: `${site.url}/images/brand/logo.jpg`,
  description: site.description,
  foundingDate: String(site.founded),
  telephone: site.phones[0],
  email: site.emails[0],
  areaServed: 'NG',
  address: {
    '@type': 'PostalAddress',
    streetAddress: site.address.lines.join(', '),
    addressLocality: site.address.locality,
    addressCountry: site.address.country,
  },
}

export const Route = createRootRoute({
  head: () => {
    const base = seo({})
    return {
      meta: [
        { charSet: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'theme-color', content: '#0e1116' },
        ...base.meta,
      ],
      links: [
        { rel: 'stylesheet', href: appCss },
        { rel: 'icon', href: asset('/favicon.png'), type: 'image/png' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300..600&family=Inter:wght@400;500;600&display=swap',
        },
      ],
      scripts: [
        // Enables reveal animations only when JS runs; without it, content stays visible.
        { children: "document.documentElement.classList.add('js')" },
        { type: 'application/ld+json', children: JSON.stringify(jsonLd) },
      ],
    }
  },
  shellComponent: RootDocument,
  component: () => <Outlet />,
  notFoundComponent: NotFound,
})

function RootDocument({ children }: { children: ReactNode }) {
  return (
    <html lang="en-NG" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body>
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:bg-ink focus:px-4 focus:py-2 focus:text-paper">
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <WhatsAppButton />
        <Scripts />
      </body>
    </html>
  )
}
