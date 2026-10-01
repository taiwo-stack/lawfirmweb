import { Link, type LinkProps } from '@tanstack/react-router'
import { ChevronRight } from 'lucide-react'
import { site } from '~/content/site'
import { cn } from '~/lib/utils'

export type Crumb = { label: string; link?: LinkProps; path?: string }

/** Visible breadcrumb trail plus schema.org BreadcrumbList for search engines. */
export function Breadcrumbs({ items, tone = 'light' }: { items: Crumb[]; tone?: 'light' | 'dark' }) {
  const all: Crumb[] = [{ label: 'Home', link: { to: '/' }, path: '/' }, ...items]
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: all.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.label,
      ...(c.path ? { item: site.url + c.path } : {}),
    })),
  }
  return (
    <nav aria-label="Breadcrumb">
      <ol className={cn('flex flex-wrap items-center gap-1.5 text-xs', tone === 'dark' ? 'text-paper/60' : 'text-muted')}>
        {all.map((c, i) => (
          <li key={c.label} className="inline-flex items-center gap-1.5">
            {i > 0 && <ChevronRight className="size-3 opacity-60" aria-hidden />}
            {c.link && i < all.length - 1 ? (
              <Link {...c.link} className={tone === 'dark' ? 'hover:text-paper' : 'hover:text-ink'}>
                {c.label}
              </Link>
            ) : (
              <span aria-current={i === all.length - 1 ? 'page' : undefined} className={tone === 'dark' ? 'text-paper/90' : 'text-ink'}>
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
