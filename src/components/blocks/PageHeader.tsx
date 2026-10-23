import type { ReactNode } from 'react'
import { Container } from '~/components/ui/Container'
import { Img } from '~/components/ui/Img'
import { cn } from '~/lib/utils'
import { Breadcrumbs, type Crumb } from './Breadcrumbs'

/** Page title block. With `image`, it becomes a dark banner over that photo (like the home hero). */
export function PageHeader({
  eyebrow,
  title,
  intro,
  crumbs,
  image,
  children,
}: {
  eyebrow: string
  title: ReactNode
  intro?: string
  crumbs?: Crumb[]
  image?: string
  children?: ReactNode
}) {
  return (
    <section
      className={cn(
        'relative isolate overflow-hidden border-b pt-10 pb-16 sm:pt-12 sm:pb-20',
        image ? 'border-ink bg-ink text-paper sm:pb-28' : 'border-line bg-paper',
      )}
    >
      {image && (
        <>
          <Img src={image} alt="" priority className="absolute inset-0 -z-20 size-full object-cover opacity-35" />
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink via-ink/80 to-ink/40" />
        </>
      )}
      <Container>
        {crumbs && <Breadcrumbs items={crumbs} />}
        <div className={cn('rise pt-6 sm:pt-12', image && 'sm:pt-20')}>
          <p className="eyebrow">{eyebrow}</p>
          <h1 className="mt-6 max-w-4xl text-4xl leading-[1.05] sm:text-6xl">{title}</h1>
          {intro && <p className={cn('mt-6 max-w-2xl text-lg leading-relaxed', image ? 'text-paper/75' : 'text-muted')}>{intro}</p>}
          {children}
        </div>
      </Container>
    </section>
  )
}
