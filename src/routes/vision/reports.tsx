import { createFileRoute } from "@tanstack/react-router";
import { BarChart3, FileText, GraduationCap, Handshake, TrendingUp } from "lucide-react";

import { PageHero } from "@/components/sections/bento";
import { CtaBand, IconFeatureGrid, PageSection } from "@/components/sections/shared";
import { PageShell } from "@/components/sections/page-shell";

export const Route = createFileRoute("/vision/reports")({
  head: () => ({
    meta: [
      { title: "Reports — WhiteHouse College of Business & Technology" },
      {
        name: "description",
        content: "Institutional reporting focus areas and progress indicators at WCBT.",
      },
    ],
    links: [{ rel: "canonical", href: "/vision/reports" }],
  }),
  component: ReportsPage,
});

function ReportsPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Reports"
        title="Tracking progress with transparency"
        description="WCBT reporting focuses on academic delivery, student outcomes, partnerships, and campus development priorities."
        image="https://ik.imagekit.io/qn3m81dsk/university/clz%202.jpg"
        imageCaption="Premises of Nidi Secondary School & Indreni Campus"
      />
      <PageSection
        eyebrow="Reporting Areas"
        title="What institutional reports cover"
        description="Reports help leadership, faculty, students, and partners understand progress and priorities."
      >
        <IconFeatureGrid
          items={[
            {
              icon: FileText,
              title: "Academic Delivery",
              description:
                "Program delivery, curriculum alignment, teaching quality, and assessment practices.",
            },
            {
              icon: GraduationCap,
              title: "Student Outcomes",
              description:
                "Enrollment, progression, student support, achievements, and graduate readiness.",
            },
            {
              icon: Handshake,
              title: "Partnerships",
              description:
                "Industry collaboration, community engagement, events, and academic partnerships.",
            },
            {
              icon: TrendingUp,
              title: "Campus Development",
              description:
                "Facilities, labs, resources, services, and student experience improvements.",
            },
            {
              icon: BarChart3,
              title: "Quality Indicators",
              description:
                "Feedback, performance measures, reviews, and continuous improvement actions.",
            },
          ]}
        />
      </PageSection>
      <CtaBand
        title="Need institutional information?"
        description="Contact the administration office for official reporting and documentation queries."
        primaryLabel="Contact Administration"
        secondaryLabel="Governance"
      />
    </PageShell>
  );
}
