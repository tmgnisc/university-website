import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

import { fadeUp } from "./_shared";

export function SplitSection({
  eyebrow,
  title,
  description,
  image,
  imageCaption,
  imageLeft = false,
  bullets,
}: {
  eyebrow: string;
  title: string;
  description: string;
  image: string;
  imageCaption?: string;
  imageLeft?: boolean;
  bullets?: string[];
}) {
  const text = (
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
      {bullets && (
        <ul className="mt-6 space-y-3">
          {bullets.map((b) => (
            <li key={b} className="flex items-start gap-3 text-sm text-foreground">
              <CheckCircle2 className="size-5 shrink-0 text-primary mt-0.5" />
              {b}
            </li>
          ))}
        </ul>
      )}
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
      <div className="relative">
        <img
          src={image}
          alt=""
          className="rounded-3xl w-full aspect-[4/3] object-cover shadow-xl shadow-primary/10"
        />
        {imageCaption && (
          <div className="mt-3 text-center">
            <p className="text-sm font-medium text-foreground">{imageCaption}</p>
          </div>
        )}
      </div>
    </motion.div>
  );

  return (
    <section className="py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
        {imageLeft ? (
          <>
            {visual}
            {text}
          </>
        ) : (
          <>
            {text}
            {visual}
          </>
        )}
      </div>
    </section>
  );
}
