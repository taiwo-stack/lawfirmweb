import { site, type RoutePath } from '~/content/site'

/** A crumb links to a route (optionally a section `hash`); the last crumb is the current page. */
export type Crumb = { label: string; to?: RoutePath; hash?: string }

/**
 * schema.org BreadcrumbList for search engines only. The site is at most two levels deep and every
 * page is already oriented by the main menu, section tabs and in-page links, so no visible trail is shown.
 */
export function Breadcrumbs({ items }: { items: Crumb[] }) {
  const all: Crumb[] = [{ label: 'Home', to: '/' }, ...items]
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: all.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.label,
      ...(c.to && !c.hash ? { item: site.url + c.to } : {}),
    })),
  }
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
}
