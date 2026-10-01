import { createFileRoute } from '@tanstack/react-router'
import { InsightsHub, validateTopic } from '~/components/blocks/InsightsHub'
import { seo } from '~/lib/utils'

export const Route = createFileRoute('/insights/talks')({
  validateSearch: validateTopic,
  head: () => seo({ title: 'Speaking', description: 'Papers presented by the Zest Partners Managing Partner at conferences, retreats and training programmes since 2007.', path: '/insights/talks/' }),
  component: () => <InsightsHub kind="talk" topic={Route.useSearch().topic} />,
})
