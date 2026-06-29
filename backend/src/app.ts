import { randomUUID } from "node:crypto";

import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import { Hono } from "hono";
import { cors } from "hono/cors";
import type { ZodSchema } from "zod";

import { requireAuth, signToken } from "./auth";
import { db } from "./db/client";
import {
  admins,
  chatbotEntries,
  news,
  openings,
  programs,
  scholarships,
  singletons,
} from "./db/schema";
import {
  botSettingsSchema,
  chatbotEntryInput,
  homeStatsSchema,
  loginInput,
  newsItemInput,
  openingInput,
  programInput,
  scholarshipInput,
  siteContactSchema,
  siteMetaSchema,
} from "./schemas";

// Hono application. Mounted at /api (see api/[[...route]].ts). Implements the
// REST contract consumed by the frontend's http-adapter.
const app = new Hono().basePath("/api");

const origins = (process.env.CORS_ORIGIN ?? "*").split(",").map((o) => o.trim());
app.use(
  "*",
  cors({
    origin: origins.includes("*") ? "*" : origins,
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowHeaders: ["Content-Type", "Authorization"],
  }),
);

app.get("/health", (c) => c.json({ ok: true }));

// --- Auth ----------------------------------------------------------------
app.post("/auth/login", async (c) => {
  const parsed = loginInput.safeParse(await c.req.json().catch(() => null));
  if (!parsed.success) return c.json({ error: "Username and password required" }, 400);

  const [admin] = await db
    .select()
    .from(admins)
    .where(eq(admins.username, parsed.data.username));
  if (!admin || !bcrypt.compareSync(parsed.data.password, admin.passwordHash)) {
    return c.json({ error: "Invalid username or password" }, 401);
  }
  return c.json({ token: signToken({ sub: admin.id, username: admin.username }) });
});

// --- Generic CRUD for a collection --------------------------------------
// GET routes are public (the website reads them); mutations require auth.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function registerCollection(path: string, table: any, schema: ZodSchema) {
  app.get(`/${path}`, async (c) => c.json(await db.select().from(table)));

  app.get(`/${path}/:id`, async (c) => {
    const [row] = await db.select().from(table).where(eq(table.id, c.req.param("id")));
    return c.json(row ?? null);
  });

  app.post(`/${path}`, requireAuth, async (c) => {
    const parsed = schema.safeParse(await c.req.json().catch(() => null));
    if (!parsed.success) return c.json({ error: parsed.error.issues[0].message }, 400);
    const rows = (await db
      .insert(table)
      .values({ ...parsed.data, id: randomUUID() })
      .returning()) as unknown[];
    return c.json(rows[0], 201);
  });

  app.put(`/${path}/:id`, requireAuth, async (c) => {
    const parsed = schema.safeParse(await c.req.json().catch(() => null));
    if (!parsed.success) return c.json({ error: parsed.error.issues[0].message }, 400);
    const rows = (await db
      .update(table)
      .set(parsed.data)
      .where(eq(table.id, c.req.param("id")))
      .returning()) as unknown[];
    const updated = rows[0];
    if (!updated) return c.json({ error: "Not found" }, 404);
    return c.json(updated);
  });

  app.delete(`/${path}/:id`, requireAuth, async (c) => {
    await db.delete(table).where(eq(table.id, c.req.param("id")));
    return c.body(null, 204);
  });
}

// --- Generic GET/PUT for a singleton ------------------------------------
function registerSingleton(path: string, key: string, schema: ZodSchema) {
  app.get(`/${path}`, async (c) => {
    const [row] = await db.select().from(singletons).where(eq(singletons.key, key));
    return c.json(row?.value ?? null);
  });

  app.put(`/${path}`, requireAuth, async (c) => {
    const parsed = schema.safeParse(await c.req.json().catch(() => null));
    if (!parsed.success) return c.json({ error: parsed.error.issues[0].message }, 400);
    await db
      .insert(singletons)
      .values({ key, value: parsed.data })
      .onConflictDoUpdate({ target: singletons.key, set: { value: parsed.data } });
    return c.json(parsed.data);
  });
}

registerCollection("openings", openings, openingInput);
registerCollection("chatbot-entries", chatbotEntries, chatbotEntryInput);
registerCollection("programs", programs, programInput);
registerCollection("news", news, newsItemInput);
registerCollection("scholarships", scholarships, scholarshipInput);

registerSingleton("bot-settings", "bot-settings", botSettingsSchema);
registerSingleton("site-contact", "site-contact", siteContactSchema);
registerSingleton("site-meta", "site-meta", siteMetaSchema);
registerSingleton("home-stats", "home-stats", homeStatsSchema);

export default app;
