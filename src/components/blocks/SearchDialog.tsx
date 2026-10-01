import { useNavigate } from '@tanstack/react-router'
import { ArrowRight, Search, X } from 'lucide-react'
import { useEffect, useMemo, useRef, useState } from 'react'
import { practices } from '~/content/practices'
import { displayName, people } from '~/content/people'
import { insights } from '~/content/insights'
import { nav } from '~/content/site'

type Entry = { kind: string; title: string; detail: string; go: () => void }

export function SearchDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const navigate = useNavigate()
  const [q, setQ] = useState('')
  const [active, setActive] = useState(0)
  const input = useRef<HTMLInputElement>(null)

  const index = useMemo<Entry[]>(() => {
    const pages: Entry[] = nav.flatMap((n) =>
      (n.children ?? [{ label: n.label, to: n.to, description: '' }]).map((c) => ({
        kind: 'Page',
        title: c.label,
        detail: c.description,
        go: () => navigate({ to: c.to, search: 'search' in c ? c.search : undefined }),
      })),
    )
    return [
      ...practices.map((p) => ({
        kind: 'Practice',
        title: p.title,
        detail: `${p.group} · ${p.summary} ${p.services?.join(' ') ?? ''}`,
        go: () => navigate({ to: '/practice-areas/$slug/', params: { slug: p.slug } }),
      })),
      ...people.map((p) => ({
        kind: 'Person',
        title: displayName(p),
        detail: `${p.role} ${p.credentials?.join(' ') ?? ''}`,
        go: () => navigate({ to: '/people/$slug/', params: { slug: p.slug } }),
      })),
      ...pages,
      ...insights.map((i) => ({
        kind: i.label,
        title: i.title,
        detail: `${i.when} · ${i.detail}`,
        go: () => (i.href ? navigate(i.href) : navigate({ to: '/insights/' })),
      })),
    ]
  }, [navigate])

  const results = useMemo(() => {
    const terms = q.toLowerCase().split(/\s+/).filter(Boolean)
    if (!terms.length) return index.filter((e) => e.kind === 'Practice' || e.kind === 'Page').slice(0, 8)
    return index
      .map((e) => {
        const title = e.title.toLowerCase()
        const all = `${title} ${e.detail.toLowerCase()}`
        if (!terms.every((t) => all.includes(t))) return null
        return { e, score: terms.filter((t) => title.includes(t)).length }
      })
      .filter((r): r is { e: Entry; score: number } => r !== null)
      .sort((a, b) => b.score - a.score)
      .slice(0, 12)
      .map((r) => r.e)
  }, [q, index])

  useEffect(() => {
    if (open) {
      setQ('')
      setActive(0)
      requestAnimationFrame(() => input.current?.focus())
    }
  }, [open])
  useEffect(() => setActive(0), [q])

  if (!open) return null

  const choose = (e?: Entry) => {
    if (!e) return
    onClose()
    e.go()
  }

  return (
    <div className="fixed inset-0 z-[70] flex items-start justify-center bg-ink/60 p-4 pt-[12vh] backdrop-blur-sm" onClick={onClose}>
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Search"
        className="w-full max-w-2xl overflow-hidden bg-paper shadow-2xl"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => {
          if (e.key === 'Escape') onClose()
          if (e.key === 'ArrowDown') {
            e.preventDefault()
            setActive((a) => Math.min(a + 1, results.length - 1))
          }
          if (e.key === 'ArrowUp') {
            e.preventDefault()
            setActive((a) => Math.max(a - 1, 0))
          }
          if (e.key === 'Enter') choose(results[active])
        }}
      >
        <div className="flex items-center gap-3 border-b border-line px-5">
          <Search className="size-5 text-muted" aria-hidden />
          <input
            ref={input}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search practice areas, people, talks…"
            className="h-16 flex-1 bg-transparent text-lg outline-none placeholder:text-muted/70"
            aria-label="Search"
            aria-controls="search-results"
          />
          <button type="button" onClick={onClose} className="rounded p-1 text-muted hover:text-ink" aria-label="Close search">
            <X className="size-5" />
          </button>
        </div>
        <ul id="search-results" role="listbox" className="max-h-[60vh] overflow-y-auto p-2">
          {results.length === 0 && <li className="px-4 py-10 text-center text-muted">No results for “{q}”.</li>}
          {results.map((r, i) => (
            <li key={r.kind + r.title} role="option" aria-selected={i === active}>
              <button
                type="button"
                onMouseEnter={() => setActive(i)}
                onClick={() => choose(r)}
                className={`flex w-full items-center gap-4 px-4 py-3 text-left ${i === active ? 'bg-paper-deep' : ''}`}
              >
                <span className="w-20 shrink-0 text-[11px] font-semibold tracking-[0.15em] text-brass uppercase">{r.kind}</span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate font-medium">{r.title}</span>
                  <span className="block truncate text-xs text-muted">{r.detail}</span>
                </span>
                <ArrowRight className={`size-4 shrink-0 ${i === active ? 'text-ink' : 'text-transparent'}`} aria-hidden />
              </button>
            </li>
          ))}
        </ul>
        <p className="border-t border-line px-5 py-3 text-xs text-muted">↑ ↓ to move · Enter to open · Esc to close</p>
      </div>
    </div>
  )
}
