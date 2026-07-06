import { createFileRoute } from "@tanstack/react-router";
import { Award, Shield } from "lucide-react";

import { BentoGrid, PageHero, type BentoItem } from "@/components/sections/bento";
import {
  CtaBand,
  HighlightBand,
  IconFeatureGrid,
  PageSection,
  SplitSection,
  Timeline,
} from "@/components/sections/shared";
import { PageShell } from "@/components/sections/page-shell";
import { resolveIcons } from "@/lib/icon-registry";

import content from "@/data/pages/about.json";

const ABOUT_BENTO = content.bento as BentoItem[];
const CORE_VALUES = resolveIcons(content.coreValues);
const MILESTONES = content.milestones;

export const Route = createFileRoute("/about/")({
  head: () => ({
    meta: [
      { title: "About — WhiteHouse College of Business & Technology" },
      {
        name: "description",
        content:
          "Learn about WCBT Jhapa Campus, our partnership with Kathmandu University, and the WhiteHouse Education Foundation mission.",
      },
      { property: "og:title", content: "About WCBT Jhapa Campus" },
      {
        property: "og:description",
        content: "Discover our story, mission, and academic partnership in Eastern Nepal.",
      },
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
        image="https://ik.imagekit.io/qn3m81dsk/university/clz%203.jpg"
      />

      <SplitSection
        eyebrow="Mission"
        title="Empowering Eastern Nepal through technology education"
        description="We exist to make world-class business and technology education accessible in Jhapa — nurturing innovators, educators, and leaders who can compete nationally and contribute locally."
        image="https://ik.imagekit.io/qn3m81dsk/university/clz%201.jpg"
        imageCaption="Premises of Nidi Secondary School & Indreni Campus"
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
        image="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=80"
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

      {/* <PageSection
        eyebrow="Leadership"
        title="Meet the people behind the campus"
        description="Experienced educators and administrators committed to student success and academic excellence."
        className="bg-muted/30"
      >
        <LeadershipGrid members={LEADERSHIP} />
      </PageSection> */}

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
              The foundation provides institutional leadership, infrastructure investment, and
              long-term vision for quality higher education in Eastern Nepal.
            </p>
          </div>
          <div className="rounded-3xl border border-border bg-card p-8">
            <Award className="size-8 text-primary" />
            <h3 className="mt-4 text-xl font-semibold">Academic oversight</h3>
            <p className="mt-3 text-muted-foreground leading-relaxed">
              Program quality is monitored through Kathmandu University guidelines, internal
              reviews, and continuous faculty development initiatives.
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
