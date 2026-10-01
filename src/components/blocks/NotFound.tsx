import { ButtonLink } from '~/components/ui/Button'
import { Container } from '~/components/ui/Container'

export function NotFound() {
  return (
    <Container className="flex min-h-[60vh] flex-col items-start justify-center py-24">
      <p className="eyebrow">Error 404</p>
      <h1 className="mt-6 text-5xl sm:text-6xl">This page could not be found.</h1>
      <p className="mt-6 max-w-xl text-lg text-muted">
        It may have moved when we redesigned our website. Try one of these instead.
      </p>
      <div className="mt-10 flex flex-wrap gap-4">
        <ButtonLink to="/">Home</ButtonLink>
        <ButtonLink to="/practice-areas" variant="ghost">
          Practice areas
        </ButtonLink>
      </div>
    </Container>
  )
}
