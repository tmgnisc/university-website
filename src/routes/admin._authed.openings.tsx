import { createFileRoute } from "@tanstack/react-router";

import { ResourceManager } from "@/components/admin/resource-manager";
import { StringListField } from "@/components/admin/string-list-field";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { openings } from "@/lib/cms/hooks";
import { openingInput, type OpeningInput } from "@/lib/cms/types";

export const Route = createFileRoute("/admin/_authed/openings")({
  component: OpeningsPage,
});

const EMPTY: OpeningInput = {
  title: "",
  type: "Full-time",
  location: "Jhapa, Nepal",
  qualifications: [],
  experience: [],
  applyEmail: "hr@whitehouseeducation.edu.np",
  active: true,
};

function OpeningsPage() {
  return (
    <ResourceManager
      title="Current Openings"
      description="Job vacancies shown on the Careers page."
      query={openings.useList()}
      createMutation={openings.useCreate()}
      updateMutation={openings.useUpdate()}
      removeMutation={openings.useRemove()}
      emptyInput={EMPTY}
      toInput={({ id: _id, ...rest }) => rest}
      itemLabel={(item) => item.title}
      validate={(input) => {
        const result = openingInput.safeParse(input);
        return result.success ? null : result.error.issues[0].message;
      }}
      renderRow={(item) => (
        <div>
          <div className="flex items-center gap-2">
            <p className="font-semibold">{item.title}</p>
            {!item.active && <Badge variant="secondary">Hidden</Badge>}
          </div>
          <p className="mt-0.5 text-sm text-muted-foreground">
            {item.type} · {item.location}
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
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label>Type</Label>
              <Input
                value={input.type}
                onChange={(e) => setInput({ ...input, type: e.target.value })}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Location</Label>
              <Input
                value={input.location}
                onChange={(e) => setInput({ ...input, location: e.target.value })}
              />
            </div>
          </div>
          <div className="space-y-1.5">
            <Label>Apply email</Label>
            <Input
              type="email"
              value={input.applyEmail}
              onChange={(e) => setInput({ ...input, applyEmail: e.target.value })}
            />
          </div>
          <StringListField
            label="Qualifications"
            values={input.qualifications}
            onChange={(qualifications) => setInput({ ...input, qualifications })}
          />
          <StringListField
            label="Experience"
            values={input.experience}
            onChange={(experience) => setInput({ ...input, experience })}
          />
          <div className="flex items-center justify-between rounded-xl border border-border p-3">
            <Label htmlFor="active">Visible on site</Label>
            <Switch
              id="active"
              checked={input.active}
              onCheckedChange={(active) => setInput({ ...input, active })}
            />
          </div>
        </>
      )}
    />
  );
}
