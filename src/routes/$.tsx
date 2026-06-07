import { createFileRoute, redirect } from "@tanstack/react-router";

import { MAINTENANCE_PATH } from "@/lib/maintenance";

export const Route = createFileRoute("/$")({
  beforeLoad: () => {
    throw redirect({ to: MAINTENANCE_PATH });
  },
});
