/**
 * An email address that may only wrap after the "@" on narrow screens (never mid-word).
 * One wrapper span keeps it a single, shrinkable item when placed inside a flex row.
 */
export function Email({ value }: { value: string }) {
  const [local, domain] = value.split('@')
  return (
    <span className="min-w-0">
      <span className="whitespace-nowrap">{local}@</span>
      <wbr />
      <span className="whitespace-nowrap">{domain}</span>
    </span>
  )
}
