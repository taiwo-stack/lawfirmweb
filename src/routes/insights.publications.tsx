import { createFileRoute } from '@tanstack/react-router'
import { InsightsHub, validateTopic } from '~/components/blocks/InsightsHub'
import { seo } from '~/lib/utils'

export const Route = createFileRoute('/insights/publications')({
  validateSearch: validateTopic,
  head: () => seo({ title: 'Publications', description: 'Books, journal articles and academic works by Zest Partners lawyers.', path: '/insights/publications/' }),
  component: () => <InsightsHub kind="publication" topic={Route.useSearch().topic} />,
})
