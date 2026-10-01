import type { ReactNode } from 'react'
import { cn } from '~/lib/utils'

const shapes = {
  /** Classical arch (rounded top, square base): echoes the pillar in the ZP monogram. Used for portraits. */
  arch: 'rounded-t-[999px]',
  /** Two opposite corners strongly rounded. Used for library and office photography. */
  leaf: 'rounded-tl-[4rem] rounded-br-[4rem] sm:rounded-tl-[6rem] sm:rounded-br-[6rem]',
  circle: 'rounded-full',
} as const

/**
 * Clips its child (usually an <Img>) to a brand shape. With `frame`, a thin brass outline of the
 * same shape sits offset behind it.
 */
export function Shape({
  variant,
  frame = false,
  className,
  children,
}: {
  variant: keyof typeof shapes
  frame?: boolean
  className?: string
  children: ReactNode
}) {
  return (
    <div className={cn('relative isolate', frame && 'mr-3 mb-3 sm:mr-4 sm:mb-4', className)}>
      {frame && (
        <span
          aria-hidden
          className={cn('absolute inset-0 -z-10 translate-x-3 translate-y-3 border border-brass sm:translate-x-4 sm:translate-y-4', shapes[variant])}
        />
      )}
      <div className={cn('overflow-hidden bg-paper-deep', shapes[variant])}>{children}</div>
    </div>
  )
}
