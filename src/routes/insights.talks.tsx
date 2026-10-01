import { createFileRoute } from '@tanstack/react-router'
import { InsightsHub, validateTopic } from '~/components/blocks/InsightsHub'
import { seo } from '~/lib/utils'

export const Route = createFileRoute('/insights/talks')({
  validateSearch: validateTopic,
  head: () => seo({ title: 'Talks & Papers', description: 'Papers presented by Zest Partners at conferences, retreats and training programmes.', path: '/insights/talks/' }),
  component: () => <InsightsHub kind="talk" topic={Route.useSearch().topic} />,
})
