/// <reference types="vite/client" />
import { HeadContent, Outlet, Scripts, createRootRoute, useRouter } from '@tanstack/react-router'
import type { ReactNode } from 'react'
import appCss from '~/styles/app.css?url'
import frauncesWoff2 from '@fontsource-variable/fraunces/files/fraunces-latin-opsz-normal.woff2?url'
import interWoff2 from '@fontsource-variable/inter/files/inter-latin-wght-normal.woff2?url'
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
        // Preload the two fonts used above the fold so text renders in the brand faces immediately.
        { rel: 'preload', href: frauncesWoff2, as: 'font', type: 'font/woff2', crossOrigin: 'anonymous' },
        { rel: 'preload', href: interWoff2, as: 'font', type: 'font/woff2', crossOrigin: 'anonymous' },
      ],
      scripts: [
        // Enables reveal animations only when JS runs; without it, content stays visible.
        { children: "document.documentElement.classList.add('js')" },
        { type: 'application/ld+json', children: JSON.stringify(jsonLd) },
      ],
    }
  },
  shellComponent: RootDocument,
  component: RootOutlet,
  notFoundComponent: NotFound,
})

// The SPA shell is published as 404.html, so it renders the not-found page directly.
function RootOutlet() {
  return useRouter().isShell() ? <NotFound /> : <Outlet />
}

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
