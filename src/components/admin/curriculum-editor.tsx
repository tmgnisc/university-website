import { Plus, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { CurriculumYear } from "@/lib/cms/types";

// Nested editor for a program's curriculum: years → semesters → courses.
export function CurriculumEditor({
  value,
  onChange,
}: {
  value: CurriculumYear[];
  onChange: (next: CurriculumYear[]) => void;
}) {
  const setYear = (yi: number, patch: Partial<CurriculumYear>) =>
    onChange(value.map((y, i) => (i === yi ? { ...y, ...patch } : y)));

  const addYear = () =>
    onChange([...value, { title: `Year ${value.length + 1}`, subtitle: "", semesters: [] }]);
  const removeYear = (yi: number) => onChange(value.filter((_, i) => i !== yi));

  const addSemester = (yi: number) =>
    setYear(yi, {
      semesters: [
        ...value[yi].semesters,
        { title: `Semester ${value[yi].semesters.length + 1}`, courses: [] },
      ],
    });
  const removeSemester = (yi: number, si: number) =>
    setYear(yi, { semesters: value[yi].semesters.filter((_, i) => i !== si) });
  const setSemesterTitle = (yi: number, si: number, title: string) =>
    setYear(yi, {
      semesters: value[yi].semesters.map((s, i) => (i === si ? { ...s, title } : s)),
    });

  const setCourses = (yi: number, si: number, courses: { name: string; credits: number }[]) =>
    setYear(yi, {
      semesters: value[yi].semesters.map((s, i) => (i === si ? { ...s, courses } : s)),
    });

  return (
    <div className="space-y-4">
      <Label>Curriculum</Label>

      {value.map((year, yi) => (
        <div key={yi} className="rounded-2xl border border-border p-4">
          <div className="flex items-end gap-2">
            <div className="flex-1 space-y-1.5">
              <Label className="text-xs">Year title</Label>
              <Input value={year.title} onChange={(e) => setYear(yi, { title: e.target.value })} />
            </div>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => removeYear(yi)}
              aria-label="Remove year"
            >
              <Trash2 className="size-4 text-destructive" />
            </Button>
          </div>
          <div className="mt-2 space-y-1.5">
            <Label className="text-xs">Subtitle</Label>
            <Input
              value={year.subtitle}
              onChange={(e) => setYear(yi, { subtitle: e.target.value })}
            />
          </div>

          <div className="mt-4 space-y-3 border-l-2 border-muted pl-4">
            {year.semesters.map((sem, si) => {
              const total = sem.courses.reduce((sum, c) => sum + (c.credits || 0), 0);
              return (
                <div key={si} className="rounded-xl bg-muted/40 p-3">
                  <div className="flex items-end gap-2">
                    <div className="flex-1 space-y-1.5">
                      <Label className="text-xs">Semester ({total} credits)</Label>
                      <Input
                        value={sem.title}
                        onChange={(e) => setSemesterTitle(yi, si, e.target.value)}
                      />
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeSemester(yi, si)}
                      aria-label="Remove semester"
                    >
                      <Trash2 className="size-4 text-destructive" />
                    </Button>
                  </div>

                  <div className="mt-2 space-y-2">
                    {sem.courses.map((course, ci) => (
                      <div key={ci} className="flex items-center gap-2">
                        <Input
                          className="flex-1"
                          placeholder="Course name"
                          value={course.name}
                          onChange={(e) =>
                            setCourses(
                              yi,
                              si,
                              sem.courses.map((c, i) =>
                                i === ci ? { ...c, name: e.target.value } : c,
                              ),
                            )
                          }
                        />
                        <Input
                          type="number"
                          className="w-20"
                          placeholder="Cr"
                          value={course.credits}
                          onChange={(e) =>
                            setCourses(
                              yi,
                              si,
                              sem.courses.map((c, i) =>
                                i === ci ? { ...c, credits: Number(e.target.value) || 0 } : c,
                              ),
                            )
                          }
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() =>
                            setCourses(
                              yi,
                              si,
                              sem.courses.filter((_, i) => i !== ci),
                            )
                          }
                          aria-label="Remove course"
                        >
                          <Trash2 className="size-4" />
                        </Button>
                      </div>
                    ))}
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setCourses(yi, si, [...sem.courses, { name: "", credits: 3 }])}
                    >
                      <Plus className="mr-1 size-4" /> Add course
                    </Button>
                  </div>
                </div>
              );
            })}
            <Button type="button" variant="outline" size="sm" onClick={() => addSemester(yi)}>
              <Plus className="mr-1 size-4" /> Add semester
            </Button>
          </div>
        </div>
      ))}

      <Button type="button" variant="outline" onClick={addYear}>
        <Plus className="mr-1 size-4" /> Add year
      </Button>
    </div>
  );
}
