---
name: design-taste-frontend
description: Critique and raise the visual quality of UI that already exists — diagnosing why a screen looks generic or AI-generated and fixing it through spacing, type scale, color, hierarchy, and restraint. Use when reviewing your own finished UI, when the user says a design looks "off", "flat", "template-y", or "AI-made", or as a self-check pass before shipping any screen. frontend-design sets direction at the start; this skill judges the result.
---

# Design Taste (Frontend)

This is a critique skill. You are not generating a direction — you are looking at a rendered screen and finding the specific, nameable reasons it falls short, then fixing those. Vague verdicts ("needs more polish") are failures of this skill. Every finding must name the element, the property, and the replacement value.

## The tells of generated UI

These are the recurring signatures of UI written in one pass without a critique loop. Scan for them first; they account for most of the gap.

1. **Uniform spacing.** Everything separated by the same gap, so nothing groups. Real hierarchy is non-uniform: elements inside a group sit at 8–12px, groups sit 32–48px apart, sections 80–128px. If your page uses `gap-4` between every single thing, it reads as a wireframe.
2. **Timid type scale.** `text-xl` for the headline and `text-base` for body is a 1.25 ratio — invisible. Editorial hierarchy wants 3–5×: a 56px headline over 16px body. Big things should be genuinely big.
3. **The gradient-and-glow reflex.** Purple-to-blue gradient, glassmorphic card, soft glow, rounded-2xl, three feature cards in a row. It is the single most recognizable template signature. If your page has it, that is the thing to cut.
4. **Centered everything.** Every section center-aligned at the same max-width produces a hypnotic sameness. Vary alignment and width; let something break the column.
5. **Icon soup.** A lucide icon on every card, every heading, every list row. Icons should mark the few things that need marking.
6. **Pure gray neutrals.** `#71717a` for all secondary text reads dead. Tint neutrals toward the brand hue — even 2–4% chroma makes a palette feel authored.
7. **Equal-weight everything.** When all cards are the same size, nothing is primary. Make one element visibly dominant.
8. **No texture at all.** Flat fills, no borders that vary, no rules, no depth cues. One consistent surface treatment — a hairline border, a subtle inner shadow, an offset — makes a design feel built rather than sketched.

## What to check, in order

Work top-down. Fixing hierarchy often dissolves problems further down the list.

**Hierarchy.** Squint at the screen (or describe it at low fidelity). What do you see first, second, third? If the answer is "everything at once", the design has no hierarchy. Pick the one thing that matters and give it size, weight, or contrast the others do not get.

**Spacing rhythm.** Pick a base unit (4px) and use a limited set of multiples: 4, 8, 12, 16, 24, 32, 48, 64, 96. Deviating from the set is fine when justified; using arbitrary values everywhere is not. Vertical rhythm should make grouping obvious *before* anyone reads the words.

**Type.** Set a real scale — a ratio near 1.25 for dense UI, 1.333–1.5 for editorial. Body copy at 16–18px, line-height 1.5–1.65, measure 60–75 characters. Headlines get tighter tracking (`-0.02em` and below at large sizes) and tighter leading. Weight contrast (400 vs 600) is doing more work than you think; size contrast alone is thin.

**Color.** Keep one dominant neutral family, one accent, and use the accent sparingly — under 10% of the surface. If two colors compete for attention, one of them is decoration. Check contrast: 4.5:1 for body, 3:1 for large text and UI boundaries. In dark mode, do not simply invert — surfaces lighten with elevation, and pure `#000` backgrounds with pure `#fff` text are harsh.

**Density and restraint.** Ask what can be deleted. Borders that duplicate a spacing boundary, labels that repeat the heading, cards wrapping content that needs no container, shadows on elements that are not floating. Subtraction improves more designs than addition.

**Alignment.** Every edge should line up with another edge on purpose. Optical alignment beats mathematical alignment for icons next to text and for punctuation at the start of a line.

## Delivering a critique

For each finding give three things:

- **Where** — the component and the element.
- **What's wrong** — the property and its current effect, in one clause.
- **The change** — a specific value, not a direction.

> Feature cards (`page.tsx`): all three cards identical in weight, so the section has no entry point. Make the first card span two columns with the headline at `text-2xl`, and drop the other two to `text-base`.

Not: "the cards could have more visual interest."

## Calibration

When you are unsure whether something is good, compare against work that has survived scrutiny — Linear, Stripe, Vercel, Rauno Freiberg's site, Family, Arc. The point is not to copy their look; it is to notice how much more spacing, how much more type contrast, and how much less decoration they use than your instinct suggests.

Taste is a loop, not a step. Render, look, name one specific weakness, fix it, look again. Two or three passes beat one long generation every time.
