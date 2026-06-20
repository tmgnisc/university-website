import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import { BentoGrid, PageHero, type BentoItem } from "@/components/sections/bento";
import {
  CareerGrid,
  CtaBand,
  CurriculumStructure,
  HighlightBand,
  PageSection,
  ProgramCompare,
  ProgramQuickLinks,
  ProgramSpotlight,
  StepGrid,
} from "@/components/sections/page-sections";
import { PageShell } from "@/components/sections/page-shell";

// BIT — 4-year KU curriculum laid out by year and semester. Semester credit
// totals (16/17/17/17/17/17/14/12 = 127) and Year 1 / Semester 1 match the
// official structure; the later-semester course ordering is a working
// arrangement that can be adjusted to the exact KU sequence.
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

const FACILITIES_BENTO: BentoItem[] = [
  {
    title: "AI & Innovation Lab",
    description: "Experiment with machine learning, robotics, and prototype development.",
    image: "https://placehold.co/600x450",
    className: "lg:col-span-2",
  },
  {
    title: "24/7 Library Access",
    description: "Digital and print resources for research and self-study.",
    variant: "stat",
    stat: "24/7",
    className: "lg:col-span-1",
  },
  {
    title: "Smart Classrooms",
    description: "Interactive displays and collaborative tools for modern teaching.",
    image: "https://ik.imagekit.io/qn3m81dsk/university/clz%203.jpg?updatedAt=1781585489415",
    imageCaption: "Premises of Nidi Secondary School & Indreni Campus",
    className: "lg:col-span-1",
  },
  {
    title: "Industry Mentorship",
    description: "Guest lectures, hackathons, and placement workshops year-round.",
    variant: "text",
    badge: "Support",
    className: "lg:col-span-2",
  },
];

const COMPARE_ROWS = [
  { label: "Degree focus", bit: "Software & IT systems", btech: "Technology in education" },
  { label: "Duration", bit: "4 years (8 semesters)", btech: "4 years (8 semesters)" },
  {
    label: "Ideal for",
    bit: "Aspiring developers & IT professionals",
    btech: "Future educators & ed-tech leaders",
  },
  {
    label: "Core skills",
    bit: "Programming, databases, networking, AI basics",
    btech: "Instructional design, LMS, digital pedagogy",
  },
  {
    label: "Internships",
    bit: "Software houses & IT firms",
    btech: "Schools, training centers & ed-tech startups",
  },
  { label: "KU affiliation", bit: "Yes", btech: "Yes" },
];

const ADMISSION_STEPS = [
  {
    step: "01",
    title: "Check eligibility",
    description:
      "Review academic requirements for +2 or equivalent qualifications in relevant streams.",
    hint: "Eligibility generally requires +2 or equivalent. BIT suits students strong in maths and technology, while B.Tech Ed IT is ideal for those focused on education technology and instructional design.",
  },
  {
    step: "02",
    title: "Submit application",
    description:
      "Complete the online form with transcripts, identification, and program preference.",
  },
  {
    step: "03",
    title: "Entrance assessment",
    description: "Attend the admission test and interview scheduled by the admissions office.",
  },
  {
    step: "04",
    title: "Enrollment",
    description: "Confirm your seat, complete fee payment, and join orientation week.",
  },
];

const CAREER_PATHS = [
  {
    title: "Software Developer",
    description:
      "Build web and mobile applications for startups, enterprises, and government projects.",
    image: "https://placehold.co/500x300",
  },
  {
    title: "IT Support & Systems Admin",
    description: "Manage networks, cloud infrastructure, and enterprise systems for organizations.",
    image: "https://placehold.co/500x300",
  },
  {
    title: "Ed-Tech Specialist",
    description:
      "Design digital curricula and learning platforms for schools and training institutes.",
    image: "https://placehold.co/500x300",
  },
  {
    title: "ICT Teacher / Trainer",
    description: "Lead technology classrooms and professional development programs nationwide.",
    image: "https://placehold.co/500x300",
  },
  {
    title: "Data & AI Analyst",
    description: "Turn data into insights for business, research, and public-sector innovation.",
    image: "https://placehold.co/500x300",
  },
  {
    title: "Startup Founder",
    description: "Launch ventures in software, education technology, and digital services.",
    image: "https://placehold.co/500x300",
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

export const Route = createFileRoute("/programs")({
  head: () => ({
    meta: [
      { title: "Programs — WhiteHouse College of Business & Technology" },
      {
        name: "description",
        content:
          "Explore BIT and B.Tech Ed IT programs at WCBT Jhapa Campus — Kathmandu University partnered degrees in Jhapa, Nepal.",
      },
      { property: "og:title", content: "Academic Programs at WCBT" },
      {
        property: "og:description",
        content: "BIT and B.Tech Ed IT — modern technology programs in Eastern Nepal.",
      },
    ],
    links: [{ rel: "canonical", href: "/programs" }],
  }),
  component: ProgramsPage,
});

function ProgramsPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Academic Programs"
        title="Future-ready degrees in technology & education"
        description="KU-partnered undergraduate programs designed for careers in software, IT services, and technology-enabled teaching across Nepal and beyond."
        image="https://placehold.co/900x600"
        primaryCta={{ label: "View Programs", href: "#programs" }}
      />

      <PageSection
        eyebrow="Choose your pathway"
        title="Two programs, one standard of excellence"
        description="Both degrees are delivered in partnership with Kathmandu University. Select the pathway that matches your career goals."
      >
        <ProgramQuickLinks
          programs={[
            {
              id: "bit",
              title: "BIT — Bachelor in Information Technology",
              summary:
                "Software engineering, databases, networking, and AI fundamentals for tech careers.",
              image: "https://placehold.co/500x350",
            },
            {
              id: "btech-ed-it",
              title: "B.Tech Ed IT — Technology in Education",
              summary:
                "Digital pedagogy, instructional design, and IT integration for modern educators.",
              image: "https://placehold.co/500x350",
            },
          ]}
        />
      </PageSection>

      <HighlightBand
        badge="KU Partnered"
        title="Nationally recognized qualifications"
        description="Every program follows Kathmandu University curriculum standards, ensuring your degree is respected by employers and institutions across Nepal."
      />

      <ProgramSpotlight
        id="bit"
        eyebrow="Program 01"
        title="BIT — Bachelor in Information Technology"
        description="A four-year undergraduate program for students who want to design, build, and maintain software systems. From programming fundamentals to capstone projects, BIT graduates leave with a portfolio that proves their skills."
        image="https://placehold.co/900x700"
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

      <ProgramSpotlight
        id="btech-ed-it"
        eyebrow="Program 02"
        title="B.Tech Ed IT — Technology in Education"
        description="Designed for future educators and training professionals, this program blends information technology with pedagogy. Graduates lead digital transformation in classrooms, training centers, and educational institutions."
        image="https://placehold.co/900x700"
        duration="4 Years · 8 Semesters"
        credits="126 Credit Hours"
        imageLeft
        highlights={[
          "Instructional design and learning management systems",
          "Educational multimedia, content authoring, and e-learning",
          "Classroom technology integration and digital assessment",
          "Teaching practicum in partner schools and institutions",
          "Research projects in ed-tech innovation",
        ]}
        careers={[
          "ICT teacher in schools and colleges",
          "Ed-tech content developer or instructional designer",
          "Training coordinator at NGOs and corporate L&D teams",
          "Learning platform administrator",
          "Education technology consultant",
        ]}
      />

      <PageSection
        eyebrow="B.Tech Ed overview"
        title="B.Tech Ed — Bachelor of Technical Education in Information Technology"
        description="A Kathmandu University program preparing instructors, trainers, and ed-tech specialists with vocational pedagogical skills, occupational IT specialization, and educational research experience."
        className="bg-muted/30"
      >
        <div className="grid gap-10">
          <div className="grid gap-4">
            <div className="rounded-3xl border border-border bg-card p-6">
              <h3 className="text-xl font-semibold">Program structure</h3>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl bg-muted/60 p-4">
                  <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">
                    Total credits
                  </p>
                  <p className="mt-2 text-3xl font-semibold">136</p>
                </div>
                <div className="rounded-2xl bg-muted/60 p-4">
                  <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">
                    Core courses
                  </p>
                  <p className="mt-2 text-2xl font-semibold">18 credits</p>
                </div>
                <div className="rounded-2xl bg-muted/60 p-4">
                  <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">
                    Vocational pedagogy
                  </p>
                  <p className="mt-2 text-2xl font-semibold">20 credits</p>
                </div>
                <div className="rounded-2xl bg-muted/60 p-4">
                  <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">
                    Occupational specialization
                  </p>
                  <p className="mt-2 text-2xl font-semibold">80 credits</p>
                </div>
                <div className="rounded-2xl bg-muted/60 p-4">
                  <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">
                    Internship / research
                  </p>
                  <p className="mt-2 text-2xl font-semibold">18 credits</p>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-border bg-card p-6">
              <h3 className="text-xl font-semibold">Program summary</h3>
              <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
                <li>
                  <span className="font-semibold text-foreground">
                    Degree offering institution:
                  </span>{" "}
                  Kathmandu University
                </li>
                <li>
                  <span className="font-semibold text-foreground">Program title:</span> Bachelor of
                  Technical Education in Information Technology
                </li>
                <li>
                  <span className="font-semibold text-foreground">Specialization:</span> Information
                  Technology
                </li>
                <li>
                  <span className="font-semibold text-foreground">Degree:</span> Bachelor of
                  Technical Education (Information Technology)
                </li>
                <li>
                  <span className="font-semibold text-foreground">Program duration:</span> 4 years
                </li>
                <li>
                  <span className="font-semibold text-foreground">Credits:</span> 136
                </li>
                <li>
                  <span className="font-semibold text-foreground">Intake size:</span> 30 students
                </li>
                <li>
                  <span className="font-semibold text-foreground">Implementation:</span> Partnership
                  with relevant institutions across the country
                </li>
              </ul>
            </div>
          </div>

          <div className="rounded-3xl border border-border bg-card p-6">
            <h3 className="text-xl font-semibold">Eligibility & entry requirements</h3>
            <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
              Applicants must have completed Level 5 education under NVQF or a minimum 10+2 /
              equivalent degree with a CGPA of at least 1.6 or an average of 40% in any discipline.
            </p>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              <li>
                General Educational Knowledge Test: written objective test covering Mathematics,
                Science, and English at intermediate / 10+2 / diploma levels; 50% required to
                qualify.
              </li>
              <li>
                Oral / Occupational Assessment: aptitude, work experience, career goals,
                presentation skills, and financial readiness; 50% required to qualify.
              </li>
            </ul>
          </div>

          <div className="rounded-3xl border border-border bg-card p-6">
            <h3 className="text-xl font-semibold">Program aims and outcomes</h3>
            <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
              B.Tech Ed prepares professionals for technical and vocational education careers,
              equipping them with pedagogical skills, occupational specialization, and the ability
              to design, implement, and evaluate instructional programs.
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div>
                <h4 className="text-sm font-semibold uppercase tracking-[0.2em] text-foreground">
                  Aims
                </h4>
                <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                  <li>
                    Demonstrate Level 6 NVQF competencies in technical and vocational education.
                  </li>
                  <li>
                    Exhibit meaningful knowledge and skills in technical-vocational occupational
                    specialization.
                  </li>
                  <li>Apply occupational specialization knowledge to problem solving.</li>
                  <li>Apply vocational pedagogical knowledge and instructional skills.</li>
                </ul>
              </div>
              <div>
                <h4 className="text-sm font-semibold uppercase tracking-[0.2em] text-foreground">
                  Learning outcomes
                </h4>
                <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                  <li>
                    Demonstrate foundational knowledge in specialization, general education, and
                    pedagogy.
                  </li>
                  <li>Apply vocational pedagogical skills in instructional contexts.</li>
                  <li>Analyze curriculum, assessment, and educational research problems.</li>
                  <li>
                    Design and evaluate curriculum, pedagogy, assessment, and training approaches.
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-border bg-card p-6">
            <h3 className="text-xl font-semibold">Program rationale</h3>
            <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
              B.Tech Ed is built to meet the growing need for competent technical instructors in
              Nepal's TVET sector. It blends technical and pedagogical training so graduates can
              support schools, polytechnics, and vocational training centers.
            </p>
            <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
              The program prepares professionals to solve real workplace problems, develop learning
              materials, and contribute to the expansion of quality technical education across the
              country.
            </p>
          </div>

          <div className="rounded-3xl border border-border bg-card p-6">
            <h3 className="text-xl font-semibold">Skills and career prospects</h3>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div>
                <h4 className="text-sm font-semibold uppercase tracking-[0.2em] text-foreground">
                  Skills developed
                </h4>
                <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                  <li>Curriculum development and instructional design for vocational subjects.</li>
                  <li>Implementation of experiential learning and continuous assessment.</li>
                  <li>Use of ICT in teaching and training environments.</li>
                  <li>Critical thinking, collaboration, communication, and civic skills.</li>
                </ul>
              </div>
              <div>
                <h4 className="text-sm font-semibold uppercase tracking-[0.2em] text-foreground">
                  Career prospects
                </h4>
                <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                  <li>TVET instructors and educators</li>
                  <li>TVET curriculum developers</li>
                  <li>Instructional designers and training specialists</li>
                  <li>IT professionals in education, training, and development roles</li>
                  <li>Master’s level study in TVET, education, management, or technology</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-border bg-card p-6">
            <h3 className="text-xl font-semibold">Assessment and graduation</h3>
            <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
              The program uses continuous assessment with a competency-based ethos. Practical work
              is assessed in labs, workplaces, or through portfolios, while theoretical learning is
              evaluated in written and oral formats.
            </p>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              <li>Theoretical courses: 50% internal, 50% external assessment.</li>
              <li>
                Courses with major practical components: 75% internal, 25% external assessment.
              </li>
              <li>Fully practical courses: 100% internal assessment followed by viva voce.</li>
              <li>
                Graduation requires completion of the full program and a minimum CGPA of 2.00.
              </li>
              <li>Program completion must not exceed seven years.</li>
            </ul>
          </div>
        </div>
      </PageSection>

      <PageSection
        eyebrow="Side by side"
        title="Compare our programs"
        description="Not sure which pathway fits you? Use this quick comparison to understand the focus, skills, and outcomes of each degree."
        className="bg-muted/30"
      >
        <ProgramCompare rows={COMPARE_ROWS} />
      </PageSection>

      <PageSection
        eyebrow="Learning environment"
        title="Facilities that support every program"
        description="Whether you pursue BIT or B.Tech Ed IT, you learn in labs and classrooms built for hands-on, collaborative work."
      >
        <BentoGrid items={FACILITIES_BENTO} />
      </PageSection>

      <PageSection
        eyebrow="Admissions"
        title="How to apply"
        description="Admissions are open for the upcoming intake. Follow these steps to begin your application at WCBT Jhapa Campus."
        className="bg-muted/30"
      >
        <StepGrid steps={ADMISSION_STEPS} />
      </PageSection>

      <PageSection
        eyebrow="After graduation"
        title="Where our graduates go"
        description="Both programs open doors to in-demand careers — in tech companies, schools, startups, and public-sector innovation."
      >
        <CareerGrid items={CAREER_PATHS} />
      </PageSection>

      <PageSection
        eyebrow="Curriculum"
        title="Program syllabi & curriculum"
        description="View the official Kathmandu University curriculum for each program. Click a card to expand the syllabus preview."
        className="bg-muted/30"
      >
        <div className="grid md:grid-cols-2 gap-6">
          <CurriculumCard
            title="BIT — Bachelor in Information Technology (KU)"
            url="https://cdn.ku.edu.np/OVG_Pheevphyhz_Fgehpgher_Raqbefrq1716863325.cqs/1"
          />
          <CurriculumCard
            title="B.Tech Ed IT — Technology in Education (KU)"
            url="https://cdn.ku.edu.np/O_Grpu_Rq_Cebtenz_Jrofvgr1690203504.cqs/1"
          />
        </div>
      </PageSection>

      <CtaBand
        title="Ready to start your application?"
        description="Join WCBT Jhapa Campus and earn a Kathmandu University partnered degree in BIT or B.Tech Ed IT."
        primaryLabel="Apply Now"
        secondaryLabel="Download Brochure"
      />
    </PageShell>
  );
}
