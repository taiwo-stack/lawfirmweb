import { createFileRoute } from '@tanstack/react-router'
import { NotFound } from '~/components/blocks/NotFound'

// Internal: the SPA shell is prerendered from this unlinked route (so no menu item is active)
// and published as 404.html by scripts/postbuild.ts. It is never served at /shell/.
export const Route = createFileRoute('/shell')({
  component: NotFound,
})
