import type { ReactNode } from 'react'
import { Container } from '~/components/ui/Container'
import { Breadcrumbs, type Crumb } from './Breadcrumbs'

export function PageHeader({
  eyebrow,
  title,
  intro,
  crumbs,
  children,
}: {
  eyebrow: string
  title: ReactNode
  intro?: string
  crumbs?: Crumb[]
  children?: ReactNode
}) {
  return (
    <section className="relative overflow-hidden border-b border-line bg-paper pt-10 pb-16 sm:pt-12 sm:pb-20">
      <Container>
        {crumbs && <Breadcrumbs items={crumbs} />}
        <div className="rise pt-6 sm:pt-12">
          <p className="eyebrow">{eyebrow}</p>
          <h1 className="mt-6 max-w-4xl text-4xl leading-[1.05] sm:text-6xl">{title}</h1>
          {intro && <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">{intro}</p>}
          {children}
        </div>
      </Container>
    </section>
  )
}
