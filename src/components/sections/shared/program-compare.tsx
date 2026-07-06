export function ProgramCompare({
  rows,
}: {
  rows: { label: string; bit: string; btech: string }[];
}) {
  return (
    <div className="overflow-x-auto rounded-3xl border border-border bg-card">
      <table className="w-full min-w-[560px] text-left text-sm">
        <thead>
          <tr className="border-b border-border bg-muted/50">
            <th className="p-5 font-semibold">Compare</th>
            <th className="p-5 font-semibold text-primary">BIT</th>
            <th className="p-5 font-semibold text-primary">B.Tech Ed IT</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.label} className="border-b border-border last:border-0">
              <td className="p-5 font-medium text-muted-foreground">{row.label}</td>
              <td className="p-5">{row.bit}</td>
              <td className="p-5">{row.btech}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
