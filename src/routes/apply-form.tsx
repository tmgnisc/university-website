import { createFileRoute } from "@tanstack/react-router";

import { PageShell } from "@/components/sections/page-shell";
import { ApplyForm } from "@/components/sections/shared";

export const Route = createFileRoute("/apply-form")({
  head: () => ({
    meta: [
      { title: "Apply Now — WhiteHouse College of Business & Technology" },
      {
        name: "description",
        content:
          "Apply to WCBT Jhapa Campus, register for the hackathon, or send us a general, admission, or scholarship query.",
      },
    ],
    links: [{ rel: "canonical", href: "/apply-form" }],
  }),
  component: ApplyFormPage,
});

function ApplyFormPage() {
  return (
    <PageShell>
      <ApplyForm className="pt-32 md:pt-40" />
    </PageShell>
  );
}
