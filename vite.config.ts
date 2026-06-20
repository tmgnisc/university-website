import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsConfigPaths from "vite-tsconfig-paths";

// Static SPA build (no Nitro server bundle). Output goes to `dist/client`,
// which is what vercel.json and the deploy workflow consume.
export default defineConfig({
  server: {
    host: true,
    port: 8080,
  },
  resolve: {
    // Keep a single copy of React / TanStack Query across the dep graph.
    dedupe: [
      "react",
      "react-dom",
      "react/jsx-runtime",
      "react/jsx-dev-runtime",
      "@tanstack/react-query",
      "@tanstack/query-core",
    ],
  },
  plugins: [
    // `@/*` path alias is resolved from tsconfig.json.
    tsConfigPaths({ projects: ["./tsconfig.json"] }),
    tailwindcss(),
    tanstackStart({
      spa: {
        enabled: true,
        prerender: {
          outputPath: "/index.html",
        },
      },
      // Stop server-only modules from leaking into the client bundle.
      importProtection: {
        behavior: "error",
        client: {
          files: ["**/server/**"],
          specifiers: ["server-only"],
        },
      },
    }),
    viteReact(),
  ],
});
