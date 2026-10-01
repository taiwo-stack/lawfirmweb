import { Link, type LinkProps } from '@tanstack/react-router'
import { ArrowRight } from 'lucide-react'
import type { ReactNode } from 'react'
import { cn } from '~/lib/utils'

type Variant = 'primary' | 'ghost' | 'light'

const styles: Record<Variant, string> = {
  primary: 'bg-ink text-paper hover:bg-green',
  ghost: 'border border-ink/20 text-ink hover:border-ink hover:bg-ink hover:text-paper',
  light: 'bg-paper text-ink hover:bg-brass-soft',
}

const base =
  'group inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-colors duration-300'

type Common = { variant?: Variant; className?: string; children: ReactNode; arrow?: boolean }

function Inner({ children, arrow }: Pick<Common, 'children' | 'arrow'>) {
  return (
    <>
      {children}
      {arrow && <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />}
    </>
  )
}

export function ButtonLink({ variant = 'primary', className, children, arrow = true, ...link }: Common & LinkProps) {
  return (
    <Link {...link} className={cn(base, styles[variant], className)}>
      <Inner arrow={arrow}>{children}</Inner>
    </Link>
  )
}

export function ButtonAnchor({
  variant = 'primary',
  className,
  children,
  arrow = true,
  href,
  external,
}: Common & { href: string; external?: boolean }) {
  return (
    <a
      href={href}
      className={cn(base, styles[variant], className)}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      <Inner arrow={arrow}>{children}</Inner>
    </a>
  )
}
