import { Link } from '@tanstack/react-router'
import { Img } from '~/components/ui/Img'
import { displayName, type Person } from '~/content/people'

export function PersonCard({ person }: { person: Person }) {
  return (
    <Link to="/people/$slug/" params={{ slug: person.slug }} className="group block">
      <div className="aspect-[4/5] overflow-hidden bg-paper-deep">
        <Img
          src={person.photo}
          alt={displayName(person)}
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          className="size-full object-cover object-top grayscale transition duration-700 group-hover:scale-[1.03] group-hover:grayscale-0"
        />
      </div>
      <p className="mt-5 text-xs font-semibold tracking-[0.2em] text-brass uppercase">{person.role}</p>
      <h3 className="mt-2 text-2xl">{displayName(person)}</h3>
      {person.office && <p className="mt-1 text-sm text-muted">{person.office} office</p>}
    </Link>
  )
}
