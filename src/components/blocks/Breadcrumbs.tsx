import { Link } from '@tanstack/react-router'
import { ChevronRight } from 'lucide-react'
import { site, type RoutePath } from '~/content/site'
import { cn } from '~/lib/utils'

/** A crumb links to a route (optionally a section `hash`); the last crumb is the current page. */
export type Crumb = { label: string; to?: RoutePath; hash?: string }

/** Visible breadcrumb trail plus schema.org BreadcrumbList for search engines. */
export function Breadcrumbs({ items, tone = 'light' }: { items: Crumb[]; tone?: 'light' | 'dark' }) {
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
  return (
    <nav aria-label="Breadcrumb">
      <ol className={cn('flex flex-wrap items-center gap-1.5 text-xs', tone === 'dark' ? 'text-paper/60' : 'text-muted')}>
        {all.map((c, i) => (
          <li key={c.label} className="inline-flex items-center gap-1.5">
            {i > 0 && <ChevronRight className="size-3 opacity-60" aria-hidden />}
            {c.to && i < all.length - 1 ? (
              <Link to={c.to} hash={c.hash} className={tone === 'dark' ? 'hover:text-paper' : 'hover:text-ink'}>
                {c.label}
              </Link>
            ) : (
              <span aria-current={i === all.length - 1 ? 'page' : undefined} className={cn('line-clamp-1', tone === 'dark' ? 'text-paper/90' : 'text-ink')}>
                {c.label}
              </span>
            )}
          </li>
        ))}
      </ol>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </nav>
  )
}
