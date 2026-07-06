import { useState } from "react";
import { ArrowRight, HeartHandshake, Mail, MapPin, Phone } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { LAYOUT, Reveal, SectionContainer } from "@/components/layout/layout-primitives";
import { cn } from "@/lib/utils";

import { sendRequestForm } from "@/components/sections/shared/request-form";

export function Lead() {
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  return (
    <section id="contact" className={cn(LAYOUT.section, "bg-secondary")}>
      <SectionContainer className={cn("grid lg:grid-cols-2", LAYOUT.splitGap)}>
        <Reveal>
          <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Request Information
          </span>
          <h2 className="mt-3 text-3xl md:text-5xl font-semibold">Talk to admissions</h2>
          <p className="mt-4 text-muted-foreground text-lg">
            Tell us a little about you and we'll be in touch with personalised guidance.
          </p>
          <div className={cn(LAYOUT.contentGap, "space-y-4")}>
            <div className="flex items-center gap-3">
              <MapPin className="size-5 text-black" />
              <span>Jhapa, Nepal</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="size-5 text-black" />
              <span>9714530056, 9714530057</span>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="size-5 text-black" />
              <span>info@whitehouseeducation.edu.np</span>
            </div>
          </div>
          <div
            className={cn(
              LAYOUT.contentGap,
              "rounded-3xl overflow-hidden border border-border aspect-[5/3] bg-card",
            )}
          >
            <iframe
              title="Jhapa campus map"
              src="https://www.google.com/maps?q=WhiteHouse+College+of+Business+and+Technology+-+Birtamode&ll=26.6355331,87.9699395&z=16&output=embed"
              className="size-full"
              loading="lazy"
            />
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <form
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
                program: String(formData.get("program") ?? ""),
                message: String(formData.get("message") ?? ""),
                subject: "Website admissions inquiry",
              })
                .then(() => {
                  setSent(true);
                  form.reset();
                })
                .catch((err) => setError(err instanceof Error ? err.message : "Send failed"))
                .finally(() => setSending(false));
            }}
            className={cn(
              "rounded-3xl bg-card border border-border shadow-xl shadow-primary/10 space-y-4",
              LAYOUT.cardPadding,
            )}
          >
            {sent ? (
              <div className="py-10 text-center">
                <div className="size-14 rounded-full bg-primary text-primary-foreground grid place-items-center mx-auto">
                  <HeartHandshake className="size-7" />
                </div>
                <h3 className="mt-5 text-2xl font-display">Thank you.</h3>
                <p className="mt-2 text-muted-foreground">
                  Our admissions team will contact you shortly.
                </p>
              </div>
            ) : (
              <>
                <Input required name="name" placeholder="Full name" className="h-12 rounded-xl" />
                <div className="grid sm:grid-cols-2 gap-4">
                  <Input
                    required
                    name="phone"
                    type="tel"
                    placeholder="Phone"
                    className="h-12 rounded-xl"
                  />
                  <Input
                    required
                    name="email"
                    type="email"
                    placeholder="Email"
                    className="h-12 rounded-xl"
                  />
                </div>
                <Input
                  required
                  name="program"
                  placeholder="Interested program (BIT or B.Tech Ed IT)"
                  className="h-12 rounded-xl"
                />
                <Textarea
                  required
                  name="message"
                  placeholder="Your message"
                  rows={4}
                  className="rounded-xl"
                />
                {error && <p className="text-sm text-destructive">{error}</p>}
                <Button
                  type="submit"
                  size="lg"
                  disabled={sending}
                  className="w-full rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 h-12"
                >
                  {sending ? "Sending..." : "Submit Inquiry"} <ArrowRight className="ml-1 size-4" />
                </Button>
                <p className="text-xs text-muted-foreground text-center">
                  We respect your privacy. No spam, ever.
                </p>
              </>
            )}
          </form>
        </Reveal>
      </SectionContainer>
    </section>
  );
}
