# WCBT CMS Backend

Node API for the WhiteHouse College admin CMS. **Hono** (router) + **Drizzle ORM**
+ **Neon** (serverless Postgres), deployed as **Vercel Functions**. It implements
the exact REST contract the frontend's `src/lib/cms/http-adapter.ts` expects.

## Endpoints

```
POST   /api/auth/login                 -> { token }   (JWT, 7d)

GET    /api/<collection>               -> list        (public)
GET    /api/<collection>/:id           -> item | null (public)
POST   /api/<collection>               -> created     (auth)
PUT    /api/<collection>/:id           -> updated     (auth)
DELETE /api/<collection>/:id           -> 204          (auth)

GET    /api/<singleton>                -> value        (public)
PUT    /api/<singleton>                -> value        (auth)
```

Collections: `openings`, `chatbot-entries`, `programs`, `news`, `scholarships`
Singletons: `bot-settings`, `site-contact`, `site-meta`, `home-stats`

Mutations require `Authorization: Bearer <token>`. GET is public so the website
can read content.

## One-time setup

1. **Create a Neon database** at https://neon.tech (free). Copy the pooled
   connection string.
2. **Install + configure:**
   ```bash
   cd backend
   npm install
   cp .env.example .env        # fill in DATABASE_URL, JWT_SECRET, ADMIN_*
   ```
3. **Create tables and seed:**
   ```bash
   npm run db:push             # creates tables from src/db/schema.ts
   npm run seed                # creates the admin user + starter content
   ```

## Run locally

```bash
npm run dev                    # vercel dev  → http://localhost:3000/api/health
```

## Deploy to Vercel

1. Create a **new Vercel project** and point its **Root Directory** to `backend`.
2. Add the env vars (Project → Settings → Environment Variables):
   `DATABASE_URL`, `JWT_SECRET`, `ADMIN_USERNAME`, `ADMIN_PASSWORD`, `CORS_ORIGIN`.
3. Deploy. Your API is at `https://<project>.vercel.app/api/...`.
4. Run `npm run db:push` and `npm run seed` once against the production
   `DATABASE_URL` (locally with prod env, or via the Neon SQL console).

## Connect the website

In the **frontend** project, set:

```
VITE_CMS_API_URL=https://<your-backend>.vercel.app
```

Rebuild the site. The admin now logs in against this API and all CRUD is live.
Set `CORS_ORIGIN` here (backend) to the site's origin(s).

## Notes

- `src/schemas.ts` mirrors the frontend's `src/lib/cms/types.ts` input shapes —
  keep them in sync (or extract to a shared package later).
- Arrays and nested data (e.g. `program.curriculum`) are stored as `jsonb`.
- The seed includes a starter subset; add the full chatbot Q&A set via the admin
  UI or by extending `src/seed.ts`.
