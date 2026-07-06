import { createFileRoute } from "@tanstack/react-router";

import { BentoGrid, PageHero, type BentoItem } from "@/components/sections/bento";
import {
  ApplicationForm,
  CtaBand,
  FaqList,
  HighlightBand,
  IconFeatureGrid,
  PageSection,
  SplitSection,
  StepGrid,
} from "@/components/sections/shared";
import { PageShell } from "@/components/sections/page-shell";
import { resolveIcons } from "@/lib/icon-registry";

import content from "@/data/pages/scholarships.json";

const SCHOLARSHIP_BENTO = content.bento as BentoItem[];
const APPLY_STEPS = content.applySteps;
const COMMITMENT = resolveIcons(content.commitment);
const FAQ = content.faq;

export const Route = createFileRoute("/scholarships")({
  head: () => ({
    meta: [
      { title: "Scholarships — WhiteHouse College of Business & Technology" },
      {
        name: "description",
        content:
          "Explore merit, need-based, and special scholarships at WCBT Jhapa Campus for BIT and B.Tech Ed IT students.",
      },
    ],
    links: [{ rel: "canonical", href: "/scholarships" }],
  }),
  component: ScholarshipsPage,
});

function ScholarshipsPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Scholarships & Financial Aid"
        title="Making quality education accessible"
        description="WCBT offers a range of scholarships to recognize talent, support deserving students, and open doors for learners across Eastern Nepal."
        image="https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?auto=format&fit=crop&w=1600&q=80"
        primaryCta={{ label: "Apply for Scholarship", href: "/scholarships#apply" }}
      />

      <HighlightBand
        badge="Financial Aid"
        title="Up to 75% merit-based scholarships"
        description="Outstanding students can significantly reduce tuition costs through our merit scholarship program. Need-based and special category awards are also available."
      />

      <PageSection
        eyebrow="Scholarship types"
        title="Find the support that fits you"
        description="From academic excellence to community impact, multiple pathways exist to help fund your education at WCBT."
      >
        <BentoGrid items={SCHOLARSHIP_BENTO} />
      </PageSection>

      <SplitSection
        eyebrow="Merit awards"
        title="Rewarding academic excellence"
        description="High performers in entrance examinations and prior academics may qualify for substantial tuition reductions. We believe talent should never be limited by cost."
        image="https://images.unsplash.com/photo-1531545514256-b1400bc00f31?auto=format&fit=crop&w=1200&q=80"
        bullets={[
          "Based on entrance exam scores and +2 results",
          "Tiered awards from 25% to 75% tuition coverage",
          "Renewable each semester with GPA requirements",
          "Open to both BIT and B.Tech Ed IT applicants",
        ]}
      />

      <SplitSection
        eyebrow="Need-based aid"
        title="Support for deserving students"
        description="Students facing financial hardship can apply for need-based grants. Our committee reviews each case individually with confidentiality and care."
        image="https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=80"
        imageLeft
        bullets={[
          "Income and family circumstance documentation required",
          "Partial tuition grants and installment flexibility",
          "Priority for students from underserved regions",
          "Combined with merit awards where applicable",
        ]}
      />

      <PageSection
        eyebrow="How to apply"
        title="Scholarship application process"
        description="Follow these steps after receiving your admission offer to be considered for financial aid."
        className="bg-muted/30"
      >
        <StepGrid steps={APPLY_STEPS} />
      </PageSection>

      <PageSection
        eyebrow="Our commitment"
        title="Investing in student success"
        description="Scholarships are part of WhiteHouse Education Foundation's mission to expand access to quality higher education."
      >
        <IconFeatureGrid items={COMMITMENT} />
      </PageSection>

      <PageSection
        eyebrow="FAQ"
        title="Scholarship questions"
        description="Answers to the most common financial aid inquiries."
        className="bg-muted/30"
      >
        <FaqList items={FAQ} />
      </PageSection>

      <ApplicationForm
        id="apply"
        eyebrow="Scholarships"
        title="Apply for a scholarship"
        description="Tell us about yourself and our team will help you find the right award and guide your application."
        submitLabel="Submit scholarship inquiry"
      />

      <CtaBand
        title="Explore scholarship options"
        description="Contact our admissions office to learn which awards you may qualify for before applying."
        primaryLabel="Contact Admissions"
        secondaryLabel="View Programs"
      />
    </PageShell>
  );
}
