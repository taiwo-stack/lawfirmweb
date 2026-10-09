# Content provenance

Every factual statement on the site comes from one of three sources:

| Code | Source |
|---|---|
| **OLD** | The old WordPress site, zestpartnersng.com (scraped 1 Oct 2026, kept in `docs/legacy-site-content.md`) |
| **CV** | *DR CHINEDU FOR WEBSITE.pdf*, the Managing Partner's profile supplied by the firm |
| **PHOTO** | Photos supplied by the firm, or real photos from the old site's media library (library shelves, office building, AFBA podium) |

## Where each piece of content comes from

| Content | File | Source |
|---|---|---|
| Firm founding (2006), vision, mission, "who we are", experience list, documents prepared | `site.ts`, `about.index.tsx` | OLD |
| Address, phones, WhatsApp | `site.ts` | OLD |
| Email: chineduobienu@zestpartnersng.com (the only address on the site) | `site.ts`, `people.ts` | Instructed by the firm, 1 Oct 2026; address changed to chineduobienu@ on the firm's instruction, 9 Oct 2026. Replaces the old site's zestpartners@yahoo.com and chineduobienu@yahoo.com |
| Lagos office | `site.ts`, contact FAQ | OLD (Edwin Nneamaka Uzoma "personally runs the Lagos office") |
| Practice-area text (all 20 pages) | `practices.ts` | OLD. Details about the Managing Partner come from CV |
| Criminal Law page | `practices.ts` | OLD (criminal law listed as a field; "criminal and civil litigation") + CV (Plateau ACJL, FREP Rules) |
| Legislative Drafting and Training pages | `practices.ts` | CV |
| Enterprise Risk Management & Data Protection page | `practices.ts` | **Instructed by the firm, 1 Oct 2026** (not on the old site or in the CV). Shows only the service name; the firm is to supply a description |
| "Who we act for" lists | `practices.ts`, home | Only where OLD names the clients (banking, tax, compliance, debt recovery, wills, matrimonial, human rights) or CV does (legislative, training) |
| Dr. Obienu's profile, positions, publications, talks | `people.ts` | CV |
| Edwin Nneamaka Uzoma's profile | `people.ts` | OLD |
| News articles (LACON, AFBA 2025, FAAN training, book) | `news.ts` | CV |
| History timeline | `history.ts` | OLD (2006) + CV (all other years) |
| Library contents (NSCC, NWLR, All England Law Reports, Halsbury's) | facilities page | PHOTO (titles readable on the spines and shelf labels) |
| Taglines "We are here to fight against any violation with experience" and "Feel free to ask… we are here" | Expertise and Contact headings | OLD |

## Wording written for the site (not factual claims; please approve)

These are headings and connecting lines written for the design. They make no factual claims beyond the sources above.

- Home hero: "Counsel for business. / disputes. / energy. / families. / justice."
- Home: "Corporate practice and litigation, since 2006.", "Individuals, companies and government agencies." (old About page), "Modern and up to date IT facilities." (old site), "Papers presented locally and internationally." (CV), "Our leadership."
- About: "Dynamic by every standard." (from OLD "by all standards dynamic"), "How we practise."
- History: the short title on each milestone, e.g. "Shaping human rights procedure", "A continental voice"
- Facilities: "Our office and law library."
- Community: "Free services to the poor and indigent." (old Human Rights page), "Human Rights and Public Interest Litigation." (old department name), "Leadership positions held." (CV heading)
- Insights: "Ideas from the Bar, the boardroom and the classroom.", "Invite us to speak or train."
- Practice summaries (the one-line description under each title) condense the OLD page text.
- Group descriptions, e.g. "Structuring, governance, tax and the contracts that hold business together."
- Header descriptor "Legal Practitioners · Arbitrators · Mediators · Trainers". It is based on the CV (MCIArb, FICMC, NCMD-accredited trainer), but it describes the firm, so the firm should confirm it.
- Privacy notice: a template. It must be reviewed by the firm against the NDPA 2023.

## Still to be confirmed by the firm

1. **Aviation:** the team claims on that page (engineering degrees, pilots, regulatory agencies, speaking engagements, bar leadership) come from the old site and are unverified.
2. **Interpretation of Foreign Documents:** the old text was copied from a Finnish immigration page. The new text keeps only its general points. Please confirm what this service involves.
3. **AFBA podium photo:** it is used with the 2025 Accra conference news item. Please confirm it was taken there.
4. **Key contacts:** practice pages name Dr. Obienu only where his CV covers the practice; other pages show the firm's contacts. Which practices should list Edwin Nneamaka Uzoma?
5. **Founder:** the site calls Dr. Obienu "Principal & Managing Partner" (his CV title). If he founded the firm and wants that stated, confirm it and the wording will be added.
6. **Talk venue:** "NBA Aniocha Branch" (the CV says Anambra State; Aniocha is in Delta State).
7. **LACON wording:** "Governing Council" vs "Governing Board" (the CV uses both).
8. **Social media:** links to the firm's profiles, if any.
9. **Enterprise Risk Management & Data Protection:** supply a description of the service and say who should be the key contact.

## Reverse audit (1 Oct 2026)

`python scripts/provenance-audit.py <legacy pages dir>` scores every visible sentence on every built page against the sources: the scraped old site plus `docs/sources/` (the firm's documents, transcribed verbatim).

**Result:** 342 unique sentences.
- **231 sourced:** verbatim or lightly edited.
- **63 reworded:** condensed from a source. Each was checked by hand for meaning.
- **48 written for the site.** All 48 were reviewed by hand, and none adds an unsourced fact:
  - Headings and taglines (listed above under "Wording written for the site")
  - Interface and contact wording: FAQ questions, "Send us a message…", map notice, form note
  - Counts calculated from the data, e.g. "24 papers presented… since 2007"
  - Facts from the CV combined from several lines, e.g. the Taxation, Training and 2015 history sentences
  - Library titles read from the firm's photos
  - The privacy template and the Foreign Documents page, both flagged for the firm

**Removed or corrected after this audit:** these sentences went beyond the sources.
- Company Law: "We take the time to understand each client's structure and objectives…"
- Criminal Law: "Our understanding of criminal procedure goes beyond the courtroom."
- Legislative Drafting: "the firm drafts legislation and advises governments…". The CV attributes this work to the Managing Partner.
- Taxation: "The practice is led by our Managing Partner…". The CV does not say this.
- Training: "We have delivered sessions for FIRS, RMAFC, TCN…". The CV says the Managing Partner presented these papers. Only the FAAN training is stated as facilitated by the firm.
- CTA: "…to speak with a partner" and "Speak with Dr. Chinedu Obienu" now read "about your matter" and "Contact Dr. Chinedu Obienu".

## Content rule (agreed with the firm, 1 Oct 2026)

Wording may be written for the site, but **only from what the old website and the firm's documents (`docs/sources/`) say**, without stretching them. Removed under this rule: the FAAN training sentence on the Aviation page (the training was on labour and dispute resolution), the "commercial specialists as analysts for clients" line, and drafted descriptions for the Risk & Data Protection page.
