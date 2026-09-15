import { community } from "@/content/site";
import { Icon } from "@/components/icon";
import {
  Container,
  Eyebrow,
  Headline,
  Lede,
  Section,
} from "@/components/section";
import { Reveal, RevealGroup } from "@/components/motion/reveal";

/**
 * Peer learning.
 *
 * Second inverted band on the page. Three cards, no CTA: the section's job is
 * to describe what a cohort is like, and a conversion target here would
 * compete with the one in Science into Practice a few screens above.
 *
 * `Lede` defaults to `muted-foreground`, which is tuned for the light ground
 * and goes muddy on ink — hence the explicit `ink-foreground/70` override.
 */
export function Community() {
  return (
    <Section tone="ink">
      <Container>
        <Reveal>
          <div className="max-w-3xl">
            <Eyebrow className="text-ink-foreground/60">
              {community.eyebrow}
            </Eyebrow>
            <Headline text={community.title} className="mt-5" />
            <Lede className="text-ink-foreground/70 mt-6">
              {community.body}
            </Lede>
          </div>
        </Reveal>

        <RevealGroup className="mt-14 grid gap-5 md:grid-cols-3">
          {community.items.map((item) => (
            <Reveal key={item.title} className="h-full">
              <article className="border-ink-foreground/15 flex h-full flex-col rounded-sm border p-6 sm:p-7">
                <p className="text-ink-foreground/55 flex items-center gap-2.5 font-mono text-[0.62rem] tracking-[0.16em] uppercase">
                  <Icon name={item.icon} className="size-4 shrink-0" />
                  <span>{item.label}</span>
                </p>

                <h3 className="mt-5 text-card-title font-semibold tracking-[-0.011em] text-balance">
                  {item.title}
                </h3>
                <p className="text-ink-foreground/70 mt-3 text-sm leading-relaxed text-pretty">
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
