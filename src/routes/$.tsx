import { createFileRoute } from "@tanstack/react-router";

import { NotFoundPage } from "@/routes/not-found-page";

// import { redirect } from "@tanstack/react-router";
// import { MAINTENANCE_PATH } from "@/lib/maintenance";
//
// export const Route = createFileRoute("/$")({
//   beforeLoad: () => {
//     throw redirect({ to: MAINTENANCE_PATH });
//   },
// });

export const Route = createFileRoute("/$")({
  head: () => ({
    meta: [
      { title: "Page not found — WhiteHouse College of Business & Technology" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: NotFoundPage,
});
