import { createFileRoute } from "@tanstack/react-router";
import { Loader2, Plus, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { StringListField } from "@/components/admin/string-list-field";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { homeStats, siteContact, siteMeta } from "@/lib/cms/hooks";
import {
  homeStatsSchema,
  siteContactSchema,
  siteMetaSchema,
  type HomeStats,
  type SiteContact,
  type SiteMeta,
} from "@/lib/cms/types";

export const Route = createFileRoute("/admin/_authed/site")({
  component: SitePage,
});

function SitePage() {
  return (
    <div className="space-y-10">
      <h1 className="text-2xl font-bold tracking-tight">Site Settings</h1>
      <MetaForm />
      <ContactForm />
      <HomeStatsForm />
    </div>
  );
}

function MetaForm() {
  const query = siteMeta.useGet();
  const update = siteMeta.useUpdate();
  const [draft, setDraft] = useState<SiteMeta | null>(null);

  useEffect(() => {
    if (query.data && !draft) setDraft(query.data);
  }, [query.data, draft]);

  if (!draft) return <Loading label="Loading homepage meta…" />;

  const onSave = async () => {
    const result = siteMetaSchema.safeParse(draft);
    if (!result.success) {
      toast.error(result.error.issues[0].message);
      return;
    }
    try {
      await update.mutateAsync(draft);
      toast.success("Homepage meta saved");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Could not save");
    }
  };

  return (
    <section className="rounded-2xl border border-border bg-card p-6">
      <h2 className="text-lg font-semibold">Homepage SEO & favicon</h2>
      <p className="mt-1 text-sm text-muted-foreground">
        Browser tab icon, page title, and meta description for the homepage.
      </p>
      <div className="mt-6 space-y-4">
        <div className="space-y-1.5">
          <Label>Favicon URL</Label>
          <div className="flex items-center gap-3">
            {draft.favicon && (
              <img
                src={draft.favicon}
                alt="Favicon preview"
                className="size-9 shrink-0 rounded border border-border object-contain"
              />
            )}
            <Input
              value={draft.favicon}
              placeholder="https://…"
              onChange={(e) => setDraft({ ...draft, favicon: e.target.value })}
            />
          </div>
        </div>
        <div className="space-y-1.5">
          <Label>Meta title</Label>
          <Input
            value={draft.title}
            onChange={(e) => setDraft({ ...draft, title: e.target.value })}
          />
        </div>
        <div className="space-y-1.5">
          <Label>Meta description</Label>
          <Textarea
            rows={3}
            value={draft.description}
            onChange={(e) => setDraft({ ...draft, description: e.target.value })}
          />
        </div>
        <div className="flex justify-end">
          <SaveButton pending={update.isPending} onClick={onSave} />
        </div>
      </div>
    </section>
  );
}

function ContactForm() {
  const query = siteContact.useGet();
  const update = siteContact.useUpdate();
  const [draft, setDraft] = useState<SiteContact | null>(null);

  useEffect(() => {
    if (query.data && !draft) setDraft(query.data);
  }, [query.data, draft]);

  if (!draft) return <Loading label="Loading contact details…" />;

  const onSave = async () => {
    const result = siteContactSchema.safeParse(draft);
    if (!result.success) {
      toast.error(result.error.issues[0].message);
      return;
    }
    try {
      await update.mutateAsync(draft);
      toast.success("Contact details saved");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Could not save");
    }
  };

  return (
    <section className="rounded-2xl border border-border bg-card p-6">
      <h2 className="text-lg font-semibold">Contact details</h2>
      <p className="mt-1 text-sm text-muted-foreground">Phone, email, and address.</p>
      <div className="mt-6 space-y-4">
        <StringListField
          label="Phones"
          values={draft.phones}
          onChange={(phones) => setDraft({ ...draft, phones })}
        />
        <div className="space-y-1.5">
          <Label>Email</Label>
          <Input
            type="email"
            value={draft.email}
            onChange={(e) => setDraft({ ...draft, email: e.target.value })}
          />
        </div>
        <div className="space-y-1.5">
          <Label>Address</Label>
          <Input
            value={draft.address}
            onChange={(e) => setDraft({ ...draft, address: e.target.value })}
          />
        </div>
        <div className="flex justify-end">
          <SaveButton pending={update.isPending} onClick={onSave} />
        </div>
      </div>
    </section>
  );
}

function HomeStatsForm() {
  const query = homeStats.useGet();
  const update = homeStats.useUpdate();
  const [draft, setDraft] = useState<HomeStats | null>(null);

  useEffect(() => {
    if (query.data && !draft) setDraft(query.data);
  }, [query.data, draft]);

  if (!draft) return <Loading label="Loading homepage content…" />;

  const onSave = async () => {
    const result = homeStatsSchema.safeParse(draft);
    if (!result.success) {
      toast.error(result.error.issues[0].message);
      return;
    }
    try {
      await update.mutateAsync(draft);
      toast.success("Homepage content saved");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Could not save");
    }
  };

  return (
    <section className="rounded-2xl border border-border bg-card p-6">
      <h2 className="text-lg font-semibold">Homepage stats & highlights</h2>

      <div className="mt-6 space-y-3">
        <Label>Stats</Label>
        {draft.stats.map((stat, i) => (
          <div key={i} className="flex items-center gap-2">
            <Input
              placeholder="Label"
              value={stat.label}
              onChange={(e) =>
                setDraft({
                  ...draft,
                  stats: draft.stats.map((s, j) => (j === i ? { ...s, label: e.target.value } : s)),
                })
              }
            />
            <Input
              placeholder="Value"
              value={stat.value}
              onChange={(e) =>
                setDraft({
                  ...draft,
                  stats: draft.stats.map((s, j) => (j === i ? { ...s, value: e.target.value } : s)),
                })
              }
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              aria-label="Remove stat"
              onClick={() => setDraft({ ...draft, stats: draft.stats.filter((_, j) => j !== i) })}
            >
              <Trash2 className="size-4 text-destructive" />
            </Button>
          </div>
        ))}
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => setDraft({ ...draft, stats: [...draft.stats, { label: "", value: "" }] })}
        >
          <Plus className="mr-1 size-4" /> Add stat
        </Button>
      </div>

      <div className="mt-6 space-y-3">
        <Label>Highlights</Label>
        {draft.highlights.map((hl, i) => (
          <div key={i} className="flex items-start gap-2">
            <div className="flex-1 space-y-2">
              <Input
                placeholder="Title"
                value={hl.title}
                onChange={(e) =>
                  setDraft({
                    ...draft,
                    highlights: draft.highlights.map((h, j) =>
                      j === i ? { ...h, title: e.target.value } : h,
                    ),
                  })
                }
              />
              <Input
                placeholder="Description"
                value={hl.description}
                onChange={(e) =>
                  setDraft({
                    ...draft,
                    highlights: draft.highlights.map((h, j) =>
                      j === i ? { ...h, description: e.target.value } : h,
                    ),
                  })
                }
              />
            </div>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              aria-label="Remove highlight"
              onClick={() =>
                setDraft({ ...draft, highlights: draft.highlights.filter((_, j) => j !== i) })
              }
            >
              <Trash2 className="size-4 text-destructive" />
            </Button>
          </div>
        ))}
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() =>
            setDraft({
              ...draft,
              highlights: [...draft.highlights, { title: "", description: "" }],
            })
          }
        >
          <Plus className="mr-1 size-4" /> Add highlight
        </Button>
      </div>

      <div className="mt-6 flex justify-end">
        <SaveButton pending={update.isPending} onClick={onSave} />
      </div>
    </section>
  );
}

function Loading({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-2 text-sm text-muted-foreground">
      <Loader2 className="size-4 animate-spin" /> {label}
    </div>
  );
}

function SaveButton({ pending, onClick }: { pending: boolean; onClick: () => void }) {
  return (
    <Button onClick={onClick} disabled={pending}>
      {pending && <Loader2 className="mr-2 size-4 animate-spin" />}
      Save
    </Button>
  );
}
