import { createFileRoute, Link } from "@tanstack/react-router";

import logoImg from "@/assets/18.png";

export const Route = createFileRoute("/not-found-page")({
  head: () => ({
    meta: [
      { title: "Page not found — WhiteHouse College of Business & Technology" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: NotFoundPage,
});

export function NotFoundPage() {
  return (
    <main className="min-h-dvh grid place-items-center bg-navy-deep text-white px-6">
      <div className="max-w-md text-center">
        <img
          src={logoImg}
          alt="WhiteHouse College of Business & Technology"
          className="h-16 w-auto mx-auto"
          width={64}
          height={64}
        />
        <p className="mt-6 text-6xl font-bold tracking-tight">404</p>
        <h1 className="mt-4 text-3xl font-semibold">Page not found</h1>
        <p className="mt-3 text-white/70">
          The page you are looking for does not exist or may have been moved.
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
