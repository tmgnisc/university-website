import { motion } from "framer-motion";

import { fadeUp } from "./_shared";

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
