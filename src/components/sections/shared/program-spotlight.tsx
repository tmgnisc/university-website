import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

import { fadeUp } from "./_shared";

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
