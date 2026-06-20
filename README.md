# WhiteHouse College of Business & Technology — Website

Marketing/informational site for WhiteHouse College, built as a static
single-page app with [TanStack Start](https://tanstack.com/start) (SPA mode),
React 19, Tailwind CSS v4, and shadcn/ui components.

## Tech stack

| Concern        | Tool                                         |
| -------------- | -------------------------------------------- |
| Framework      | TanStack Start (SPA) + TanStack Router       |
| UI             | React 19, Tailwind CSS v4, shadcn/ui (Radix) |
| Data fetching  | TanStack Query                               |
| Build tool     | Vite 7                                       |
| Animations     | Framer Motion                                |
| Forms / schema | react-hook-form + zod                        |

## Prerequisites

- **Node.js 20** (see `.nvmrc` — run `nvm use`). Node 22+ also works.
- **npm** (the project standardizes on npm; CI and the deploy use it).

## Getting started

```bash
nvm use            # optional, picks Node 20
npm install --legacy-peer-deps
npm run dev        # http://localhost:8080
```

> `--legacy-peer-deps` is needed because some Radix/React 19 peer ranges
> haven't fully caught up yet. The same flag is used in CI and Vercel.

## Scripts

| Script              | Purpose                                       |
| ------------------- | --------------------------------------------- |
| `npm run dev`       | Start the dev server (HMR) on port 8080       |
| `npm run build`     | Production build → `dist/client` (static SPA) |
| `npm run build:dev` | Build in development mode (unminified)        |
| `npm run preview`   | Serve the production build locally            |
| `npm run lint`      | Run ESLint                                    |
| `npm run format`    | Format with Prettier                          |

## Environment variables

Copy `.env.example` to `.env`. Only `VITE_`-prefixed variables reach the
browser (`import.meta.env.VITE_*`). Server-only values are read inside
handlers — see `src/lib/config.server.ts`.

## Project structure

```
src/
  routes/         File-based routes (TanStack Router). routeTree.gen.ts is generated.
  components/
    ui/           shadcn/ui primitives
    sections/     Page-level building blocks (shell, sections, bento, site)
    chat/         Chat widget
  lib/            Utilities, error reporting, maintenance, config
  data/           Static JSON content (e.g. chatbot)
  assets/         Images
  styles.css      Tailwind entry + design tokens
```

Routes are file-based: add a file under `src/routes/` and the route tree
(`src/routeTree.gen.ts`) regenerates automatically while the dev server runs.

## Deployment

The site builds to a static SPA in `dist/client` (includes `.htaccess` for
SPA fallback routing on Apache).

- **GitHub Actions** (`.github/workflows/deploy.yml`): builds on push to
  `main` and FTP-deploys `dist/client` to the hosting server.
- **Vercel** (`vercel.json`): builds and serves `dist/client` with a
  catch-all rewrite to `index.html`.
