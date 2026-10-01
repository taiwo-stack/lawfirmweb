import { clsx, type ClassValue } from 'clsx'
import { site } from '~/content/site'

export const cn = (...inputs: ClassValue[]) => clsx(inputs)

/** Prefix a /public path with the deploy base (e.g. /lawfirmweb/ on github.io). */
export const asset = (path: string) => import.meta.env.BASE_URL.replace(/\/$/, '') + path

type SeoInput = { title?: string; description?: string; image?: string; path?: string }

export function seo({ title, description = site.description, image = '/images/brand/og.jpg', path = '/' }: SeoInput) {
  const fullTitle = title ? `${title} | ${site.name}` : `${site.name} | Law Firm in Abuja & Lagos, Nigeria`
  const url = site.url + path.replace(/\/?$/, '/')
  const img = site.url + image
  return {
    meta: [
      { title: fullTitle },
      { name: 'description', content: description },
      { property: 'og:type', content: 'website' },
      { property: 'og:site_name', content: site.name },
      { property: 'og:title', content: fullTitle },
      { property: 'og:description', content: description },
      { property: 'og:url', content: url },
      { property: 'og:image', content: img },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: fullTitle },
      { name: 'twitter:description', content: description },
      { name: 'twitter:image', content: img },
    ],
    links: [{ rel: 'canonical', href: url }],
  }
}
