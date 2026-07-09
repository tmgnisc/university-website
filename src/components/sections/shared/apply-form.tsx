import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { fadeUp } from "./_shared";
import { FIELD_CLASS, sendRequestForm } from "./request-form";

const PURPOSE_OPTIONS = [
  "General Query",
  "Admission Query",
  "Scholarship Query",
  "Hackathon Event Query",
  "Hackathon Registration",
];

// Single form used by the /apply-form page for admissions, scholarship,
// hackathon (query + registration), and general inquiries — routed by the
// "purpose" field rather than separate forms per use case.
export function ApplyForm({
  id,
  eyebrow = "Apply Now",
  title = "Submit your request",
  description,
  submitLabel = "Submit",
  className,
}: {
  id?: string;
  eyebrow?: string;
  title?: string;
  description?: string;
  submitLabel?: string;
  className?: string;
}) {
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  return (
    <section id={id} className={cn("scroll-mt-28 py-16 md:py-20", className)}>
      <div className="mx-auto max-w-3xl px-6 lg:px-10">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="text-center"
        >
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            {eyebrow}
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">{title}</h2>
          {description && (
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{description}</p>
          )}
        </motion.div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            const form = e.currentTarget;
            const formData = new FormData(form);
            const purpose = String(formData.get("purpose") ?? "");
            setSending(true);
            setError("");
            sendRequestForm({
              name: String(formData.get("name") ?? ""),
              phone: String(formData.get("phone") ?? ""),
              email: String(formData.get("email") ?? ""),
              address: String(formData.get("address") ?? ""),
              purpose,
              subject: purpose ? `${purpose} — Website form` : "New website request",
              message: String(formData.get("message") ?? ""),
            })
              .then(() => {
                setSent(true);
                form.reset();
              })
              .catch((err) => setError(err instanceof Error ? err.message : "Send failed"))
              .finally(() => setSending(false));
          }}
          className="mt-10 rounded-3xl border border-border bg-card p-6 shadow-xl shadow-primary/5 md:p-8"
        >
          {sent ? (
            <div className="py-10 text-center">
              <div className="mx-auto grid size-14 place-items-center rounded-full bg-primary text-primary-foreground">
                <CheckCircle2 className="size-7" />
              </div>
              <h3 className="mt-5 text-2xl font-semibold">Thank you!</h3>
              <p className="mt-2 text-muted-foreground">
                We&apos;ve received your submission and our team will be in touch with you
                shortly.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <input required name="name" placeholder="Full name" className={FIELD_CLASS} />
              <input required name="address" placeholder="Address" className={FIELD_CLASS} />
              <div className="grid gap-4 sm:grid-cols-2">
                <input
                  required
                  name="phone"
                  type="tel"
                  placeholder="Phone number"
                  className={FIELD_CLASS}
                />
                <input
                  required
                  name="email"
                  type="email"
                  placeholder="Email"
                  className={FIELD_CLASS}
                />
              </div>
              <select required name="purpose" defaultValue="" className={FIELD_CLASS}>
                <option value="" disabled>
                  Purpose of contact
                </option>
                {PURPOSE_OPTIONS.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
              <textarea
                name="message"
                rows={4}
                placeholder="Tell us more - e.g. team details for hackathon registration, program of interest for admissions, or your question (optional)"
                className={cn(FIELD_CLASS, "h-auto py-3")}
              />
              {error && <p className="text-sm text-destructive">{error}</p>}
              <Button
                type="submit"
                size="lg"
                disabled={sending}
                className="h-12 w-full rounded-xl bg-primary text-primary-foreground hover:bg-primary/90"
              >
                {sending ? "Sending..." : submitLabel} <ArrowRight className="ml-1 size-4" />
              </Button>
              <p className="text-center text-xs text-muted-foreground">
                We respect your privacy. No spam, ever.
              </p>
            </div>
          )}
        </form>
      </div>
    </section>
  );
}
