"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Menu, X } from "lucide-react";
import { brand, nav } from "@/content/site";
import { Container } from "@/components/section";
import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const reduced = useReducedMotion();
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // While the mobile panel is open: lock body scroll, close on Escape, and
  // make the rest of the page inert so Tab cannot walk behind the panel.
  // On close, focus returns to the toggle that opened it.
  useEffect(() => {
    if (!open) return;

    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const outside = Array.from(
      document.querySelectorAll<HTMLElement>("main, footer"),
    );
    outside.forEach((el) => el.setAttribute("inert", ""));

    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);

    // Captured now rather than read in the cleanup: by teardown the ref may
    // already point elsewhere, and focus has to return to the button that
    // opened the panel.
    const toggle = toggleRef.current;

    return () => {
      document.body.style.overflow = prev;
      outside.forEach((el) => el.removeAttribute("inert"));
      window.removeEventListener("keydown", onKey);
      toggle?.focus();
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled || open
          ? "bg-background/90 border-border border-b backdrop-blur-md"
          : "border-b border-transparent",
      )}
    >
      <Container className="flex h-16 items-center justify-between gap-6 sm:h-20">
        <Link
          href="/"
          className="group flex shrink-0 flex-col leading-none"
          aria-label={`${brand.name} — home`}
        >
          <span className="font-display text-xl tracking-tight sm:text-[1.375rem]">
            {brand.name}
          </span>
          <span className="text-muted-foreground mt-1 font-mono text-[0.6rem] tracking-[0.16em] uppercase">
            {brand.parentLine}
          </span>
        </Link>

        {/* Desktop */}
        <nav className="hidden items-center gap-5 lg:flex xl:gap-7" aria-label="Main">
          {nav.items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="hover:text-accent-text inline-flex min-h-11 items-center text-sm font-medium whitespace-nowrap transition-colors duration-150 ease-out"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          <ThemeToggle />
          <Link
            href={brand.links.programmes}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-accent text-accent-foreground hover:bg-accent/90 hidden min-h-11 items-center rounded-sm px-5 text-sm font-medium [transition-property:background-color,scale] duration-150 ease-out active:scale-[0.96] lg:inline-flex"
          >
            {nav.cta}
          </Link>

          <button
            ref={toggleRef}
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            className="hover:text-accent-text inline-flex size-11 items-center justify-center rounded-sm transition-colors duration-150 ease-out lg:hidden"
          >
            {open ? (
              <X className="size-5" aria-hidden />
            ) : (
              <Menu className="size-5" aria-hidden />
            )}
          </button>
        </div>
      </Container>

      {/* The wrapper stays mounted so `aria-controls="mobile-nav"` always
          resolves to a real element — including in the closed state, which is
          the one a screen-reader user meets first. Only the contents animate. */}
      <div id="mobile-nav" className="lg:hidden">
        <AnimatePresence initial={false}>
          {open && (
          <motion.div
            initial={reduced ? { opacity: 0 } : { opacity: 0, height: 0 }}
            animate={reduced ? { opacity: 1 } : { opacity: 1, height: "auto" }}
            exit={reduced ? { opacity: 0 } : { opacity: 0, height: 0 }}
            transition={{ duration: 0.24, ease: [0.32, 0.72, 0, 1] }}
            className="bg-background border-border overflow-hidden border-t"
          >
            <Container className="flex flex-col py-4">
              {nav.items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="hover:text-accent-text border-border/60 flex min-h-12 items-center border-b text-base font-medium transition-colors duration-150 ease-out last:border-0"
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href={brand.links.programmes}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="bg-accent text-accent-foreground mt-4 inline-flex min-h-12 items-center justify-center rounded-sm px-6 text-sm font-medium"
              >
                {nav.cta}
              </Link>
            </Container>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
