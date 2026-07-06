import { motion } from "framer-motion";

import { fadeUp } from "./_shared";

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
