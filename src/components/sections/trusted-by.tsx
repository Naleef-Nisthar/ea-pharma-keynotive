import { trustedBy } from "@/content/site";
import { Container, Eyebrow, Headline, Lede, Section } from "@/components/section";
import { Reveal, RevealGroup } from "@/components/motion/reveal";

/**
 * Participant organisations.
 *
 * Deliberately a text grid rather than a logo wall: these are organisations
 * previous participants came from, not clients or endorsements, and rendering
 * their marks would overclaim the relationship. Names set in the body face,
 * sector set in mono, read as a register — which is what the footnote says it
 * is.
 *
 * The grid uses `gap-px` over a border-coloured ground so each card's own
 * hairline collapses into a single shared rule between neighbours, giving a
 * ruled table without per-cell border-side juggling at every breakpoint.
 */
export function TrustedBy() {
  return (
    <Section id={trustedBy.id} tone="muted" size="sm">
      <Container>
        <Reveal>
          <div className="max-w-2xl">
            <Eyebrow className="text-muted-foreground">
              {trustedBy.eyebrow}
            </Eyebrow>
            <Headline text={trustedBy.title} className="mt-5" />
            <Lede className="mt-6">{trustedBy.body}</Lede>
          </div>
        </Reveal>

        <RevealGroup className="bg-border mt-14 grid grid-cols-2 gap-px sm:grid-cols-3 lg:grid-cols-4">
          {trustedBy.items.map((item) => (
            <Reveal key={item.name} className="bg-muted">
              <div className="flex h-full flex-col justify-between gap-4 px-5 py-6">
                <h3 className="text-sm font-medium tracking-tight text-balance">
                  {item.name}
                </h3>
                <p className="text-muted-foreground font-mono text-[0.62rem] tracking-wide uppercase">
                  {item.category}
                </p>
              </div>
            </Reveal>
          ))}
        </RevealGroup>

        <Reveal>
          <p className="text-muted-foreground mt-6 text-xs leading-relaxed">
            {trustedBy.footnote}
          </p>
        </Reveal>
      </Container>
    </Section>
  );
}
