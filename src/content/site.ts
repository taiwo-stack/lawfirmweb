import type { LinkProps } from '@tanstack/react-router'

export const site = {
  name: 'Zest Partners',
  legalName: 'Zest Partners',
  tagline: 'Corporate practice and litigation, delivered with precision.',
  descriptor: 'Legal Practitioners · Arbitrators · Mediators · Trainers',
  description:
    'Zest Partners is a full-service Nigerian law firm established in 2006, advising on corporate and commercial matters, finance, energy, disputes and private client affairs from Abuja and Lagos.',
  url: 'https://zestpartnersng.com',
  founded: 2006,
  vision: 'To be one of the foremost law firms in Nigeria.',
  mission:
    'To provide top-class legal services to our clients without compromise to ethical values.',
  address: {
    lines: ['House 45, 3rd Avenue, Drive 2', 'Prince and Princess Estate', 'Kaura District, Abuja'],
    locality: 'Abuja',
    country: 'NG',
  },
  offices: ['Abuja', 'Lagos'],
  phones: ['+234 803 591 0250', '+234 805 041 4135'],
  emails: ['chineduobienu@zestpartnersng.com'],
  whatsapp: 'https://wa.me/message/PZC7C5L63ILON1',
  // TODO: add real profile URLs — the current site's icons link nowhere.
  socials: [] as { label: string; href: string }[],
  mapEmbed:
    'https://www.google.com/maps?q=Prince+and+Princess+Estate,+Kaura+District,+Abuja&output=embed',
} as const

export type RoutePath = NonNullable<LinkProps['to']>
export type NavChild = { label: string; to: RoutePath; description: string; search?: Record<string, string> }
export type NavItem = { label: string; to: RoutePath; children?: NavChild[]; mega?: boolean }

export const nav: NavItem[] = [
  {
    label: 'The Firm',
    to: '/about/',
    children: [
      { label: 'About the firm', to: '/about/', description: 'Who we are, our vision and mission' },
      { label: 'Our history', to: '/about/history/', description: 'Milestones since 2006' },
      { label: 'Facilities & library', to: '/about/facilities/', description: 'Our office, law library and technology' },
      { label: 'Pro bono & community', to: '/about/community/', description: 'Legal aid, public interest and service to the Bar' },
    ],
  },
  { label: 'Expertise', to: '/practice-areas/', mega: true },
  { label: 'Our People', to: '/people/' },
  {
    label: 'Insights',
    to: '/insights/',
    children: [
      { label: 'Firm news', to: '/insights/news/', description: 'Appointments, events and announcements' },
      { label: 'Speaking', to: '/insights/talks/', description: 'Papers presented at conferences and trainings' },
      { label: 'Publications', to: '/insights/publications/', description: 'Books and journal articles' },
    ],
  },
  { label: 'Contact', to: '/contact/' },
]

export const firmTabs = nav.find((n) => n.label === 'The Firm')!.children!
export const insightTabs: NavChild[] = [
  { label: 'All insights', to: '/insights/', description: 'News, talks and publications' },
  ...nav.find((n) => n.label === 'Insights')!.children!,
]
