import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";

import { Button } from "@/components/ui/button";

import { fadeUp } from "./_shared";
import { sendRequestForm } from "./request-form";

export function ContactSection() {
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  return (
    <section className="py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 grid lg:grid-cols-2 gap-10 lg:gap-14">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
        >
          <span className="text-xs uppercase tracking-[0.2em] text-primary font-semibold">
            Get in touch
          </span>
          <h2 className="mt-3 text-3xl md:text-4xl font-bold tracking-tight">
            We&apos;re here to help
          </h2>
          <p className="mt-4 text-muted-foreground text-lg leading-relaxed">
            Reach out for admissions, scholarships, campus visits, or general inquiries. Our team
            typically responds within one business day.
          </p>
          <div className="mt-8 space-y-4 text-sm">
            <p>
              <span className="font-semibold text-foreground">Address:</span> Jhapa, Nepal
            </p>
            <p>
              <span className="font-semibold text-foreground">Phone:</span> 9714530056
            </p>
            <p>
              <span className="font-semibold text-foreground">Mobile:</span> 9714530057
            </p>
            <p>
              <span className="font-semibold text-foreground">Email:</span>{" "}
              info@whitehouseeducation.edu.np
            </p>
          </div>
          <div className="mt-8 rounded-3xl overflow-hidden border border-border aspect-[5/3]">
            <img
              src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5ce?auto=format&fit=crop&w=1200&q=80"
              alt=""
              className="size-full object-cover"
            />
          </div>
        </motion.div>
        <motion.form
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          transition={{ delay: 0.1 }}
          onSubmit={(e) => {
            e.preventDefault();
            const form = e.currentTarget;
            const formData = new FormData(form);
            setSending(true);
            setError("");
            sendRequestForm({
              name: String(formData.get("name") ?? ""),
              phone: String(formData.get("phone") ?? ""),
              email: String(formData.get("email") ?? ""),
              subject: String(formData.get("subject") ?? "Website contact message"),
              message: String(formData.get("message") ?? ""),
            })
              .then(() => {
                setSent(true);
                form.reset();
              })
              .catch((err) => setError(err instanceof Error ? err.message : "Send failed"))
              .finally(() => setSending(false));
          }}
          className="rounded-3xl border border-border bg-card p-6 md:p-8 shadow-xl shadow-primary/5 space-y-4"
        >
          {sent ? (
            <div className="py-10 text-center">
              <div className="mx-auto grid size-14 place-items-center rounded-full bg-primary text-primary-foreground">
                <CheckCircle2 className="size-7" />
              </div>
              <h3 className="mt-5 text-2xl font-semibold">Thank you!</h3>
              <p className="mt-2 text-muted-foreground">
                Our admissions team will be in touch with you shortly.
              </p>
            </div>
          ) : (
            <>
              <div>
                <label className="text-sm font-medium">Full name</label>
                <input
                  required
                  name="name"
                  className="mt-1.5 w-full h-12 rounded-xl border border-input bg-background px-4 text-sm"
                  placeholder="Your name"
                />
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Phone</label>
                  <input
                    required
                    name="phone"
                    className="mt-1.5 w-full h-12 rounded-xl border border-input bg-background px-4 text-sm"
                    placeholder="Your phone number"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Email</label>
                  <input
                    required
                    name="email"
                    type="email"
                    className="mt-1.5 w-full h-12 rounded-xl border border-input bg-background px-4 text-sm"
                    placeholder="you@email.com"
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium">Subject</label>
                <input
                  name="subject"
                  className="mt-1.5 w-full h-12 rounded-xl border border-input bg-background px-4 text-sm"
                  placeholder="Admissions, scholarships, campus visit..."
                />
              </div>
              <div>
                <label className="text-sm font-medium">Message</label>
                <textarea
                  required
                  name="message"
                  rows={4}
                  className="mt-1.5 w-full rounded-xl border border-input bg-background px-4 py-3 text-sm"
                  placeholder="How can we help you?"
                />
              </div>
              {error && <p className="text-sm text-destructive">{error}</p>}
              <Button
                type="submit"
                size="lg"
                disabled={sending}
                className="w-full rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 h-12"
              >
                {sending ? "Sending..." : "Send Message"} <ArrowRight className="ml-1 size-4" />
              </Button>
            </>
          )}
        </motion.form>
      </div>
    </section>
  );
}
