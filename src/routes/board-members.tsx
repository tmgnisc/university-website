import { createFileRoute } from "@tanstack/react-router";
import { BarChart3, CheckCircle2, GraduationCap, ShieldCheck, UsersRound } from "lucide-react";

import { PageHero } from "@/components/sections/bento";
import {
  CtaBand,
  IconFeatureGrid,
  LeadershipGrid,
  PageSection,
} from "@/components/sections/shared";
import { PageShell } from "@/components/sections/page-shell";

import aboutContent from "@/data/pages/about.json";

const BOARD_ROLES = ["President", "Director"];
const BOARD_MEMBERS = aboutContent.team.filter((member) => BOARD_ROLES.includes(member.role));

export const Route = createFileRoute("/board-members")({
  head: () => ({
    meta: [
      { title: "Board Members — WhiteHouse College of Business & Technology" },
      {
        name: "description",
        content: "Meet the board members and leadership team guiding WCBT Jhapa Campus.",
      },
    ],
    links: [{ rel: "canonical", href: "/board-members" }],
  }),
  component: BoardMembersPage,
});

function BoardMembersPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Board Members"
        title="Leadership guiding WCBT"
        description="Our board members provide strategic direction, accountability, and long-term guidance for the college."
        image="https://ik.imagekit.io/qn3m81dsk/university/clz%202.jpg"
        imageCaption="Premises of Nidi Secondary School & Indreni Campus"
      />

      <PageSection
        eyebrow="Governance Role"
        title="What the board is responsible for"
        description="The board helps keep WCBT focused, accountable, and prepared for long-term institutional growth."
      >
        <IconFeatureGrid
          items={[
            {
              icon: ShieldCheck,
              title: "Institutional Oversight",
              description:
                "Provides governance direction and helps ensure the college operates responsibly.",
            },
            {
              icon: GraduationCap,
              title: "Academic Quality",
              description:
                "Supports standards, resources, and decisions that strengthen student learning.",
            },
            {
              icon: BarChart3,
              title: "Strategic Planning",
              description:
                "Reviews priorities around programs, facilities, partnerships, and institutional growth.",
            },
            {
              icon: UsersRound,
              title: "Student-Centered Decisions",
              description:
                "Keeps student success, safety, support, and opportunity at the center of planning.",
            },
          ]}
        />
      </PageSection>

      <PageSection
        eyebrow="Leadership"
        title="Meet our board members"
        description="Experienced leaders committed to academic quality, institutional growth, and student success."
      >
        <LeadershipGrid members={BOARD_MEMBERS} />
      </PageSection>

      <PageSection
        eyebrow="Board Focus"
        title="Areas the board helps guide"
        className="bg-muted/30"
      >
        <div className="mx-auto max-w-4xl rounded-3xl border border-border bg-card p-6 md:p-8">
          <ul className="grid gap-3 md:grid-cols-2">
            {[
              "Long-term institutional vision and growth priorities.",
              "Academic quality, program direction, and KU partnership alignment.",
              "Student services, campus development, and learning resources.",
              "Industry partnerships, community engagement, and graduate outcomes.",
              "Financial responsibility, accountability, and transparent management.",
              "Leadership support for faculty, administration, and student initiatives.",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm leading-relaxed">
                <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-primary" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </PageSection>

      <CtaBand
        title="Questions for our leadership team?"
        description="Contact the administration office for institutional and governance inquiries."
        primaryLabel="Contact Administration"
        secondaryLabel="About WCBT"
      />
    </PageShell>
  );
}
