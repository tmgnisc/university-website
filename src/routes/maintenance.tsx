import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/maintenance")({
  head: () => ({ meta: [{ title: "Maintenance — WhiteHouse" }, { name: "robots", content: "noindex" }] }),
  component: () => (
    <main className="min-h-dvh grid place-items-center bg-navy-deep text-white px-6">
      <div className="max-w-md text-center">
        <div className="size-14 mx-auto rounded-2xl bg-accent text-navy-deep grid place-items-center font-bold text-xl">W</div>
        <h1 className="mt-6 text-3xl font-display">We'll be right back</h1>
        <p className="mt-3 text-white/70">Our site is undergoing scheduled maintenance. Please check back shortly.</p>
      </div>
    </main>
  ),
});
