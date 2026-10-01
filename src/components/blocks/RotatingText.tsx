import { useEffect, useState } from 'react'

/**
 * Cycles through phrases inline. All phrases are stacked in one grid cell, so the box is always
 * as wide as the longest phrase: the surrounding heading never re-wraps or shifts as words change.
 * The first phrase is prerendered; rotation starts after hydration and pauses for reduced motion.
 */
export function RotatingText({ items, interval = 3200, className }: { items: string[]; interval?: number; className?: string }) {
  const [i, setI] = useState(0)
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const id = setInterval(() => setI((v) => (v + 1) % items.length), interval)
    return () => clearInterval(id)
  }, [items.length, interval])

  return (
    <span className={`inline-grid align-baseline ${className ?? ''}`}>
      {items.map((item, k) => (
        <span
          key={item}
          aria-hidden={k !== i}
          className={`[grid-area:1/1] whitespace-nowrap ${k === i ? 'animate-[rise_0.7s_var(--ease-out-soft)_both]' : 'invisible'}`}
        >
          {item}
        </span>
      ))}
    </span>
  )
}
