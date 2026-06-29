# Admin CMS — Frontend UI (Design Spec)

Date: 2026-06-20
Status: Approved for implementation (frontend UI only)

## Goal

Build the **frontend admin panel UI** for managing site content via CRUD, with a
login page and route guard. A separate **Node.js + SQL backend** will be built
later; this UI must plug into it with minimal change.

## Constraints / context

- Static SPA (TanStack Start SPA mode, `nitro: false`, prerender only `/`).
- Deployed as static files (FTP + Vercel). No backend today.
- Content currently hardcoded in `.tsx` files and `src/data/chatbot.json`.
- React 19, TanStack Router + Query, Tailwind v4, shadcn/ui, react-hook-form, zod, sonner — all already installed.

## Core principle: a swappable data seam

Components never know where data lives. All data access goes through a
`CmsAdapter` interface. Today it is backed by localStorage (seeded from current
site data); later it becomes HTTP calls to the Node/SQL API by swapping one
module. No component changes when the backend lands.

```
src/lib/cms/
  types.ts          // TS types + zod schemas per resource (single source of truth)
  adapter.ts        // CmsAdapter interface
  local-adapter.ts  // localStorage impl: seeds from seed.ts, simulates async, assigns ids
  http-adapter.ts   // LATER: same interface, fetch() to Node API (stub now)
  seed.ts           // initial data mirrored from the current site
  client.ts         // selects adapter via env (VITE_CMS_API_URL -> http, else local)
  auth.ts           // login/logout/getToken/isAuthenticated (mock now)
  hooks.ts          // TanStack Query hooks per resource (useOpenings, useUpsertOpening, ...)
```

Admin pages use TanStack Query against `cms.*` so loading/error/optimistic states
are real and carry over to the backend unchanged.

### CmsAdapter interface (contract for the future backend)

For each **collection**: `list()`, `get(id)`, `create(input)`, `update(id, input)`, `remove(id)`.
For each **singleton** (siteContact, homeStats, botSettings): `get()`, `update(input)`.

Expected REST mapping for the future Node/SQL API (documented for handoff):

```
GET    /api/<resource>            -> list
GET    /api/<resource>/:id        -> get
POST   /api/<resource>            -> create
PUT    /api/<resource>/:id        -> update
DELETE /api/<resource>/:id        -> remove
GET/PUT /api/<singleton>          -> get/update
POST   /api/auth/login            -> { token }
```

## Auth (interim, mock)

- `auth.login(username, password)` checks against `VITE_ADMIN_USERNAME` /
  `VITE_ADMIN_PASSWORD` (defaults `admin` / `admin123` for first run), stores a
  fake token in localStorage.
- `auth.isAuthenticated()` / `auth.getToken()` / `auth.logout()`.
- Swappable later for real JWT via `POST /api/auth/login`.

## Routes (`/admin`, client-only, noindex)

- `/admin/login` — login page (ungated).
- Pathless guarded layout = admin shell; redirects to `/admin/login` when not authed:
  - `/admin` — dashboard (section cards + counts)
  - `/admin/openings` — Current Openings
  - `/admin/chatbot` — Chatbot Q&A entries + bot settings
  - `/admin/programs` — Programs incl. nested curriculum editor
  - `/admin/news` — News & Events
  - `/admin/scholarships` — Scholarships
  - `/admin/site` — Contact details + Homepage stats/highlights (singletons)

Admin routes are excluded from the `$.tsx` maintenance catch-all (they are real
routes) and carry `<meta name="robots" content="noindex">`.

## Data model (resources)

- **Opening**: `id, title, type, location, qualifications[], experience[], applyEmail, active`
- **ChatbotEntry**: `id, question, priority, keywords[], answer`
- **BotSettings** (singleton): `botName, status, welcomeMessage, fallbackMessage, offTopicMessage, domainKeywords[], quickQuestions[]`
- **Program**: `id, title, code, description, duration, credits, highlights[], careers[], curriculum: Year[]`
  - `Year { title, subtitle, semesters: Semester[] }`
  - `Semester { title, courses: { name, credits }[] }`
- **NewsItem**: `id, title, date, category, body, imageUrl?`
- **Scholarship**: `id, name, category, coverage, eligibility[], description`
- **SiteContact** (singleton): `phones[], email, address`
- **HomeStats** (singleton): `stats: { label, value }[], highlights: { title, description }[]`

All resources have a zod schema in `types.ts`, shared by forms and validation.

## UI building blocks (shadcn)

- **Login**: centered card, react-hook-form + zod, error toast.
- **Admin shell**: responsive sidebar nav + top bar with logout, `<Outlet/>`.
- **Per-resource pattern**: list/table → "Add new" + row edit (Dialog form) → delete
  (AlertDialog confirm) → sonner toasts. Reusable so new resources are cheap.
- **Programs**: richer nested editor — add/remove/reorder years, semesters, courses (name + credits).
- **Singletons** (`/admin/site`, bot settings): plain forms with array field editors.
- Images = URL fields for now (no upload until backend).

## Explicit scope boundaries (for now)

- IN: full admin UI, working mock CRUD (localStorage), mock auth + route guard,
  backend contract documented.
- OUT: public site pages still read hardcoded data (NOT wired to CMS yet) — the
  seed mirrors current content so the live site is unchanged. Wiring public pages
  to the CMS is a follow-up once the backend exists.
- OUT: real auth, cross-browser persistence, image uploads.

## Backend handoff

Implement the REST endpoints above with matching zod-equivalent validation, then
drop in `http-adapter.ts` and set `VITE_CMS_API_URL`. The `types.ts` schemas are
the contract.
```
