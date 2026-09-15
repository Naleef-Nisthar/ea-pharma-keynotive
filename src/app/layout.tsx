import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { SmoothScroll } from "@/components/providers/smooth-scroll";
import { brand, seo } from "@/content/site";
import "lenis/dist/lenis.css";
import "./globals.css";

/** Body voice. Neutral, high legibility at small sizes. */
const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });

/** Data voice. Stage numbers, indices, spec labels — never decoration. */
const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

/** Display voice. Headline sizes only; Inter remains the body face. */
const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(seo.url),
  title: seo.title,
  description: seo.description,
  keywords: [...seo.keywords],
  openGraph: {
    title: seo.title,
    description: seo.ogDescription,
    url: seo.url,
    type: "website",
    locale: seo.locale,
    siteName: brand.name,
  },
  twitter: {
    card: "summary_large_image",
    title: seo.title,
    description: seo.twitterDescription,
  },
};

/**
 * Turns the `brand.color` object from src/content/site.ts into the CSS custom
 * properties globals.css consumes. Editing a colour in that one file is
 * therefore enough — there is no second place to keep in sync.
 */
function themeCss() {
  const { light, dark } = brand.color;
  // `as const` in site.ts narrows each value to its literal string, so the
  // param has to be widened or `dark` won't be assignable to `typeof light`.
  const vars = (c: Record<keyof typeof light, string>) => `
    --background: ${c.background};
    --foreground: ${c.foreground};
    --card: ${c.card};
    --card-foreground: ${c.cardForeground};
    --muted: ${c.muted};
    --muted-foreground: ${c.mutedForeground};
    --border: ${c.border};
    --accent: ${c.accent};
    --accent-foreground: ${c.accentForeground};
    --accent-text: ${c.accentText};
    --ink: ${c.ink};
    --ink-foreground: ${c.inkForeground};
  `;
  return `:root{${vars(light)}}\n.dark{${vars(dark)}}`;
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en-GB"
      suppressHydrationWarning
      className={`${inter.variable} ${jetbrainsMono.variable} ${spaceGrotesk.variable} h-full`}
    >
      <head>
        <style dangerouslySetInnerHTML={{ __html: themeCss() }} />
      </head>
      <body className="flex min-h-full flex-col">
        {/* Animated elements start hidden — GSAP via .gsap-hidden, Motion via
            the inline style it server-renders from `initial`. Without this,
            visitors without JS get a blank page. */}
        <noscript>
          <style>{`
            .gsap-hidden { visibility: visible !important; }
            [data-reveal] { opacity: 1 !important; transform: none !important; }
          `}</style>
        </noscript>
        <a
          href="#main"
          className="bg-accent text-accent-foreground sr-only rounded-sm px-4 py-2 text-sm font-medium focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-[60]"
        >
          Skip to content
        </a>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <SmoothScroll />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
