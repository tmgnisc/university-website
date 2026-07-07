import { createFileRoute } from "@tanstack/react-router";
import { Award, Lightbulb, Megaphone } from "lucide-react";

import { PageHero } from "@/components/sections/bento";
import { CtaBand, IconFeatureGrid, PageSection } from "@/components/sections/shared";
import { PageShell } from "@/components/sections/page-shell";

export const Route = createFileRoute("/news")({
  head: () => ({
    meta: [
      { title: "News — WhiteHouse College of Business & Technology" },
      {
        name: "description",
        content: "Campus announcements, workshops, and student achievements at WCBT Jhapa Campus.",
      },
    ],
    links: [{ rel: "canonical", href: "/news" }],
  }),
  component: NewsPage,
});

function NewsPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="News"
        title="Campus updates and stories"
        description="Follow announcements, workshops, and student achievements from WCBT Jhapa Campus."
        image="https://ik.imagekit.io/qn3m81dsk/university/clz%203.jpg"
        imageCaption="Premises of Nidi Secondary School & Indreni Campus"
      />

      <PageSection
        eyebrow="What to Expect"
        title="The kind of updates we share"
        description="Announcements are shared as they happen. Here's what this page will feature as the college posts updates."
      >
        <IconFeatureGrid
          items={[
            {
              icon: Megaphone,
              title: "Announcements",
              description: "Admissions timelines, campus notices, and institutional updates.",
            },
            {
              icon: Lightbulb,
              title: "Workshops & Seminars",
              description:
                "Sessions on technology, business, and academic topics led by faculty and guests.",
            },
            {
              icon: Award,
              title: "Student Achievements",
              description:
                "Recognition of student and alumni accomplishments in academics and projects.",
            },
          ]}
        />
      </PageSection>

      <PageSection eyebrow="Stay Updated" title="Check back for the latest" className="bg-muted/30">
        <p className="mx-auto max-w-3xl text-center text-muted-foreground leading-relaxed">
          There are no updates posted yet. Contact the college directly for the most current
          announcements, or check back here soon.
        </p>
      </PageSection>

      <CtaBand
        title="Want to learn more?"
        description="Contact WCBT for details about academic events, workshops, and student activities."
        primaryLabel="Contact Us"
        secondaryLabel="Visit Campus"
      />
    </PageShell>
  );
}
