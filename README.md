# Zest Partners — website

The website for [Zest Partners](https://zestpartnersng.com), a law firm in Abuja and Lagos, Nigeria.
Built with **React 19 + TanStack Start** (static prerender), **Tailwind CSS v4**, and deployed to **GitHub Pages**.

Every page is prerendered to plain HTML at build time, so the site loads fast and can be indexed by search engines, and it needs no server.

## Quick start

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # static site → dist/client
npm run typecheck
```

## Editing content

Copy lives in typed data files, not in page components:

| What | File |
|---|---|
| Firm name, address, phones, emails, WhatsApp, socials | `src/content/site.ts` |
| Practice areas (text, services, image, group) | `src/content/practices.ts` |
| Partners, bios, CVs, talks, publications | `src/content/people.ts` |
| Firm news articles | `src/content/news.ts` |
| Firm history timeline | `src/content/history.ts` |
| Insight topics and auto-tagging rules | `src/content/topics.ts` |
| Navigation (menus, mega menu, tabs) | `src/content/site.ts` → `nav` |
| Images | `public/images/…` — then run `python scripts/optimize-images.py` and use `<Img src="/images/…">` |

To **add a practice area**, add an entry to `practices.ts`. Its page, card, sitemap entry and links are generated automatically.
To **add a partner**, add an entry to `people.ts` and put the photo in `public/images/people/`.
To **add a news item**, add an entry to `news.ts`. It gets its own page under `/insights/…`, appears on the home page, and is searchable.
Talks and publications are tagged with topics automatically, and each practice page shows the ones that match its `topics`.

Search for `TODO` to find content still waiting on the firm.

## Project structure

```
src/
  components/
    ui/        Container, Section, Button, Reveal
    layout/    Header, Footer, Logo, WhatsAppButton
    blocks/    PageHeader, Breadcrumbs, SectionTabs, SearchDialog (Ctrl+K), PracticeCard,
               PersonCard, InsightCard, RotatingText, CTASection, ContactForm, NotFound
  content/     site.ts, practices.ts, people.ts, news.ts, history.ts, topics.ts, insights.ts
  routes/      file-based routes (TanStack Router)
  styles/      app.css — brand tokens (colours, fonts) live in @theme
scripts/
  postbuild.ts       404.html, legacy WordPress redirects, sitemap cleanup, .nojekyll
  content-audit.py   checks every old-site sentence against the new source
  provenance-audit.py checks every sentence on the built site against the sources (old site + docs/sources)
  check-links.py     fails the build if any internal link or #anchor is broken (runs in CI)
  optimize-images.py makes responsive WebP variants + src/content/images.json (re-run after adding images)
docs/
  PLAN.md                    rebuild plan & launch checklist
  content-audit.md           proof that all legacy content was carried over
  content-provenance.md      source for every piece of content, and items awaiting the firm
  legacy-site-content.md     content scraped from the old WordPress site
```

## Deployment

Every push to `main` builds and deploys via `.github/workflows/deploy.yml`.

**One-time setup:** Repo → Settings → Pages → Source: **GitHub Actions**.

- **Preview:** without further setup the site is served at `https://taiwo-stack.github.io/lawfirmweb/`.
- **Custom domain:** add the repository variable `CUSTOM_DOMAIN` = `zestpartnersng.com`
  (Settings → Secrets and variables → Actions → Variables). The build then uses the root path and writes the `CNAME` file.
  Follow the DNS checklist in `docs/PLAN.md` (Phase 7). **The domain's email is hosted on the current server, so keep the `mail` and MX records.**

### Contact form

The form posts to [Web3Forms](https://web3forms.com) (free). Create an access key for the firm's inbox and save it as the
repository **secret** `WEB3FORMS_KEY`. Without a key, the form falls back to opening the visitor's email app.

### Building with a sub-path on Windows (Git Bash)

Git Bash rewrites `/lawfirmweb/` into a Windows path. Disable that when testing a sub-path build locally:

```bash
MSYS_NO_PATHCONV=1 BASE_PATH=/lawfirmweb/ npm run build
```
