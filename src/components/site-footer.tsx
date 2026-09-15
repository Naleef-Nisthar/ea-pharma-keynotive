import Link from "next/link";
import { brand, footer } from "@/content/site";
import { Container } from "@/components/section";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-border border-t py-16">
      <Container>
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="font-display text-xl tracking-tight">{brand.name}</p>
            <p className="text-muted-foreground mt-1 font-mono text-[0.6rem] tracking-[0.16em] uppercase">
              {brand.parentLine}
            </p>
            <p className="text-accent-text mt-5 font-mono text-[0.62rem] leading-relaxed tracking-[0.1em]">
              {footer.tagline}
            </p>
            <p className="text-muted-foreground mt-5 max-w-xs text-sm leading-relaxed">
              {footer.blurb}
            </p>
          </div>

          {footer.columns.map((col) => (
            <nav key={col.heading} aria-label={col.heading}>
              <h2 className="font-mono text-[0.65rem] tracking-[0.18em] uppercase">
                {col.heading}
              </h2>
              <ul className="mt-5 space-y-1">
                {col.links.map((link) => {
                  const external = link.href.startsWith("http");
                  return (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        {...(external
                          ? { target: "_blank", rel: "noopener noreferrer" }
                          : {})}
                        className="text-muted-foreground hover:text-accent-text inline-flex min-h-9 items-center text-sm transition-colors duration-150 ease-out"
                      >
                        {link.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
          ))}

          <div>
            <h2 className="font-mono text-[0.65rem] tracking-[0.18em] uppercase">
              {footer.contactHeading}
            </h2>
            <address className="text-muted-foreground mt-5 text-sm leading-relaxed not-italic">
              <span className="text-foreground block font-medium">
                {brand.operator}
              </span>
              <span className="mt-2 block">{brand.address.line1}</span>
              <span className="block">{brand.address.line2}</span>
              <span className="block">{brand.address.city}</span>
              <span className="block">{brand.address.country}</span>
              <Link
                href={`mailto:${brand.links.email}`}
                className="hover:text-accent-text mt-3 inline-flex min-h-9 items-center transition-colors duration-150 ease-out"
              >
                {brand.links.email}
              </Link>
            </address>
          </div>
        </div>

        {/* Regulatory disclaimer. Legally load-bearing — it states what this
            business is not. Kept at readable size, not fine print. */}
        <div className="border-border mt-14 border-t pt-8">
          <p className="text-muted-foreground max-w-[90ch] text-[0.8125rem] leading-relaxed">
            {footer.disclaimer}
          </p>
        </div>

        <div className="border-border mt-8 flex flex-col gap-4 border-t pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-muted-foreground font-mono text-[0.62rem] tracking-[0.14em] uppercase">
            {footer.copyright.replace("{year}", String(year))}
          </p>
          <Link
            href={brand.links.operator}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-accent-text inline-flex min-h-9 items-center font-mono text-[0.62rem] tracking-[0.14em] uppercase transition-colors duration-150 ease-out"
          >
            Keynotive
          </Link>
        </div>
      </Container>
    </footer>
  );
}
