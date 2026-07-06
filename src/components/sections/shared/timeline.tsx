import { motion } from "framer-motion";

import { fadeUp } from "./_shared";

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
