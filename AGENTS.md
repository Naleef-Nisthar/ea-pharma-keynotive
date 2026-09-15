<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes - APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` - verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Project

Next.js 16 (App Router, Turbopack) · React 19 · Tailwind v4 · shadcn/ui (Radix) ·
GSAP · Motion.

## Which skill for which job

The skills in `.claude/skills/` are the point of this boilerplate. Load them
rather than working from memory - several document APIs that changed recently.

| Task | Skill |
| --- | --- |
| New UI, choosing an aesthetic direction | `frontend-design` |
| Judging finished UI, fixing "looks generic" | `design-taste-frontend` |
| States, a11y, forms, keyboard, microcopy | `ui-ux-promax` |
| Routes, data, caching, server/client split | `vercel-react-best-practices` |
| Scroll sequences, text reveals, timelines | `gsap-master` |
| Enter/exit, layout morphs, gestures | `motion-framer` |

A UI task usually needs two passes: `frontend-design` (or the design system
already in place) to build it, then `design-taste-frontend` and `ui-ux-promax`
to find what the first pass missed. Do not skip the second pass.

## Conventions

- Components live in `src/components/`. `ui/` is shadcn-generated - regenerate
  with `npx shadcn@latest add <name>` rather than hand-writing primitives, and
  edit in place afterwards (you own the file).
- GSAP is imported from `@/lib/gsap`, never from `gsap` directly. That module is
  the single `registerPlugin` site and is SSR-guarded.
- Shared animation tokens live in `src/lib/motion.ts`. Use them instead of
  inventing per-component durations.
- Client components get `"use client"` at the leaf, not at the page.

## Verify before claiming done

```bash
npx tsc --noEmit && npm run lint && npm run build
```

`npm run dev` also starts the `next-devtools` MCP server, which exposes live
build, type, and runtime errors - check it before guessing at a failure.
