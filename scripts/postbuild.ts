/**
 * Post-build steps for GitHub Pages:
 *  - 404.html from the prerendered /404 route (Pages serves it for unknown URLs)
 *  - static redirect pages for every old WordPress URL, so links and rankings survive
 *  - .nojekyll so Pages serves the output untouched
 */
import { copyFileSync, existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { practices } from '../src/content/practices.ts'

const out = 'dist/client'
const base = (process.env.BASE_PATH ?? '/').replace(/\/?$/, '/')

copyFileSync(join(out, '404/index.html'), join(out, '404.html'))
rmSync(join(out, '404'), { recursive: true })
rmSync(join(out, 'pages.json'), { force: true })
writeFileSync(join(out, '.nojekyll'), '')

// The crawler records /404, #hash and ?filter links, and slash/no-slash duplicates; keep one canonical URL per page.
const sitemapPath = join(out, 'sitemap.xml')
const locs = [...readFileSync(sitemapPath, 'utf8').matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1])
const clean = [...new Set(locs.filter((u) => !/[#?]/.test(u) && !u.endsWith('/404')).map((u) => u.replace(/\/?$/, '/')))]
writeFileSync(
  sitemapPath,
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${clean
    .map((u) => `  <url><loc>${u}</loc></url>`)
    .join('\n')}\n</urlset>\n`,
)

const redirects: Record<string, string> = {
  'practice-area': 'practice-areas/',
  'our-team': 'people/',
  blog: '',
  'sample-page': '',
}
for (const p of practices) for (const old of p.legacy) redirects[old] = `practice-areas/${p.slug}/`

const page = (to: string) => `<!doctype html>
<html lang="en"><head><meta charset="utf-8">
<title>Redirecting…</title>
<link rel="canonical" href="https://zestpartnersng.com/${to}">
<meta name="robots" content="noindex">
<meta http-equiv="refresh" content="0; url=${base}${to}">
<script>location.replace(${JSON.stringify(base + to)} + location.hash)</script>
</head><body><a href="${base}${to}">This page has moved.</a></body></html>
`

let count = 0
for (const [from, to] of Object.entries(redirects)) {
  const dir = join(out, from)
  if (existsSync(join(dir, 'index.html'))) throw new Error(`Redirect /${from} would overwrite a real page`)
  mkdirSync(dir, { recursive: true })
  writeFileSync(join(dir, 'index.html'), page(to))
  count++
}
console.log(`[postbuild] 404.html, .nojekyll and ${count} legacy redirects written`)
