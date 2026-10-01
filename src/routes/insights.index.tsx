import { createFileRoute } from '@tanstack/react-router'
import { InsightsHub, validateTopic } from '~/components/blocks/InsightsHub'
import { seo } from '~/lib/utils'

export const Route = createFileRoute('/insights/')({
  validateSearch: validateTopic,
  head: () =>
    seo({
      title: 'News & Insights',
      description: 'Firm news, conference papers, books and articles from Zest Partners on tax, energy, dispute resolution and the legal profession.',
      path: '/insights/',
    }),
  component: () => <InsightsHub topic={Route.useSearch().topic} />,
})
