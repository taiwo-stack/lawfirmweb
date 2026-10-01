import { Mail } from 'lucide-react'
import { ButtonLink } from '~/components/ui/Button'
import { Img } from '~/components/ui/Img'
import { displayName, type Person } from '~/content/people'

/** The head of the firm, presented as a feature block above the rest of the directory. */
export function PrincipalFeature({ person }: { person: Person }) {
  const name = displayName(person)
  return (
    <article className="grid gap-10 lg:grid-cols-12 lg:gap-16">
      <div className="lg:col-span-5">
        <Img
          src={person.photo}
          alt={name}
          sizes="(min-width: 1024px) 40vw, 100vw"
          className="aspect-[4/5] w-full object-cover object-top"
        />
      </div>
      <div className="flex flex-col justify-center lg:col-span-7">
        <p className="eyebrow">{person.role}</p>
        <h3 className="mt-6 text-4xl leading-tight sm:text-5xl">{name}</h3>
        {person.credentials && <p className="mt-4 text-lg tracking-wide text-muted">{person.credentials.join(' · ')}</p>}
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink/80">{person.bio[0]}</p>
        {person.highlights && (
          <ul className="mt-8 grid max-w-2xl grid-cols-2 gap-px border border-line bg-line sm:grid-cols-4">
            {person.highlights.map((h) => (
              <li key={h.label} className="bg-paper p-4">
                <span className="block font-display text-2xl text-brass">{h.value}</span>
                <span className="mt-1 block text-xs leading-snug text-muted">{h.label}</span>
              </li>
            ))}
          </ul>
        )}
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <ButtonLink to="/people/$slug/" params={{ slug: person.slug }}>
            Full profile
          </ButtonLink>
          {person.email && (
            <a href={`mailto:${person.email}`} className="inline-flex items-center gap-2 text-sm font-semibold hover:text-green">
              <Mail className="size-4 text-brass" aria-hidden /> {person.email}
            </a>
          )}
        </div>
      </div>
    </article>
  )
}
