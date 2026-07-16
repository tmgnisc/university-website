import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Loader2, Check, X, Inbox as InboxIcon } from "lucide-react";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PasswordInput } from "@/components/ui/password-input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  decideSubmission,
  fetchSubmissions,
  inboxLogin,
  isInboxAuthenticated,
  type Submission,
} from "@/lib/mail-admin";

export const Route = createFileRoute("/admin/_authed/inbox")({
  component: InboxPage,
});

const STATUS_VARIANT: Record<
  Submission["status"],
  "default" | "secondary" | "destructive" | "outline"
> = {
  pending: "default",
  approved: "outline",
  rejected: "destructive",
  received: "secondary",
};

const STATUS_LABEL: Record<Submission["status"], string> = {
  pending: "Pending review",
  approved: "Approved",
  rejected: "Rejected",
  received: "Received",
};

function InboxPage() {
  const [authed, setAuthed] = useState(isInboxAuthenticated());

  if (!authed) return <InboxLogin onSuccess={() => setAuthed(true)} />;
  return <InboxList />;
}

function InboxLogin({ onSuccess }: { onSuccess: () => void }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      await inboxLogin(username, password);
      onSuccess();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-sm">
      <div className="mb-6 text-center">
        <div className="mx-auto grid size-12 place-items-center rounded-full bg-primary/10 text-primary">
          <InboxIcon className="size-6" />
        </div>
        <h1 className="mt-3 text-xl font-bold tracking-tight">Submissions inbox</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Separate login — verified against the mail server config, since this view exposes
          applicant contact details.
        </p>
      </div>
      <form onSubmit={onSubmit} className="space-y-4 rounded-2xl border border-border bg-card p-6">
        <div className="space-y-1.5">
          <Label htmlFor="inbox-username">Username</Label>
          <Input
            id="inbox-username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoComplete="username"
            required
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="inbox-password">Password</Label>
          <PasswordInput
            id="inbox-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            required
          />
        </div>
        {error && <p className="text-sm text-destructive">{error}</p>}
        <Button type="submit" className="w-full" disabled={submitting}>
          {submitting && <Loader2 className="mr-2 size-4 animate-spin" />}
          Log in
        </Button>
      </form>
    </div>
  );
}

function InboxList() {
  const qc = useQueryClient();
  const query = useQuery({ queryKey: ["mail-submissions"], queryFn: fetchSubmissions });
  const [tab, setTab] = useState<"all" | "hackathon" | "other">("all");
  const [active, setActive] = useState<Submission | null>(null);
  const [deciding, setDeciding] = useState<string | null>(null);

  const rows = (query.data ?? []).filter((s) => {
    if (tab === "hackathon") return s.purpose === "Hackathon Registration";
    if (tab === "other") return s.purpose !== "Hackathon Registration";
    return true;
  });

  const onDecide = async (submission: Submission, action: "approve" | "reject") => {
    setDeciding(submission.id);
    try {
      await decideSubmission(submission.id, action);
      toast.success(
        action === "approve"
          ? `Approved — confirmation email sent to ${submission.email}`
          : `Rejected — notice email sent to ${submission.email}`,
      );
      await qc.invalidateQueries({ queryKey: ["mail-submissions"] });
      setActive(null);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not update submission");
    } finally {
      setDeciding(null);
    }
  };

  return (
    <div>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Submissions Inbox</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            All apply-form submissions. Hackathon team registrations can be approved or rejected
            below — the applicant gets an email either way.
          </p>
        </div>
        <Tabs value={tab} onValueChange={(v) => setTab(v as typeof tab)}>
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="hackathon">Hackathon</TabsTrigger>
            <TabsTrigger value="other">Other queries</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="mt-6">
        {query.isLoading ? (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Loader2 className="size-4 animate-spin" /> Loading…
          </div>
        ) : query.isError ? (
          <p className="text-sm text-destructive">
            {query.error instanceof Error ? query.error.message : "Failed to load."}
          </p>
        ) : rows.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border p-10 text-center text-sm text-muted-foreground">
            Nothing here yet.
          </div>
        ) : (
          <div className="grid gap-3">
            {rows.map((s) => (
              <button
                key={s.id}
                onClick={() => setActive(s)}
                className="flex items-start justify-between gap-4 rounded-2xl border border-border bg-card p-4 text-left transition-colors hover:bg-muted/50"
              >
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="font-semibold">{s.name}</p>
                    <Badge variant={STATUS_VARIANT[s.status]}>{STATUS_LABEL[s.status]}</Badge>
                  </div>
                  <p className="mt-0.5 truncate text-sm text-muted-foreground">
                    {s.purpose || "General Query"}
                    {s.teamName ? ` · Team: ${s.teamName}` : ""} · {s.email}
                  </p>
                </div>
                <p className="shrink-0 text-xs text-muted-foreground">
                  {new Date(s.createdAt).toLocaleString()}
                </p>
              </button>
            ))}
          </div>
        )}
      </div>

      <Dialog open={!!active} onOpenChange={(o) => !o && setActive(null)}>
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
          {active && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  {active.name}
                  <Badge variant={STATUS_VARIANT[active.status]}>
                    {STATUS_LABEL[active.status]}
                  </Badge>
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-3 text-sm">
                <Field label="Submitted" value={new Date(active.createdAt).toLocaleString()} />
                <Field label="Purpose" value={active.purpose || "—"} />
                <Field label="Phone" value={active.phone} />
                <Field label="Email" value={active.email} />
                <Field label="Address" value={active.address || "—"} />
                {active.eligibility && <Field label="Eligibility" value={active.eligibility} />}
                {active.program && <Field label="Course / program" value={active.program} />}
                {active.teamName && <Field label="Team name" value={active.teamName} />}
                {active.teamMembers.length > 0 && (
                  <div>
                    <p className="text-xs font-medium text-muted-foreground">Team members</p>
                    <ul className="mt-1 space-y-1">
                      {active.teamMembers.map((m, i) => (
                        <li key={i}>
                          {m.name} — {m.contact}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {active.message && <Field label="Message" value={active.message} />}
              </div>

              {active.purpose === "Hackathon Registration" && active.status === "pending" && (
                <div className="mt-2 flex gap-2 border-t border-border pt-4">
                  <Button
                    className="flex-1"
                    disabled={deciding === active.id}
                    onClick={() => onDecide(active, "approve")}
                  >
                    {deciding === active.id ? (
                      <Loader2 className="mr-2 size-4 animate-spin" />
                    ) : (
                      <Check className="mr-2 size-4" />
                    )}
                    Approve team
                  </Button>
                  <Button
                    variant="destructive"
                    className="flex-1"
                    disabled={deciding === active.id}
                    onClick={() => onDecide(active, "reject")}
                  >
                    {deciding === active.id ? (
                      <Loader2 className="mr-2 size-4 animate-spin" />
                    ) : (
                      <X className="mr-2 size-4" />
                    )}
                    Reject team
                  </Button>
                </div>
              )}
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs font-medium text-muted-foreground">{label}</p>
      <p className="whitespace-pre-wrap">{value}</p>
    </div>
  );
}
