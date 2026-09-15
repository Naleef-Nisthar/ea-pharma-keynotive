"use client";

import { useSyncExternalStore } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

/** Never-changing store: false during SSR, true on the client. */
const noop = () => () => {};
const useMounted = () =>
  useSyncExternalStore(
    noop,
    () => true,
    () => false,
  );

/**
 * `resolvedTheme` is undefined until next-themes reads the DOM on the client,
 * so the icon state is only trustworthy after mount. Rendering a fixed-size
 * placeholder until then keeps the header from shifting and avoids a
 * hydration mismatch on the aria-label.
 */
export function ThemeToggle({ className }: { className?: string }) {
  const mounted = useMounted();
  const { resolvedTheme, setTheme } = useTheme();

  const isDark = resolvedTheme === "dark";

  if (!mounted) {
    return <div className={cn("size-11 shrink-0", className)} aria-hidden />;
  }

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      className={cn(
        "hover:text-accent-text inline-flex size-11 shrink-0 items-center justify-center rounded-sm transition-colors",
        className,
      )}
    >
      {isDark ? (
        <Moon className="size-4" aria-hidden />
      ) : (
        <Sun className="size-4" aria-hidden />
      )}
    </button>
  );
}
