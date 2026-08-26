# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## About this project

A single-page portfolio site (Next.js App Router + MUI) for Jackson Schacher, deployed as a static-feeling
one-pager: hero → features → skills → projects → download → contact, all rendered in [app/page.tsx](app/page.tsx)
by stacking section components. There is no client-side routing between pages — `/contact` and `/gallery` are
old routes that now 307-redirect to in-page anchors (see [next.config.ts](next.config.ts)).

## This is NOT the Next.js you know

This repo pins `next@16.2.4`, which is newer than your training data and has breaking changes vs. what you
expect. **Read the relevant guide in `node_modules/next/dist/docs/` before writing any code that touches
routing, caching, data fetching, or loading states.** The docs are organized under `01-app/`
(getting-started → guides → api-reference), `02-pages/`, `03-architecture/`, `04-community/`.

Notably, several docs pages (linking-and-navigating, fetching-data, caching, streaming, loading.md) carry
inline hints pointing to `01-app/02-guides/instant-navigation.md`, which documents an `unstable_instant` route
segment export for validating instant client-side navigations. It's a **draft feature gated behind
`cacheComponents: true`** in `next.config.ts` — a flag this project does **not** currently set, so it does not
apply to the current codebase. Don't add `unstable_instant` exports reflexively; only read that guide if you're
actually asked to enable Cache Components or work on navigation performance.

## Commands

```bash
npm run dev        # start dev server (localhost:3000)
npm run build       # production build
npm run start       # serve production build
npm run lint         # eslint (flat config, eslint-config-next core-web-vitals + typescript)
npm run lint:fix
```

There is no test suite configured in this repo.

## Architecture

- **`app/`** — App Router root. `layout.tsx` sets up MUI's `AppRouterCacheProvider` + `ThemeProvider` +
  `CssBaseline`, wraps everything in the sticky `Navbar`, and defines all page metadata (OpenGraph/Twitter
  cards, canonical URL) at the layout level since this is a single route.
- **`app/components/`** — one component per page section (`profileCard`, `featuresCard`, `skillsCard`,
  `projectsCard`, `downloadCard`, `contactCard`), plus shared chrome (`nav`, `sectionHeader`, `sectionShapes`,
  `logoMark`, `loading`). Sections are composed in order directly in `app/page.tsx`.
- **`app/data/*.json`** — content for the page sections (projects, skills/icons, experience, features, contact
  icons) is data-driven from JSON rather than hardcoded in components. Prefer editing these files over
  component code when the task is a content change (new project, new skill, updated copy).
- **`src/theme.tsx`** — the single MUI theme (`createTheme`), consumed by `layout.tsx`. Component style
  overrides (Card, Chip, Button) live here.
- **`src/tokens.ts`** — raw design tokens (colors, spacing, shadows, font family aliases) behind the "Bauhaus"
  visual language: flat offset shadows only (`shadow(n)`, never blurred), thick solid borders (`border` /
  `borderThin`), and a 3-color accent cycle (orange → blue → yellow) via `accentAt(i)`. Reuse these tokens
  instead of introducing new hex values or box-shadow blurs.
- **`src/fonts.ts`** — `next/font/google` loaders: Gemunu Libre (display/headings), Roboto Condensed (body),
  Space Mono (uppercase mono labels/eyebrows, via `tokens.monoLabel`).
- **Path alias** `@/*` maps to the repo root (see [tsconfig.json](tsconfig.json)), so imports like
  `@/src/theme` and `@/src/tokens` resolve from project root, not `src/`.

## Notes

- `.env.local` defines `AI_GATEWAY_API_KEY`, S3 (`S3_REGION`/`S3_ACCESS_KEY_ID`/`S3_SECRET_ACCESS_KEY`/
  `S3_BUCKET_NAME`), and Spotify (`SPOTIFY_CLIENT_ID`/`SPOTIFY_CLIENT_SECRET_KEY`) credentials, but no code in
  `app/` or `src/` currently reads them — no API routes exist yet. Treat these as provisioned for
  not-yet-built features rather than dead config to clean up.
- `.claude/settings.local.json` pre-allows copying specific `@mdi/svg` icons into `public/icons/`, and running
  `next`/`eslint` via `npx` — follow that pattern (copy from `node_modules/@mdi/svg/svg/*.svg`) when a section
  needs a new icon.
