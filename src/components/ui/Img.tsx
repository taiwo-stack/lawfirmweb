import type { ImgHTMLAttributes } from 'react'
import manifest from '~/content/images.json'
import { asset } from '~/lib/utils'

type Entry = { w: number; h: number; variants: number[] }
const images = manifest as Record<string, Entry>

type Props = Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'srcSet' | 'width' | 'height'> & {
  /** Original path under /public, e.g. "/images/brand/library-wide.jpg". */
  src: string
  /** How wide the image renders, for the browser to pick a variant. Defaults to full viewport width. */
  sizes?: string
  /** Above-the-fold images load eagerly with high priority. */
  priority?: boolean
}

/**
 * Responsive image: serves WebP variants from scripts/optimize-images.py via srcset,
 * with intrinsic width/height so the layout never shifts while loading.
 */
export function Img({ src, sizes = '100vw', priority, alt = '', ...rest }: Props) {
  const entry = images[src]
  if (!entry) return <img src={asset(src)} alt={alt} loading={priority ? 'eager' : 'lazy'} decoding="async" {...rest} />
  const base = src.replace(/\.(jpe?g|png)$/i, '')
  const srcSet = entry.variants.map((w) => `${asset(`${base}-${w}.webp`)} ${w}w`).join(', ')
  const fallback = asset(`${base}-${entry.variants[entry.variants.length - 1]}.webp`)
  return (
    <img
      src={fallback}
      srcSet={srcSet}
      sizes={sizes}
      width={entry.w}
      height={entry.h}
      alt={alt}
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : undefined}
      decoding="async"
      {...rest}
    />
  )
}
