import { audience } from "@/content/site";
import {
  Chip,
  Container,
  Eyebrow,
  Headline,
  Lede,
  Section,
} from "@/components/section";
import { Reveal, RevealGroup } from "@/components/motion/reveal";

/**
 * Who the programmes are for.
 *
 * Five groups into a three-column grid leaves an awkward tail, so the last card
 * spans both columns at md (where it would otherwise sit alone) and returns to
 * a single column at lg (where five cards fill 3 + 2 and the gap falls at the
 * end of the row rather than mid-grid).
 *
 * The body paragraph takes the free space (`flex-1`) so the roles block sits at
 * the bottom of every card and the dividers line up across a row regardless of
 * how long the paragraph runs.
 */
export function Audience() {
  return (
    <Section id={audience.id}>
      <Container>
        <Reveal>
          <div className="max-w-2xl">
            <Eyebrow className="text-muted-foreground">
              {audience.eyebrow}
            </Eyebrow>
            <Headline text={audience.title} className="mt-5" />
            <Lede className="mt-6">{audience.body}</Lede>
          </div>
        </Reveal>

        <RevealGroup className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {audience.items.map((item, i) => (
            <Reveal
              key={item.category}
              className={
                i === audience.items.length - 1
                  ? "md:col-span-2 lg:col-span-1"
                  : undefined
              }
            >
              <article className="border-border flex h-full flex-col rounded-sm border p-6">
                <h3 className="text-card-title font-semibold tracking-[-0.011em]">
                  {item.category}
                </h3>
                <p className="text-muted-foreground mt-3 flex-1 text-sm leading-relaxed text-pretty">
                  {item.body}
                </p>

                <div className="border-border mt-8 border-t pt-5">
                  <p className="text-muted-foreground/70 font-mono text-[0.6rem] tracking-[0.16em] uppercase">
                    {audience.rolesLabel}
                  </p>
                  <ul className="mt-4 flex flex-wrap gap-1.5">
                    {item.roles.map((role) => (
                      <Chip key={role}>{role}</Chip>
                    ))}
                  </ul>
                </div>
              </article>
            </Reveal>
          ))}
        </RevealGroup>
      </Container>
    </Section>
  );
}
