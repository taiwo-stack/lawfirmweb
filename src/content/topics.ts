export const topics = {
  tax: 'Taxation',
  energy: 'Energy & Petroleum',
  adr: 'Dispute Resolution',
  advocacy: 'Courts & Advocacy',
  drafting: 'Drafting & Legislation',
  ppp: 'PPP & Infrastructure',
  'capital-markets': 'Finance & Capital Markets',
  profession: 'The Legal Profession',
  policy: 'Public Policy',
} as const

export type Topic = keyof typeof topics

/** Keyword rules that tag talks and publications with topics. Order does not matter; an item can have several. */
const rules: [Topic, RegExp][] = [
  ['tax', /\btax|excise|customs|fiscal|revenue/i],
  ['energy', /petroleum|\bpia\b|oil and gas/i],
  ['adr', /arbitration|\badr\b|dispute|negotiation|industrial|labour|mediat/i],
  ['advocacy', /\bcourts?\b|advocacy|brief writing|case management|adjudication/i],
  ['drafting', /drafting|legislative|\bbill\b/i],
  ['ppp', /public.private|\bppp\b|water/i],
  ['capital-markets', /capital market/i],
  ['profession', /legal practice|law practice|lawyers|legal profession|pro ?bono|positioning for the future|bar, bench/i],
  ['policy', /social security|governance|legal giant|public prosecutions/i],
]

export function inferTopics(...text: string[]): Topic[] {
  const haystack = text.join(' ')
  return rules.filter(([, re]) => re.test(haystack)).map(([t]) => t)
}
