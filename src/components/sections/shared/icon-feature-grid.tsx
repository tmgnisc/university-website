import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";

import { fadeUp } from "./_shared";

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
