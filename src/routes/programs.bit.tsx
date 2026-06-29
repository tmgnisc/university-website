import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import {
  CtaBand,
  CurriculumStructure,
  PageSection,
  ProgramSpotlight,
} from "@/components/sections/page-sections";
import { PageShell } from "@/components/sections/page-shell";
import { PageHero } from "@/components/sections/bento";

const BIT_CURRICULUM = [
  {
    title: "Year 1",
    subtitle: "Foundation Year — Building Core Knowledge",
    semesters: [
      {
        title: "Semester 1",
        courses: [
          { name: "Advanced Communication Skills", credits: 3 },
          { name: "Calculus and Linear Algebra", credits: 3 },
          { name: "Computer Programming", credits: 3 },
          { name: "Digital Logic", credits: 3 },
          { name: "Introduction to Information System Technology", credits: 2 },
          { name: "Project I", credits: 2 },
        ],
      },
      {
        title: "Semester 2",
        courses: [
          { name: "Mathematics II (Advanced Calculus)", credits: 3 },
          { name: "Management Principles", credits: 3 },
          { name: "Microprocessor and Assembly Language Programming", credits: 3 },
          { name: "Object Oriented Programming", credits: 3 },
          { name: "Discrete Mathematics", credits: 3 },
          { name: "Project II", credits: 2 },
        ],
      },
    ],
  },
  {
    title: "Year 2",
    subtitle: "Core Technology and Systems",
    semesters: [
      {
        title: "Semester 3",
        courses: [
          { name: "Probability and Statistics", credits: 3 },
          { name: "Data Structures and Algorithms", credits: 3 },
          { name: "Operating Systems", credits: 3 },
          { name: "System Analysis and Design", credits: 3 },
          { name: "Marketing Management", credits: 3 },
          { name: "Project III", credits: 2 },
        ],
      },
      {
        title: "Semester 4",
        courses: [
          { name: "Computer Architecture and Design", credits: 3 },
          { name: "Database Management System", credits: 3 },
          { name: "Software Engineering", credits: 3 },
          { name: "Financial Management and Accounting", credits: 3 },
          { name: "IT Ethics and Information Security", credits: 3 },
          { name: "Project IV", credits: 2 },
        ],
      },
    ],
  },
  {
    title: "Year 3",
    subtitle: "Advanced Specialization and Applications",
    semesters: [
      {
        title: "Semester 5",
        courses: [
          { name: "Data Communication and Networking", credits: 3 },
          { name: "Web Application Development", credits: 3 },
          { name: "Artificial Intelligence", credits: 3 },
          { name: "Management Information System", credits: 3 },
          { name: "Computer Graphics and Multimedia", credits: 3 },
          { name: "Project V", credits: 2 },
        ],
      },
      {
        title: "Semester 6",
        courses: [
          { name: "Cloud Computing", credits: 3 },
          { name: "Mobile Application Development", credits: 3 },
          { name: "Big Data", credits: 3 },
          { name: "Organizational Behavior", credits: 3 },
          { name: "Digital Economy", credits: 3 },
          { name: "Project VI", credits: 2 },
        ],
      },
    ],
  },
  {
    title: "Year 4",
    subtitle: "Capstone, Electives and Internship",
    semesters: [
      {
        title: "Semester 7",
        courses: [
          { name: "E-Commerce", credits: 3 },
          { name: "Deep Learning", credits: 3 },
          { name: "Research Seminar", credits: 3 },
          { name: "Elective I (Specialization)", credits: 3 },
          { name: "Project VII", credits: 2 },
        ],
      },
      {
        title: "Semester 8",
        courses: [
          { name: "Internship", credits: 6 },
          { name: "Elective II (Specialization)", credits: 3 },
          { name: "Elective III (Specialization)", credits: 3 },
        ],
      },
    ],
  },
];

function CurriculumCard({ title, url }: { title: string; url: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-2xl bg-card border border-border p-4">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <h4 className="text-lg font-semibold">{title}</h4>
          <p className="text-sm text-muted-foreground mt-1">
            Official Kathmandu University syllabus (opens in preview).
          </p>
        </div>
        <div>
          <button
            type="button"
            onClick={() => setOpen((s) => !s)}
            className="text-sm text-primary underline"
          >
            {open ? "Hide" : "View"}
          </button>
        </div>
      </div>
      {open && (
        <div className="mt-4">
          <iframe src={url} title={title} className="w-full" style={{ height: 600 }} />
        </div>
      )}
    </div>
  );
}

export const Route = createFileRoute("/programs/bit")({
  head: () => ({
    meta: [
      { title: "BIT — Bachelor in Information Technology | WCBT" },
      {
        name: "description",
        content:
          "BIT program at WCBT Jhapa Campus — a 4-year Kathmandu University partnered degree in software, networking, AI, and IT systems.",
      },
      { property: "og:title", content: "BIT — Bachelor in Information Technology at WCBT" },
    ],
    links: [{ rel: "canonical", href: "/programs/bit" }],
  }),
  component: BitPage,
});

function BitPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="BIT Program"
        title="Bachelor in Information Technology"
        description="A four-year KU-partnered undergraduate program preparing you to design, build, and maintain software systems — from programming fundamentals to capstone projects."
        image="https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1400&q=80"
      />

      <ProgramSpotlight
        id="bit"
        eyebrow="BIT — Bachelor in Information Technology"
        title="BIT — Bachelor in Information Technology"
        description="A four-year undergraduate program for students who want to design, build, and maintain software systems. From programming fundamentals to capstone projects, BIT graduates leave with a portfolio that proves their skills."
        image="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1400&q=80"
        duration="4 Years · 8 Semesters"
        credits="126 Credit Hours"
        highlights={[
          "Object-oriented programming, web development, and mobile apps",
          "Database design, cloud computing, and network administration",
          "AI & machine learning fundamentals with lab projects",
          "Agile team projects and industry capstone in final year",
          "Internship placement with software and IT companies",
        ]}
        careers={[
          "Full-stack / frontend / backend developer",
          "Systems analyst or IT consultant",
          "DevOps and cloud support engineer",
          "Cybersecurity and network administrator",
          "Tech entrepreneur or product builder",
        ]}
      />

      <PageSection
        eyebrow="BIT curriculum"
        title="BIT — 4-year KU curriculum structure"
        className="bg-muted/30"
      >
        <CurriculumStructure years={BIT_CURRICULUM} />
      </PageSection>

      <PageSection
        eyebrow="Curriculum"
        title="Program syllabus"
        description="View the official Kathmandu University curriculum. Click the card to expand the syllabus preview."
      >
        <div className="max-w-2xl">
          <CurriculumCard
            title="BIT — Bachelor in Information Technology (KU)"
            url="https://cdn.ku.edu.np/OVG_Pheevphyhz_Fgehpgher_Raqbefrq1716863325.cqs/1"
          />
        </div>
      </PageSection>

      <CtaBand
        title="Ready to start your application?"
        description="Join WCBT Jhapa Campus and earn a Kathmandu University partnered BIT degree."
        primaryLabel="Apply Now"
        secondaryLabel="Contact Admissions"
      />
    </PageShell>
  );
}
