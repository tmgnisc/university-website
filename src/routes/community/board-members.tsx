import { createFileRoute } from "@tanstack/react-router";
import {
  BarChart3,
  CheckCircle2,
  GraduationCap,
  Quote,
  ShieldCheck,
  UsersRound,
} from "lucide-react";

import { PageHero } from "@/components/sections/bento";
import {
  CtaBand,
  IconFeatureGrid,
  LeadershipGrid,
  PageSection,
} from "@/components/sections/shared";
import { PageShell } from "@/components/sections/page-shell";

import aboutContent from "@/data/pages/about.json";
import boardMembersContent from "@/data/pages/board-members.json";

const BOARD_ROLES = ["President", "Director"];
const BOARD_MEMBERS = aboutContent.team.filter((member) => BOARD_ROLES.includes(member.role));
const PRESIDENT_MESSAGE = boardMembersContent.presidentMessage;

export const Route = createFileRoute("/community/board-members")({
  head: () => ({
    meta: [
      { title: "Board Members — WhiteHouse College of Business & Technology" },
      {
        name: "description",
        content: "Meet the board members and leadership team guiding WCBT Jhapa Campus.",
      },
    ],
    links: [{ rel: "canonical", href: "/community/board-members" }],
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

      <div id="president-message" className="scroll-mt-28">
        <PageSection
          eyebrow="From the President"
          title="Message from the President"
          description={`A note from ${PRESIDENT_MESSAGE.name} on WCBT's mission, values, and commitment to students across Eastern Nepal.`}
          className="bg-muted/30"
        >
          <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:items-start">
            <div className="overflow-hidden rounded-3xl border border-border bg-card">
              <img
                src={PRESIDENT_MESSAGE.image}
                alt={`${PRESIDENT_MESSAGE.name}, ${PRESIDENT_MESSAGE.role}`}
                className="aspect-[4/5] w-full object-cover object-top"
              />
              <div className="p-6">
                <p className="font-semibold">{PRESIDENT_MESSAGE.name}</p>
                <p className="text-sm text-primary">{PRESIDENT_MESSAGE.role}</p>
              </div>
            </div>

            <article className="rounded-3xl border border-border bg-card p-6 md:p-8">
              <Quote className="size-9 text-primary" />
              <div className="mt-6 space-y-5 text-base leading-relaxed text-muted-foreground md:text-lg">
                {PRESIDENT_MESSAGE.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </article>
          </div>
        </PageSection>
      </div>

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
