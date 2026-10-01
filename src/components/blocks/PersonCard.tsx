import { Link } from '@tanstack/react-router'
import { Img } from '~/components/ui/Img'
import { displayName, type Person } from '~/content/people'
import { practiceBySlug } from '~/content/practices'

export function PersonCard({ person }: { person: Person }) {
  const areas = (person.practices ?? []).map(practiceBySlug).filter((p) => p !== undefined)
  return (
    <Link to="/people/$slug/" params={{ slug: person.slug }} className="group block">
      <div className="aspect-[4/5] overflow-hidden bg-paper-deep">
        <Img
          src={person.photo}
          alt={displayName(person)}
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="size-full object-cover object-top grayscale transition duration-700 group-hover:scale-[1.03] group-hover:grayscale-0"
        />
      </div>
      <p className="mt-5 text-xs font-semibold tracking-[0.2em] text-brass uppercase">{person.role}</p>
      <h3 className="mt-2 text-2xl group-hover:text-green">{displayName(person)}</h3>
      <p className="mt-1 text-sm text-muted">
        {[person.office && `${person.office} office`, person.credentials?.join(' · ')].filter(Boolean).join(' · ')}
      </p>
      {areas.length > 0 && (
        <ul className="mt-4 flex flex-wrap gap-1.5">
          {areas.slice(0, 3).map((a) => (
            <li key={a.slug} className="rounded-full border border-line px-3 py-1 text-xs text-ink/75">
              {a.title}
            </li>
          ))}
          {areas.length > 3 && <li className="px-1 py-1 text-xs text-muted">+{areas.length - 3} more</li>}
        </ul>
      )}
    </Link>
  )
}
