import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import { PageHero } from "@/components/sections/bento";
import { CtaBand, PageSection, ProgramSpotlight } from "@/components/sections/page-sections";
import { PageShell } from "@/components/sections/page-shell";

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

export const Route = createFileRoute("/programs/btech-ed-it")({
  head: () => ({
    meta: [
      { title: "B.Tech Ed IT — Technology in Education | WCBT" },
      {
        name: "description",
        content:
          "B.Tech Ed IT program at WCBT Jhapa Campus — a 4-year Kathmandu University degree blending technology with pedagogy for future educators.",
      },
      {
        property: "og:title",
        content: "B.Tech Ed IT — Technology in Education at WCBT",
      },
    ],
    links: [{ rel: "canonical", href: "/programs/btech-ed-it" }],
  }),
  component: BtechEdItPage,
});

function BtechEdItPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="B.Tech Ed IT Program"
        title="B.Tech Ed IT — Technology in Education"
        description="A four-year KU-partnered program blending information technology with pedagogy — preparing future educators to lead digital transformation in classrooms and training centers."
        image="https://plus.unsplash.com/premium_photo-1664304168263-f18dcc6fb94a?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        imageClassName="scale-110 blur-[2px]"
        overlayClassName="bg-black/75 bg-gradient-to-b from-black/80 via-black/65 to-black/80"
      />

      <ProgramSpotlight
        id="btech-ed-it"
        eyebrow="B.Tech Ed IT — Technology in Education"
        title="B.Tech Ed IT — Technology in Education"
        description="Designed for future educators and training professionals, this program blends information technology with pedagogy. Graduates lead digital transformation in classrooms, training centers, and educational institutions."
        image="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1400&q=80"
        duration="4 Years · 8 Semesters"
        credits="136 Credit Hours"
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
                  <li>Master's level study in TVET, education, management, or technology</li>
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
        eyebrow="Curriculum"
        title="Program syllabus"
        description="View the official Kathmandu University curriculum. Click the card to expand the syllabus preview."
        className="bg-muted/30"
      >
        <div className="max-w-2xl">
          <CurriculumCard
            title="B.Tech Ed IT — Technology in Education (KU)"
            url="https://cdn.ku.edu.np/O_Grpu_Rq_Cebtenz_Jrofvgr1690203504.cqs/1"
          />
        </div>
      </PageSection>

      <CtaBand
        title="Ready to start your application?"
        description="Join WCBT Jhapa Campus and earn a Kathmandu University partnered B.Tech Ed IT degree."
        primaryLabel="Apply Now"
        secondaryLabel="Contact Admissions"
      />
    </PageShell>
  );
}
