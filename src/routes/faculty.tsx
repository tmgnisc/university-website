import { createFileRoute } from "@tanstack/react-router";
import { BookOpenCheck, CheckCircle2, GraduationCap, Presentation, UsersRound } from "lucide-react";

import { PageHero } from "@/components/sections/bento";
import {
  CtaBand,
  IconFeatureGrid,
  LeadershipGrid,
  PageSection,
} from "@/components/sections/page-sections";
import { PageShell } from "@/components/sections/page-shell";

export const Route = createFileRoute("/faculty")({
  head: () => ({
    meta: [
      { title: "Faculty — WhiteHouse College of Business & Technology" },
      {
        name: "description",
        content: "Meet faculty and academic leaders supporting WCBT students.",
      },
    ],
    links: [{ rel: "canonical", href: "/faculty" }],
  }),
  component: FacultyPage,
});

const FACULTY = [
  {
    name: "Arya Bhattarai",
    role: "College Head",
    image:
      "https://images.unsplash.com/photo-1580894732444-8ecded7900cd?auto=format&fit=crop&w=600&q=80",
    bio: "Leads day-to-day academic administration and campus coordination.",
  },
  {
    name: "Aarohi Basnet",
    role: "Program Officer, Admissions & ECA",
    image:
      "https://images.unsplash.com/photo-1590650153855-d9e808231d41?auto=format&fit=crop&w=600&q=80",
    bio: "Coordinates admissions support, student engagement, and extracurricular activities.",
  },
];

function FacultyPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Faculty"
        title="Academic team supporting every learner"
        description="Our faculty and academic leaders guide students through practical, KU-aligned learning experiences."
        image="https://ik.imagekit.io/qn3m81dsk/university/clz%203.jpg"
        imageCaption="Premises of Nidi Secondary School & Indreni Campus"
      />
      <PageSection
        eyebrow="Academic Role"
        title="What faculty do at WCBT"
        description="Faculty are responsible for more than classroom delivery. They guide academic progress, mentor projects, coordinate practical learning, and help students connect theory with workplace expectations."
      >
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-3xl border border-border bg-card p-6">
            <h3 className="text-xl font-semibold">Teaching and academic guidance</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Faculty members plan classes around Kathmandu University-aligned learning outcomes,
              explain core concepts, run practical sessions, and support students who need extra
              academic help. Students can approach faculty for subject clarification, assignment
              guidance, project direction, and exam preparation.
            </p>
          </div>
          <div className="rounded-3xl border border-border bg-card p-6">
            <h3 className="text-xl font-semibold">Project and career preparation</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Faculty help students move from theory to application through lab work, presentations,
              team assignments, research exposure, and career-oriented feedback. This support builds
              confidence for internships, graduate study, teaching, technical roles, and
              entrepreneurship.
            </p>
          </div>
        </div>
      </PageSection>

      <PageSection
        eyebrow="Academic Team"
        title="Meet our faculty and academic leaders"
        description="Educators and coordinators focused on student success, learning quality, and campus engagement."
      >
        <LeadershipGrid members={FACULTY} />
      </PageSection>

      <PageSection
        eyebrow="Learning Support"
        title="How students work with faculty"
        description="The faculty relationship is designed to be practical, accessible, and focused on progress."
        className="bg-muted/30"
      >
        <IconFeatureGrid
          items={[
            {
              icon: BookOpenCheck,
              title: "Subject Support",
              description:
                "Students receive clarification on topics, assignments, lab work, and assessment expectations.",
            },
            {
              icon: Presentation,
              title: "Project Mentoring",
              description:
                "Faculty guide students through project planning, research, presentation, and improvement.",
            },
            {
              icon: UsersRound,
              title: "Class Coordination",
              description:
                "Academic leaders coordinate schedules, notices, student concerns, and learning support.",
            },
            {
              icon: GraduationCap,
              title: "Progress Guidance",
              description:
                "Students are encouraged to discuss academic challenges before they become setbacks.",
            },
          ]}
        />
      </PageSection>

      <PageSection eyebrow="Student Expectations" title="What faculty expect from students">
        <div className="mx-auto max-w-3xl rounded-3xl border border-border bg-card p-6 md:p-8">
          <ul className="space-y-3">
            {[
              "Attend classes, labs, and academic activities consistently.",
              "Ask questions early when topics, assignments, or expectations are unclear.",
              "Participate in projects, presentations, workshops, and collaborative learning.",
              "Use feedback from faculty to improve academic work and professional readiness.",
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
        title="Have an academic question?"
        description="Contact the college team for program and faculty support."
        primaryLabel="Contact Us"
        secondaryLabel="Programs"
      />
    </PageShell>
  );
}
