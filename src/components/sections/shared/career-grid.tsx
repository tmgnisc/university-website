import { motion } from "framer-motion";

import { fadeUp } from "./_shared";

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
