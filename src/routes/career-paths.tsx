import { createFileRoute } from "@tanstack/react-router";
import { CheckCircle2 } from "lucide-react";

import { PageHero } from "@/components/sections/bento";
import { CareerGrid, CtaBand, PageSection } from "@/components/sections/page-sections";
import { PageShell } from "@/components/sections/page-shell";

export const Route = createFileRoute("/career-paths")({
  head: () => ({
    meta: [
      { title: "Career Paths — WhiteHouse College of Business & Technology" },
      {
        name: "description",
        content:
          "Career paths available to WCBT graduates in technology, education, data, and entrepreneurship.",
      },
    ],
    links: [{ rel: "canonical", href: "/career-paths" }],
  }),
  component: CareerPathsPage,
});

const PATHS = [
  {
    title: "Software Developer",
    description:
      "Build applications, websites, and digital platforms for companies, startups, and public organizations.",
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "IT Support & Systems Administrator",
    description:
      "Manage computer systems, networks, cloud services, security, and organizational technology infrastructure.",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Ed-Tech Specialist",
    description:
      "Use technology to improve teaching, learning, training, digital classrooms, and education systems.",
    image:
      "https://images.unsplash.com/photo-1588702547919-26089e690ecc?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Data & AI Analyst",
    description:
      "Analyze information, create dashboards, support AI projects, and help organizations make data-informed decisions.",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
  },
];

function CareerPathsPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Career Paths"
        title="Where WCBT graduates can go"
        description="Our programs prepare students for technology, education, analytics, training, and entrepreneurship pathways."
        image="https://ik.imagekit.io/qn3m81dsk/university/clz%202.jpg"
        imageCaption="Premises of Nidi Secondary School & Indreni Campus"
      />
      <PageSection
        eyebrow="Career Planning"
        title="Choosing a direction after graduation"
        description="A career path is shaped by the student’s interests, skills, projects, communication ability, and willingness to keep learning. WCBT helps students understand multiple options instead of preparing for only one job title."
      >
        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              title: "Technical roles",
              description:
                "Students interested in coding, systems, data, AI, networking, or digital platforms can prepare for technology-focused careers.",
            },
            {
              title: "Education roles",
              description:
                "Students who enjoy teaching, training, or learning design can move toward ICT teaching and ed-tech work.",
            },
            {
              title: "Entrepreneurial roles",
              description:
                "Students with ideas for products, services, or community solutions can explore startups and self-employment.",
            },
          ].map((item) => (
            <article key={item.title} className="rounded-3xl border border-border bg-card p-6">
              <h3 className="text-xl font-semibold">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </PageSection>

      <PageSection
        eyebrow="Opportunities"
        title="Career options after graduation"
        description="Students build a foundation for multiple professional paths through technical learning, projects, and support."
      >
        <CareerGrid items={PATHS} />
      </PageSection>

      <PageSection
        eyebrow="Career Readiness"
        title="Skills that support every path"
        className="bg-muted/30"
      >
        <div className="mx-auto max-w-4xl rounded-3xl border border-border bg-card p-6 md:p-8">
          <ul className="grid gap-3 md:grid-cols-2">
            {[
              "Strong fundamentals in programming, systems, digital tools, and problem solving.",
              "Ability to explain projects clearly through reports, presentations, and interviews.",
              "Teamwork, communication, time management, and professional responsibility.",
              "Practical exposure through labs, workshops, internships, and industry interaction.",
              "A portfolio of academic projects, activities, and technical learning evidence.",
              "A learning mindset for new technologies, tools, and workplace expectations.",
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
        title="Plan your future path"
        description="Connect with WCBT to learn how programs align with your career goals."
        primaryLabel="Explore Programs"
        secondaryLabel="Placements"
      />
    </PageShell>
  );
}
