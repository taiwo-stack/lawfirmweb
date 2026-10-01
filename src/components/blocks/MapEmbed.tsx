import { MapPin } from 'lucide-react'
import { site } from '~/content/site'

/**
 * Google Map of the Abuja office with the address overlaid. The iframe is lazy-loaded,
 * so it only loads as the visitor scrolls towards it (keeps the page fast).
 */
export function MapEmbed() {
  return (
    <div className="relative size-full">
      <iframe
        title="Map of the Zest Partners Abuja office"
        src={site.mapEmbed}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="size-full grayscale"
      />
      <address className="pointer-events-none absolute top-14 left-4 flex max-w-[calc(100%-2rem)] gap-3 bg-ink/90 p-5 text-sm leading-relaxed text-paper not-italic shadow-lg sm:top-6 sm:right-6 sm:left-auto sm:p-6">
        <MapPin className="mt-0.5 size-5 shrink-0 text-brass" aria-hidden />
        <span>
          {site.address.lines.map((l) => (
            <span key={l} className="block">
              {l}
            </span>
          ))}
        </span>
      </address>
    </div>
  )
}
