import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, X } from "lucide-react";
import { useEffect, useState } from "react";

import { LAYOUT, Reveal, SectionContainer } from "@/components/layout/layout-primitives";
import { resolveIcons } from "@/lib/icon-registry";
import { cn } from "@/lib/utils";

import content from "@/data/pages/home-support.json";
import studentLifeImg from "@/assets/student-life.jpg";

const supports = resolveIcons(content.supports);
type SupportItem = (typeof supports)[number];

export function Support() {
  const [openSupport, setOpenSupport] = useState<SupportItem | null>(null);

  useEffect(() => {
    if (!openSupport) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [openSupport]);

  return (
    <section id="campus-life" className={cn(LAYOUT.section, "bg-secondary")}>
      <SectionContainer className={cn("grid lg:grid-cols-2 items-center", LAYOUT.splitGap)}>
        <Reveal>
          <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Student Support
          </span>
          <h2 className="mt-3 text-3xl md:text-5xl font-semibold leading-tight">
            Beyond the classroom — we back every student
          </h2>
          <div className={cn(LAYOUT.contentGap, "space-y-4")}>
            {supports.map((s) => {
              const isOpen = openSupport?.title === s.title;

              return (
                <button
                  key={s.title}
                  type="button"
                  data-maintenance-allow
                  onClick={() => setOpenSupport(s)}
                  className={cn(
                    "group w-full cursor-pointer rounded-2xl bg-card border border-border text-left transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                    isOpen && "border-primary/40 shadow-lg shadow-primary/10",
                    LAYOUT.cardPadding,
                  )}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={cn(
                        "size-11 rounded-xl bg-muted text-black grid place-items-center shrink-0 transition-colors group-hover:bg-primary group-hover:text-primary-foreground",
                        isOpen && "bg-primary text-primary-foreground",
                      )}
                    >
                      <s.icon className="size-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-3">
                        <h3 className="font-semibold">{s.title}</h3>
                        <div className="flex shrink-0 items-center gap-2">
                          <span className="text-sm text-muted-foreground">{s.value}%</span>
                          <ArrowRight
                            className={cn(
                              "size-4 text-muted-foreground transition-transform group-hover:translate-x-1",
                              isOpen && "text-primary",
                            )}
                          />
                        </div>
                      </div>
                      <p className="mt-1 text-sm text-muted-foreground">{s.desc}</p>
                      <div className="mt-3 h-1.5 bg-border rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${s.value}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.2, ease: "easeOut" }}
                          className="h-full bg-primary"
                        />
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <img
            src={studentLifeImg}
            alt="Student life — clubs & hackathons"
            loading="lazy"
            className="rounded-3xl w-full aspect-[4/5] object-cover shadow-2xl shadow-primary/10"
          />
        </Reveal>
      </SectionContainer>

      {openSupport && (
        <div
          data-maintenance-allow
          className="fixed inset-0 z-50 grid place-items-center bg-black/30 px-4 py-6 backdrop-blur-xl [backdrop-filter:blur(18px)] [-webkit-backdrop-filter:blur(18px)]"
          role="presentation"
          onClick={() => setOpenSupport(null)}
        >
          <motion.article
            initial={{ opacity: 0, y: 18, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="support-detail-title"
            className="relative max-h-[88vh] w-full max-w-3xl overflow-y-auto rounded-3xl border border-border bg-card p-6 text-card-foreground shadow-2xl shadow-black/20 md:p-8"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              data-maintenance-allow
              onClick={() => setOpenSupport(null)}
              className="absolute right-4 top-4 grid size-9 cursor-pointer place-items-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              aria-label="Close support details"
            >
              <X className="size-4" />
            </button>

            <div className="grid size-12 place-items-center rounded-xl bg-primary/10 text-primary">
              <openSupport.icon className="size-5" />
            </div>
            <p className="mt-5 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              Student Support
            </p>
            <h3 id="support-detail-title" className="mt-2 pr-10 text-2xl font-semibold">
              {openSupport.title}
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              {openSupport.detail}
            </p>

            <div className="mt-6 rounded-2xl bg-muted/60 p-5">
              <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                What students get
              </h4>
              <ul className="mt-4 space-y-3">
                {openSupport.includes.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm leading-relaxed">
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-5 rounded-2xl border border-border p-5">
              <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                How to access
              </h4>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {openSupport.access}
              </p>
            </div>
          </motion.article>
        </div>
      )}
    </section>
  );
}
