export const site = {
  name: 'Zest Partners',
  legalName: 'Zest Partners',
  tagline: 'Corporate practice and litigation, delivered with precision.',
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
  emails: ['zestpartners@yahoo.com', 'chineduobienu@yahoo.com'],
  whatsapp: 'https://wa.me/message/PZC7C5L63ILON1',
  // TODO: add real profile URLs — the current site's icons link nowhere.
  socials: [] as { label: string; href: string }[],
  mapEmbed:
    'https://www.google.com/maps?q=Prince+and+Princess+Estate,+Kaura+District,+Abuja&output=embed',
} as const

export const nav = [
  { label: 'The Firm', to: '/about' },
  { label: 'Practice Areas', to: '/practice-areas' },
  { label: 'People', to: '/people' },
  { label: 'Contact', to: '/contact' },
] as const
