---
name: vercel-react-best-practices
description: Next.js App Router and React 19 practice for this repo — the Server/Client Component boundary, async request APIs, Cache Components and `use cache`, Suspense streaming, Server Actions, images and fonts, and the Next.js 16 renames that break code written from older training data. Use when adding routes, fetching or mutating data, chasing a slow page or large bundle, or reviewing any file under `src/app/`.
---

# Next.js + React Best Practices

This project runs **Next.js 16** with **React 19** and Turbopack. Several APIs changed in ways that make pre-16 code silently wrong.

**Before writing app code, check the version-accurate docs bundled in `node_modules/next/dist/docs/`.** They ship with the installed version and beat any recollection. The `next-devtools` MCP server (configured in `.mcp.json`) reads them for you and can also surface live build, type, and runtime errors from the running dev server — prefer it over guessing.

## Next.js 16 changes that break older patterns

| Was | Now |
| --- | --- |
| `params` / `searchParams` are objects | **Async.** `const { id } = await params` — also `cookies()`, `headers()`, `draftMode()` |
| `middleware.ts`, `export function middleware` | `proxy.ts`, `export function proxy`. Node runtime only; `edge` is unsupported |
| `revalidateTag('posts')` | `revalidateTag('posts', 'max')` — the cacheLife profile is now required |
| — | `updateTag('key')` — Server Actions only, read-your-writes; use when the user must see their own change immediately |
| `images.domains` | `images.remotePatterns` (`domains` deprecated) |
| `next lint` | Removed. Use `eslint` directly (flat config) |

Typed helpers `PageProps<"/route">` and `LayoutProps<"/route">` are generated per-route — use them instead of hand-writing prop types.

## Server and Client Components

Everything is a Server Component until a file says `"use client"`. Server Components have no JS in the bundle, can be `async`, and can touch the database directly.

Add `"use client"` only when the file needs: hooks, event handlers, browser APIs, or a library that uses them (Motion, GSAP, Radix).

**Push the boundary down.** The common mistake is marking a page `"use client"` because one button inside it needs `onClick`. That drags the entire subtree into the bundle. Instead, keep the page a Server Component and extract the interactive leaf:

```tsx
// app/page.tsx — Server Component, no "use client"
import { LikeButton } from "./like-button"; // this file has "use client"

export default async function Page() {
  const post = await db.post.find();     // direct DB access, zero client JS
  return (
    <article>
      <h1>{post.title}</h1>
      <LikeButton postId={post.id} />
    </article>
  );
}
```

A Client Component can still *render* Server Components passed as `children` or props. That is the escape hatch for providers: `<ThemeProvider>{children}</ThemeProvider>` in a server layout keeps `children` on the server.

Never import a server-only module (DB client, secrets) into a `"use client"` file — it will be bundled and shipped. Mark such modules with `import "server-only"`.

## Data fetching

Fetch in the component that needs the data, not in a parent that prop-drills it. React dedupes identical requests within a render pass, so two sibling components fetching the same thing costs one request.

Fetch in parallel. Sequential `await`s create a waterfall:

```tsx
// Waterfall — user finishes before posts starts
const user = await getUser(id);
const posts = await getPosts(id);

// Parallel
const [user, posts] = await Promise.all([getUser(id), getPosts(id)]);
```

## Caching (Cache Components)

`cacheComponents: true` in `next.config.ts` enables the `use cache` model. It ships **commented out** in this repo — enabling it is a deliberate step, because it changes prerendering semantics and every request-time async region then needs its own Suspense boundary or the build fails. Once on, pair every cache directive with a `cacheLife` profile; without one you get the implicit `default`.

```ts
import { cacheLife } from "next/cache";

export async function getProducts() {
  "use cache";
  cacheLife("hours");
  return db.product.findMany();
}
```

`use cache` works at data level (a function) or UI level (a whole component or page). Arguments and closed-over values become part of the cache key, so they must be serializable.

Data that must be fresh on every request gets **no** `use cache` — wrap it in `<Suspense>` instead so the static shell prerenders and the fresh part streams in:

```tsx
export default function Page() {
  return (
    <>
      <Header />                        {/* prerendered instantly */}
      <Suspense fallback={<FeedSkeleton />}>
        <LiveFeed />                    {/* streams at request time */}
      </Suspense>
    </>
  );
}
```

Suspense boundaries are the main tool for perceived performance. One boundary per independently-loading region; the fallback should match the real content's dimensions so nothing shifts when it resolves.

## Mutations

Server Actions replace API routes for form and mutation work:

```tsx
"use server";

import { revalidateTag, updateTag } from "next/cache";

export async function createPost(formData: FormData) {
  const title = String(formData.get("title") ?? "").trim();
  if (!title) return { error: "Title is required" };   // always validate — actions are public endpoints

  await db.post.create({ data: { title } });
  updateTag("posts");                                   // user sees their own write immediately
}
```

- Every Server Action is a public HTTP endpoint. Validate input and check authorization inside the action; never trust the caller.
- `useActionState` gives you pending state and returned errors without manual wiring.
- `useOptimistic` for instant feedback on the happy path.
- `revalidateTag(tag, profile)` for content where staleness is acceptable; `updateTag(tag)` when the acting user must see the change now.

Route Handlers still make sense for webhooks, third-party callbacks, and non-form clients.

## Images and fonts

- `next/image` always — it sets width/height to prevent CLS and serves modern formats. Give `priority` to the LCP image only; giving it to several defeats the purpose.
- `sizes` is required for `fill` images, or the browser downloads the largest candidate.
- Remote hosts go in `images.remotePatterns`.
- `next/font` self-hosts and eliminates the font-swap flash. Already wired for Geist in `src/app/layout.tsx`; add faces there rather than with a `<link>`.

## Bundle and runtime performance

- Check what you ship before optimizing: `ANALYZE=true npm run build` with `@next/bundle-analyzer`, or read the route-size table `next build` prints.
- `next/dynamic` with `ssr: false` for heavy client-only widgets (charts, editors, maps).
- React Compiler is available (`reactCompiler: true` in `next.config.ts`, plus `babel-plugin-react-compiler`) and auto-memoizes components. It is off by default here because it routes builds through Babel and slows them. Turn it on before hand-writing `useMemo`/`useCallback` everywhere.
- Do not memoize by reflex. Measure with the React DevTools Profiler first; most `useMemo` calls cost more than they save.
- `key` on lists must be a stable id. Index keys break reconciliation, and they break exit animations.

## Review checklist

1. Is anything marked `"use client"` that does not need to be?
2. Are `params`, `searchParams`, `cookies()`, `headers()` awaited?
3. Any sequential `await`s that could be `Promise.all`?
4. Does every async region have a Suspense boundary with a layout-stable fallback?
5. Does every Server Action validate input and check authorization?
6. Is the LCP image using `next/image` with `priority`?
7. Does anything read `process.env` without `NEXT_PUBLIC_` in client code? (It will be `undefined`.)
