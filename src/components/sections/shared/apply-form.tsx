import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Plus, Trash2 } from "lucide-react";

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

type TeamMember = { name: string; contact: string };

const EMPTY_MEMBER: TeamMember = { name: "", contact: "" };

// Single form used by the /apply-form page for admissions, scholarship,
// hackathon (query + registration), and general inquiries — routed by the
// "purpose" field rather than separate forms per use case. Selecting
// "Hackathon Registration" or an admissions/scholarship query reveals extra
// fields specific to that purpose instead of relying on the free-text
// message box.
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

  const [purpose, setPurpose] = useState("");
  const [teamName, setTeamName] = useState("");
  const [members, setMembers] = useState<TeamMember[]>([{ ...EMPTY_MEMBER }]);
  const [interest, setInterest] = useState("");

  const isHackathonRegistration = purpose === "Hackathon Registration";
  const isAdmission = purpose === "Admission Query";
  const isScholarship = purpose === "Scholarship Query";

  function updateMember(index: number, field: keyof TeamMember, value: string) {
    setMembers((prev) => prev.map((m, i) => (i === index ? { ...m, [field]: value } : m)));
  }

  function resetPurposeFields() {
    setPurpose("");
    setTeamName("");
    setMembers([{ ...EMPTY_MEMBER }]);
    setInterest("");
  }

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
            setSending(true);
            setError("");

            const teamMembers = members
              .map((m) => ({ name: m.name.trim(), contact: m.contact.trim() }))
              .filter((m) => m.name || m.contact);

            sendRequestForm({
              name: String(formData.get("name") ?? ""),
              phone: String(formData.get("phone") ?? ""),
              email: String(formData.get("email") ?? ""),
              address: String(formData.get("address") ?? ""),
              purpose,
              subject: purpose ? `${purpose} — Website form` : "New website request",
              message: String(formData.get("message") ?? ""),
              program: isAdmission || isScholarship ? interest : undefined,
              teamName: isHackathonRegistration ? teamName : undefined,
              teamMembers: isHackathonRegistration ? teamMembers : undefined,
            })
              .then(() => {
                setSent(true);
                form.reset();
                resetPurposeFields();
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
              <input
                required
                name="name"
                placeholder={isHackathonRegistration ? "Team leader full name" : "Full name"}
                className={FIELD_CLASS}
              />
              <input required name="address" placeholder="Address" className={FIELD_CLASS} />
              <div className="grid gap-4 sm:grid-cols-2">
                <input
                  required
                  name="phone"
                  type="tel"
                  placeholder={isHackathonRegistration ? "Team leader phone number" : "Phone number"}
                  className={FIELD_CLASS}
                />
                <input
                  required
                  name="email"
                  type="email"
                  placeholder={isHackathonRegistration ? "Team leader email" : "Email"}
                  className={FIELD_CLASS}
                />
              </div>
              <select
                required
                name="purpose"
                value={purpose}
                onChange={(e) => setPurpose(e.target.value)}
                className={FIELD_CLASS}
              >
                <option value="" disabled>
                  Purpose of contact
                </option>
                {PURPOSE_OPTIONS.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>

              {isHackathonRegistration && (
                <div className="space-y-4 rounded-2xl border border-dashed border-border p-4">
                  <p className="text-sm font-semibold text-foreground">Team details</p>
                  <input
                    required
                    value={teamName}
                    onChange={(e) => setTeamName(e.target.value)}
                    placeholder="Team name"
                    className={FIELD_CLASS}
                  />

                  <div className="space-y-3">
                    {members.map((member, index) => (
                      <div key={index} className="grid gap-2 sm:grid-cols-[1fr_1fr_auto] sm:gap-3">
                        <input
                          required
                          value={member.name}
                          onChange={(e) => updateMember(index, "name", e.target.value)}
                          placeholder={`Member ${index + 1} name`}
                          className={FIELD_CLASS}
                        />
                        <input
                          required
                          value={member.contact}
                          onChange={(e) => updateMember(index, "contact", e.target.value)}
                          placeholder={`Member ${index + 1} phone or email`}
                          className={FIELD_CLASS}
                        />
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          disabled={members.length === 1}
                          onClick={() => setMembers((prev) => prev.filter((_, i) => i !== index))}
                          aria-label="Remove member"
                          className="justify-self-start sm:justify-self-auto"
                        >
                          <Trash2 />
                        </Button>
                      </div>
                    ))}
                  </div>

                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setMembers((prev) => [...prev, { ...EMPTY_MEMBER }])}
                  >
                    <Plus /> Add team member
                  </Button>
                </div>
              )}

              {(isAdmission || isScholarship) && (
                <input
                  required
                  value={interest}
                  onChange={(e) => setInterest(e.target.value)}
                  placeholder={
                    isAdmission ? "Program you're interested in" : "Scholarship you're interested in"
                  }
                  className={FIELD_CLASS}
                />
              )}

              <textarea
                name="message"
                rows={4}
                placeholder="Tell us more - any other details or questions (optional)"
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
