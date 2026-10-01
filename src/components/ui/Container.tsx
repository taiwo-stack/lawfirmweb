import type { ReactNode } from 'react'
import { cn } from '~/lib/utils'

export function Container({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn('mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8', className)}>{children}</div>
}

type SectionProps = { className?: string; children: ReactNode; tone?: 'paper' | 'deep' | 'ink'; id?: string }

export function Section({ className, children, tone = 'paper', id }: SectionProps) {
  const tones = { paper: 'bg-paper', deep: 'bg-paper-deep', ink: 'bg-ink text-paper' }
  return (
    <section id={id} className={cn('py-20 sm:py-28', tones[tone], className)}>
      <Container>{children}</Container>
    </section>
  )
}
