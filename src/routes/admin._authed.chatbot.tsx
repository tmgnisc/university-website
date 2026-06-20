import { createFileRoute } from "@tanstack/react-router";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { ResourceManager } from "@/components/admin/resource-manager";
import { StringListField } from "@/components/admin/string-list-field";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { botSettings, chatbotEntries } from "@/lib/cms/hooks";
import { chatbotEntryInput, type BotSettings, type ChatbotEntryInput } from "@/lib/cms/types";

export const Route = createFileRoute("/admin/_authed/chatbot")({
  component: ChatbotPage,
});

const EMPTY: ChatbotEntryInput = { question: "", priority: 50, keywords: [], answer: "" };

function ChatbotPage() {
  return (
    <div className="space-y-10">
      <BotSettingsForm />

      <ResourceManager
        title="Chatbot Q&A"
        description="Question / answer entries the assistant matches against."
        query={chatbotEntries.useList()}
        createMutation={chatbotEntries.useCreate()}
        updateMutation={chatbotEntries.useUpdate()}
        removeMutation={chatbotEntries.useRemove()}
        emptyInput={EMPTY}
        toInput={({ id: _id, ...rest }) => rest}
        itemLabel={(item) => item.question}
        validate={(input) => {
          const result = chatbotEntryInput.safeParse(input);
          return result.success ? null : result.error.issues[0].message;
        }}
        renderRow={(item) => (
          <div>
            <p className="font-semibold">{item.question}</p>
            <p className="mt-0.5 line-clamp-1 text-sm text-muted-foreground">{item.answer}</p>
            <p className="mt-1 text-xs text-muted-foreground">
              Priority {item.priority} · {item.keywords.length} keywords
            </p>
          </div>
        )}
        renderForm={(input, setInput) => (
          <>
            <div className="space-y-1.5">
              <Label>Question</Label>
              <Input
                value={input.question}
                onChange={(e) => setInput({ ...input, question: e.target.value })}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Priority (higher matches first)</Label>
              <Input
                type="number"
                value={input.priority}
                onChange={(e) => setInput({ ...input, priority: Number(e.target.value) || 0 })}
              />
            </div>
            <StringListField
              label="Keywords"
              values={input.keywords}
              onChange={(keywords) => setInput({ ...input, keywords })}
            />
            <div className="space-y-1.5">
              <Label>Answer</Label>
              <Textarea
                rows={5}
                value={input.answer}
                onChange={(e) => setInput({ ...input, answer: e.target.value })}
              />
            </div>
          </>
        )}
      />
    </div>
  );
}

function BotSettingsForm() {
  const query = botSettings.useGet();
  const update = botSettings.useUpdate();
  const [draft, setDraft] = useState<BotSettings | null>(null);

  useEffect(() => {
    if (query.data && !draft) setDraft(query.data);
  }, [query.data, draft]);

  if (query.isLoading || !draft) {
    return (
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Loader2 className="size-4 animate-spin" /> Loading settings…
      </div>
    );
  }

  const set = <K extends keyof BotSettings>(key: K, value: BotSettings[K]) =>
    setDraft({ ...draft, [key]: value });

  const onSave = async () => {
    try {
      await update.mutateAsync(draft);
      toast.success("Bot settings saved");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Could not save");
    }
  };

  return (
    <section className="rounded-2xl border border-border bg-card p-6">
      <h1 className="text-2xl font-bold tracking-tight">Bot settings</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Greeting, fallback messages, and matching keywords.
      </p>

      <div className="mt-6 space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <Label>Bot name</Label>
            <Input value={draft.botName} onChange={(e) => set("botName", e.target.value)} />
          </div>
          <div className="space-y-1.5">
            <Label>Status</Label>
            <Input value={draft.status} onChange={(e) => set("status", e.target.value)} />
          </div>
        </div>
        <div className="space-y-1.5">
          <Label>Welcome message</Label>
          <Textarea
            rows={2}
            value={draft.welcomeMessage}
            onChange={(e) => set("welcomeMessage", e.target.value)}
          />
        </div>
        <div className="space-y-1.5">
          <Label>Fallback message</Label>
          <Textarea
            rows={2}
            value={draft.fallbackMessage}
            onChange={(e) => set("fallbackMessage", e.target.value)}
          />
        </div>
        <div className="space-y-1.5">
          <Label>Off-topic message</Label>
          <Textarea
            rows={2}
            value={draft.offTopicMessage}
            onChange={(e) => set("offTopicMessage", e.target.value)}
          />
        </div>
        <StringListField
          label="Domain keywords"
          values={draft.domainKeywords}
          onChange={(domainKeywords) => set("domainKeywords", domainKeywords)}
        />
        <StringListField
          label="Quick questions"
          values={draft.quickQuestions}
          onChange={(quickQuestions) => set("quickQuestions", quickQuestions)}
        />
        <div className="flex justify-end">
          <Button onClick={onSave} disabled={update.isPending}>
            {update.isPending && <Loader2 className="mr-2 size-4 animate-spin" />}
            Save settings
          </Button>
        </div>
      </div>
    </section>
  );
}
