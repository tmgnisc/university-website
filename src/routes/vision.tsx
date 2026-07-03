import { createFileRoute } from "@tanstack/react-router";
import { BarChart3, Compass, Flag, HeartHandshake } from "lucide-react";

import { PageHero } from "@/components/sections/bento";
import { CtaBand, PageSection } from "@/components/sections/page-sections";
import { PageShell } from "@/components/sections/page-shell";

export const Route = createFileRoute("/vision")({
  head: () => ({
    meta: [
      { title: "Vision — WhiteHouse College of Business & Technology" },
      {
        name: "description",
        content:
          "Read WCBT Jhapa Campus mission, values, strategy, and reports focus for institutional development.",
      },
    ],
    links: [{ rel: "canonical", href: "/vision" }],
  }),
  component: VisionPage,
});

const VISION_SECTIONS = [
  {
    id: "mission",
    icon: Flag,
    title: "Mission",
    description:
      "To make high-quality technology, business, and education programs accessible in Eastern Nepal through practical learning and strong academic standards.",
  },
  {
    id: "values",
    icon: HeartHandshake,
    title: "Values",
    description:
      "Integrity, excellence, innovation, inclusiveness, and leadership guide how we teach, support students, and grow as an institution.",
  },
  {
    id: "strategy",
    icon: Compass,
    title: "Strategy",
    description:
      "WCBT focuses on KU-aligned academic quality, stronger industry exposure, research culture, student support, and community impact.",
  },
  {
    id: "reports",
    icon: BarChart3,
    title: "Reports",
    description:
      "Institutional updates and progress reports focus on academic delivery, student outcomes, partnerships, and campus development priorities.",
  },
];

function VisionPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Vision"
        title="A future-focused academic ecosystem"
        description="WCBT is building a regional hub for technology education, applied research, and student-centered opportunity."
        image="https://ik.imagekit.io/qn3m81dsk/university/clz%202.jpg"
        imageCaption="Premises of Nidi Secondary School & Indreni Campus"
      />

      <PageSection
        eyebrow="Direction"
        title="What guides our next chapter"
        description="These priorities shape how the college grows, evaluates progress, and serves students."
      >
        <div className="grid gap-6 md:grid-cols-2">
          {VISION_SECTIONS.map((section) => (
            <article
              id={section.id}
              key={section.id}
              className="scroll-mt-28 rounded-3xl border border-border bg-card p-6"
            >
              <div className="grid size-12 place-items-center rounded-2xl bg-primary/10 text-primary">
                <section.icon className="size-5" />
              </div>
              <h3 className="mt-5 text-xl font-semibold">{section.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {section.description}
              </p>
            </article>
          ))}
        </div>
      </PageSection>

      <CtaBand
        title="Learn how WCBT is growing"
        description="Explore our programs, affiliations, and student pathways across technology and education."
        primaryLabel="Explore Programs"
        secondaryLabel="About WCBT"
      />
    </PageShell>
  );
}
