import type { UseMutationResult, UseQueryResult } from "@tanstack/react-query";
import { Loader2, Pencil, Plus, Trash2 } from "lucide-react";
import { useState, type ReactNode } from "react";
import { toast } from "sonner";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type Mutation<TVars> = UseMutationResult<unknown, unknown, TVars, unknown>;

// Generic CRUD scaffold: list of cards + add/edit dialog + delete confirm +
// toasts + loading/error states. Each resource page supplies how to render a
// row, how to render the form, and how to map an item to form input.
export function ResourceManager<T extends { id: string }, TInput>({
  title,
  description,
  query,
  createMutation,
  updateMutation,
  removeMutation,
  emptyInput,
  toInput,
  renderRow,
  renderForm,
  itemLabel,
  validate,
}: {
  title: string;
  description?: string;
  query: UseQueryResult<T[]>;
  createMutation: Mutation<TInput>;
  updateMutation: Mutation<{ id: string; input: TInput }>;
  removeMutation: Mutation<string>;
  emptyInput: TInput;
  toInput: (item: T) => TInput;
  renderRow: (item: T) => ReactNode;
  renderForm: (input: TInput, setInput: (next: TInput) => void) => ReactNode;
  itemLabel: (item: T) => string;
  validate?: (input: TInput) => string | null;
}) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<T | null>(null);
  const [input, setInput] = useState<TInput>(emptyInput);
  const [deleteTarget, setDeleteTarget] = useState<T | null>(null);

  const openCreate = () => {
    setEditing(null);
    setInput(emptyInput);
    setDialogOpen(true);
  };
  const openEdit = (item: T) => {
    setEditing(item);
    setInput(toInput(item));
    setDialogOpen(true);
  };

  const submitting = createMutation.isPending || updateMutation.isPending;

  const onSubmit = async () => {
    const err = validate?.(input);
    if (err) {
      toast.error(err);
      return;
    }
    try {
      if (editing) {
        await updateMutation.mutateAsync({ id: editing.id, input });
        toast.success(`${title} updated`);
      } else {
        await createMutation.mutateAsync(input);
        toast.success(`${title} added`);
      }
      setDialogOpen(false);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Could not save");
    }
  };

  const onDelete = async () => {
    if (!deleteTarget) return;
    try {
      await removeMutation.mutateAsync(deleteTarget.id);
      toast.success("Deleted");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Could not delete");
    } finally {
      setDeleteTarget(null);
    }
  };

  return (
    <div>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
          {description && <p className="mt-1 text-sm text-muted-foreground">{description}</p>}
        </div>
        <Button onClick={openCreate}>
          <Plus className="mr-1 size-4" /> Add new
        </Button>
      </div>

      <div className="mt-6">
        {query.isLoading ? (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Loader2 className="size-4 animate-spin" /> Loading…
          </div>
        ) : query.isError ? (
          <p className="text-sm text-destructive">Failed to load. Please retry.</p>
        ) : !query.data || query.data.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border p-10 text-center text-sm text-muted-foreground">
            Nothing here yet. Click “Add new” to create the first one.
          </div>
        ) : (
          <div className="grid gap-3">
            {query.data.map((item) => (
              <div
                key={item.id}
                className="flex items-start justify-between gap-4 rounded-2xl border border-border bg-card p-4"
              >
                <div className="min-w-0">{renderRow(item)}</div>
                <div className="flex shrink-0 gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => openEdit(item)}
                    aria-label="Edit"
                  >
                    <Pencil className="size-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setDeleteTarget(item)}
                    aria-label="Delete"
                  >
                    <Trash2 className="size-4 text-destructive" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>
              {editing ? "Edit" : "Add"} {title.replace(/s$/, "").toLowerCase()}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">{renderForm(input, setInput)}</div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={onSubmit} disabled={submitting}>
              {submitting && <Loader2 className="mr-2 size-4 animate-spin" />}
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={!!deleteTarget} onOpenChange={(o) => !o && setDeleteTarget(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this item?</AlertDialogTitle>
            <AlertDialogDescription>
              “{deleteTarget ? itemLabel(deleteTarget) : ""}” will be permanently removed.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={onDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
