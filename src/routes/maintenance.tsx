import { createFileRoute, Link } from "@tanstack/react-router";

import logoImg from "@/assets/18.png";

export const Route = createFileRoute("/maintenance")({
  head: () => ({
    meta: [
      { title: "Maintenance — Whitehouse College of Business & Technology" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: MaintenancePage,
});

function MaintenancePage() {
  return (
    <main className="min-h-dvh grid place-items-center bg-navy-deep text-white px-6">
      <div className="max-w-md text-center">
        <img
          src={logoImg}
          alt="Whitehouse College of Business & Technology"
          className="h-16 w-auto mx-auto"
          width={64}
          height={64}
        />
        <h1 className="mt-6 text-3xl font-semibold">We&apos;ll be right back</h1>
        <p className="mt-3 text-white/70">
          This section is under maintenance. Please check back shortly.
        </p>
        <Link
          to="/"
          className="mt-8 inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
        >
          Back to homepage
        </Link>
      </div>
    </main>
  );
}
