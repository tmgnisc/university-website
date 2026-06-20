import type { Context, Next } from "hono";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET ?? "dev-secret-change-me";

export function signToken(payload: { sub: string; username: string }): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });
}

function verifyToken(token: string): boolean {
  try {
    jwt.verify(token, JWT_SECRET);
    return true;
  } catch {
    return false;
  }
}

// Hono middleware: reject requests without a valid Bearer token. Apply to all
// mutating routes (POST/PUT/DELETE). GET routes stay public so the site can read.
export async function requireAuth(c: Context, next: Next) {
  const header = c.req.header("authorization") ?? "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : "";
  if (!token || !verifyToken(token)) {
    return c.json({ error: "Unauthorized" }, 401);
  }
  await next();
}
