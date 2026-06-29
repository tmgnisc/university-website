import { useState } from "react";
import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { ArrowRight, CheckCircle2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const } },
};

export function PageSection({
  eyebrow,
  title,
  description,
  children,
  className,
  dark = false,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  children?: React.ReactNode;
  className?: string;
  dark?: boolean;
}) {
  return (
    <section className={cn("py-16 md:py-20", dark && "bg-navy-deep text-white", className)}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="max-w-3xl"
        >
          {eyebrow && (
            <span
              className={cn(
                "text-xs uppercase tracking-[0.2em] font-semibold",
                dark ? "text-white/70" : "text-primary",
              )}
            >
              {eyebrow}
            </span>
          )}
          <h2 className="mt-3 text-3xl md:text-4xl font-bold tracking-tight">{title}</h2>
          {description && (
            <p
              className={cn(
                "mt-4 text-lg leading-relaxed",
                dark ? "text-white/75" : "text-muted-foreground",
              )}
            >
              {description}
            </p>
          )}
        </motion.div>
        {children && <div className="mt-10 md:mt-12">{children}</div>}
      </div>
    </section>
  );
}

export function SplitSection({
  eyebrow,
  title,
  description,
  image,
  imageCaption,
  imageLeft = false,
  bullets,
}: {
  eyebrow: string;
  title: string;
  description: string;
  image: string;
  imageCaption?: string;
  imageLeft?: boolean;
  bullets?: string[];
}) {
  const text = (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
    >
      <span className="text-xs uppercase tracking-[0.2em] text-primary font-semibold">
        {eyebrow}
      </span>
      <h2 className="mt-3 text-3xl md:text-4xl font-bold tracking-tight">{title}</h2>
      <p className="mt-4 text-muted-foreground text-lg leading-relaxed">{description}</p>
      {bullets && (
        <ul className="mt-6 space-y-3">
          {bullets.map((b) => (
            <li key={b} className="flex items-start gap-3 text-sm text-foreground">
              <CheckCircle2 className="size-5 shrink-0 text-primary mt-0.5" />
              {b}
            </li>
          ))}
        </ul>
      )}
    </motion.div>
  );

  const visual = (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      transition={{ delay: 0.1 }}
      className="relative"
    >
      <div className="absolute -inset-3 rounded-3xl border border-primary/20" />
      <div className="relative">
        <img
          src={image}
          alt=""
          className="rounded-3xl w-full aspect-[4/3] object-cover shadow-xl shadow-primary/10"
        />
        {imageCaption && (
          <div className="mt-3 text-center">
            <p className="text-sm font-medium text-foreground">{imageCaption}</p>
          </div>
        )}
      </div>
    </motion.div>
  );

  return (
    <section className="py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
        {imageLeft ? (
          <>
            {visual}
            {text}
          </>
        ) : (
          <>
            {text}
            {visual}
          </>
        )}
      </div>
    </section>
  );
}

export function HighlightBand({
  title,
  description,
  badge,
}: {
  title: string;
  description: string;
  badge?: string;
}) {
  return (
    <section className="bg-primary text-primary-foreground py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 text-center">
        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
          {badge && (
            <span className="inline-flex items-center rounded-full bg-white/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider mb-4">
              {badge}
            </span>
          )}
          <h2 className="text-2xl md:text-3xl font-bold">{title}</h2>
          <p className="mt-4 text-primary-foreground/85 max-w-3xl mx-auto text-lg leading-relaxed">
            {description}
          </p>
        </motion.div>
      </div>
    </section>
  );
}

export function IconFeatureGrid({
  items,
}: {
  items: { icon: LucideIcon; title: string; description: string }[];
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {items.map((item, i) => (
        <motion.article
          key={item.title}
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          transition={{ delay: i * 0.06 }}
          className="rounded-3xl border border-border bg-card p-6 hover:shadow-lg hover:shadow-primary/10 transition-shadow"
        >
          <div className="size-12 rounded-2xl bg-primary/10 text-primary grid place-items-center">
            <item.icon className="size-5" />
          </div>
          <h3 className="mt-5 font-semibold text-lg">{item.title}</h3>
          <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{item.description}</p>
        </motion.article>
      ))}
    </div>
  );
}

export function Timeline({
  items,
}: {
  items: { year: string; title: string; description: string }[];
}) {
  return (
    <div className="relative max-w-3xl">
      <div className="absolute left-[7px] top-2 bottom-2 w-px bg-border" aria-hidden />
      <div className="space-y-8">
        {items.map((item, i) => (
          <motion.div
            key={item.year}
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            transition={{ delay: i * 0.08 }}
            className="relative pl-8"
          >
            <span className="absolute left-0 top-1.5 size-3.5 rounded-full border-2 border-primary bg-background" />
            <p className="text-sm font-semibold text-primary">{item.year}</p>
            <h3 className="mt-1 text-lg font-semibold">{item.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{item.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export function LeadershipGrid({
  members,
}: {
  members: { name: string; role: string; image: string; bio: string }[];
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {members.map((m, i) => (
        <motion.article
          key={m.name}
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          transition={{ delay: i * 0.08 }}
          className="rounded-3xl overflow-hidden border border-border bg-card"
        >
          <img src={m.image} alt="" className="w-full aspect-[4/3] object-cover" />
          <div className="p-6">
            <h3 className="font-semibold text-lg">{m.name}</h3>
            <p className="text-sm text-primary font-medium">{m.role}</p>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{m.bio}</p>
          </div>
        </motion.article>
      ))}
    </div>
  );
}

export function ProgramSpotlight({
  id,
  eyebrow,
  title,
  description,
  image,
  duration,
  credits,
  highlights,
  careers,
  imageLeft = false,
}: {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  image: string;
  duration: string;
  credits: string;
  highlights: string[];
  careers: string[];
  imageLeft?: boolean;
}) {
  const meta = (
    <div className="flex flex-wrap gap-3 mt-6">
      <span className="rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
        {duration}
      </span>
      <span className="rounded-full bg-muted px-4 py-1.5 text-sm font-medium text-foreground">
        {credits}
      </span>
    </div>
  );

  const content = (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
    >
      <span className="text-xs uppercase tracking-[0.2em] text-primary font-semibold">
        {eyebrow}
      </span>
      <h2 className="mt-3 text-3xl md:text-4xl font-bold tracking-tight">{title}</h2>
      <p className="mt-4 text-muted-foreground text-lg leading-relaxed">{description}</p>
      {meta}
      <div className="mt-8 grid sm:grid-cols-2 gap-8">
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
            Key highlights
          </h3>
          <ul className="mt-4 space-y-2.5">
            {highlights.map((h) => (
              <li key={h} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                <CheckCircle2 className="size-4 shrink-0 text-primary mt-0.5" />
                {h}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
            Career pathways
          </h3>
          <ul className="mt-4 space-y-2.5">
            {careers.map((c) => (
              <li key={c} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                <CheckCircle2 className="size-4 shrink-0 text-primary mt-0.5" />
                {c}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );

  const visual = (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      transition={{ delay: 0.1 }}
      className="relative"
    >
      <div className="absolute -inset-3 rounded-3xl border border-primary/20" />
      <img
        src={image}
        alt=""
        className="relative rounded-3xl w-full aspect-[4/3] object-cover shadow-xl shadow-primary/10"
      />
    </motion.div>
  );

  return (
    <section id={id} className="py-16 md:py-20 scroll-mt-28 even:bg-muted/40">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
        {imageLeft ? (
          <>
            {visual}
            {content}
          </>
        ) : (
          <>
            {content}
            {visual}
          </>
        )}
      </div>
    </section>
  );
}

export function ProgramCompare({
  rows,
}: {
  rows: { label: string; bit: string; btech: string }[];
}) {
  return (
    <div className="overflow-x-auto rounded-3xl border border-border bg-card">
      <table className="w-full min-w-[560px] text-left text-sm">
        <thead>
          <tr className="border-b border-border bg-muted/50">
            <th className="p-5 font-semibold">Compare</th>
            <th className="p-5 font-semibold text-primary">BIT</th>
            <th className="p-5 font-semibold text-primary">B.Tech Ed IT</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.label} className="border-b border-border last:border-0">
              <td className="p-5 font-medium text-muted-foreground">{row.label}</td>
              <td className="p-5">{row.bit}</td>
              <td className="p-5">{row.btech}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function StepGrid({
  steps,
}: {
  steps: { step: string; title: string; description: string; hint?: string }[];
}) {
  return (
    <TooltipProvider>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {steps.map((s, i) => (
          <motion.article
            key={s.step}
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            transition={{ delay: i * 0.06 }}
            className="rounded-3xl border border-border bg-card p-6"
          >
            <span className="text-3xl font-bold text-primary/30">{s.step}</span>
            <div className="mt-3 flex items-start gap-2">
              <h3 className="font-semibold">{s.title}</h3>
              {s.hint ? (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      type="button"
                      className="rounded-full border border-border bg-muted/10 px-2 py-1 text-xs font-semibold text-muted-foreground hover:bg-muted"
                    >
                      i
                    </button>
                  </TooltipTrigger>
                  <TooltipContent side="top" className="max-w-xs text-left">
                    {s.hint}
                  </TooltipContent>
                </Tooltip>
              ) : null}
            </div>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.description}</p>
          </motion.article>
        ))}
      </div>
    </TooltipProvider>
  );
}

export function CareerGrid({
  items,
}: {
  items: { title: string; description: string; image: string }[];
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {items.map((item, i) => (
        <motion.article
          key={item.title}
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          transition={{ delay: i * 0.06 }}
          className="group rounded-3xl overflow-hidden border border-border bg-card"
        >
          <img
            src={item.image}
            alt=""
            className="w-full aspect-video object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="p-5">
            <h3 className="font-semibold">{item.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{item.description}</p>
          </div>
        </motion.article>
      ))}
    </div>
  );
}

export function CtaBand({
  title,
  description,
  primaryLabel = "Apply Now",
  secondaryLabel = "Contact Admissions",
}: {
  title: string;
  description: string;
  primaryLabel?: string;
  secondaryLabel?: string;
}) {
  return (
    <section className="py-16 md:py-20 bg-navy-deep text-white border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 text-center">
        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
          <h2 className="text-3xl md:text-4xl font-bold">{title}</h2>
          <p className="mt-4 text-white/75 max-w-2xl mx-auto text-lg">{description}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button
              size="lg"
              className="rounded-full px-8 bg-primary text-primary-foreground hover:bg-primary/90"
            >
              {primaryLabel} <ArrowRight className="ml-1 size-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="rounded-full px-8 border-white/30 bg-transparent text-white hover:bg-white/10 hover:text-white"
            >
              {secondaryLabel}
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export function ProgramQuickLinks({
  programs,
}: {
  programs: { id: string; title: string; summary: string; image: string; href?: string }[];
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {programs.map((p, i) => (
        <motion.a
          key={p.id}
          href={p.href ?? `#${p.id}`}
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          transition={{ delay: i * 0.08 }}
          className="group flex flex-col sm:flex-row rounded-3xl overflow-hidden border border-border bg-card hover:shadow-xl hover:shadow-primary/10 transition-all"
        >
          <img src={p.image} alt="" className="sm:w-2/5 aspect-[4/3] sm:aspect-auto object-cover" />
          <div className="p-6 flex flex-col justify-center">
            <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
              {p.title}
            </h3>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{p.summary}</p>
            <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary">
              View details{" "}
              <ArrowRight className="size-4 group-hover:translate-x-0.5 transition-transform" />
            </span>
          </div>
        </motion.a>
      ))}
    </div>
  );
}

export function FaqList({ items }: { items: { question: string; answer: string }[] }) {
  return (
    <div className="grid gap-4 max-w-3xl">
      {items.map((item, i) => (
        <motion.details
          key={item.question}
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          transition={{ delay: i * 0.05 }}
          className="group rounded-2xl border border-border bg-card p-5 open:shadow-sm"
        >
          <summary className="cursor-pointer font-semibold list-none flex items-center justify-between gap-4">
            {item.question}
            <span className="text-primary text-xl leading-none group-open:rotate-45 transition-transform">
              +
            </span>
          </summary>
          <p className="mt-4 text-sm text-muted-foreground leading-relaxed">{item.answer}</p>
        </motion.details>
      ))}
    </div>
  );
}

export function ContactSection() {
  return (
    <section className="py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 grid lg:grid-cols-2 gap-10 lg:gap-14">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
        >
          <span className="text-xs uppercase tracking-[0.2em] text-primary font-semibold">
            Get in touch
          </span>
          <h2 className="mt-3 text-3xl md:text-4xl font-bold tracking-tight">
            We&apos;re here to help
          </h2>
          <p className="mt-4 text-muted-foreground text-lg leading-relaxed">
            Reach out for admissions, scholarships, campus visits, or general inquiries. Our team
            typically responds within one business day.
          </p>
          <div className="mt-8 space-y-4 text-sm">
            <p>
              <span className="font-semibold text-foreground">Address:</span> Jhapa, Nepal
            </p>
            <p>
              <span className="font-semibold text-foreground">Phone:</span> 9714530056
            </p>
            <p>
              <span className="font-semibold text-foreground">Mobile:</span> 9714530057
            </p>
            <p>
              <span className="font-semibold text-foreground">Email:</span>{" "}
              info@whitehouseeducation.edu.np
            </p>
          </div>
          <div className="mt-8 rounded-3xl overflow-hidden border border-border aspect-[5/3]">
            <img src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5ce?auto=format&fit=crop&w=1200&q=80" alt="" className="size-full object-cover" />
          </div>
        </motion.div>
        <motion.form
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          transition={{ delay: 0.1 }}
          onSubmit={(e) => e.preventDefault()}
          className="rounded-3xl border border-border bg-card p-6 md:p-8 shadow-xl shadow-primary/5 space-y-4"
        >
          <div>
            <label className="text-sm font-medium">Full name</label>
            <input
              className="mt-1.5 w-full h-12 rounded-xl border border-input bg-background px-4 text-sm"
              placeholder="Your name"
            />
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Phone</label>
              <input
                className="mt-1.5 w-full h-12 rounded-xl border border-input bg-background px-4 text-sm"
                placeholder="Your phone number"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Email</label>
              <input
                type="email"
                className="mt-1.5 w-full h-12 rounded-xl border border-input bg-background px-4 text-sm"
                placeholder="you@email.com"
              />
            </div>
          </div>
          <div>
            <label className="text-sm font-medium">Subject</label>
            <input
              className="mt-1.5 w-full h-12 rounded-xl border border-input bg-background px-4 text-sm"
              placeholder="Admissions, scholarships, campus visit..."
            />
          </div>
          <div>
            <label className="text-sm font-medium">Message</label>
            <textarea
              rows={4}
              className="mt-1.5 w-full rounded-xl border border-input bg-background px-4 py-3 text-sm"
              placeholder="How can we help you?"
            />
          </div>
          <Button
            type="submit"
            size="lg"
            className="w-full rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 h-12"
          >
            Send Message <ArrowRight className="ml-1 size-4" />
          </Button>
        </motion.form>
      </div>
    </section>
  );
}

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

const FIELD_CLASS = "w-full h-12 rounded-xl border border-input bg-background px-4 text-sm";

// Reusable application / inquiry form. Front-end only for now (shows a
// thank-you state on submit) — wire to the backend later.
export function ApplicationForm({
  id,
  eyebrow = "Apply",
  title,
  description,
  submitLabel = "Submit application",
  className,
}: {
  id?: string;
  eyebrow?: string;
  title: string;
  description?: string;
  submitLabel?: string;
  className?: string;
}) {
  const [sent, setSent] = useState(false);
  return (
    <section id={id} className={cn("scroll-mt-28 py-16 md:py-20", className)}>
      <div className="mx-auto max-w-3xl px-6 lg:px-10">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="text-center"
        >
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            {eyebrow}
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">{title}</h2>
          {description && (
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{description}</p>
          )}
        </motion.div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
          }}
          className="mt-10 rounded-3xl border border-border bg-card p-6 shadow-xl shadow-primary/5 md:p-8"
        >
          {sent ? (
            <div className="py-10 text-center">
              <div className="mx-auto grid size-14 place-items-center rounded-full bg-primary text-primary-foreground">
                <CheckCircle2 className="size-7" />
              </div>
              <h3 className="mt-5 text-2xl font-semibold">Thank you!</h3>
              <p className="mt-2 text-muted-foreground">
                Our admissions team will be in touch with you shortly.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <input required placeholder="Full name" className={FIELD_CLASS} />
              <div className="grid gap-4 sm:grid-cols-2">
                <input required type="tel" placeholder="Phone number" className={FIELD_CLASS} />
                <input required type="email" placeholder="Email" className={FIELD_CLASS} />
              </div>
              <select required defaultValue="" className={FIELD_CLASS}>
                <option value="" disabled>
                  Program of interest
                </option>
                <option>BIT — Bachelor of Information Technology</option>
                <option>B.Tech Ed IT — Technology in Education</option>
                <option>Not sure yet</option>
              </select>
              <textarea
                rows={4}
                placeholder="Anything you'd like us to know? (optional)"
                className={cn(FIELD_CLASS, "h-auto py-3")}
              />
              <Button
                type="submit"
                size="lg"
                className="h-12 w-full rounded-xl bg-primary text-primary-foreground hover:bg-primary/90"
              >
                {submitLabel} <ArrowRight className="ml-1 size-4" />
              </Button>
              <p className="text-center text-xs text-muted-foreground">
                We respect your privacy. No spam, ever.
              </p>
            </div>
          )}
        </form>
      </div>
    </section>
  );
}

export function DeadlineGrid({
  items,
}: {
  items: { date: string; title: string; description: string }[];
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
      {items.map((item, i) => (
        <motion.article
          key={item.title}
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          transition={{ delay: i * 0.06 }}
          className="rounded-3xl border border-border bg-card p-6"
        >
          <p className="text-sm font-semibold text-primary">{item.date}</p>
          <h3 className="mt-2 text-lg font-semibold">{item.title}</h3>
          <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{item.description}</p>
        </motion.article>
      ))}
    </div>
  );
}
