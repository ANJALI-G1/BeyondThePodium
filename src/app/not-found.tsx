import { ArrowIcon, ButtonLink, Container } from "@/components/ui";

export default function NotFound() {
  return (
    <section className="grid min-h-[70vh] place-items-center pb-20 pt-36">
      <Container className="text-center">
        <p className="font-display text-8xl text-plum-300">404</p>
        <h1 className="mt-4 font-display text-3xl text-plum-900">This page has left the stage.</h1>
        <p className="mt-3 text-muted">The page you&apos;re looking for doesn&apos;t exist or has moved.</p>
        <ButtonLink href="/" className="mt-8">
          Back to home <ArrowIcon />
        </ButtonLink>
      </Container>
    </section>
  );
}
