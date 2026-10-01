import type { Topic } from './topics'

export type PracticeGroup =
  | 'Corporate & Commercial'
  | 'Finance & Energy'
  | 'Dispute Resolution'
  | 'Private Client'
  | 'Rights & Advisory'

export type Practice = {
  slug: string
  title: string
  group: PracticeGroup
  summary: string
  body: string[]
  services?: string[]
  /** Who the practice acts for. */
  clients?: string[]
  image: string
  /** Insight topics whose talks and publications are shown on the page. */
  topics: Topic[]
  /** Slug of the partner to contact; defaults to the Managing Partner. */
  lead?: string
  /** Old WordPress slugs that should redirect here. */
  legacy: string[]
}

export const groups: { name: PracticeGroup; blurb: string }[] = [
  { name: 'Corporate & Commercial', blurb: 'Structuring, governance, tax and the contracts that hold business together.' },
  { name: 'Finance & Energy', blurb: 'Transactions and regulation in banking, petroleum and aviation.' },
  { name: 'Dispute Resolution', blurb: 'Civil and criminal litigation, ADR, recovery and election disputes across Nigerian courts.' },
  { name: 'Private Client', blurb: 'Families, estates and property, handled with discretion.' },
  { name: 'Rights & Advisory', blurb: 'Public interest work, intellectual property, documents, legislative drafting and training.' },
]

export const groupId = (group: PracticeGroup) => group.toLowerCase().replace(/[^a-z]+/g, '-')

export const practices: Practice[] = [
  // ── Corporate & Commercial ────────────────────────────────────────────────
  {
    slug: 'company-law',
    title: 'Company Law',
    group: 'Corporate & Commercial',
    summary: 'Incorporation, shareholder and director rights, governance and secretarial support for companies of every size.',
    body: [
      'The practice of corporate law involves general corporate matters: the incorporation of companies, directors’ and shareholders’ rights, articles of association, board meetings, secretarial matters, and the public listing or delisting of companies.',
      'No two corporate transactions or deals are the same. We take the time to understand each client’s structure and objectives before advising on the right course, including on mergers and acquisitions, privatisations and divestments, and transnational joint ventures.',
    ],
    services: [
      'Company incorporation',
      'Articles of association',
      'Directors’ & shareholders’ rights',
      'Board meetings & company secretarial',
      'Listing & delisting',
      'Mergers & acquisitions',
      'Joint ventures',
    ],
    clients: ['Private companies', 'Public companies', 'Partnerships', 'Foreign investors'],
    image: '/images/practice/company-law.jpg',
    topics: ['capital-markets', 'drafting'],
    legacy: ['company-laws'],
  },
  {
    slug: 'corporate-compliance-financial-services',
    title: 'Corporate Compliance & Financial Services',
    group: 'Corporate & Commercial',
    summary: 'A seamless, one-stop corporate service that keeps clients compliant, informed and tax-efficient.',
    body: [
      'We run a broad corporate and commercial law practice, and our ultimate goal is to satisfy our clients with a seamless, one-stop service that brings together their diverse business interests.',
      'The firm also makes sure clients comply with the laws that apply to them, and proactively keeps them updated with information that may affect their business objectives.',
      'We advise on finance and corporate decision-making, and act for public and private companies and partnerships on the tax implications of commercial transactions and on tax-efficient business structures.',
    ],
    services: ['Regulatory compliance', 'Government compliance', 'Corporate finance', 'Capital markets', 'Employee benefits', 'Tax-efficient structuring'],
    clients: ['Public companies', 'Private companies', 'Partnerships'],
    image: '/images/practice/corporate-compliance.jpg',
    topics: ['tax', 'capital-markets'],
    legacy: ['corporate-compliance-and-financial-services'],
  },
  {
    slug: 'contracts-commercial',
    title: 'Contracts & Commercial',
    group: 'Corporate & Commercial',
    summary: 'Contract specialists for every phase, from research and negotiation to drafting, bid evaluation and exit.',
    body: [
      'The firm has contract specialists who are responsible for every phase of contract development, from researching the applicable legal regulations to negotiating the terms and preparing the final document. Our excellence shows in negotiation, document preparation and bid evaluation.',
      'Our specialists work as part of a legal team or independently to evaluate bids and draft documents, and they help clients terminate contracts on favourable terms.',
      'Our commercial specialists also work as analysts for clients, helping identify business opportunities and supplying the data that informs commercial strategy.',
      'As solicitors we prepare general contracts, agreements, debentures, mortgages, powers of attorney and lease agreements, and we advise on arbitration, receivership and allied matters.',
    ],
    services: [
      'Negotiation',
      'Drafting & review',
      'Bid evaluation',
      'Commercial analysis',
      'Debentures & mortgages',
      'Powers of attorney',
      'Lease agreements',
      'Receivership',
      'Contract termination',
    ],
    clients: ['Companies', 'Government agencies', 'Individuals'],
    image: '/images/practice/contracts.jpg',
    topics: ['drafting', 'adr'],
    legacy: ['contract-specialist', 'commercial-specialist'],
  },
  {
    slug: 'taxation',
    title: 'Taxation',
    group: 'Corporate & Commercial',
    summary: 'Income tax planning and the tax aspects of acquisitions, reorganisations and restructuring.',
    body: [
      'Our tax group has substantial expertise in income tax planning for individuals, corporations, partnerships, limited liability companies and other business entities.',
      'We advise business clients on the tax aspects of acquisitions, reorganisations, liquidations, redemptions and debt restructuring.',
      'The practice is led by our Managing Partner, whose PhD thesis (University of Abuja, 2023) and LL.M dissertation (University of Jos, 2008) both examined Nigerian taxation, and who has trained the Federal Inland Revenue Service Legal Department on the adjudication of tax disputes.',
    ],
    services: ['Income tax planning', 'Transaction tax', 'Reorganisations & liquidations', 'Debt restructuring', 'Tax disputes', 'Customs & excise'],
    clients: ['Individuals', 'Corporations', 'Partnerships', 'Limited liability companies'],
    image: '/images/practice/taxation.jpg',
    topics: ['tax'],
    legacy: ['taxation-laws'],
  },

  // ── Finance & Energy ──────────────────────────────────────────────────────
  {
    slug: 'banking-finance',
    title: 'Banking & Finance',
    group: 'Finance & Energy',
    summary: 'Acting for lenders and borrowers in some of the largest and most complex financing transactions.',
    body: [
      'Our team of lawyers represents lenders and borrowers in some of the largest and most complicated financing transactions.',
      'Our clients include large commercial banks, investment banks, insurance companies, finance companies, investment and merchant banking firms, private investment funds and other institutional lenders and investors.',
      'We advise on all types of financing transactions.',
    ],
    services: [
      'First and second lien loan facilities',
      'Real estate finance',
      'Acquisition financing',
      'Leveraged recapitalisation financing',
      'Asset-backed financing',
      'Workouts, restructuring & exit financing',
      'Private placement',
      'Debt recovery',
    ],
    clients: ['Commercial banks', 'Investment banks', 'Insurance companies', 'Finance companies', 'Merchant banks', 'Private investment funds', 'Institutional lenders & investors'],
    image: '/images/practice/banking.jpg',
    topics: ['capital-markets'],
    legacy: ['banking'],
  },
  {
    slug: 'petroleum-law',
    title: 'Petroleum Law',
    group: 'Finance & Energy',
    summary: 'Advising across the petroleum lifecycle, from licensing to decommissioning.',
    body: [
      'Our petroleum lawyers specialise in the legal framework that regulates petroleum activities. They have extensive experience as in-house lawyers in large and smaller oil companies, on both the operator side and the licensee side.',
      'Zest Partners assists in all matters relating to petroleum activities: from the application for a production licence, through exploration, development and production, up to and including decommissioning and removal.',
      'Our Managing Partner’s doctoral research was a legal analysis of the tax regime in the Nigerian petroleum industry, and he has presented on the Petroleum Industry Act 2021 to the Revenue Mobilisation Allocation and Fiscal Commission.',
    ],
    services: ['Production licences', 'Exploration', 'Development & production', 'Decommissioning & removal', 'Petroleum fiscal regime', 'PIA 2021 compliance'],
    clients: ['Operators', 'Licensees', 'Oil companies', 'Public institutions'],
    image: '/images/practice/petroleum.jpg',
    topics: ['energy', 'tax'],
    legacy: ['petroleum-law'],
  },
  {
    slug: 'aviation',
    title: 'Aviation',
    group: 'Finance & Energy',
    summary: 'A strong blend of legal skill and aviation industry knowledge.',
    body: [
      'Our aviation team offers a strong blend of legal acumen and industry knowledge, built on an extensive background in aviation-related legal matters.',
      // TODO: the firm should confirm these team claims, carried over from the old website.
      'A number of our aviation lawyers have degrees in engineering, experience as pilots, or have worked in other areas of the industry. Several team members have experience in government regulatory and investigative agencies, are invited to speak at international aviation conferences, and hold leadership positions in the aviation sections of bar associations and industry organisations.',
      'In October 2025, Zest Partners facilitated a two-day training on conflict and dispute resolution for staff of the Federal Airports Authority of Nigeria (FAAN).',
    ],
    services: ['Regulatory compliance', 'Aircraft transactions', 'Leasing & financing', 'Aviation disputes', 'Workplace & industrial relations'],
    clients: ['Airport authorities', 'Operators', 'Lessors & financiers', 'Service providers'],
    image: '/images/practice/aviation.jpg',
    topics: ['adr'],
    legacy: ['aviation'],
  },

  // ── Dispute Resolution ────────────────────────────────────────────────────
  {
    slug: 'litigation-adr',
    title: 'General Litigation & ADR',
    group: 'Dispute Resolution',
    summary: 'Civil and criminal litigation across Nigeria, with arbitration, mediation and negotiation working alongside.',
    body: [
      'The firm handles criminal and civil litigation for its clients across various states of Nigeria. Our primary objective is to make sure disputes arising from our clients’ business and commercial activities are resolved effectively, with the least expenditure of time and resources.',
      'Our Litigation and Alternative Dispute Resolution departments are combined because our focus is delivering solutions on time. The team is made up of dispute resolution experts with commendable experience in the firm’s other core practice areas.',
      'Our Managing Partner is a Member of the Chartered Institute of Arbitrators (UK) and a Fellow of the Institute of Chartered Mediators and Conciliators, and is a consummate litigator and settler of disputes.',
    ],
    services: ['Civil litigation', 'Commercial disputes', 'Arbitration', 'Mediation & conciliation', 'Negotiation', 'Trade & industrial disputes', 'Appeals'],
    clients: ['Companies', 'Individuals', 'Government agencies'],
    image: '/images/practice/litigation.jpg',
    topics: ['adr', 'advocacy'],
    legacy: ['general-litigation'],
  },
  {
    slug: 'criminal-law',
    title: 'Criminal Law',
    group: 'Dispute Resolution',
    summary: 'Defence and advisory work in criminal matters, grounded in a deep understanding of procedure and rights.',
    body: [
      'The firm handles criminal matters for clients across various states of Nigeria, from investigation and bail through trial and appeal.',
      'Our understanding of criminal procedure goes beyond the courtroom. Our Managing Partner worked as a consultant on the drafting and stakeholder engagement for the Plateau State Administration of Criminal Justice Law, 2018, and was a member of the team that drafted the Fundamental Human Rights (Enforcement Procedure) Rules used in courts across Nigeria.',
    ],
    services: ['Criminal defence', 'Bail applications', 'Trials & appeals', 'Fundamental rights enforcement', 'Regulatory investigations'],
    clients: ['Individuals', 'Companies', 'Public officers'],
    image: '/images/practice/criminal.jpg',
    topics: ['advocacy', 'drafting'],
    legacy: [],
  },
  {
    slug: 'debt-recovery',
    title: 'Debt & Loan Recovery',
    group: 'Dispute Resolution',
    summary: 'Recovery strategies, restructuring and insolvency advice for companies, individuals and government agencies.',
    body: [
      'At Zest Partners we frequently handle debt recovery. Our debt recovery lawyers have expertise in this area and understand the crippling effect trapped funds can have on any business.',
      'Debt recovery is a critical aspect of legal practice that calls for different strategies. Our lawyers have helped a range of entities, especially companies, to recover debts successfully, and we are experienced in loan and debt recovery for individuals, companies and government agencies.',
      'We have the expertise needed to prosecute debt recovery successfully in Nigeria, and we do not hesitate to advise clients when a recovery has already hit a dead end.',
      'We also help companies and individuals negotiate debt restructuring and debt relief with financial and non-financial creditors. The firm maintains competent insolvency lawyers who advise companies on debt restructuring and bankruptcy.',
      'We have assisted both local and foreign companies to map out aggressive debt recovery and restructuring strategies in Nigeria.',
    ],
    services: ['Debt recovery', 'Loan recovery', 'Debt restructuring', 'Debt relief negotiation', 'Insolvency & bankruptcy'],
    clients: ['Local companies', 'Foreign companies', 'Financial institutions', 'Individuals', 'Government agencies'],
    image: '/images/practice/debt-recovery.jpg',
    topics: ['advocacy'],
    legacy: ['debts-and-loan-recovery'],
  },
  {
    slug: 'election-petitions',
    title: 'Election Petitions',
    group: 'Dispute Resolution',
    summary: 'Pre-election and post-election disputes, handled by specialists.',
    body: [
      'Our Election Petitions group is staffed by election petition experts who have carved a niche in pre-election and post-election disputes.',
      'Having mastered this field, the firm is well placed to deliver on our clients’ needs in this area.',
    ],
    services: ['Pre-election disputes', 'Post-election petitions', 'Tribunal & appellate advocacy'],
    clients: ['Candidates', 'Political parties'],
    image: '/images/practice/election.jpg',
    topics: ['advocacy'],
    legacy: ['election-petitions'],
  },

  // ── Private Client ────────────────────────────────────────────────────────
  {
    slug: 'wills-probate',
    title: 'Wills & Probate',
    group: 'Private Client',
    summary: 'Estate planning, wills, trusts and the full probate process, with or without a will.',
    body: [
      'The firm has specialised experts who are versed in estate planning, the drafting of wills and living trusts, and every part of the probate process.',
      'We help beneficiaries, heirs, trustees and executors navigate any litigation that arises, to achieve the best possible result.',
      'We also help clients manage the probate process when there is no existing will. We advise on powers of attorney, and we serve as executors or administrators when required.',
    ],
    services: ['Estate planning', 'Wills & living trusts', 'Probate', 'Letters of administration', 'Powers of attorney', 'Executorship', 'Estate litigation'],
    clients: ['Individuals & families', 'Beneficiaries & heirs', 'Trustees & executors'],
    image: '/images/practice/probate.jpg',
    topics: [],
    legacy: ['wills-and-probate'],
  },
  {
    slug: 'matrimonial-family-law',
    title: 'Matrimonial & Family Law',
    group: 'Private Client',
    summary: 'Divorce, custody, support and paternity, handled with firm advocacy and personal care.',
    body: [
      'Our matrimonial lawyers represent clients in family courts in matters of divorce, child custody, child support, spousal support, equitable distribution and paternity.',
      'If you are looking for a family or divorce lawyer, you need one who will be an aggressive advocate for your interests and a compassionate, understanding counsellor through a difficult time. At Zest Partners, that is exactly what you will receive.',
      'We pride ourselves on our ability to meet our clients’ needs while giving them personal attention and service.',
    ],
    services: ['Divorce', 'Child custody', 'Child support', 'Spousal support', 'Equitable distribution', 'Paternity'],
    clients: ['Individuals & families'],
    image: '/images/practice/matrimonial.jpg',
    topics: [],
    legacy: ['matrimonial-law-2'],
  },
  {
    slug: 'property-real-estate',
    title: 'Property & Real Estate',
    group: 'Private Client',
    summary: 'Acquisition, financing and development of real estate, supported by thorough due diligence.',
    body: [
      'The firm’s real estate team provides standard drafting and negotiation support, and advises clients on real estate financing transactions, project finance, mortgage schemes and other property acquisitions.',
      'The team has advised many clients on the acquisition, financing and construction of real estate projects in Nigeria. Many of these projects required advice on the regulatory framework for developing the properties, procurement of the relevant approvals and establishment of the project companies, as well as extensive due diligence to determine the ownership and proprietary rights in the properties.',
    ],
    services: ['Acquisitions', 'Real estate finance', 'Project finance', 'Mortgage schemes', 'Regulatory approvals', 'Project companies', 'Title due diligence', 'Leases'],
    clients: ['Developers', 'Investors', 'Lenders', 'Individuals'],
    image: '/images/practice/property.jpg',
    topics: ['ppp'],
    legacy: ['property-law'],
  },

  // ── Rights & Advisory ─────────────────────────────────────────────────────
  {
    slug: 'human-rights',
    title: 'Human Rights & Public Interest',
    group: 'Rights & Advisory',
    summary: 'Free representation for people whose rights have been infringed, as part of our commitment to the rule of law.',
    body: [
      'At Zest Partners we take a keen interest in the observance of the rule of law, and our Human Rights and Public Interest Litigation department champions that cause.',
      'We offer free services to poor and indigent citizens whose rights have been grossly infringed but who have no resources to pursue their grievances in the appropriate forum.',
      'We take up public interest litigation as our corporate social responsibility and as a way of promoting good governance and the rule of law in Nigeria.',
      'Our Managing Partner was a member of the team that drafted the Fundamental Human Rights (Enforcement Procedure) Rules, and in August 2026 was inaugurated to the Governing Council of the Legal Aid Council of Nigeria.',
    ],
    services: ['Pro bono representation', 'Fundamental rights enforcement', 'Public interest litigation', 'International human rights law'],
    clients: ['Indigent citizens', 'Communities', 'Civil society'],
    image: '/images/practice/human-rights.jpg',
    topics: ['profession', 'policy'],
    legacy: ['human-rights'],
  },
  {
    slug: 'intellectual-property',
    title: 'Intellectual Property',
    group: 'Rights & Advisory',
    summary: 'Protecting trademarks, trade names, confidential information and creative works.',
    body: [
      'At Zest Partners we recognise the importance of protecting intellectual property rights, especially in Nigeria, where awareness of this area of our jurisprudence is still limited. Our clients benefit from our well-established expertise and extensive practice of intellectual property law.',
      'Our practice in this specialty is diverse. It includes working with clients to safeguard internal business operating information, product or service information, works of authorship and advertising, and to protect trademarks, service marks and trade names.',
    ],
    services: ['Trademarks', 'Service marks', 'Trade names', 'Copyright & works of authorship', 'Advertising', 'Confidential business information'],
    clients: ['Businesses', 'Creators', 'Brand owners'],
    image: '/images/practice/ip.jpg',
    topics: [],
    legacy: ['intellectual-property'],
  },
  {
    slug: 'foreign-documents',
    title: 'Interpretation of Foreign Documents',
    group: 'Rights & Advisory',
    summary: 'Legal review, translation and authentication of foreign-language and foreign-issued documents.',
    body: [
      // Rewritten: the old copy was taken from a Finnish immigration page. Confirm the scope with the firm.
      'We help individuals and businesses understand foreign-issued and foreign-language documents and their legal effect, and we prepare Nigerian documents for use abroad.',
      'Authorities often require documents written in another language to be translated by an authorised translator, and some civil-status documents can instead be accompanied by an official multilingual form. We advise on which applies and work with certified translators to meet the requirements.',
      'We also advise on authentication, notarisation and the formal requirements that courts, embassies and regulators may impose.',
    ],
    services: ['Document interpretation', 'Certified translation (with partners)', 'Notarisation & authentication', 'Residence & immigration documents'],
    clients: ['Individuals', 'Businesses', 'Foreign nationals'],
    image: '/images/practice/foreign-documents.jpg',
    topics: [],
    legacy: ['interpretation-of-foreign-documents'],
  },
  {
    slug: 'legislative-drafting',
    title: 'Legislative Drafting & Policy',
    group: 'Rights & Advisory',
    summary: 'Drafting bills, rules and public–private partnership agreements, and running the stakeholder engagement behind them.',
    body: [
      'Led by our Managing Partner, the firm drafts legislation and advises governments, development partners and agencies on the legal frameworks behind public services.',
      'Our work has included consulting for WaterAid on the Enugu State Water Sector Bill (2019); drafting the bill to establish the Anambra State Small Town Water Supply and Sanitation Agency; drafting and stakeholder engagement for the Plateau State Administration of Criminal Justice Law, 2018; and membership of the team that drafted the Fundamental Human Rights (Enforcement Procedure) Rules now used in courts across Nigeria.',
      'We also draft agreements for public–private partnerships (PPPs).',
    ],
    services: ['Bills & subsidiary legislation', 'Court & procedural rules', 'PPP agreements', 'Stakeholder engagement', 'Regulatory reform'],
    clients: ['State governments', 'Development partners', 'Public agencies'],
    image: '/images/practice/legislative.jpg',
    topics: ['drafting', 'ppp'],
    legacy: [],
  },
  {
    slug: 'training-capacity-building',
    title: 'Training & Capacity Building',
    group: 'Rights & Advisory',
    summary: 'Practical legal training for public institutions, regulators, companies and the profession.',
    body: [
      'We design and deliver workshops, seminars and training across diverse areas of law. Our Managing Partner is an accredited management trainer and consultant verified by the Nigeria Council for Management Development (NCMD).',
      'In October 2025, Zest Partners facilitated a two-day programme for staff of the Federal Airports Authority of Nigeria (FAAN) at the FAAN Training School, Ikeja, on conflict and dispute resolution in labour, trade, human resources and industrial relations.',
      'We have also delivered sessions for the Federal Inland Revenue Service (FIRS) Legal Department, the Revenue Mobilisation Allocation and Fiscal Commission (RMAFC), the Transmission Company of Nigeria (TCN), the FCT High Court, and Nigerian Bar Association programmes on the Rules of Professional Conduct.',
    ],
    services: ['Dispute resolution & negotiation', 'Industrial & labour relations', 'Tax & petroleum law', 'Legal & legislative drafting', 'Professional ethics', 'Court administration'],
    clients: ['Public institutions', 'Regulators', 'Companies', 'Professional bodies'],
    image: '/images/practice/training.jpg',
    topics: ['adr', 'tax', 'energy', 'profession', 'advocacy'],
    legacy: [],
  },
]

export const practiceBySlug = (slug: string) => practices.find((p) => p.slug === slug)
