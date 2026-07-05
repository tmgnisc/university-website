import { createFileRoute } from "@tanstack/react-router";
import { BarChart3, CheckCircle2, GraduationCap, Quote, ShieldCheck, UsersRound } from "lucide-react";

import { PageHero } from "@/components/sections/bento";
import {
  CtaBand,
  IconFeatureGrid,
  LeadershipGrid,
  PageSection,
} from "@/components/sections/page-sections";
import { PageShell } from "@/components/sections/page-shell";

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

const BOARD_MEMBERS = [
  {
    name: "Yuvraj Sharma",
    role: "President",
    image: "https://ik.imagekit.io/qn3m81dsk/university/president%201.jpg",
    imageClassName: "object-top",
    bio: "Provides strategic leadership for institutional growth and long-term academic vision.",
  },
  {
    name: "Ranjit Shah",
    role: "Director",
    image:
      "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=crop&w=600&q=80",
    bio: "Supports governance, operations, and partnership development across the campus.",
  },
  {
    name: "Sanjog Kharel",
    role: "Director",
    image:
      "https://images.unsplash.com/photo-1562788869-4ed32648eb72?auto=format&fit=crop&w=600&q=80",
    bio: "Guides planning, institutional coordination, and student-centered initiatives.",
  },
];

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
          description="A note from Yuvraj Sharma on WCBT's mission, values, and commitment to students across Eastern Nepal."
          className="bg-muted/30"
        >
          <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:items-start">
            <div className="overflow-hidden rounded-3xl border border-border bg-card">
              <img
                src="https://ik.imagekit.io/qn3m81dsk/university/president%201.jpg"
                alt="Yuvraj Sharma, President"
                className="aspect-[4/5] w-full object-cover object-top"
              />
              <div className="p-6">
                <p className="font-semibold">Yuvraj Sharma</p>
                <p className="text-sm text-primary">President</p>
              </div>
            </div>

            <article className="rounded-3xl border border-border bg-card p-6 md:p-8">
              <Quote className="size-9 text-primary" />
              <div className="mt-6 space-y-5 text-base leading-relaxed text-muted-foreground md:text-lg">
                <p>
                  Our mission is to nurture an academic ecosystem where Eastern Nepal's brightest
                  minds engineer the future with integrity, excellence and global ambition.
                </p>
                <p>
                  WhiteHouse College of Business & Technology was established with a clear belief:
                  students from this region deserve access to quality, future-focused education
                  without having to leave their community behind. Through our partnership with
                  Kathmandu University, we are building a learning environment that combines
                  academic discipline, practical technology skills, and strong ethical values.
                </p>
                <p>
                  We are committed to helping every student grow as a confident learner, a capable
                  professional, and a responsible citizen. Our faculty, administration, and board
                  will continue working together to strengthen facilities, expand industry
                  connections, and create opportunities that prepare graduates for meaningful work
                  in Nepal and beyond.
                </p>
                <p>
                  I invite students, parents, alumni, and partners to join us in this journey of
                  building a stronger academic future for Eastern Nepal.
                </p>
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
