import { Link } from '@tanstack/react-router'
import type { NavChild } from '~/content/site'
import { Container } from '~/components/ui/Container'

/** Sticky tab bar linking sibling pages within a section (e.g. The Firm). */
export function SectionTabs({ items, label }: { items: NavChild[]; label: string }) {
  return (
    <div className="sticky top-[64px] z-30 border-b border-line bg-paper/95 backdrop-blur md:top-[100px]">
      <Container>
        <nav aria-label={label} className="-mb-px flex gap-8 overflow-x-auto">
          {items.map((t) => (
            <Link
              key={t.label}
              to={t.to}
              search={t.search}
              activeOptions={{ exact: true, includeSearch: !!t.search }}
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
