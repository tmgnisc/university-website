import type { CmsAdapter } from "./adapter";
import { httpAdapter } from "./http-adapter";
import { localAdapter } from "./local-adapter";

// Pick the data source. With VITE_CMS_API_URL set, the admin talks to the real
// Node/SQL backend; otherwise it uses the localStorage mock seeded from the
// current site. Components import `cms` and never know the difference.
const apiUrl = import.meta.env.VITE_CMS_API_URL;

export const cms: CmsAdapter = apiUrl ? httpAdapter(apiUrl) : localAdapter;
