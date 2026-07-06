const TICKER_ITEMS = [
  "KU Affiliated Admissions Open 2026",
  "Scholarship Applications Available",
  "Orientation Program Notice",
  "Hackathon Registration Now Live",
];

function TickerMarquee() {
  const row = [...TICKER_ITEMS, ...TICKER_ITEMS, ...TICKER_ITEMS];
  return (
    <div className="flex whitespace-nowrap animate-marquee py-3 font-medium">
      {row.map((t, i) => (
        <span
          key={i}
          className="mx-8 inline-flex items-center gap-3 text-sm uppercase tracking-wider"
        >
          <span className="size-1.5 rounded-full bg-black" /> {t}
        </span>
      ))}
    </div>
  );
}

export function Ticker() {
  return (
    <div className="relative z-10 bg-secondary text-black border-y border-border overflow-hidden">
      <TickerMarquee />
    </div>
  );
}
