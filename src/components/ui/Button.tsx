import { createLink } from '@tanstack/react-router'
import { ArrowRight } from 'lucide-react'
import { forwardRef, type AnchorHTMLAttributes, type ReactNode } from 'react'
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

const ButtonAnchorBase = forwardRef<HTMLAnchorElement, Common & AnchorHTMLAttributes<HTMLAnchorElement>>(
  ({ variant = 'primary', className, children, arrow = true, ...rest }, ref) => (
    <a ref={ref} {...rest} className={cn(base, styles[variant], className)}>
      <Inner arrow={arrow}>{children}</Inner>
    </a>
  ),
)

/** Router link styled as a button; accepts every typed `<Link>` prop (to, params, hash, search). */
export const ButtonLink = createLink(ButtonAnchorBase)

/** External or non-route link styled as a button. */
export function ButtonAnchor({ external, ...props }: Common & { href: string; external?: boolean }) {
  return <ButtonAnchorBase {...props} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})} />
}
