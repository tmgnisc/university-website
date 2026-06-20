import { createFileRoute, redirect, Outlet } from "@tanstack/react-router";

import { AdminShell } from "@/components/admin/admin-shell";
import { isAuthenticated } from "@/lib/cms/auth";

export const Route = createFileRoute("/admin/_authed")({
  beforeLoad: () => {
    if (!isAuthenticated()) throw redirect({ to: "/admin/login" });
  },
  head: () => ({
    meta: [{ name: "robots", content: "noindex" }],
  }),
  component: AdminLayout,
});

function AdminLayout() {
  return (
    <AdminShell>
      <Outlet />
    </AdminShell>
  );
}
