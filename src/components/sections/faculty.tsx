import { faculty } from "@/content/site";
import {
  Chip,
  Container,
  Eyebrow,
  Headline,
  Lede,
  Section,
} from "@/components/section";
import { Reveal } from "@/components/motion/reveal";

/**
 * Faculty.
 *
 * One confirmed trainer, presented as a single wide profile rather than a
 * lonely card in a three-column grid — a grid with one filled cell advertises
 * the two empty ones. The footnote does the honest work of saying more faculty
 * are still being confirmed.
 *
 * No portrait: the previous build pulled a stock Unsplash photograph of an
 * unrelated person and presented it as the trainer. A typeset profile is both
 * truthful and, at this density, better looking.
 */
export function Faculty() {
  return (
    <Section id={faculty.id}>
      <Container>
        <Reveal className="max-w-2xl">
          <Eyebrow className="text-muted-foreground">{faculty.eyebrow}</Eyebrow>
          <Headline text={faculty.title} className="mt-6" />
          <Lede className="mt-6">{faculty.body}</Lede>
        </Reveal>

        {faculty.items.map((person) => (
          <Reveal key={person.id} className="mt-14">
            <article className="border-border bg-card grid border lg:grid-cols-12">
              <div className="border-border p-7 sm:p-9 lg:col-span-4 lg:border-r">
                <h3 className="font-display text-2xl leading-tight text-balance">
                  {person.name}
                </h3>
                <p className="text-accent-text mt-3 font-mono text-[0.62rem] tracking-[0.14em] uppercase">
                  {person.credentials}
                </p>
                <p className="text-muted-foreground mt-4 text-sm leading-relaxed">
                  {person.title}
                </p>

                <div className="border-border mt-8 border-t pt-6">
                  <p className="text-muted-foreground/70 font-mono text-[0.62rem] tracking-[0.16em] uppercase">
                    {faculty.programmesLabel}
                  </p>
                  <p className="mt-4 text-sm leading-relaxed">
                    {person.programmesLed}
                  </p>
                </div>
              </div>

              <div className="p-7 sm:p-9 lg:col-span-8">
                <p className="text-muted-foreground/70 font-mono text-[0.62rem] tracking-[0.16em] uppercase">
                  {faculty.bioLabel}
                </p>
                <p className="mt-5 max-w-[68ch] text-[0.9375rem] leading-relaxed">
                  {person.bio}
                </p>

                <div className="mt-8">
                  <p className="text-muted-foreground/70 font-mono text-[0.62rem] tracking-[0.16em] uppercase">
                    {faculty.expertiseLabel}
                  </p>
                  <ul className="mt-4 flex flex-wrap gap-1.5">
                    {person.expertise.map((e) => (
                      <Chip key={e}>{e}</Chip>
                    ))}
                  </ul>
                </div>
              </div>
            </article>
          </Reveal>
        ))}

        <Reveal>
          <p className="text-muted-foreground mt-6 max-w-[62ch] text-sm leading-relaxed">
            {faculty.footnote}
          </p>
        </Reveal>
      </Container>
    </Section>
  );
}
