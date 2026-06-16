import { createFileRoute } from "@tanstack/react-router";
import { Award, Heart, Star, TrendingUp } from "lucide-react";

import { BentoGrid, PageHero, type BentoItem } from "@/components/sections/bento";
import {
  CtaBand,
  FaqList,
  HighlightBand,
  IconFeatureGrid,
  PageSection,
  SplitSection,
  StepGrid,
} from "@/components/sections/page-sections";
import { PageShell } from "@/components/sections/page-shell";

const SCHOLARSHIP_BENTO: BentoItem[] = [
  {
    title: "Merit Scholarship",
    description: "Up to 75% tuition support for outstanding academic performers in entrance exams and prior studies.",
    image: "https://placehold.co/700x500",
    badge: "Up to 75%",
    className: "sm:col-span-2 lg:col-span-2 lg:row-span-2 min-h-[300px]",
  },
  {
    title: "Need-Based Aid",
    description: "Financial assistance for students demonstrating genuine economic need with supporting documentation.",
    variant: "text",
    badge: "Support",
    className: "lg:col-span-2",
  },
  {
    title: "Women in Tech",
    description: "Encouraging more women to pursue IT and education technology careers.",
    variant: "stat",
    stat: "30%",
    className: "lg:col-span-1",
  },
  {
    title: "Sports & Talent",
    description: "Recognition for exceptional achievement in sports, arts, or community leadership.",
    image: "https://placehold.co/500x400",
    className: "lg:col-span-1",
  },
  {
    title: "Rural Access Fund",
    description: "Dedicated support for students from remote and underserved communities in Eastern Nepal.",
    image: "https://placehold.co/600x400",
    className: "sm:col-span-2 lg:col-span-2",
  },
];

const APPLY_STEPS = [
  { step: "01", title: "Receive admission offer", description: "Scholarship consideration begins after you are offered a place in BIT or B.Tech Ed IT." },
  { step: "02", title: "Submit scholarship form", description: "Complete the financial aid application with required supporting documents." },
  { step: "03", title: "Review committee", description: "Applications are evaluated based on merit, need, and scholarship category criteria." },
  { step: "04", title: "Award notification", description: "Successful applicants receive scholarship details before the enrollment deadline." },
];

const FAQ = [
  { question: "Can I apply for multiple scholarships?", answer: "Students may be considered for more than one category, but total aid is capped per institutional policy. The committee assigns the most suitable award." },
  { question: "Do scholarships cover full tuition?", answer: "Merit scholarships can cover up to 75% of tuition. Partial awards and need-based grants are also available depending on funds." },
  { question: "Is the scholarship renewable?", answer: "Most awards require maintaining a minimum GPA each semester and good academic standing to continue receiving support." },
  { question: "When should I apply?", answer: "Submit your scholarship application alongside or immediately after accepting your admission offer, before the enrollment deadline." },
];

export const Route = createFileRoute("/scholarships")({
  head: () => ({
    meta: [
      { title: "Scholarships — WhiteHouse College of Business & Technology" },
      { name: "description", content: "Explore merit, need-based, and special scholarships at WCBT Jhapa Campus for BIT and B.Tech Ed IT students." },
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
        image="https://placehold.co/900x600"
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
        image="https://placehold.co/800x600"
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
        image="https://placehold.co/800x600"
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
        <IconFeatureGrid
          items={[
            { icon: Award, title: "Transparent criteria", description: "Clear eligibility guidelines published for every scholarship category." },
            { icon: Heart, title: "Student-first review", description: "Applications evaluated fairly with respect for each student's circumstances." },
            { icon: Star, title: "Renewal support", description: "Ongoing guidance to help scholars maintain eligibility and academic progress." },
            { icon: TrendingUp, title: "Growing fund", description: "Annual expansion of scholarship pools through foundation and partner contributions." },
          ]}
        />
      </PageSection>

      <PageSection eyebrow="FAQ" title="Scholarship questions" description="Answers to the most common financial aid inquiries." className="bg-muted/30">
        <FaqList items={FAQ} />
      </PageSection>

      <CtaBand
        title="Explore scholarship options"
        description="Contact our admissions office to learn which awards you may qualify for before applying."
        primaryLabel="Contact Admissions"
        secondaryLabel="View Programs"
      />
    </PageShell>
  );
}
