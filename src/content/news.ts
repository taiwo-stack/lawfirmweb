import type { Topic } from './topics'

export type NewsItem = {
  slug: string
  title: string
  date: string
  when: string
  summary: string
  body: string[]
  image?: string
  imageAlt?: string
  /** Further photos, shown as a gallery after the article text. */
  gallery?: { src: string; alt: string }[]
  topics: Topic[]
  people: string[]
  /** Shown as the large card in the home page's News & insights section. Give one item an image and this flag. */
  featured?: boolean
  /** Shorter headline for the featured card. */
  shortTitle?: string
}

export const news: NewsItem[] = [
  {
    slug: 'lacon-governing-council-inauguration',
    title: 'Dr. Chinedu Obienu inaugurated to the Governing Council of the Legal Aid Council of Nigeria',
    date: '2026-08-05',
    when: '5 August 2026',
    summary:
      'Our Managing Partner was inaugurated by the Attorney General of the Federation and Minister of Justice as a Member of the Governing Council of LACON.',
    body: [
      'On Wednesday, 5 August 2026, Dr. Chinedu Obienu, Principal and Managing Partner of Zest Partners, was inaugurated by the Attorney General of the Federation and Minister of Justice as a Member of the Governing Council of the Legal Aid Council of Nigeria (LACON).',
      'Through its Human Rights and Public Interest Litigation department, Zest Partners offers free legal services to poor and indigent citizens whose rights have been grossly infringed.',
      'Dr. Obienu also chairs the NBA Abuja Branch 2026 Law Week Planning Committee.',
    ],
    image: '/images/people/chinedu-obienu.jpg',
    imageAlt: 'Dr. Chinedu Obienu',
    topics: ['profession', 'policy'],
    people: ['chinedu-obienu'],
  },
  {
    // Photos supplied by the firm, 9 Oct 2026; the firm confirmed the podium speaker is Dr. Obienu. The theme is read from the podium in the
    // photos; the exact dates are not known, so only the year is shown.
    slug: 'nba-abuja-law-week-2026',
    title: 'NBA Abuja (Unity Bar) Law Week 2026',
    date: '2026-01-01',
    when: '2026',
    summary:
      'Dr. Chinedu Obienu, our Managing Partner, chaired the Planning Committee of the NBA Abuja Branch 2026 Law Week, themed “Safeguarding Nigeria’s Democratic Process”.',
    body: [
      'Dr. Chinedu Obienu, Principal and Managing Partner of Zest Partners, was Chairman of the NBA Abuja Branch 2026 Law Week Planning Committee.',
      'The theme of the NBA Abuja (Unity Bar) Law Week 2026 was “Safeguarding Nigeria’s Democratic Process”.',
    ],
    image: '/images/events/nba-abuja-law-week-2026-2.jpg',
    imageAlt: 'On stage at the NBA Abuja (Unity Bar) Law Week 2026',
    gallery: [
      { src: '/images/events/nba-abuja-law-week-2026-3.jpg', alt: 'Dr. Chinedu Obienu, Chairman of the Planning Committee, at the NBA Abuja Law Week 2026 podium' },
      { src: '/images/events/nba-abuja-law-week-2026-4.jpg', alt: 'Dr. Chinedu Obienu speaking at the NBA Abuja Law Week 2026' },
      { src: '/images/events/nba-abuja-law-week-2026-1.jpg', alt: 'Guests arriving at the NBA Abuja Branch 2026 Law Week' },
    ],
    topics: ['profession', 'policy'],
    people: ['chinedu-obienu'],
  },
  {
    slug: 'afba-2025-accra',
    title: 'Customs, excise and taxation bottlenecks to African trade: a paper at the 2025 AFBA Annual Conference',
    date: '2025-10-19',
    when: '19–23 October 2025',
    summary:
      'Dr. Chinedu Obienu presented “Navigating Customs, Excise and Taxation Bottlenecks Towards Improving Trade in Africa” at the African Bar Association conference in Accra, Ghana.',
    body: [
      'At the 2025 Annual Conference of the African Bar Association (AFBA), held in Accra, Ghana from 19 to 23 October 2025, Dr. Chinedu Obienu presented a paper titled “Navigating Customs, Excise and Taxation Bottlenecks Towards Improving Trade in Africa”.',
      'Taxation is one of the firm’s core practice areas. Dr. Obienu’s PhD thesis (University of Abuja, 2023) was a legal analysis of the tax regime in the Nigerian petroleum industry.',
    ],
    image: '/images/brand/afba-conference.jpg',
    imageAlt: 'Speaking at the African Bar Association conference podium',
    topics: ['tax'],
    people: ['chinedu-obienu'],
    featured: true,
    shortTitle: 'A paper at the African Bar Association Annual Conference, Accra',
  },
  {
    slug: 'faan-dispute-resolution-training',
    title: 'Zest Partners facilitates dispute resolution training for FAAN staff',
    date: '2025-10-06',
    when: '6–7 October 2025',
    summary:
      'A two-day programme at the FAAN Training School, Ikeja, on conflict and dispute resolution in labour, trade, human resources and industrial relations.',
    body: [
      'On 6 and 7 October 2025, Zest Partners facilitated a two-day training for staff of the Federal Airports Authority of Nigeria (FAAN) at the FAAN Training School, Ikeja, Lagos. The theme was “Conflict and Dispute Resolution Mechanisms and Strategies in Labour, Trade, Human Resources and Industrial Relations”.',
      'Dr. Chinedu Obienu presented three papers: “Appraising the Trade and Workplace Dispute Resolution Mechanism in Nigeria”, “Negotiation Strategies and Practical Skills for Labour and Industrial Dispute Resolution”, and “Arbitration as an Alternative Dispute Resolution Mechanism”.',
    ],
    topics: ['adr'],
    people: ['chinedu-obienu'],
  },
  {
    slug: 'bar-bench-good-governance-in-africa',
    title: 'The Bar, Bench and Good Governance in Africa: essays in honour of Afam Osigwe, SAN',
    date: '2025-01-01',
    when: '2025',
    summary:
      'Co-edited by Omoniyi Bukola Akinola and Dr. Chinedu Obienu, and including his chapter “Building a Trans-Generational Law Practice: The Pros and Cons”.',
    body: [
      'The Bar, Bench and Good Governance in Africa: Legal Essays in Honour of Afam Osigwe, SAN was published in 2025 by IHCDCE, Port Harcourt. It was edited by O.B. Akinola and Chinedu Obienu.',
      'The collection includes Dr. Obienu’s chapter “Building a Trans-Generational Law Practice: The Pros and Cons” (pages 36–45). He also presented a paper on the subject at the CLASFON Regional Conference in Makurdi, Benue State, in August 2025.',
    ],
    topics: ['profession'],
    people: ['chinedu-obienu'],
  },
]

export const newsBySlug = (slug: string) => news.find((n) => n.slug === slug)

/** The flagged item, or else the latest item with an image. */
export const featuredNews = news.find((n) => n.featured && n.image) ?? news.find((n) => n.image) ?? news[0]
