import { brand, pillars } from "@/content/site";
import {
  ArrowLink,
  Chip,
  Container,
  Eyebrow,
  Headline,
  Index,
  Lede,
  Section,
} from "@/components/section";
import { Icon } from "@/components/icon";
import { Reveal, RevealGroup } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

/**
 * Six pillars, but not six identical cards.
 *
 * Digital bioprocessing is the emerging focus the business is actively
 * pushing, so it spans two columns and carries a heavier treatment. Equal
 * weight across every card would leave the section with no entry point, and
 * would misrepresent where the emphasis actually sits.
 */
export function Pillars() {
  return (
    <Section id={pillars.id} size="lg">
      <Container>
        <Reveal className="max-w-2xl">
          <Eyebrow className="text-muted-foreground">{pillars.eyebrow}</Eyebrow>
          <Headline text={pillars.title} className="mt-6" />
          <Lede className="mt-6">{pillars.body}</Lede>
        </Reveal>

        <RevealGroup className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {pillars.items.map((item, i) => {
            const featured = "featured" in item && item.featured;

            return (
              <Reveal
                key={item.id}
                className={cn("h-full", featured && "sm:col-span-2")}
              >
                <article
                  className={cn(
                    "border-border flex h-full flex-col border p-7 sm:p-8",
                    "[transition-property:border-color] duration-150 ease-out",
                    featured
                      ? "border-accent/45 bg-card"
                      : "bg-card hover:border-accent/40",
                  )}
                >
                  <div className="flex items-start justify-between gap-4">
                    <Index n={i + 1} />
                    <Icon
                      name={item.icon}
                      className={cn(
                        "size-5 shrink-0",
                        featured ? "text-accent-text" : "text-muted-foreground",
                      )}
                    />
                  </div>

                  {featured && (
                    <p className="text-accent-text mt-5 font-mono text-[0.6rem] tracking-[0.16em] uppercase">
                      {pillars.featuredLabel}
                    </p>
                  )}

                  <h3
                    className={cn(
                      "font-display leading-tight text-balance",
                      featured ? "mt-3 text-[1.75rem]" : "mt-5 text-xl",
                    )}
                  >
                    {item.title}
                  </h3>

                  <p
                    className={cn(
                      "text-muted-foreground mt-4 leading-relaxed",
                      featured ? "max-w-[58ch] text-[0.9375rem]" : "text-sm",
                    )}
                  >
                    {item.body}
                  </p>

                  <div className="mt-8 flex-1">
                    <p className="text-muted-foreground/70 font-mono text-[0.62rem] tracking-[0.16em] uppercase">
                      {pillars.topicsLabel}
                    </p>
                    <ul className="mt-4 flex flex-wrap gap-1.5">
                      {item.topics.map((topic) => (
                        <Chip key={topic}>{topic}</Chip>
                      ))}
                    </ul>
                  </div>

                  <div className="border-border mt-8 border-t pt-2">
                    <ArrowLink href={brand.links.programmes}>
                      {item.cta}
                    </ArrowLink>
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
