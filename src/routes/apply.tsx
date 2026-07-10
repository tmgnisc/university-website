import { createFileRoute } from "@tanstack/react-router";

import { QueryForm } from "@/components/sections/shared";
import { PageShell } from "@/components/sections/page-shell";

export const Route = createFileRoute("/apply")({
  head: () => ({
    meta: [
      { title: "Apply Now — WhiteHouse College of Business & Technology" },
      {
        name: "description",
        content:
          "Send us a query about admissions, hackathons and events, scholarships, or anything else at WCBT Jhapa Campus.",
      },
    ],
    links: [{ rel: "canonical", href: "/apply" }],
  }),
  component: ApplyPage,
});

function ApplyPage() {
  return (
    <PageShell>
      <QueryForm
        id="query-form"
        eyebrow="Apply Now"
        title="What would you like to ask?"
        description="Ask about admissions, events, scholarships, campus visits, or any other college-related question. Your message goes to the WCBT information desk."
        submitLabel="Send query"
        className="pt-32 md:pt-36"
      />
    </PageShell>
  );
}
