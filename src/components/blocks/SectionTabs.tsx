import { Link } from '@tanstack/react-router'
import type { NavChild } from '~/content/site'
import { Container } from '~/components/ui/Container'

/** Sticky tab bar linking sibling pages within a section (The Firm, Insights). */
export function SectionTabs({ items, label }: { items: NavChild[]; label: string }) {
  return (
    <div className="sticky top-16 z-30 border-b border-line bg-paper/95 backdrop-blur sm:top-18 md:top-[6.75rem]">
      <Container>
        <nav aria-label={label} className="-mb-px flex gap-8 overflow-x-auto">
          {items.map((t) => (
            <Link
              key={t.label}
              to={t.to}
              activeOptions={{ exact: true, includeSearch: false }}
              className="shrink-0 border-b-2 border-transparent py-4 text-sm text-muted transition-colors hover:text-ink"
              activeProps={{ className: '!border-brass !text-ink font-semibold' }}
            >
              {t.label}
            </Link>
          ))}
        </nav>
      </Container>
    </div>
  )
}
