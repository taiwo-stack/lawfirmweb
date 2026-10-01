import { createFileRoute } from '@tanstack/react-router'
import { NotFound } from '~/components/blocks/NotFound'

// Prerendered to /404 and copied to 404.html so GitHub Pages serves it for unknown URLs.
export const Route = createFileRoute('/404')({
  head: () => ({ meta: [{ title: 'Page not found | Zest Partners' }, { name: 'robots', content: 'noindex' }] }),
  component: NotFound,
})
