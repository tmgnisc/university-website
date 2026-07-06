import { motion } from "framer-motion";

import { fadeUp } from "./_shared";

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
