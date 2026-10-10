# Zest Partners — Website Rebuild Plan

**Goal:** Replace the WordPress/Elementor site at https://zestpartnersng.com with a fast, modern, modular site built in **React + TanStack**, deployed from **GitHub** to **GitHub Pages**, on the same domain.

**Short answer on feasibility:** Yes. GitHub Pages only serves static files, so the site is built with **TanStack Start in static prerender mode** (every route is rendered to real HTML at build time, which is good for SEO) and a GitHub Actions workflow publishes the `dist/` folder. Nothing on the site needs a server except the contact form, which goes through a form service (see Phase 5).

---

## 1. What exists today (audit of the scraped site)

| Item | Finding |
|---|---|
| Platform | WordPress + Elementor, Apache/cPanel host at `162.241.85.30` |
| Pages | Home, About, Practice Area (index), Contact + **17 practice-area pages** |
| Blog | 9 posts, all theme demo placeholders ("What we are capable of usually gets discovered") → **drop** |
| Our Team page | Empty → team lives on About; will become its own page |
| Media | 97 files; ~44 are theme demo files → drop. The rest are mostly generic stock/screenshots (one is a screenshot of another firm's site, "Amicus Legal") → **replace** |
| Social links | Icons in the footer link nowhere. The WhatsApp link reached the former web designer, not the firm, so it is not used |
| Email | **MX record → `mail.zestpartnersng.com` on the current host.** The DNS switch must keep this working (Phase 7). |
| Footer credit | Credit to the former web designer → **drop** |

### Content problems to fix during the rewrite
1. **Interpretation of Foreign Documents** was copied from a Finnish immigration page (mentions "Finnish, Swedish or English", "EU Member State"). Needs a full rewrite for Nigeria.
2. **Aviation** says team members speak at "U.S. conferences" and hold roles in bar associations. This reads as copied boilerplate; confirm it or rewrite it.
3. **Commercial Specialist** and **Contract Specialist** overlap, and the commercial page on the practice index describes "marketing strategies". Merge them into one "Contracts & Commercial" practice.
4. **Company Law** and **Corporate Compliance & Financial Services** overlap. Group them under "Corporate & Commercial".
5. Typos and grammar: "Somthing", "Zest Partner", "vis-avis", "Equitorial", "Nneamaka", repeated commas.
6. Criminal Law is claimed on the home page but has no page of its own. It is folded into General Litigation.

---

## 2. New information architecture

```
/                         Home
/about                    The Firm (story since 2006, vision, mission, values)
/people                   Our People (index)
/people/$slug             Partner profile
/practice-areas           Practice areas index (grouped)
/practice-areas/$slug     Practice area detail
/insights                 News & insights (conference talks, articles) — optional at launch
/insights/$slug
/contact                  Contact + map + form + WhatsApp
/privacy                  Privacy notice (NDPA 2023 compliance)
*                         404
```

**The 17 practice pages become 5 groups:**

| Group | Practices |
|---|---|
| Corporate & Commercial | Company Law · Corporate Compliance & Financial Services · Contracts & Commercial (merged) · Taxation |
| Finance & Energy | Banking & Finance · Petroleum / Oil & Gas · Aviation |
| Dispute Resolution | General Litigation & ADR (incl. criminal) · Debt & Loan Recovery · Election Petitions |
| Private Client | Wills & Probate · Matrimonial & Family Law · Property & Real Estate |
| Rights & Advisory | Human Rights & Public Interest (pro bono) · Intellectual Property · Translation & Interpretation of Foreign Documents |

**Redirects:** every old URL (`/banking/`, `/matrimonial-law-2/`, `/about/` …) gets a static redirect page to its new route so Google rankings and old links keep working.

---

## 3. Brand direction ("rebrand")

- **Logo:** the new ZP monogram with a pillar (provided). Needs an SVG version: request the vector from the designer, or I will trace one.
- **Palette** (drawn from the monogram and the law-library photos):
  - Ink `#0E1116` (near-black, primary)
  - Paper `#F7F5F0` (warm off-white background)
  - Brass `#B08D57` (accent, taken from the gilt spines)
  - Law Green `#1F4D3A` (secondary, from the green law reports)
  - Oxblood `#6B1F24` (sparing highlight)
- **Type:** a serif display face for headings (e.g. *Fraunces* or *Cormorant Garamond*) and a clean sans for body text (*Inter* or *Manrope*).
- **Photography:** real photos instead of stock. Use the firm's library shelves, partner portraits, and the African Bar Association (AFBA) conference podium photo, which supports a "Thought Leadership" section. Replace every stock image.
- **Tone:** confident, precise, Nigerian and pan-African. Cut the filler and make each practice page answer three questions: who we act for, what we do, and why us.

---

## 4. Tech stack

| Concern | Choice | Why |
|---|---|---|
| Framework | **TanStack Start** (React 19) with `prerender` → static output | File-based type-safe routing and real HTML per page for SEO |
| Build | Vite | Comes with Start |
| Styling | Tailwind CSS v4 + CSS variables for brand tokens | Modular and consistent |
| UI primitives | shadcn/ui (Radix), used selectively | Accessible menus, dialogs, accordions |
| Motion | Motion (framer-motion), kept subtle | Modern feel without heaviness |
| Content | Typed content files (`src/content/*.ts`) + MDX for long text | Edit copy without touching components |
| Forms | Web3Forms or Formspree (free tier) + WhatsApp link | No server needed |
| Map | Embedded Google Maps iframe (Kaura District, Abuja) | |
| SEO | Per-route `head()` meta, Open Graph, JSON-LD `LegalService`, `sitemap.xml`, `robots.txt` | |
| Analytics | Plausible, or GA4 with a consent banner | |
| Hosting | GitHub Pages via GitHub Actions | Free, with HTTPS |
| Domain | `zestpartnersng.com` → GitHub Pages (`CNAME` file) | |

**As built:** shadcn/ui, Motion and MDX turned out to be unnecessary. Menus and the search dialog are hand-built, animation is plain CSS (`Reveal`, `.rise`, the marquee), and all copy lives in typed `src/content/*.ts` files.

**Fallback:** if TanStack Start's static prerender causes problems on Pages, drop to **TanStack Router (SPA) + Vite** with a `404.html` copy of `index.html` and prerender the routes with a small script. Routing code stays nearly the same.

### Modular component system
```
src/
  components/
    layout/      Header, MobileNav, Footer, Container, Section
    ui/          Button, Card, Badge, Accordion, Input…
    blocks/      Hero, StatsBar, PracticeGrid, PracticeCard, PersonCard,
                 CTASection, Testimonial, InsightCard, ContactPanel, MapEmbed
  content/
    site.ts          name, contacts, socials, address
    practices.ts     all practice areas (slug, group, summary, body, image)
    people.ts        partners
    insights/*.mdx
  routes/            TanStack file routes
  styles/            tokens.css
public/
  images/  CNAME  robots.txt  favicon…
```
Each page is built from these blocks. Adding a practice area or a partner means editing a data file, not writing a page.

---

## 5. Step-by-step workflow

### Phase 0 — Accounts & decisions (you)
- [ ] GitHub account/org and repo name (e.g. `zestpartners/website`)
- [ ] Confirm the domain registrar and who has DNS access
- [x] Site email is now chineduobienu@zestpartnersng.com. **This mailbox is hosted on the current server (MX → mail.zestpartnersng.com), so the DNS switch in Phase 7 must keep the mail records exactly as they are.**
- [ ] Send: vector logo, the partners' names and bios, real contact details, social URLs, any documents or brochures

### Phase 1 — Content (done → `content/`)
- [x] Scraped all pages via the WP REST API → `content/pages/*.md`, raw JSON → `content/raw/`
- [x] Downloaded site media → `assets/legacy/`; your photos → `assets/provided/`
- [ ] Rewrite copy (I draft it, you approve it); fix the problem pages listed in §1
- [ ] Add missing content: firm stats (years since 2006, matters handled, offices), client sectors, FAQs

### Phase 2 — Scaffold
- [ ] `npm create @tanstack/start` (or the TanStack CLI) → TypeScript, Tailwind
- [ ] Configure static prerender and crawl all routes
- [ ] ESLint and Prettier
- [ ] Create the GitHub repo and push

### Phase 3 — Design system
- [ ] Brand tokens (colors, type scale, spacing, radius, shadows) in `tokens.css`, with dark sections
- [ ] Fonts, favicon set from the monogram, OG image template
- [ ] Build the UI primitives and layout (header with a practice-areas mega-menu, mobile drawer, footer)

### Phase 4 — Pages
- [ ] Home: hero (monogram + tagline + CTA), trust bar (since 2006, Abuja & Lagos), practice groups, "Why Zest", managing partner quote, AFBA conference highlight, CTA
- [ ] About: story, vision/mission, values, library photos
- [ ] Practice index (filter by group) and a detail template (overview, what we do, sectors, related practices, CTA)
- [ ] People index and profile template
- [ ] Contact: form, WhatsApp, phones, emails, map, office hours
- [ ] Insights (optional at launch), Privacy, 404

### Phase 5 — Integrations
- [ ] Contact form → Web3Forms/Formspree → firm inbox
- [ ] Floating WhatsApp button
- [ ] Analytics and a consent notice

### Phase 6 — Quality
- [x] Responsive checks at 360, 768, 1024 and 1440 px (browser tests: no horizontal overflow at 390px)
- [x] Lighthouse (mobile, live): Performance 90–97, Accessibility/Best Practices/SEO 100 on all pages tested
- [x] Images to WebP with responsive `srcset` (`scripts/optimize-images.py`, `<Img>`)
- [x] Accessibility: axe scan of every page at 1440px and 390px with no violations; keyboard menus; WCAG AA contrast
- [x] Legacy URL redirects, sitemap, robots, JSON-LD; link and anchor checker runs in CI

### Phase 7 — Deploy & cut-over
1. [ ] GitHub Actions workflow: `npm ci → npm run build → upload dist → deploy-pages`
2. [ ] Test on `https://<user>.github.io/<repo>/` (set the base path temporarily)
3. [ ] Set the repository variable `CUSTOM_DOMAIN` = `zestpartnersng.com` (the workflow then writes `CNAME`); set the custom domain in Repo → Settings → Pages
4. [ ] **Before changing DNS:** make sure `mail.zestpartnersng.com` has its own A record pointing to `162.241.85.30`, and keep the MX, SPF and DKIM records unchanged, so email keeps working.
5. [ ] DNS changes: apex `A` → `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153` (plus the AAAA records if wanted); `www` `CNAME` → `<user>.github.io`
6. [ ] Enforce HTTPS in Pages settings once the certificate is issued
7. [ ] Verify the domain in GitHub (prevents takeover); submit the sitemap to Google Search Console
8. [ ] Keep the old WordPress hosting for about 30 days as a fallback, then cancel the web hosting only (not email) or move email elsewhere

### Phase 8 — After launch
- [ ] How to edit content: change a file in `src/content/`, commit, and it auto-deploys
- [ ] Optional later: a Git-based CMS (Decap/TinaCMS) so non-developers can edit on GitHub Pages
