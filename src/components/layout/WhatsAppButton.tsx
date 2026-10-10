import { MessageCircle } from 'lucide-react'
import { site } from '~/content/site'

export function WhatsAppButton() {
  if (!site.whatsapp) return null
  return (
    <aside aria-label="Quick contact">
    <a
      href={site.whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed right-5 bottom-5 z-40 inline-flex size-14 items-center justify-center rounded-full bg-green text-paper shadow-lg shadow-ink/20 transition-transform hover:scale-105"
    >
      <MessageCircle className="size-6" aria-hidden />
    </a>
    </aside>
  )
}
