import { audience } from "@/content/site";
import {
  Chip,
  Container,
  Headline,
  Lede,
  Section,
  SectionMarker,
} from "@/components/section";
import { Reveal, RevealGroup } from "@/components/motion/reveal";

/**
 * Who the programmes are for, as a definition list.
 *
 * Each group is a term and its definition, which is what a glossary is — so it
 * is marked up as one (`<dl>`/`<dt>`/`<dd>`) rather than as five cards. Five
 * items never divide cleanly into a three-column grid, and the card version had
 * to special-case the tail to hide that; rows have no such problem and take any
 * count.
 *
 * The term hangs in a narrow left column at display size so a reader scanning
 * for their own function gets five left-aligned labels in one line of sight,
 * with the description and role chips carried in the wider right column.
 *
 * Each row is its own `<dl>` rather than one list wrapping all five, because
 * the reveal wrappers have to sit between the list and its pairs and a `<dl>`
 * cannot contain them. See the note at the list itself.
 */
export function Audience() {
  return (
    <Section id={audience.id}>
      <Container>
        <Reveal>
          <SectionMarker n={6} label={audience.eyebrow} />
          <div className="mt-10 max-w-2xl">
            <Headline text={audience.title} />
            <Lede className="mt-6">{audience.body}</Lede>
          </div>
        </Reveal>

        <RevealGroup className="border-border mt-16 border-b">
          {audience.items.map((item) => (
            <Reveal key={item.category}>
              {/* One `<dl>` per row rather than one wrapping all five: the
                  reveal wrappers sit between the list and its pairs, and a
                  `<dl>` may not contain arbitrary elements. A list of one pair
                  is still a definition list, and the term/description
                  association — the part assistive technology uses — survives
                  intact either way. */}
              <dl className="border-border grid gap-4 border-t py-8 md:grid-cols-[minmax(0,0.8fr)_minmax(0,2fr)] md:gap-12">
                <dt className="font-display text-[1.125rem] leading-tight text-balance sm:text-[1.25rem]">
                  {item.category}
                </dt>

                <dd className="ms-0">
                  <p className="text-muted-foreground max-w-[62ch] text-sm leading-relaxed text-pretty">
                    {item.body}
                  </p>

                  <div className="mt-6">
                    <p className="text-muted-foreground/70 font-mono text-[0.6rem] tracking-[0.16em] uppercase">
                      {audience.rolesLabel}
                    </p>
                    <ul className="mt-3 flex flex-wrap gap-1.5">
                      {item.roles.map((role) => (
                        <Chip key={role}>{role}</Chip>
                      ))}
                    </ul>
                  </div>
                </dd>
              </dl>
            </Reveal>
          ))}
        </RevealGroup>
      </Container>
    </Section>
  );
}
