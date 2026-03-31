# Project Structure Notes

Last updated: 2026-03-28

## Overview

This repository is a single-page React frontend for a choir website.

- Build stack: React 18, TypeScript, Vite 6
- Routing: `react-router-dom` v7 using `BrowserRouter`
- Styling: Tailwind CSS
- Tests: Vitest + Testing Library with `jsdom`
- Deployment target: Vercel

The app is data-driven. Most page content is fetched from JSON files under `public/` instead of being hardcoded in components.

## Top-Level Files

- `package.json`: npm scripts and dependency definitions
- `vite.config.ts`: Vite config, source maps enabled, React plugin, tsconfig path aliases
- `vitest.config.ts`: test environment and `@` alias setup
- `tsconfig.json`: strict-ish TypeScript config with `@/* -> src/*`
- `tailwind.config.js` and `postcss.config.js`: styling pipeline
- `vercel.json`: disables caching for `choir-doc.json` and `choir-doc.en.json`
- `README.md`: project intro and operational notes

## Source Layout

### `src/main.tsx`

Frontend bootstrap. Renders `App` inside React `StrictMode`.

### `src/App.tsx`

Composition root for the app:

- `LangProvider`
- `DocProvider`
- `ErrorBoundary`
- `BrowserRouter`

Routes currently found:

- `/` -> `Home`
- `/other` -> placeholder page
- `*` -> `NotFound`

### `src/pages`

- `Home.tsx`: assembles the landing page sections in order
- `NotFound.tsx`: simple 404 page with a link back to `/`

`Home` is mostly orchestration. It reads the loaded doc, sets meta info, and renders the major sections.

### `src/components`

Main page sections:

- `Header`
- `Hero`
- `About`
- `Conductor`
- `Members`
- `Videos`
- `Performances`
- `Contact`
- `Footer`

Support components:

- `ErrorBoundary`
- `MobileMenu`
- `ScrollToTop`
- `ui/Card`
- `ui/SectionTitle`

The component names suggest a marketing / brochure-style site rather than a complex application workflow.

### `src/context`

- `DocContext.ts`: context definition
- `doc.tsx`: `DocProvider`, the main content-loading layer

`DocProvider` responsibilities:

- read current language from `LangProvider`
- fetch `/choir-doc.json` or `/choir-doc.en.json`
- expose `{ doc, loading, error }`
- update `document.title` from loaded content
- report failures through `logError`

This is the central data boundary of the app.

### `src/hooks`

- `useDoc.ts`: context access helper for doc data
- `useMeta.ts`: writes `description` and `keywords` meta tags
- `useTheme.ts`: localStorage-backed light/dark theme hook

Notable detail: `useTheme.ts` exists, but I have not yet seen it wired into `App` or page composition from the files inspected so far.

### `src/lib`

- `types.ts`: core domain types (`Doc`, `Member`, `Conductor`, `Video`, `Performance`, etc.)
- `lang.tsx`: language context backed by localStorage
- `utils.ts`: helpers including `cn()` and `docUrl(lang)`
- `logger.ts`: currently console-based error logger placeholder

## Public Assets and Content

### `public/choir-doc.json`
### `public/choir-doc.en.json`

These appear to be the primary content sources for Chinese and English.

Based on `Doc` type usage, the JSON can contain:

- choir identity and intro text
- conductor data
- member data
- performance and video data
- contact and footer data
- keywords and image references

### `public/images`

Contains site content images.

Other public assets include:

- logo and favicon files
- placeholder avatar/banner SVGs

The app relies on static assets from `public/` and deliberately avoids cache persistence for the JSON docs in Vercel.

## Data and Control Flow

Current high-level runtime flow:

1. `main.tsx` renders `App`
2. `App` sets up language, document data, error handling, and routing
3. `DocProvider` fetches the language-specific JSON file
4. `Home` and child components consume the doc via `useDoc()`
5. `useMeta()` and `DocProvider` update document metadata

The architecture is simple and centralized. There is no external API client layer, global state library, or server-side rendering in the inspected code.

## Testing Layout

Test files currently present:

- `src/app.routing.test.tsx`
- `src/meta.test.tsx`
- `src/components/fallbacks.test.tsx`
- `src/components/header.lang.test.tsx`
- `src/context/doc.test.tsx`

Test support:

- `src/test/setup.ts`: jsdom setup and `matchMedia` mock
- `src/test/mocks.ts`: sequential fetch mocking helper

Current tests mainly cover:

- unknown route -> 404
- title/meta related behavior
- language switching
- resource fallback rendering
- doc loading through context

## Architectural Notes

- This is not a monorepo and not a full-stack app from the current file layout.
- The project is mostly a content website with a thin app shell.
- Content is intentionally separated from rendering through JSON docs.
- Error handling is present, but external monitoring is not integrated yet.
- The routing surface is very small.
- The codebase is compact enough that most behavior likely lives inside the section components and the JSON data files.

## Open Questions / Follow-Up Areas

If I continue browsing later, the next useful files to inspect would be:

- the section components under `src/components/`
- `public/choir-doc.json`
- `public/choir-doc.en.json`
- `src/index.css`

Those files should clarify:

- the exact shape of production content
- whether layout/styling follows a design system or page-specific patterns
- whether some domain fields in `Doc` are unused or loosely typed

## Additional Findings After Deeper Inspection

### Content Files

The production content lives primarily in:

- `public/choir-doc.json`
- `public/choir-doc.en.json`

Both files contain parallel bilingual content for:

- choir name and intro
- conductor list
- YouTube channel and video list
- upcoming performances
- footer copy
- contact information
- QR code and logo references

The data shape aligns reasonably well with `src/lib/types.ts`, especially the `Doc` interface.

### Section-by-Section Behavior

#### `Header`

- reads `doc.logo`
- reads language from `LangProvider`
- uses `useTheme()` directly
- mixes data-driven pieces with hardcoded nav labels and anchor targets

Important implementation detail:

- `useTheme()` is instantiated inside `Header`, not in a higher shared app shell
- theme is persisted to localStorage and mirrored to `document.documentElement` classes

#### `Hero`

- uses `doc.logo`
- does not use `doc.intro`
- headline still has a hardcoded bias toward the Chinese name `咏歌堂`
- supporting paragraph is fully hardcoded in both languages

This means the hero section is only partially data-driven.

#### `About`

- reads `doc.intro`
- reads `doc.aboutImage`, or falls back to `doc.images[0].file`
- otherwise uses a placeholder image

This section is genuinely content-driven.

#### `Conductor`

- supports both `doc.conductors[]` and legacy `doc.conductor`
- normalizes each conductor into the local `ConductorType`
- uses avatar, bio, education, experience, achievements, highlights, philosophy

This is one of the more robust components in the repo because it tolerates multiple content shapes.

#### `Members`

- completely static right now
- only renders two local photos: `/images/boys.JPG` and `/images/girls.JPG`
- does not currently consume `doc.members`

This is a major architectural reality: the `Doc` type supports members, but the current UI does not use that field.

#### `Videos`

- reads `doc.videos`
- reads `doc.youtube.channel`
- derives YouTube thumbnail URLs from `video.id` or parsed `video.url`
- links outward to YouTube instead of embedding players

This keeps the site light and static-friendly.

#### `Performances`

- reads `doc.performances`
- shows empty-state text if no performances exist

Simple and fully driven by content data.

#### `Contact`

- reads `doc.contact`
- reads `doc.qrcode`
- converts website strings into `https://` links if needed
- maps social names to Lucide icons using a simple Facebook/Instagram assumption

This component is data-driven, but the icon mapping is narrow. Unknown social names would still render with the Instagram icon branch.

#### `Footer`

- reads `doc.footer`
- reads choir name from `doc.choirName` / `doc.choirNameEn`
- combines content-driven copy with hardcoded navigation anchors

### Styling Notes

`src/index.css` is lightweight. Most of the styling lives inline in Tailwind utility classes inside components.

Global CSS currently provides:

- Tailwind base/components/utilities
- a rainbow animation used by the header accent bar
- font smoothing and base font family
- light/dark body background hooks
- some global heading tracking

The visual system is therefore mostly component-local rather than centralized in a strong design token layer.

### Data-Driven vs Hardcoded Split

The repository uses a mixed model.

Clearly data-driven:

- about text and image
- conductor profiles
- video gallery
- performances
- contact content
- footer copy

Still mostly hardcoded:

- navigation labels and section anchors
- hero subtitle and CTA copy
- members gallery implementation
- error boundary fallback copy
- some fallback strings in footer and contact

This is important if future work involves CMS-like editing. The content boundary is present, but not complete.

### Type and Modeling Observations

The `Doc` type is intentionally permissive:

- it supports both `conductor` and `conductors`
- `members` allows either `string` or `Member`
- it includes an index signature `[key: string]: unknown`

That makes content ingestion flexible, but it also weakens compiler enforcement. The current design favors tolerance over strict schema guarantees.

### Routing and Navigation Model

The app uses a single-page brochure structure:

- one main route for the site
- one placeholder route at `/other`
- one catch-all 404 page

Most navigation is by fragment links such as `#about` and `#contact`, not route transitions.

### Notable Implementation Characteristics

- `DocProvider` fetches on language change with `cache: 'no-store'`
- Vercel also disables caching for the JSON content files
- `useMeta()` only writes meta tags when values are present; it does not remove stale tags
- `ErrorBoundary` fallback text is Chinese-only
- `NotFound.tsx` is visually simpler than the rest of the site and does not share the broader page design language
- the project includes a `/other` route placeholder that is not reflected in the main navigation

### Current Architectural Summary

The project is best understood as a static-content marketing site with:

- React used as the rendering shell
- JSON files acting as the content source
- minimal client-side state beyond language, theme, and loaded content
- low routing complexity
- no backend code in the inspected repository

This makes the codebase small and approachable, but it also means maintainability depends heavily on keeping the JSON schema and component expectations aligned.
