import { motion } from "framer-motion";

import { fadeUp } from "./_shared";

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
          className="group rounded-3xl overflow-hidden border border-border bg-card transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/10"
        >
          <img
            src={m.image}
            alt=""
            className="w-full aspect-[4/3] object-cover object-top transition-transform duration-500 group-hover:scale-105"
          />
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
