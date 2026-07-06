import { createFileRoute } from "@tanstack/react-router";

import { CurriculumEditor } from "@/components/admin/curriculum-editor";
import { ResourceManager } from "@/components/admin/resource-manager";
import { StringListField } from "@/components/admin/string-list-field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { programs } from "@/lib/cms/hooks";
import { programInput, type ProgramInput } from "@/lib/cms/types";

export const Route = createFileRoute("/admin/_authed/programs")({
  component: ProgramsPage,
});

const EMPTY: ProgramInput = {
  title: "",
  code: "",
  description: "",
  duration: "",
  credits: "",
  highlights: [],
  careers: [],
  curriculum: [],
};

function ProgramsPage() {
  return (
    <ResourceManager
      title="Programs"
      description="Program details, highlights, careers, and full curriculum (years → semesters → courses)."
      query={programs.useList()}
      createMutation={programs.useCreate()}
      updateMutation={programs.useUpdate()}
      removeMutation={programs.useRemove()}
      emptyInput={EMPTY}
      toInput={({ id: _id, ...rest }) => rest}
      itemLabel={(item) => item.title}
      validate={(input) => {
        const result = programInput.safeParse(input);
        return result.success ? null : result.error.issues[0].message;
      }}
      renderRow={(item) => (
        <div>
          <p className="font-semibold">{item.title}</p>
          <p className="mt-0.5 text-sm text-muted-foreground">
            {[item.duration, item.credits].filter(Boolean).join(" · ")}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            {item.curriculum.length} year{item.curriculum.length === 1 ? "" : "s"}
          </p>
        </div>
      )}
      renderForm={(input, setInput) => (
        <>
          <div className="space-y-1.5">
            <Label>Title</Label>
            <Input
              value={input.title}
              onChange={(e) => setInput({ ...input, title: e.target.value })}
            />
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div className="space-y-1.5">
              <Label>Code</Label>
              <Input
                value={input.code}
                onChange={(e) => setInput({ ...input, code: e.target.value })}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Duration</Label>
              <Input
                value={input.duration}
                onChange={(e) => setInput({ ...input, duration: e.target.value })}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Credits</Label>
              <Input
                value={input.credits}
                onChange={(e) => setInput({ ...input, credits: e.target.value })}
              />
            </div>
          </div>
          <div className="space-y-1.5">
            <Label>Description</Label>
            <Textarea
              rows={3}
              value={input.description}
              onChange={(e) => setInput({ ...input, description: e.target.value })}
            />
          </div>
          <StringListField
            label="Highlights"
            values={input.highlights}
            onChange={(highlights) => setInput({ ...input, highlights })}
          />
          <StringListField
            label="Careers"
            values={input.careers}
            onChange={(careers) => setInput({ ...input, careers })}
          />
          <CurriculumEditor
            value={input.curriculum}
            onChange={(curriculum) => setInput({ ...input, curriculum })}
          />
        </>
      )}
    />
  );
}
