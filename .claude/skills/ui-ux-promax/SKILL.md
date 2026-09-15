---
name: ui-ux-promax
description: Interaction and UX completeness for any UI you build or change — every state (loading, empty, error, partial, offline), keyboard and screen-reader behavior, form and focus mechanics, touch targets, and microcopy. Use whenever building a screen, form, list, modal, or flow, and before calling any UI "done". This is the behavior layer; frontend-design and design-taste-frontend cover the visual layer.
---

# UI/UX Pro Max

Visual design decides whether a screen is admired. Interaction design decides whether it is usable. Most UI generated in one pass looks finished and is not — it renders the happy path and nothing else. Your job is to close that gap before declaring the work done.

## The five states rule

Every component that displays data has five states, not one. Write them all, or explicitly note which you skipped and why.

| State | The mistake | The fix |
| --- | --- | --- |
| **Loading** | A centered spinner that shifts layout when data lands | Skeletons matching the real content's dimensions. Layout must not move. |
| **Empty** | Blank space, or "No data" | Say what would be here, and give the action that creates the first one. |
| **Error** | A toast that vanishes, leaving a blank screen | Inline, persistent, states what failed and offers retry. Never dead-ends. |
| **Partial** | All-or-nothing rendering | Render what arrived; the rest keeps its skeleton. Suspense boundaries per region. |
| **Loaded** | — | The one everyone writes. |

For async actions (submit, delete, save) add a **pending** state on the trigger itself: disable it, show progress in place, and keep the label readable — never swap the text to a bare spinner, which collapses the button's width.

## Forms

- Label every input. `placeholder` is not a label — it disappears on focus and fails screen readers. Use `<Label htmlFor>` or `aria-label`.
- Validate on blur and on submit, never on every keystroke of a field the user has not finished. Re-validate on change only *after* a field has already errored.
- Errors go next to the field, tied with `aria-describedby`, plus `aria-invalid` on the input. A summary at the top is additive, not a replacement.
- Never disable the submit button as the only validation feedback — the user then has no idea what is wrong. Let them submit and show the errors.
- Preserve input on failure. Losing typed data to a failed request is the worst bug in any form.
- Set `autoComplete`, `inputMode`, and `type` correctly. `inputMode="numeric"` for codes, `type="email"`, `autoComplete="one-time-code"`.

## Keyboard and focus

- Every interactive element reachable by Tab, in visual order. If you attached `onClick` to a `div`, it is broken — use a `button`.
- Visible focus ring on everything focusable. Never `outline: none` without a replacement. Prefer `focus-visible`.
- Modals and sheets: focus moves in on open, is trapped inside, returns to the trigger on close, and `Escape` closes. Radix/shadcn primitives give you this — hand-rolled overlays do not.
- Destructive actions need a confirm step or an undo. Prefer undo: it is faster for the 99% and safer for the 1%.

## Screen readers, in practice

- Icon-only buttons need `aria-label`. This is the single most common miss.
- Toggles use `aria-pressed`; disclosure triggers use `aria-expanded`.
- Content that appears asynchronously (toasts, validation summaries, live counts) needs `aria-live="polite"`; use `assertive` only for genuine interruptions.
- Loading regions get `aria-busy`. Decorative icons get `aria-hidden`.
- Heading levels descend without skipping. One `h1` per page.

## Touch and pointer

- Hit targets ≥ 44×44px. A 16px icon needs padding around it, not a smaller tap area.
- No hover-only affordances. Anything revealed on hover must have a tap or focus path.
- Respect safe areas on mobile (`env(safe-area-inset-bottom)`) for anything fixed to the bottom.

## Motion, from a UX angle

- Animate to explain change (where something came from, what replaced what), not to decorate.
- 150–250ms for state changes, up to 500ms for entrances. Anything slower is felt as lag.
- Never animate a blocking path. The user must be able to act before the animation ends.
- Honor `prefers-reduced-motion`: swap movement for a crossfade, never for nothing.

## Microcopy

- Buttons name the outcome: "Create project", not "Submit".
- Errors say what happened and what to do: "That email is already registered. Sign in instead?" not "Invalid input."
- No dead ends. Every error and empty state offers a next action.

## Before you say it is done

Run this list against what you built:

1. Tab through the whole screen. Can you reach and operate everything, and always see where you are?
2. Force the loading, empty, and error states. Do they hold layout and offer a way forward?
3. Resize to 360px wide. Does anything overflow, clip, or overlap?
4. Toggle dark mode. Any invisible text, or a surface that lost its border?
5. Any icon-only button without a label?
6. Does the page scroll horizontally? It should not.
