# Legacy content audit

**Purpose:** confirm that nothing from the old WordPress site (zestpartnersng.com) was lost in the rebuild.

**Method:** `python scripts/content-audit.py <legacy pages dir>` splits every legacy page into sentences. It then scores each sentence by its best word overlap with any sentence in `src/`. Anything below 60% overlap is listed for manual review.

**Result (1 October 2026):** 136 legacy sentences. 115 match automatically and the other 21 were reviewed by hand. Every one is accounted for, as below.

## Reviewed items

| Legacy content | Where it is now | Why it scored low |
|---|---|---|
| "We are Professionals in the fields of Contract, Debts and loan recovery…" (Home, About) | Home "About us" paragraph; About → "Our fields" lists every practice by group | Shown as a list instead of one long sentence; all words are present (vocab = 1.0) |
| "Other areas of experience include Arbitration/Negotiation, International Trade law…" | About → "Other areas of experience" (12 items) | Shown as a list |
| "ZEST PARTNERS also provides services as solicitors… General Contracts, Agreement, Debentures…" | About → "As solicitors, we prepare" chips; Contracts & Commercial page | Shown as a list |
| "ZEST PARTNERS exhibits a high level of dedication and commitment…" | About → "Who we are" and the "Dedication" value | Grammar cleaned up |
| "He is currently a Ph.D student at the University of Abuja…" | Profile → Academic work: PhD thesis (2023) | **Superseded.** The PhD was completed in 2023 (source: Dr. Obienu's profile document) |
| Contract specialist: "terminate contracts on favourable terms", "Excellence is evinced in… negotiation, document preparation and bid evaluation" | Contracts & Commercial page | Light rewording |
| Commercial specialists: "professional analysts… identifying business opportunities…" | Contracts & Commercial page, third paragraph | Reworded to describe client work |
| Debt recovery: "negotiate debt restructuring and debt reliefs…" | Debt & Loan Recovery page | Light rewording |
| Litigation: "Departments are fused together because our focus is to timely deliver solution" | General Litigation & ADR page | Grammar cleaned up |
| IP: "At Zest Partner, we recognize the importance…" | Intellectual Property page | Typo fixed ("Zest Partners") |
| Wills: "helping beneficiaries, heirs, trustees, executors…" | Wills & Probate page | Grammar cleaned up |
| Interpretation of Foreign Documents (4 sentences about Finnish/Swedish residence permits and EU forms) | Interpretation of Foreign Documents page | **Intentionally replaced.** The text was copied from a Finnish immigration page. Its general points (authorised translators, official multilingual forms) are kept in Nigerian terms. The firm should confirm the scope |

## Other legacy elements carried over

- **Taglines:** "We Are Here To Fight Against Any violation With Experience" (Expertise page heading) and "Feel Free To Ask Something We Are Here" (Contact heading and home CTA)
- **Vision and mission:** Home, About
- **Contact details:** address, both phone numbers, both emails and WhatsApp link (header, footer, contact page)
- **Team:** both partners with their original photos and bios (now expanded)
- **Real photography:** office exterior and library photos that were in the old media library but never shown (Facilities & library gallery)
- **URLs:** all 21 old page URLs redirect to their new equivalents (`scripts/postbuild.ts`)

## Not carried over

- 9 blog posts: theme demo placeholders ("What we are capable of usually gets discovered")
- "Sample Page" and the empty "Our Team" page (the latter redirects to `/people`)
- About 44 theme demo images, and stock images, including a screenshot of another firm's website
- Footer credit "Designed by Paucha Technology"
