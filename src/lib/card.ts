/**
 * Shared hover/focus treatment for every clickable card (the practice-area card is the reference):
 * the card fills with ink, text turns light, the arrow turns brass. Keyboard focus gets the same look.
 * Use `cardSurface` on the card (with `group`), and the helpers on its children.
 */
export const cardSurface =
  'card-interactive transition-colors duration-300 hover:bg-ink hover:text-paper focus-visible:bg-ink focus-visible:text-paper'

/** Secondary text inside a card (summaries, dates, groups). */
export const cardMuted = 'text-muted transition-colors group-hover:text-paper/70 group-focus-visible:text-paper/70'

/** The corner arrow. */
export const cardArrow =
  'text-ink/30 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-brass group-focus-visible:text-brass'
