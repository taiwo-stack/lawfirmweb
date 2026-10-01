import { Link } from '@tanstack/react-router'
import { asset, cn } from '~/lib/utils'

// TODO: swap for the vector (SVG) logo once supplied; the JPG is blended to drop its black background.
export function Logo({ tone = 'light', className }: { tone?: 'light' | 'dark'; className?: string }) {
  return (
    <Link to="/" aria-label="Zest Partners — home" className={cn('inline-flex shrink-0 items-center', className)}>
      <img
        src={asset('/images/brand/logo.jpg')}
        alt="Zest Partners"
        width={1068}
        height={549}
        className={cn('h-10 w-auto sm:h-12', tone === 'light' ? 'logo-on-light' : 'logo-on-dark')}
      />
    </Link>
  )
}
