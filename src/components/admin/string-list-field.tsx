import { Plus, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// Reusable editor for an array of strings (qualifications, keywords,
// eligibility, etc.). Controlled — parent owns the array.
export function StringListField({
  label,
  values,
  onChange,
  placeholder,
}: {
  label: string;
  values: string[];
  onChange: (next: string[]) => void;
  placeholder?: string;
}) {
  const update = (index: number, value: string) =>
    onChange(values.map((v, i) => (i === index ? value : v)));
  const remove = (index: number) => onChange(values.filter((_, i) => i !== index));
  const add = () => onChange([...values, ""]);

  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <div className="space-y-2">
        {values.map((value, index) => (
          <div key={index} className="flex items-center gap-2">
            <Input
              value={value}
              placeholder={placeholder}
              onChange={(e) => update(index, e.target.value)}
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => remove(index)}
              aria-label="Remove item"
            >
              <X className="size-4" />
            </Button>
          </div>
        ))}
      </div>
      <Button type="button" variant="outline" size="sm" onClick={add}>
        <Plus className="mr-1 size-4" /> Add {label.toLowerCase()}
      </Button>
    </div>
  );
}
