import { createFileRoute } from "@tanstack/react-router";
import { Globe2, GraduationCap, Handshake, ShieldCheck, Users } from "lucide-react";

import { PageHero } from "@/components/sections/bento";
import { CtaBand, PageSection } from "@/components/sections/shared";
import { PageShell } from "@/components/sections/page-shell";

export const Route = createFileRoute("/community/")({
  head: () => ({
    meta: [
      { title: "Community — WhiteHouse College of Business & Technology" },
      {
        name: "description",
        content:
          "Meet the board, advisors, faculty, administration, and international community that support WCBT Jhapa Campus.",
      },
    ],
    links: [{ rel: "canonical", href: "/community" }],
  }),
  component: CommunityPage,
});

const COMMUNITY_SECTIONS = [
  {
    id: "board-members",
    icon: ShieldCheck,
    title: "Board Members",
    href: "/community/board-members",
    description:
      "Our board provides strategic direction, institutional oversight, and long-term guidance for sustainable academic growth.",
  },
  {
    id: "advisors",
    icon: Handshake,
    title: "Advisors",
    href: "/community/advisors",
    description:
      "Academic and industry advisors help align programs, projects, and student exposure with real workforce needs.",
  },
  {
    id: "faculty",
    icon: GraduationCap,
    title: "Faculty",
    href: "/community/faculty",
    description:
      "Faculty members bring subject expertise, mentoring, and project-based learning into the classroom.",
  },
  {
    id: "administration",
    icon: Users,
    title: "Administration",
    href: "/community/administration",
    description:
      "The administration team supports admissions, student services, operations, and daily campus coordination.",
  },
  {
    id: "international",
    icon: Globe2,
    title: "International",
    href: "/community/international",
    description:
      "WCBT encourages global perspectives through academic standards, collaboration, digital learning, and future mobility pathways.",
  },
];

function CommunityPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Community"
        title="The people behind WCBT"
        description="Our board, advisors, faculty, and administration work together to create a supportive academic community for students."
        image="https://ik.imagekit.io/qn3m81dsk/university/clz%201.jpg"
        imageCaption="Premises of Nidi Secondary School & Indreni Campus"
      />

      <PageSection
        eyebrow="People & Support"
        title="A community built around student success"
        description="Explore the teams and partners who guide the campus, support learning, and connect students with opportunity."
      >
        <div className="grid gap-6 md:grid-cols-2">
          {COMMUNITY_SECTIONS.map((section) => (
            <a
              id={section.id}
              key={section.id}
              href={section.href}
              className="scroll-mt-28 rounded-3xl border border-border bg-card p-6 transition-shadow hover:shadow-lg hover:shadow-primary/10"
            >
              <div className="grid size-12 place-items-center rounded-2xl bg-primary/10 text-primary">
                <section.icon className="size-5" />
              </div>
              <h3 className="mt-5 text-xl font-semibold">{section.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {section.description}
              </p>
            </a>
          ))}
        </div>
      </PageSection>

      <CtaBand
        title="Connect with our team"
        description="Reach out to learn more about campus leadership, academic teams, or student support."
        primaryLabel="Contact WCBT"
        secondaryLabel="Visit Campus"
      />
    </PageShell>
  );
}
