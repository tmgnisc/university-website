import { createFileRoute } from "@tanstack/react-router";

import { ResourceManager } from "@/components/admin/resource-manager";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { news } from "@/lib/cms/hooks";
import { newsItemInput, type NewsItemInput } from "@/lib/cms/types";

export const Route = createFileRoute("/admin/_authed/news")({
  component: NewsPage,
});

const EMPTY: NewsItemInput = {
  title: "",
  date: "",
  category: "",
  body: "",
  imageUrl: "",
};

function NewsPage() {
  return (
    <ResourceManager
      title="News & Events"
      description="Announcements and events. (Not yet shown on the public site.)"
      query={news.useList()}
      createMutation={news.useCreate()}
      updateMutation={news.useUpdate()}
      removeMutation={news.useRemove()}
      emptyInput={EMPTY}
      toInput={({ id: _id, ...rest }) => rest}
      itemLabel={(item) => item.title}
      validate={(input) => {
        const result = newsItemInput.safeParse(input);
        return result.success ? null : result.error.issues[0].message;
      }}
      renderRow={(item) => (
        <div>
          <p className="font-semibold">{item.title}</p>
          <p className="mt-0.5 text-sm text-muted-foreground">
            {item.date}
            {item.category ? ` · ${item.category}` : ""}
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
              <Label>Date</Label>
              <Input
                type="date"
                value={input.date}
                onChange={(e) => setInput({ ...input, date: e.target.value })}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Category</Label>
              <Input
                value={input.category}
                onChange={(e) => setInput({ ...input, category: e.target.value })}
              />
            </div>
          </div>
          <div className="space-y-1.5">
            <Label>Image URL (optional)</Label>
            <Input
              value={input.imageUrl}
              placeholder="https://…"
              onChange={(e) => setInput({ ...input, imageUrl: e.target.value })}
            />
          </div>
          <div className="space-y-1.5">
            <Label>Body</Label>
            <Textarea
              rows={5}
              value={input.body}
              onChange={(e) => setInput({ ...input, body: e.target.value })}
            />
          </div>
        </>
      )}
    />
  );
}
