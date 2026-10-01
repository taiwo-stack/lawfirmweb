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
  image: string
  /** Old WordPress slugs that should redirect here. */
  legacy: string[]
}

export const groups: { name: PracticeGroup; blurb: string }[] = [
  { name: 'Corporate & Commercial', blurb: 'Structuring, governance and the contracts that hold business together.' },
  { name: 'Finance & Energy', blurb: 'Transactions in banking, petroleum and aviation.' },
  { name: 'Dispute Resolution', blurb: 'Litigation, ADR and recovery across Nigerian courts.' },
  { name: 'Private Client', blurb: 'Families, estates and property handled with discretion.' },
  { name: 'Rights & Advisory', blurb: 'Public interest work, intellectual property, legislative drafting and training.' },
]

export const practices: Practice[] = [
  {
    slug: 'company-law',
    title: 'Company Law',
    group: 'Corporate & Commercial',
    summary:
      'Incorporation, shareholder and director rights, governance and secretarial support for companies of every size.',
    body: [
      'Our corporate practice covers the full life of a company: incorporation, articles of association, directors’ and shareholders’ rights, board meetings, company secretarial matters, and public listing or delisting.',
      'No two corporate transactions are the same. We take the time to understand each client’s structure and objectives before advising on the right course.',
    ],
    services: ['Company incorporation', 'Articles of association', 'Shareholder & director rights', 'Board & secretarial matters', 'Listing and delisting'],
    image: '/images/practice/company-law.jpg',
    legacy: ['company-laws'],
  },
  {
    slug: 'corporate-compliance-financial-services',
    title: 'Corporate Compliance & Financial Services',
    group: 'Corporate & Commercial',
    summary:
      'A seamless, one-stop corporate service that keeps clients compliant and informed.',
    body: [
      'We run a broad corporate and commercial practice with one goal: a seamless, one-stop service that brings together each client’s diverse business interests.',
      'We make sure clients comply with the laws that apply to them, and we proactively keep them updated on developments that may affect their business objectives.',
      'We advise on finance and corporate decision-making, and act for public and private companies and partnerships on the tax implications of commercial transactions and tax-efficient business structures.',
    ],
    image: '/images/practice/corporate-compliance.jpg',
    legacy: ['corporate-compliance-and-financial-services'],
  },
  {
    slug: 'contracts-commercial',
    title: 'Contracts & Commercial',
    group: 'Corporate & Commercial',
    summary:
      'Contract specialists covering every phase: research, negotiation, drafting, bid evaluation and exit.',
    body: [
      'Our contract specialists handle every phase of contract development, from researching the applicable regulations to negotiating terms and preparing the final document.',
      'We evaluate bids, draft and review agreements, and help clients terminate contracts on favourable terms when the relationship has run its course.',
      'As solicitors we prepare general contracts, agreements, debentures, mortgages, powers of attorney and lease agreements, and we advise on arbitration and receivership.',
    ],
    services: ['Negotiation', 'Drafting & review', 'Bid evaluation', 'Debentures & mortgages', 'Powers of attorney', 'Lease agreements', 'Contract termination'],
    image: '/images/practice/contracts.jpg',
    legacy: ['contract-specialist', 'commercial-specialist'],
  },
  {
    slug: 'taxation',
    title: 'Taxation',
    group: 'Corporate & Commercial',
    summary:
      'Income tax planning and the tax aspects of acquisitions, reorganisations and restructuring.',
    body: [
      'Our tax group has substantial expertise in income tax planning for individuals, corporations, partnerships, limited liability companies and other business entities.',
      'We advise business clients on the tax aspects of acquisitions, reorganisations, liquidations, redemptions and debt restructuring.',
      'The practice is led by our Managing Partner, whose PhD thesis (University of Abuja, 2023) and LL.M dissertation (University of Jos, 2008) both examined Nigerian taxation, and who has trained the Federal Inland Revenue Service Legal Department on tax dispute adjudication.',
    ],
    image: '/images/practice/taxation.jpg',
    legacy: ['taxation-laws'],
  },
  {
    slug: 'banking-finance',
    title: 'Banking & Finance',
    group: 'Finance & Energy',
    summary:
      'Acting for lenders and borrowers in complex financing transactions.',
    body: [
      'Our lawyers represent lenders and borrowers in large and complex financing transactions. Clients include commercial banks, investment banks, insurance and finance companies, merchant banking firms, private investment funds and other institutional lenders and investors.',
    ],
    services: [
      'First and second lien loan facilities',
      'Real estate finance',
      'Acquisition financing',
      'Leveraged recapitalisation',
      'Asset-backed financing',
      'Workouts, restructuring & exit financing',
      'Private placement',
      'Debt recovery',
    ],
    image: '/images/practice/banking.jpg',
    legacy: ['banking'],
  },
  {
    slug: 'petroleum-law',
    title: 'Petroleum Law',
    group: 'Finance & Energy',
    summary:
      'Advising across the petroleum lifecycle, from licensing to decommissioning.',
    body: [
      'Our petroleum lawyers specialise in the legal framework that regulates petroleum activities, with in-house experience at large and smaller oil companies on both the operator and licensee side.',
      'We assist in all matters relating to petroleum activities: applications for production licences, exploration, development and production, through to decommissioning and removal.',
      'Our Managing Partner’s doctoral research was a legal analysis of the tax regime in the Nigerian petroleum industry, and he has presented on the Petroleum Industry Act 2021 to the Revenue Mobilisation Allocation and Fiscal Commission.',
    ],
    services: ['Licensing', 'Exploration & development', 'Production', 'Decommissioning & removal'],
    image: '/images/practice/petroleum.jpg',
    legacy: ['petroleum-law'],
  },
  {
    slug: 'aviation',
    title: 'Aviation',
    group: 'Finance & Energy',
    summary: 'Legal skill combined with a working knowledge of the aviation industry.',
    body: [
      // Rewritten: the original copy contained unverified, US-specific claims. Confirm and expand with the firm.
      'Our aviation team combines legal skill with practical knowledge of the industry. We advise operators, lessors, financiers and service providers on regulatory compliance, aircraft transactions, leasing and financing, and aviation-related disputes.',
    ],
    image: '/images/practice/aviation.jpg',
    legacy: ['aviation'],
  },
  {
    slug: 'litigation-adr',
    title: 'General Litigation & ADR',
    group: 'Dispute Resolution',
    summary:
      'Civil and criminal litigation across Nigeria, with arbitration and negotiation working alongside it.',
    body: [
      'We handle criminal and civil litigation for clients across various states of Nigeria. Our primary objective is to resolve disputes arising from our clients’ business and commercial activities effectively and with the least expenditure of time and resources.',
      'Our litigation and alternative dispute resolution teams are combined because our focus is timely solutions. The team is made up of dispute resolution practitioners who also work in the firm’s other core practice areas.',
      'Our Managing Partner is a Member of the Chartered Institute of Arbitrators (UK) and a Fellow of the Institute of Chartered Mediators and Conciliators.',
    ],
    services: ['Civil litigation', 'Criminal law', 'Arbitration', 'Negotiation & mediation'],
    image: '/images/practice/litigation.jpg',
    legacy: ['general-litigation'],
  },
  {
    slug: 'debt-recovery',
    title: 'Debt & Loan Recovery',
    group: 'Dispute Resolution',
    summary:
      'Recovery strategies and debt restructuring for companies, individuals and government agencies.',
    body: [
      'We regularly handle debt recovery and understand the crippling effect that trapped funds can have on any business. Recovery calls for different strategies, and our lawyers have helped companies, individuals and government agencies recover debts successfully.',
      'We advise candidly when a recovery has reached a dead end. We also help companies and individuals negotiate debt restructuring and relief with financial and non-financial creditors, and our insolvency lawyers advise on restructuring and bankruptcy.',
      'We have helped both local and foreign companies plan debt recovery and restructuring strategies in Nigeria.',
    ],
    services: ['Debt recovery', 'Loan recovery', 'Debt restructuring', 'Insolvency & bankruptcy'],
    image: '/images/practice/debt-recovery.jpg',
    legacy: ['debts-and-loan-recovery'],
  },
  {
    slug: 'election-petitions',
    title: 'Election Petitions',
    group: 'Dispute Resolution',
    summary: 'Pre-election and post-election disputes, handled by specialists.',
    body: [
      'Our election petitions group is made up of specialists who have built a strong practice in pre-election and post-election disputes, and we are well placed to meet our clients’ needs in this area.',
    ],
    image: '/images/practice/election.jpg',
    legacy: ['election-petitions'],
  },
  {
    slug: 'wills-probate',
    title: 'Wills & Probate',
    group: 'Private Client',
    summary:
      'Estate planning, wills, trusts and the full probate process, with or without a will.',
    body: [
      'Our specialists are experienced in estate planning, drafting wills and living trusts, and every part of the probate process.',
      'We help beneficiaries, heirs, trustees and executors through any litigation that arises, to reach the best possible result.',
      'We also help clients manage probate where there is no will, advise on powers of attorney, and act as executors or administrators when required.',
    ],
    services: ['Estate planning', 'Wills & living trusts', 'Probate', 'Letters of administration', 'Executorship'],
    image: '/images/practice/probate.jpg',
    legacy: ['wills-and-probate'],
  },
  {
    slug: 'matrimonial-family-law',
    title: 'Matrimonial & Family Law',
    group: 'Private Client',
    summary:
      'Divorce, custody, support and paternity, handled with firm advocacy and personal care.',
    body: [
      'We represent clients in matters of divorce, child custody, child support, spousal support, equitable distribution and paternity.',
      'At a difficult time you need a strong advocate for your interests and a compassionate, understanding counsellor. That is what you will receive at Zest Partners, with personal attention throughout.',
    ],
    services: ['Divorce', 'Child custody & support', 'Spousal support', 'Property distribution', 'Paternity'],
    image: '/images/practice/matrimonial.jpg',
    legacy: ['matrimonial-law-2'],
  },
  {
    slug: 'property-real-estate',
    title: 'Property & Real Estate',
    group: 'Private Client',
    summary:
      'Acquisition, financing and development of real estate, supported by thorough due diligence.',
    body: [
      'Our real estate team provides drafting and negotiation support and advises on real estate financing, project finance, mortgage schemes and other property acquisitions.',
      'We have advised many clients on the acquisition, financing and construction of real estate projects in Nigeria, covering the regulatory framework for development, procurement of approvals, establishment of project companies and extensive due diligence on ownership and proprietary rights.',
    ],
    services: ['Acquisitions', 'Real estate finance', 'Mortgages', 'Regulatory approvals', 'Title due diligence'],
    image: '/images/practice/property.jpg',
    legacy: ['property-law'],
  },
  {
    slug: 'human-rights',
    title: 'Human Rights & Public Interest',
    group: 'Rights & Advisory',
    summary:
      'Pro bono representation for people whose rights have been infringed, as part of our commitment to the rule of law.',
    body: [
      'We care deeply about the rule of law, and our Human Rights and Public Interest Litigation department champions it.',
      'We offer free services to poor and indigent citizens whose rights have been grossly infringed but who lack the resources to pursue their grievances in the right forum. Public interest litigation is our corporate social responsibility and our way of promoting good governance and the rule of law in Nigeria.',
    ],
    image: '/images/practice/human-rights.jpg',
    legacy: ['human-rights'],
  },
  {
    slug: 'intellectual-property',
    title: 'Intellectual Property',
    group: 'Rights & Advisory',
    summary:
      'Protecting trademarks, trade names, confidential information and creative works.',
    body: [
      'We recognise the importance of protecting intellectual property rights, especially in Nigeria, where awareness of this area of law is still limited. Our clients benefit from our established expertise and extensive practice.',
      'Our work covers safeguarding internal business information, product and service information, works of authorship and advertising, and protecting trademarks, service marks and trade names.',
    ],
    services: ['Trademarks & service marks', 'Trade names', 'Copyright', 'Confidential information'],
    image: '/images/practice/ip.jpg',
    legacy: ['intellectual-property'],
  },
  {
    slug: 'foreign-documents',
    title: 'Interpretation of Foreign Documents',
    group: 'Rights & Advisory',
    summary:
      'Legal review and interpretation of foreign-language and foreign-issued documents for use in Nigeria and abroad.',
    body: [
      // Rewritten: the original copy was taken from a Finnish immigration page. Confirm the scope with the firm.
      'We help individuals and businesses understand foreign-issued and foreign-language documents and their legal effect, and prepare Nigerian documents for use abroad.',
      'We work with certified translators, and advise on authentication, notarisation and the formal requirements that courts, embassies and regulators may impose.',
    ],
    services: ['Document interpretation', 'Certified translation (with partners)', 'Notarisation & authentication', 'Immigration documentation'],
    image: '/images/practice/foreign-documents.jpg',
    legacy: ['interpretation-of-foreign-documents'],
  },
  {
    slug: 'legislative-drafting',
    title: 'Legislative Drafting & Policy',
    group: 'Rights & Advisory',
    summary:
      'Drafting bills, rules and public–private partnership agreements, and running the stakeholder engagement behind them.',
    body: [
      'Led by our Managing Partner, the firm drafts legislation and advises governments, development partners and agencies on the legal frameworks behind public services.',
      'Our work has included consulting for WaterAid on the Enugu State Water Sector Bill (2019); drafting the bill to establish the Anambra State Small Town Water Supply and Sanitation Agency; drafting and stakeholder engagement for the Plateau State Administration of Criminal Justice Law, 2018; and membership of the team that drafted the Fundamental Human Rights (Enforcement Procedure) Rules now used in courts across Nigeria.',
      'We also draft agreements for public–private partnerships (PPPs).',
    ],
    services: ['Bills & subsidiary legislation', 'Court & procedural rules', 'PPP agreements', 'Stakeholder engagement', 'Regulatory reform'],
    image: '/images/practice/legislative.jpg',
    legacy: [],
  },
  {
    slug: 'training-capacity-building',
    title: 'Training & Capacity Building',
    group: 'Rights & Advisory',
    summary:
      'Practical legal training for public institutions, regulators, companies and the profession.',
    body: [
      'We design and deliver workshops, seminars and training across diverse areas of law. Our Managing Partner is an accredited management trainer and consultant verified by the Nigeria Council for Management Development (NCMD).',
      'In October 2025, Zest Partners facilitated a two-day programme for staff of the Federal Airports Authority of Nigeria (FAAN) at the FAAN Training School, Ikeja, on conflict and dispute resolution in labour, trade, human resources and industrial relations.',
      'We have also delivered sessions for the Federal Inland Revenue Service (FIRS) Legal Department, the Revenue Mobilisation Allocation and Fiscal Commission (RMAFC), the Transmission Company of Nigeria (TCN), the FCT High Court, and Nigerian Bar Association programmes on the Rules of Professional Conduct.',
    ],
    services: ['Dispute resolution & negotiation', 'Industrial & labour relations', 'Tax & petroleum law', 'Legal & legislative drafting', 'Professional ethics'],
    image: '/images/practice/training.jpg',
    legacy: [],
  },
]

export const practiceBySlug = (slug: string) => practices.find((p) => p.slug === slug)

export const groupId = (group: PracticeGroup) => group.toLowerCase().replace(/[^a-z]+/g, '-')
