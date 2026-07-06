import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { fadeUp } from "./_shared";

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
