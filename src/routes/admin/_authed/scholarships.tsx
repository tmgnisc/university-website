import { createFileRoute } from "@tanstack/react-router";

import { ResourceManager } from "@/components/admin/resource-manager";
import { StringListField } from "@/components/admin/string-list-field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { scholarships } from "@/lib/cms/hooks";
import { scholarshipInput, type ScholarshipInput } from "@/lib/cms/types";

export const Route = createFileRoute("/admin/_authed/scholarships")({
  component: ScholarshipsPage,
});

const EMPTY: ScholarshipInput = {
  name: "",
  category: "",
  coverage: "",
  eligibility: [],
  description: "",
};

function ScholarshipsPage() {
  return (
    <ResourceManager
      title="Scholarships"
      description="Scholarship listings shown on the Scholarships page."
      query={scholarships.useList()}
      createMutation={scholarships.useCreate()}
      updateMutation={scholarships.useUpdate()}
      removeMutation={scholarships.useRemove()}
      emptyInput={EMPTY}
      toInput={({ id: _id, ...rest }) => rest}
      itemLabel={(item) => item.name}
      validate={(input) => {
        const result = scholarshipInput.safeParse(input);
        return result.success ? null : result.error.issues[0].message;
      }}
      renderRow={(item) => (
        <div>
          <p className="font-semibold">{item.name}</p>
          <p className="mt-0.5 text-sm text-muted-foreground">
            {[item.category, item.coverage].filter(Boolean).join(" · ")}
          </p>
        </div>
      )}
      renderForm={(input, setInput) => (
        <>
          <div className="space-y-1.5">
            <Label>Name</Label>
            <Input
              value={input.name}
              onChange={(e) => setInput({ ...input, name: e.target.value })}
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label>Category</Label>
              <Input
                value={input.category}
                onChange={(e) => setInput({ ...input, category: e.target.value })}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Coverage</Label>
              <Input
                value={input.coverage}
                onChange={(e) => setInput({ ...input, coverage: e.target.value })}
              />
            </div>
          </div>
          <StringListField
            label="Eligibility"
            values={input.eligibility}
            onChange={(eligibility) => setInput({ ...input, eligibility })}
          />
          <div className="space-y-1.5">
            <Label>Description</Label>
            <Textarea
              rows={4}
              value={input.description}
              onChange={(e) => setInput({ ...input, description: e.target.value })}
            />
          </div>
        </>
      )}
    />
  );
}
