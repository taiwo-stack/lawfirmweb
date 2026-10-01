import { MapPin } from 'lucide-react'
import { useState } from 'react'
import { site } from '~/content/site'

/**
 * Click-to-load Google Map. The iframe pulls in heavy third-party scripts, so it is only
 * loaded when the visitor asks for it (faster page, and no request to Google without consent).
 */
export function MapEmbed() {
  const [show, setShow] = useState(false)
  const directions = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.address.lines.join(', '))}`

  if (show) {
    return (
      <iframe
        title="Map of the Zest Partners Abuja office"
        src={site.mapEmbed}
        className="size-full grayscale"
        referrerPolicy="no-referrer-when-downgrade"
      />
    )
  }

  return (
    <div className="flex size-full flex-col items-center justify-center gap-6 px-4 text-center">
      <MapPin className="size-8 text-brass" aria-hidden />
      <address className="font-display text-2xl not-italic">
        {site.address.lines.map((l) => (
          <span key={l} className="block">
            {l}
          </span>
        ))}
      </address>
      <div className="flex flex-wrap justify-center gap-3">
        <button
          type="button"
          onClick={() => setShow(true)}
          className="rounded-full bg-ink px-6 py-3 text-sm font-semibold text-paper transition-colors hover:bg-green"
        >
          Show map
        </button>
        <a
          href={directions}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full border border-ink/20 px-6 py-3 text-sm font-semibold transition-colors hover:border-ink hover:bg-ink hover:text-paper"
        >
          Open in Google Maps
        </a>
      </div>
      <p className="max-w-sm text-xs text-muted">Loading the map connects to Google.</p>
    </div>
  )
}
