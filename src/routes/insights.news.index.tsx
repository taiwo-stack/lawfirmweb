import { createFileRoute } from '@tanstack/react-router'
import { InsightsHub, validateTopic } from '~/components/blocks/InsightsHub'
import { seo } from '~/lib/utils'

export const Route = createFileRoute('/insights/news/')({
  validateSearch: validateTopic,
  head: () => seo({ title: 'Firm News', description: 'Appointments, events and announcements from Zest Partners.', path: '/insights/news/' }),
  component: () => <InsightsHub kind="news" topic={Route.useSearch().topic} />,
})
