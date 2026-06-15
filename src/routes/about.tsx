import { createFileRoute } from "@tanstack/react-router";
import { Award, BookOpen, HeartHandshake, Shield, Target, Users } from "lucide-react";

import { BentoGrid, PageHero, type BentoItem } from "@/components/sections/bento";
import {
  CtaBand,
  HighlightBand,
  IconFeatureGrid,
  LeadershipGrid,
  PageSection,
  SplitSection,
  Timeline,
} from "@/components/sections/page-sections";
import { PageShell } from "@/components/sections/page-shell";

const ABOUT_BENTO: BentoItem[] = [
  {
    title: "Jhapa Campus",
    description: "A purpose-built learning environment in the heart of Jhapa, Eastern Nepal.",
    image: "https://placehold.co/700x500/86001d/ffffff?text=Jhapa+Campus",
    badge: "Location",
    className: "sm:col-span-2 lg:col-span-2",
  },
  {
    title: "Students Enrolled",
    description: "A growing community across IT and education technology programs.",
    variant: "stat",
    stat: "500+",
    className: "lg:col-span-1",
  },
  {
    title: "Industry Partners",
    description: "Collaborations that bring internships, mentorship, and placement support.",
    image: "https://placehold.co/500x400/4d0012/ffffff?text=Partners",
    className: "lg:col-span-1",
  },
  {
    title: "Smart Facilities",
    description: "Labs, libraries, and collaborative spaces designed for active learning.",
    image: "https://placehold.co/600x400/86001d/ffffff?text=Facilities",
    className: "sm:col-span-2 lg:col-span-2",
  },
];

const CORE_VALUES = [
  {
    icon: Target,
    title: "Excellence",
    description: "Rigorous academics aligned with Kathmandu University standards and industry expectations.",
  },
  {
    icon: Users,
    title: "Inclusivity",
    description: "Accessible education for students across Eastern Nepal and beyond, with scholarship support.",
  },
  {
    icon: BookOpen,
    title: "Innovation",
    description: "Project-based learning, hackathons, and research exposure from day one.",
  },
  {
    icon: HeartHandshake,
    title: "Community",
    description: "Strong ties with local schools, businesses, and alumni who mentor the next generation.",
  },
];

const MILESTONES = [
  {
    year: "2014",
    title: "Foundation established",
    description: "WhiteHouse Education Foundation begins its mission to expand quality higher education in Eastern Nepal.",
  },
  {
    year: "2018",
    title: "WCBT Jhapa Campus opens",
    description: "The Jhapa campus launches with a focus on business and technology programs for the region.",
  },
  {
    year: "2021",
    title: "Kathmandu University partnership",
    description: "Formal academic partnership brings KU-affiliated BIT and B.Tech Ed IT programs to Jhapa.",
  },
  {
    year: "2026",
    title: "Expanding innovation ecosystem",
    description: "New labs, industry collaborations, and student-led initiatives strengthen the campus community.",
  },
];

const LEADERSHIP = [
  {
    name: "Dr. Rajesh Sharma",
    role: "Campus Director",
    image: "https://placehold.co/400x300/86001d/ffffff?text=Director",
    bio: "Leads academic strategy, faculty development, and partnerships with Kathmandu University and industry.",
  },
  {
    name: "Sunita Karki",
    role: "Academic Coordinator",
    image: "https://placehold.co/400x300/4d0012/ffffff?text=Academic",
    bio: "Oversees curriculum delivery, student advising, and quality assurance across all programs.",
  },
  {
    name: "Anil Thapa",
    role: "Industry Relations Lead",
    image: "https://placehold.co/400x300/86001d/ffffff?text=Industry",
    bio: "Connects students with internships, workshops, and career pathways through partner organizations.",
  },
];

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — WhiteHouse College of Business & Technology" },
      {
        name: "description",
        content:
          "Learn about WCBT Jhapa Campus, our partnership with Kathmandu University, and the WhiteHouse Education Foundation mission.",
      },
      { property: "og:title", content: "About WCBT Jhapa Campus" },
      { property: "og:description", content: "Discover our story, mission, and academic partnership in Eastern Nepal." },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="About WCBT"
        title="WhiteHouse College of Business & Technology"
        description="WCBT Jhapa Campus is in partnership with Kathmandu University, managed by WhiteHouse Education Foundation — empowering students across Eastern Nepal with future-ready education."
      />

      <SplitSection
        eyebrow="Mission"
        title="Empowering Eastern Nepal through technology education"
        description="We exist to make world-class business and technology education accessible in Jhapa — nurturing innovators, educators, and leaders who can compete nationally and contribute locally."
        image="https://placehold.co/800x600/86001d/ffffff?text=Mission"
        bullets={[
          "Deliver KU-partnered programs with academic rigor and practical relevance",
          "Bridge classroom learning with industry exposure and community engagement",
          "Build an inclusive campus culture that supports every student's growth",
        ]}
      />

      <HighlightBand
        badge="Partnership"
        title="In Partnership with Kathmandu University"
        description="Our degree programs follow Kathmandu University curricula and assessment standards, giving graduates nationally recognized qualifications backed by one of Nepal's leading universities."
      />

      <SplitSection
        eyebrow="Vision"
        title="A regional hub for innovation and lifelong learning"
        description="We envision WCBT as Eastern Nepal's center for applied research, entrepreneurship, and technology-enabled education — where students, faculty, and industry solve real problems together."
        image="https://placehold.co/800x600/4d0012/ffffff?text=Vision"
        imageLeft
        bullets={[
          "Expand research and innovation labs in AI, IoT, and ed-tech",
          "Strengthen alumni and employer networks across Nepal",
          "Champion digital literacy in schools and communities",
        ]}
      />

      <PageSection
        eyebrow="Our values"
        title="What guides everything we do"
        description="From admissions to graduation, these principles shape how we teach, support, and grow with our students."
      >
        <IconFeatureGrid items={CORE_VALUES} />
      </PageSection>

      <PageSection
        eyebrow="Campus at a glance"
        title="Where learning meets community"
        description="Explore the spaces, people, and partnerships that make WCBT Jhapa Campus a vibrant place to study."
        className="bg-muted/30"
      >
        <BentoGrid items={ABOUT_BENTO} />
      </PageSection>

      <PageSection
        eyebrow="Our journey"
        title="Milestones that shaped WCBT"
        description="From a regional education initiative to a KU-partnered technology college — our story continues to evolve."
      >
        <Timeline items={MILESTONES} />
      </PageSection>

      <PageSection
        eyebrow="Leadership"
        title="Meet the people behind the campus"
        description="Experienced educators and administrators committed to student success and academic excellence."
        className="bg-muted/30"
      >
        <LeadershipGrid members={LEADERSHIP} />
      </PageSection>

      <PageSection
        eyebrow="Governance"
        title="Managed with accountability and care"
        description="WCBT Jhapa Campus operates under WhiteHouse Education Foundation, with transparent governance, academic oversight, and a student-first approach to decision making."
      >
        <div className="grid md:grid-cols-2 gap-6">
          <div className="rounded-3xl border border-border bg-card p-8">
            <Shield className="size-8 text-primary" />
            <h3 className="mt-4 text-xl font-semibold">WhiteHouse Education Foundation</h3>
            <p className="mt-3 text-muted-foreground leading-relaxed">
              The foundation provides institutional leadership, infrastructure investment, and long-term vision for quality higher education in Eastern Nepal.
            </p>
          </div>
          <div className="rounded-3xl border border-border bg-card p-8">
            <Award className="size-8 text-primary" />
            <h3 className="mt-4 text-xl font-semibold">Academic oversight</h3>
            <p className="mt-3 text-muted-foreground leading-relaxed">
              Program quality is monitored through Kathmandu University guidelines, internal reviews, and continuous faculty development initiatives.
            </p>
          </div>
        </div>
      </PageSection>

      <CtaBand
        title="Visit WCBT Jhapa Campus"
        description="Schedule a campus tour, meet our admissions team, and see how we're building Eastern Nepal's future-focused academic ecosystem."
        primaryLabel="Schedule a Visit"
        secondaryLabel="Contact Us"
      />
    </PageShell>
  );
}
