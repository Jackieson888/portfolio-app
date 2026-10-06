# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## About this project

A single-page portfolio site for Jackson Schacher (https://jackson-schacher.com), built on the Next.js App
Router with MUI. There is one route. [app/page.tsx](app/page.tsx) stacks the section components in order, and
the nav links to them by anchor:

| Order | Component | Anchor | Header |
| --- | --- | --- | --- |
| hero | `profileCard` | `#top` | — |
| 01 | `projectsCard` | `#work` | Selected Work |
| 02 | `aboutCard` | `#about` | About |
| 03 | `featuresCard` | `#expertise` | Core Expertise |
| 04 | `skillsCard` | `#toolkit` | Toolkit (dark section, compact rows) |
| 05 | `downloadCard` | `#experience` | Experience |
| 06 | `contactCard` | `#contact` | Contact |

`portfolioChat` (the floating "Ask about my work" assistant) is rendered last in `page.tsx` and is fixed-position.

`/contact` and `/gallery` are retired routes that redirect to the single page (see
[next.config.ts](next.config.ts)).

## This is NOT the Next.js you know

The repo pins `next@16.2.4` (with React 19.2 and MUI 9), which has breaking changes in APIs, conventions, and
file structure. Read the relevant guide in `node_modules/next/dist/docs/` (`01-app/`, `02-pages/`,
`03-architecture/`, `04-community/`) before writing code that touches routing, caching, data fetching, or
metadata, and heed deprecation notices.

## Commands

```bash
npm run dev        # dev server on localhost:3000
npm run build      # production build (also the type check gate)
npm run start      # serve the production build
npm run lint       # eslint flat config: eslint-config-next core-web-vitals + typescript
npm run lint:fix
npx tsc --noEmit   # type check without building
```

There is no test suite.

## Architecture

### Content is data-driven

Section copy lives in [app/data/](app/data/) as JSON, imported directly by the section component and cast to a
local TypeScript type (for example `projectsDataJson as ProjectItem[]`). For a content change (new project,
skill, job, or copy edit), edit the JSON. The cast is unchecked, so when a JSON shape changes, update the type
in the consuming component too.

| JSON | Consumed by |
| --- | --- |
| `featuresData.json` | `featuresCard` |
| `skillIconData.json` | `skillsCard` |
| `projectsData.json` | `projectsCard` |
| `experienceData.json` | `downloadCard` |
| `contactIconData.json` | `contactCard` |
| `aboutData.json` | `aboutCard` (and the chat's context) |

### Design system ("Bauhaus")

- [src/tokens.ts](src/tokens.ts) is the source of truth for colors, borders, shadows, font-family aliases,
  the page `gutter`/`maxWidth`, and shared style objects (`monoLabel`, `solidButton(bg)`). Components style
  through MUI `sx` using these tokens. Reuse them instead of adding hex values.
- Visual rules: flat offset shadows only via `shadow(n)` (never blurred), thick solid ink borders
  (`border`/`borderThin`), and a three-color accent cycle (orange → blue → yellow) via `accentAt(i)`.
- `orange` and `blue` fail WCAG AA as small text on `paper`. Use `orangeText`/`blueText` for text and keep the
  base accents for fills.
- [src/theme.tsx](src/theme.tsx) is the single MUI theme (light scheme only, CSS variables with a class
  selector) and holds the Card, Chip, and Button overrides.
- [src/fonts.ts](src/fonts.ts) loads Gemunu Libre (display/headings), Roboto Condensed (body), and Space Mono
  (uppercase labels) through `next/font/google`.
- Tailwind 4 is imported in [app/globals.css](app/globals.css) but components do not use utility classes.
  That file mainly holds keyframes and two global classes, and it hardcodes a few token hex values that must
  be kept in sync with `tokens.ts` by hand.

### Section anatomy

Each numbered section is a `<section id>` containing `SectionShapes` (decorative background shapes driven by a
per-section `shapes` array and the `driftA`–`driftD` keyframes) and a `SectionHeader` (`number`, `title`, and
`dark`/`accent` for dark sections). Adding or reordering a section means updating `page.tsx`, the section's
`number`, and the nav links in [app/components/nav.tsx](app/components/nav.tsx).

### Motion

Scroll reveals are pure CSS: add `className="reveal"` (or `rule-grow` for rules) and the scroll-timeline
animation in `globals.css` handles it, with no JS or observers. Browsers without `animation-timeline` and
users with reduced motion get static content. The reveal keyframes animate the standalone `translate`/`scale`
properties so that hover lifts using `transform` on the same element still work; keep that split.

### Server vs. client components

Sections are server components by default. Only `nav`, `profileCard`, `downloadCard`, `projectGallery`, `portfolioChat`, and
`src/theme.tsx` are marked `"use client"`. Keep interactivity in small client leaves rather than converting a
whole section.

### Project cards and media

[app/components/projectsCard.tsx](app/components/projectsCard.tsx) renders each entry of `projectsData.json`
as a full-width case study: a large media gallery on one side (alternating left/right by index) and the copy on
the other. The copy follows a recruiter-skim order: `hook` (a problem-first opening line that has to land on
its own), three `metrics` tiles, then `facts` (`problem`, `built`, `role`, `outcome`, one or two sentences
each), `stack` (5-7 skills), links, and an optional `details` list rendered as a collapsed "How it works".

- `link` (live demo) and `repo` are both optional. With no `link`, "View Code" becomes the primary button.
- `media` is an ordered list. The first item is the default stage view and sets the stage's aspect ratio. An
  entry has `type` (`image`/`video`), `src`, `width`, `height`, `caption` (also the alt text) and, for
  video, a `poster`. `width`/`height` must be the real pixel dimensions.
- [app/components/projectGallery.tsx](app/components/projectGallery.tsx) is the client leaf: thumbnails swap
  the stage, videos play as muted loops only while on screen (IntersectionObserver), and users with reduced
  motion get the poster with native controls. Images get an "open full size" button.
- Files live in `public/projects/<project>-media/`. Prefer `.webm` (VP9) over GIFs for clips.
- `archivedProjectsData.json` holds retired projects (ParaLayer, This vs That, Game Gem) in the old
  hero/challenge/process/outcome shape. Nothing imports it; port an entry to the new shape to bring it back.

### Conventions

- The `@/*` path alias maps to the repo root, so tokens import as `@/src/tokens`, not `@/tokens`.
- Icons are static SVGs in `public/icons/`, copied from `node_modules/@mdi/svg/svg/<name>.svg` when a new one
  is needed.

### Portfolio chat

- [app/api/chat/route.ts](app/api/chat/route.ts) streams answers with the AI SDK (`streamText`) and the
  `@ai-sdk/openai` provider (Responses API). It needs `OPENAI_API_KEY` at runtime, otherwise it returns 503 and
  the panel shows a "chat is offline" message. The default model is `gpt-6-luna` with `reasoningEffort: "none"`
  (fast, cheap); override with `PORTFOLIO_CHAT_MODEL` and `PORTFOLIO_CHAT_REASONING`. `store: false` keeps
  visitor conversations out of the OpenAI account. The key lives in an OpenAI project restricted to Responses
  (write) and to the chat model, with a monthly budget.
- Amplify Hosting only exposes console environment variables to the Next.js server if the build writes them to
  `.env.production`, so the build spec needs `env | grep -e OPENAI_API_KEY -e PORTFOLIO_CHAT_ -e GITHUB_TOKEN >> .env.production`
  before `npm run build`.
- [app/lib/githubContext.ts](app/lib/githubContext.ts) adds a `<github>` section: the 10 most recently pushed
  non-fork public repos from the last 3 years, with description, language, and a trimmed README excerpt
  (unedited starter-template READMEs are skipped). Cached for a day; any failure just omits the section.
  `GITHUB_TOKEN` is optional and only raises GitHub's rate limit.
- [app/lib/portfolioContext.ts](app/lib/portfolioContext.ts) builds the system prompt from the same JSON the page
  renders (projects, experience, expertise, skills, about), so editing content updates the chat too. The prompt
  restricts answers to those facts, third person, short, and on topic.
- Guardrails in the route: text-only messages, newest user message ≤ 600 chars, history trimmed to a character
  budget, 450 output tokens, and an in-memory per-IP limit of 15 requests per 10 minutes (per server instance).
- `NEXT_PUBLIC_BOOKING_URL` (optional) turns the hero's second button into "Book a 15-min call".

## Notes

- `.env.local` also defines S3 and Spotify credentials, and `package.json` includes `@aws-sdk/client-s3`, but
  nothing uses them yet.
- [README.md](README.md) is the unmodified `create-next-app` template and does not describe this project.
