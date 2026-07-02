import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

import * as schema from "./schema";

function missingDatabaseUrl() {
  throw new Error("DATABASE_URL is not set");
}

export const db = process.env.DATABASE_URL
  ? drizzle(neon(process.env.DATABASE_URL), { schema })
  : new Proxy({} as ReturnType<typeof drizzle>, {
      get: missingDatabaseUrl,
    });
