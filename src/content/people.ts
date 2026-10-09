export type Talk = {
  title: string
  event: string
  /** ISO date used for sorting; `when` is what is displayed. */
  date: string
  when: string
}

/**
 * Directory sections, in display order. Add people to a group and the section appears.
 * 'Principal' is the head of the firm and is shown as a feature, not a grid card.
 */
export const personGroups = ['Principal', 'Partners', 'Senior Associates', 'Associates'] as const
export type PersonGroup = (typeof personGroups)[number]

export type Person = {
  slug: string
  name: string
  honorific?: string
  role: string
  group: PersonGroup
  /** Practice-area slugs this person's documented work covers (drives "Key contact" on practice pages). */
  practices?: string[]
  memberships?: string[]
  office?: string
  photo: string
  email?: string
  credentials?: string[]
  focus?: string[]
  highlights?: { value: string; label: string }[]
  bio: string[]
  positions?: { role: string; org: string; period: string }[]
  academic?: { title: string; detail: string }[]
  books?: { title: string; detail: string }[]
  articles?: { title: string; detail: string }[]
  legislative?: { role: string; detail: string }[]
  talks?: Talk[]
}

export const displayName = (p: Person) => (p.honorific ? `${p.honorific} ${p.name}` : p.name)

const faanTraining =
  'Two-day training for staff of the Federal Airports Authority of Nigeria (FAAN) on conflict and dispute resolution in labour, trade, human resources and industrial relations, facilitated by Zest Partners, FAAN Training School, Ikeja, Lagos'
const firsCourse = 'FIRS Legal Department Career Path (Advanced) course, FIRS Training Institute, Durumi, Abuja'

export const people: Person[] = [
  {
    slug: 'chinedu-obienu',
    honorific: 'Dr.',
    name: 'Chinedu Obienu',
    role: 'Principal & Managing Partner',
    group: 'Principal',
    office: 'Abuja',
    // From the CV: corporate commercial, energy, taxation, government compliance; litigator and
    // dispute settlor (MCIArb, FICMC); legislative drafting; NCMD-accredited trainer.
    practices: [
      'company-law',
      'corporate-compliance-financial-services',
      'taxation',
      'petroleum-law',
      'litigation-adr',
      'legislative-drafting',
      'training-capacity-building',
    ],
    memberships: [
      'Member, Chartered Institute of Arbitrators (MCIArb) (UK)',
      'Fellow, Institute of Chartered Mediators and Conciliators (FICMC)',
      'Member, Nigerian Bar Association',
      'Member, African Bar Association',
      'Accredited Management Trainer and Consultant, Nigeria Council for Management Development (NCMD)',
      'Alumnus, Haggai Leadership Institute, Hawaii, USA',
    ],
    // TODO: replace with the new studio portrait once confirmed.
    photo: '/images/people/chinedu-obienu.jpg',
    email: 'chineduobienu@zestpartnersng.com',
    credentials: ['PhD (Law)', 'MCIArb (UK)', 'FICMC'],
    focus: ['Corporate & commercial', 'Energy', 'Taxation', 'Government compliance', 'Litigation', 'Dispute resolution'],
    highlights: [
      { value: '20+', label: 'Years in practice' },
      { value: 'PhD', label: 'Law, University of Abuja' },
      { value: 'MCIArb', label: 'Chartered Institute of Arbitrators (UK)' },
      { value: 'LACON', label: 'Governing Council member, 2026' },
    ],
    bio: [
      'Dr. Chinedu Obienu is the Principal and Managing Partner of Zest Partners. He holds a PhD in law, and his practice spans corporate and commercial law, energy, taxation and general government compliance in Nigeria. He has practised law for more than two decades.',
      'He is a Member of the Chartered Institute of Arbitrators (MCIArb) (UK) and a Fellow of the Institute of Chartered Mediators and Conciliators (FICMC). He is an alumnus of the Haggai Leadership Institute, Hawaii, USA, and an accredited management trainer and consultant verified by the Nigeria Council for Management Development (NCMD). He is a consummate litigator and an experienced settler of disputes.',
      'An author, he has written and presented papers at conferences in Nigeria and abroad, and he facilitates workshops, seminars and training across diverse areas of law. He is a member of the Nigerian Bar Association and the African Bar Association.',
      'On Wednesday, 5 August 2026, he was inaugurated by the Attorney General of the Federation and Minister of Justice as a Member of the Governing Council of the Legal Aid Council of Nigeria (LACON).',
    ],
    positions: [
      { role: 'Member, Governing Council', org: 'Legal Aid Council of Nigeria (LACON)', period: '2026 – present' },
      { role: 'Chairman', org: 'NBA Abuja Branch 2026 Law Week Planning Committee', period: '2026' },
      { role: 'Trustee', org: 'Guiding Light Assembly, Abuja Worship Center', period: '2024 – present' },
      { role: 'Secretary', org: 'NBA Legal Practitioners Rules Watch Committee', period: '2024 – 2026' },
      { role: 'Member, National Executive Committee', org: 'Nigerian Bar Association', period: '2016 – 2018' },
      { role: 'Secretary', org: 'Nigerian Bar Association, Abuja Branch', period: '2016 – 2017' },
      { role: 'Appointment Secretary', org: 'Christian Lawyers Fellowship of Nigeria (CLASFON)', period: '2014 – 2017' },
      { role: 'Welfare Secretary', org: 'Nigerian Bar Association, Abuja', period: '2014 – 2016' },
      { role: 'Member (NBA Representative)', org: 'National Steering Committee on Community Policing', period: '2008' },
      { role: 'President', org: 'Law Students Association of Nigeria, University of Abuja Chapter', period: '2000 – 2001' },
      { role: 'President', org: 'Christian Law Students Fellowship of Nigeria, University of Abuja Chapter', period: '2000 – 2001' },
    ],
    academic: [
      { title: 'Legal Analysis of the Tax Regime in the Nigerian Petroleum Industry', detail: 'PhD thesis, Faculty of Law, University of Abuja, 2023' },
      { title: 'Taxation: A Tool for Sustainable Economic Development in Nigeria', detail: 'LL.M dissertation, Faculty of Law, University of Jos, 2008' },
      { title: 'A Critical Appraisal of Copyright Laws in Nigeria', detail: 'Undergraduate long essay, Faculty of Law, University of Abuja, 2002' },
    ],
    books: [
      {
        title: 'Nigeria’s Legal Giant: The First Federal Director of Public Prosecutions, G.C. Nonyelu QC',
        detail: 'Obienu C. and Stone A. (Anna Stone Publishing, United Kingdom, 2017)',
      },
      {
        title: 'The Bar, Bench and Good Governance in Africa: Legal Essays in Honour of Afam Osigwe, SAN',
        detail: 'Akinola O.B. and Obienu C. (eds) (IHCDCE, Port Harcourt, Nigeria, 2025)',
      },
    ],
    articles: [
      {
        title: 'An Appraisal of Tax Regime in the Nigerian Petroleum Industry',
        detail: 'A.M. Kontogora and Chinedu Obienu, Journal of Law Policy, Faculty of Law, Rivers State University, Port Harcourt (2023) 3(4)',
      },
      {
        title: 'Building a Trans-Generational Law Practice: The Pros and Cons',
        detail: 'In Obienu C. and Akinola O.B. (eds), The Bar, Bench and Good Governance in Africa (IHCDCE, Port Harcourt, 2025) 36–45',
      },
    ],
    legislative: [
      { role: 'Consultant to WaterAid', detail: 'Enugu State Water Sector Bill, 2019' },
      {
        role: 'Sub-consultant',
        detail:
          'Drafting of “A Bill for a Law to Establish the Anambra State Small Town Water Supply and Sanitation Agency and for Other Matters Connected Therewith”, to regulate and secure sustainable provision of safe water in Anambra State',
      },
      { role: 'Member, drafting team', detail: 'Fundamental Human Rights (Enforcement Procedure) Rules, now used in courts across Nigeria, 2007–2008' },
      {
        role: 'Consultant',
        detail: 'Drafting and stakeholder engagement for the Plateau State Administration of Criminal Justice Law, 2018',
      },
      { role: 'Bills and agreements', detail: 'Work on several bills, and drafting of agreements including public–private partnership (PPP) agreements' },
    ],
    talks: [
      {
        title: 'Navigating Customs, Excise and Taxation Bottlenecks Towards Improving Trade in Africa',
        event: '2025 Annual Conference of the African Bar Association, Accra, Ghana',
        date: '2025-10-19',
        when: '19–23 October 2025',
      },
      { title: 'Appraising the Trade and Workplace Dispute Resolution Mechanism in Nigeria', event: faanTraining, date: '2025-10-06', when: '6–7 October 2025' },
      { title: 'Negotiation Strategies and Practical Skills for Labour and Industrial Dispute Resolution', event: faanTraining, date: '2025-10-06', when: '6–7 October 2025' },
      { title: 'Arbitration as an Alternative Dispute Resolution Mechanism', event: faanTraining, date: '2025-10-06', when: '6–7 October 2025' },
      { title: 'Building a Trans-Generational Law Practice', event: 'CLASFON Regional Conference, Makurdi, Benue State', date: '2025-08-01', when: 'August 2025' },
      {
        title: 'Appraisal of the Petroleum Industry Act (PIA) 2021: Progress, Challenges and the Way Forward',
        event: 'Retreat for members and management staff of the Revenue Mobilisation Allocation and Fiscal Commission (RMAFC), Uyo, Akwa Ibom State',
        date: '2025-04-29',
        when: '29 April 2025',
      },
      {
        title: 'Duties to Fellow Lawyers and the Legal Profession',
        event: 'Two-day training on the 2023 Rules of Professional Conduct for Legal Practitioners, organised by ROLAC with the Nigerian Bar Association, Abuja',
        date: '2025-02-03',
        when: '3 February 2025',
      },
      {
        title: 'Pro Bono Legal Practice in Nigeria: Working with Lawyers',
        event: 'Three-day training for pro bono lawyers organised by the Public and Private Development Centre (PPDC), Abuja',
        date: '2024-08-01',
        when: 'August 2024',
      },
      {
        title: 'Courtroom Advocacy: Modern Tips for Cutting-Edge Research',
        event: 'CLASFON National Seminar, Directorate of Continuing Legal Education (via Zoom)',
        date: '2022-10-27',
        when: '27 October 2022',
      },
      {
        title: 'Appraising the Trade Dispute Resolution Mechanisms in Nigeria’s Trade Disputes Act',
        event: 'Transmission Company of Nigeria (TCN) Industrial Relations Workshop, TCN Headquarters, Abuja',
        date: '2022-10-20',
        when: '20 October 2022',
      },
      {
        title: 'Alternative Dispute Resolution (ADR) Mechanisms',
        event: 'Centre for Management Development (Advanced) training programme, Abuja',
        date: '2022-08-03',
        when: '3 August 2022',
      },
      {
        title: 'Positioning for the Future: Leveraging Network Specialisation and ICT',
        event: 'NBA Unity Bar Law Week 2022, Diamond Hall, A-Class Event Centre, Wuse 2, Abuja',
        date: '2022-06-06',
        when: '6 June 2022',
      },
      {
        title: 'A Presentation on Public–Private Partnership (PPP) Models',
        event: 'Water Sector Stakeholder Engagement Workshop, Enugu',
        date: '2019-12-07',
        when: '7 December 2019',
      },
      {
        // TODO: confirm state — Aniocha is in Delta State; the source says Anambra.
        title: 'The Changing Faces of Legal Practice in the 21st Century',
        event: '2nd Biennial Law Week, Nigerian Bar Association, Aniocha Branch',
        date: '2017-10-27',
        when: '27 October 2017',
      },
      {
        title: 'The Basics of Taxation in Nigeria',
        event: 'CLASFON Abuja Branch, Reiz Continental Hotel, Abuja',
        date: '2016-10-17',
        when: '17 October 2016',
      },
      {
        title: 'Global Best Practices on Court Security',
        event: 'Special workshop on Security/Administration of Superior Courts in Nigeria, Ceremonial Court, FCT High Court, Abuja',
        date: '2015-10-06',
        when: '6 October 2015',
      },
      {
        title: 'Court/Public Facility Security Management',
        event: 'Special workshop for Chief Registrars, Deputy Chief Registrars and Heads of Administration of Superior Courts in Nigeria, Ceremonial Court, FCT High Court, Abuja',
        date: '2015-10-06',
        when: '6 October 2015',
      },
      { title: 'Adjudication on Tax Disputes', event: firsCourse, date: '2015-02-04', when: '4 February 2015' },
      { title: 'Case Management', event: firsCourse, date: '2015-02-02', when: '2 February 2015' },
      { title: 'Legal Drafting and Legislative Drafting', event: firsCourse, date: '2015-01-28', when: '28 January 2015' },
      { title: 'Brief Writing', event: firsCourse, date: '2015-01-28', when: '28 January 2015' },
      { title: 'Alternative Dispute Resolution (ADR) and Arbitration', event: firsCourse, date: '2015-01-26', when: '26 January 2015' },
      { title: 'The Need to Regulate the Capital Market', event: 'FORA', date: '2014-02-12', when: '12 February 2014' },
      {
        title: 'Constitutional Imperatives for Social Security Scheme in Nigeria',
        event: 'National Conference on Social Security, Nigeria Social Insurance Trust Fund (NSITF), International Conference Centre',
        date: '2007-10-22',
        when: '22–24 October 2007',
      },
    ],
  },
  {
    slug: 'edwin-nneamaka-uzoma',
    name: 'Edwin Nneamaka Uzoma',
    role: 'Partner',
    group: 'Partners',
    office: 'Lagos',
    photo: '/images/people/edwin-nneamaka-uzoma.jpg',
    // Old website, About page ("Our Team").
    bio: [
      'Edwin Nneamaka Uzoma has worked with BOMS and BOMS, a firm of Legal Practitioners based in Port Harcourt, and Equatorial Trust Bank before joining Zest Partners. She personally runs the Lagos office.',
    ],
  },
  {
    slug: 'kumawuese-ruth-nenchi',
    name: 'Kumawuese Ruth Nenchi',
    role: 'Senior Associate',
    group: 'Senior Associates',
    // docs/sources/kumawuese-ruth-nenchi-profile.md. Practice pages matching her stated areas; Telecoms & ICT and
    // Labour Law have no practice page, so they appear in the bio only.
    practices: ['company-law', 'contracts-commercial', 'corporate-compliance-financial-services', 'litigation-adr', 'matrimonial-family-law'],
    memberships: [
      'Associate, Institute of Chartered Secretaries and Administrators of Nigeria (ICSAN)',
      'Associate, Institute of Chartered Mediators and Conciliators (ICMC)',
    ],
    photo: '/images/people/kumawuese-ruth-nenchi.jpg',
    focus: ['Corporate & commercial', 'Alternative dispute resolution', 'Telecommunications & ICT', 'Regulatory compliance', 'Family law', 'Labour law'],
    bio: [
      'Kumawuese Ruth Nenchi is a Senior Associate at Zest Partners with many years of experience in legal practice. She is a versatile legal practitioner committed to providing practical, commercially relevant and solution-oriented legal services to individuals, businesses and corporate institutions.',
      'She holds a Master’s Degree in Information and Communications Technology Law and is an Associate of the Institute of Chartered Secretaries and Administrators of Nigeria (ICSAN) and the Institute of Chartered Mediators and Conciliators (ICMC). Her professional interests reflect a strong appreciation of the intersection between law, business, technology and effective dispute resolution.',
      'Her areas of practice include Corporate and Commercial Law, Alternative Dispute Resolution (ADR), Telecommunications and ICT Law, Regulatory Compliance, Family Law and Labour Law. She has strong advocacy, negotiation and problem-solving skills, and approaches legal issues with a practical understanding of both their legal and human dimensions.',
      'Kumawuese is passionate about legal research and writing and has authored several papers. She has also participated as a facilitator in professional training programmes for corporate institutions. Her professional approach is founded on diligence, integrity, empathy and a strong commitment to those she serves. She believes in using the law as a positive instrument for humanity.',
    ],
  },
  {
    slug: 'chinagorom-oluchi-uwandu',
    name: 'Chinagorom Oluchi Uwandu',
    role: 'Senior Associate',
    group: 'Senior Associates',
    // docs/sources/chinagorom-oluchi-uwandu-profile.md. Practice pages matching her stated areas; Labour Law has no
    // practice page, so it appears in the bio only.
    practices: ['litigation-adr', 'company-law', 'contracts-commercial', 'property-real-estate'],
    memberships: ['Associate, Institute of Chartered Mediators and Conciliators (AICMC)', 'Certified Mediator and Conciliator', 'Called to the Nigerian Bar'],
    photo: '/images/people/chinagorom-oluchi-uwandu.jpg',
    credentials: ['MIAD', 'AICMC'],
    focus: ['Alternative dispute resolution', 'Corporate & commercial', 'Property', 'Labour law'],
    bio: [
      'Chinagorom Oluchi Uwandu is a Senior Associate at Zest Partners. She has practised for a number of years, acting as Counsel for individuals, businesses and corporate institutions in contentious and non-contentious matters. She also advises on alternative dispute resolution, corporate and commercial law, property, labour law and general legal matters.',
      'She is called to the Nigerian Bar and holds a Professional Master’s Degree in International Affairs and Diplomacy (MIAD) from Ahmadu Bello University. She is a Certified Mediator and Conciliator and an Associate of the Institute of Chartered Mediators and Conciliators (AICMC). Her interest is in how law, advocacy and diplomacy work together to resolve difficult disputes.',
      'She has participated in facilitating professional training sessions for corporate institutions. Chinagorom brings thorough research, careful drafting and strong advocacy, and aims for excellence in every matter she handles. Her approach is built on diligence, integrity and sound judgment, with a clear focus on securing the best possible outcome for clients.',
    ],
  },
]

export const personBySlug = (slug: string) => people.find((p) => p.slug === slug)

/** People whose documented work covers a practice (may be empty: the page then shows firm contacts). */
export const contactsForPractice = (slug: string) => people.filter((p) => p.practices?.includes(slug))

/** An appointment is current if it says "present" or runs into the current year. */
export const isCurrent = (period: string) => /present/i.test(period) || Number(period.match(/\d{4}(?!.*\d{4})/)?.[0]) >= new Date().getFullYear()
