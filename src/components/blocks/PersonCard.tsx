import { Link } from '@tanstack/react-router'
import { displayName, type Person } from '~/content/people'
import { asset } from '~/lib/utils'

export function PersonCard({ person }: { person: Person }) {
  return (
    <Link to="/people/$slug/" params={{ slug: person.slug }} className="group block">
      <div className="aspect-[4/5] overflow-hidden bg-paper-deep">
        <img
          src={asset(person.photo)}
          alt={displayName(person)}
          loading="lazy"
          className="size-full object-cover object-top grayscale transition duration-700 group-hover:scale-[1.03] group-hover:grayscale-0"
        />
      </div>
      <p className="mt-5 text-xs font-semibold tracking-[0.2em] text-brass uppercase">{person.role}</p>
      <h3 className="mt-2 text-2xl">{displayName(person)}</h3>
      {person.office && <p className="mt-1 text-sm text-muted">{person.office} office</p>}
    </Link>
  )
}
