import { brand, pillars } from "@/content/site";
import {
  ArrowLink,
  Chip,
  Container,
  Headline,
  Lede,
  Section,
  SectionMarker,
} from "@/components/section";
import { Reveal, RevealGroup } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

/**
 * The six training areas, as a numbered index rather than a card grid.
 *
 * This is a curriculum contents page, so it is set like one: full-width rows
 * with the ordinal hung in its own column, the title at display size, and the
 * topic list running alongside. A reader scanning for their discipline gets
 * six left-aligned titles in a single column instead of six boxes to
 * triangulate between.
 *
 * Digital bioprocessing is the emerging focus the business is pushing, so its
 * row inverts onto the ink ground — the one break in the rhythm, which is what
 * makes it read as emphasis rather than decoration.
 */
export function Pillars() {
  return (
    <Section id={pillars.id} size="lg">
      <Container>
        <Reveal>
          <SectionMarker n={2} label={pillars.eyebrow} />
          <div className="mt-10 max-w-3xl">
            <Headline text={pillars.title} />
            <Lede className="mt-6">{pillars.body}</Lede>
          </div>
        </Reveal>

        <RevealGroup className="border-border mt-16 border-b">
          {pillars.items.map((item, i) => {
            const featured = "featured" in item && item.featured;

            return (
              <Reveal key={item.id}>
                <article
                  className={cn(
                    "border-border border-t",
                    // The inverted row bleeds to the container edges so the
                    // ground change reads as a band across the page, not as a
                    // card that happens to be dark.
                    featured &&
                      "bg-ink text-ink-foreground -mx-5 px-5 sm:-mx-8 sm:px-8",
                  )}
                >
                  <div className="grid gap-6 py-9 lg:grid-cols-[auto_minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-10">
                    {/* The ordinal hangs in its own column, giving the section
                        a spine the eye can run down. */}
                    <span
                      className={cn(
                        "font-mono text-[0.68rem] tracking-[0.16em] lg:pt-2",
                        featured
                          ? "text-ink-foreground/50"
                          : "text-muted-foreground/60",
                      )}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>

                    <div>
                      {featured && (
                        <p className="text-accent mb-3 font-mono text-[0.6rem] tracking-[0.16em] uppercase">
                          {pillars.featuredLabel}
                        </p>
                      )}
                      <h3 className="font-display text-[1.375rem] leading-tight text-balance sm:text-[1.625rem]">
                        {item.title}
                      </h3>
                      <p
                        className={cn(
                          "mt-4 max-w-[52ch] text-sm leading-relaxed",
                          featured
                            ? "text-ink-foreground/70"
                            : "text-muted-foreground",
                        )}
                      >
                        {item.body}
                      </p>
                      <ArrowLink
                        href={brand.links.programmes}
                        className={cn("mt-5", featured && "text-accent")}
                      >
                        {item.cta}
                      </ArrowLink>
                    </div>

                    <div className="lg:pt-1">
                      <p
                        className={cn(
                          "font-mono text-[0.62rem] tracking-[0.16em] uppercase",
                          featured
                            ? "text-ink-foreground/50"
                            : "text-muted-foreground/70",
                        )}
                      >
                        {pillars.topicsLabel}
                      </p>
                      <ul className="mt-4 flex flex-wrap gap-1.5">
                        {item.topics.map((topic) => (
                          <Chip
                            key={topic}
                            className={cn(
                              featured &&
                                "border-ink-foreground/25 text-ink-foreground/80",
                            )}
                          >
                            {topic}
                          </Chip>
                        ))}
                      </ul>
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </RevealGroup>
      </Container>
    </Section>
  );
}
