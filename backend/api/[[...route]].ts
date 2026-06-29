import { handle } from "hono/vercel";

import app from "../src/app";

// Vercel catches every /api/* request here and hands it to the Hono app.
export default handle(app);
