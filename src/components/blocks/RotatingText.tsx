import { useEffect, useState } from 'react'

/**
 * Cycles through phrases. The first phrase is prerendered; rotation starts after hydration
 * and pauses for users who prefer reduced motion.
 */
export function RotatingText({ items, interval = 3200, className }: { items: string[]; interval?: number; className?: string }) {
  const [i, setI] = useState(0)
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const id = setInterval(() => setI((v) => (v + 1) % items.length), interval)
    return () => clearInterval(id)
  }, [items.length, interval])

  return (
    <span className={className} aria-live="off">
      <span key={i} className="inline-block animate-[rise_0.7s_var(--ease-out-soft)_both]">
        {items[i]}
      </span>
    </span>
  )
}
