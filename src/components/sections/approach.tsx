import { approach } from "@/content/site";
import { Container, Eyebrow, Headline, Lede, Section } from "@/components/section";
import { Reveal, RevealGroup } from "@/components/motion/reveal";

/**
 * How programmes work.
 *
 * Also icon-free, but deliberately not shaped like Outcomes: that section rules
 * items horizontally across three narrow columns on ink, this one hangs each
 * principle off a vertical hairline in two wide columns on the muted ground.
 * Rule axis, column count and ground all differ, so the two never read as the
 * same component with different copy.
 *
 * The left rule is border-coloured and only the leading segment is accent, so
 * six repetitions still cost almost nothing against the accent budget.
 */
export function Approach() {
  return (
    <Section tone="muted">
      <Container>
        <Reveal>
          <div className="max-w-2xl">
            <Eyebrow className="text-muted-foreground">
              {approach.eyebrow}
            </Eyebrow>
            <Headline text={approach.title} className="mt-5" />
            <Lede className="mt-6">{approach.body}</Lede>
          </div>
        </Reveal>

        <RevealGroup className="mt-16 grid gap-x-12 gap-y-12 md:grid-cols-2">
          {approach.items.map((item) => (
            <Reveal key={item.title}>
              <article className="relative pl-6">
                {/* Full-height hairline with an accent cap: the cap marks where
                    the principle starts, the rule carries it to the end of the
                    body copy. */}
                <span
                  aria-hidden
                  className="bg-border absolute inset-y-0 left-0 w-px"
                />
                <span
                  aria-hidden
                  className="bg-accent absolute top-0 left-0 h-8 w-px"
                />
                <h3 className="text-card-title font-semibold tracking-[-0.011em]">
                  {item.title}
                </h3>
                <p className="text-muted-foreground mt-3 max-w-[46ch] text-sm leading-relaxed text-pretty">
                  {item.body}
                </p>
              </article>
            </Reveal>
          ))}
        </RevealGroup>
      </Container>
    </Section>
  );
}
