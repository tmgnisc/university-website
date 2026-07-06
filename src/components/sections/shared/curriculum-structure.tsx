import { motion } from "framer-motion";

import { fadeUp } from "./_shared";

type CurriculumCourse = { name: string; credits: number };
type CurriculumSemester = { title: string; courses: CurriculumCourse[] };
type CurriculumYear = { title: string; subtitle: string; semesters: CurriculumSemester[] };

export function CurriculumStructure({ years }: { years: CurriculumYear[] }) {
  return (
    <div className="space-y-8">
      {years.map((year, i) => (
        <motion.div
          key={year.title}
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          transition={{ delay: i * 0.05 }}
          className="overflow-hidden rounded-3xl border border-border bg-card shadow-sm"
        >
          <div className="bg-primary px-6 py-6 text-primary-foreground md:px-8">
            <h3 className="text-2xl font-bold tracking-tight md:text-3xl">{year.title}</h3>
            <p className="mt-1 text-primary-foreground/85">{year.subtitle}</p>
          </div>
          <div className="space-y-8 px-6 py-6 md:px-8 md:py-8">
            {year.semesters.map((sem) => {
              const total = sem.courses.reduce((sum, c) => sum + c.credits, 0);
              return (
                <div key={sem.title}>
                  <h4 className="text-lg font-bold text-foreground">
                    {sem.title}{" "}
                    <span className="text-sm font-medium text-muted-foreground">
                      ({total} Credits)
                    </span>
                  </h4>
                  <ul className="mt-3 divide-y divide-border">
                    {sem.courses.map((course) => (
                      <li
                        key={course.name}
                        className="flex items-center justify-between gap-4 py-3.5"
                      >
                        <span className="text-foreground">{course.name}</span>
                        <span className="shrink-0 font-semibold text-primary">
                          {course.credits} {course.credits === 1 ? "Credit" : "Credits"}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
