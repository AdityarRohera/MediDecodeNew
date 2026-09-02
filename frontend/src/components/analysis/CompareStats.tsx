import { ComparisonStats } from "./shared";

const tiles = [
  {
    key: "improved",
    label: "Improved",
    value: "text-emerald-700",
    chip: "bg-emerald-50",
  },
  {
    key: "worsened",
    label: "Worsened",
    value: "text-red-700",
    chip: "bg-red-50",
  },
  {
    key: "unchanged",
    label: "Unchanged",
    value: "text-slate-900",
    chip: "bg-slate-100",
  },
  {
    key: "newTests",
    label: "New tests",
    value: "text-brand-700",
    chip: "bg-brand-50",
  },
  {
    key: "notRepeated",
    label: "Not redone",
    value: "text-amber-700",
    chip: "bg-amber-50",
  },
] as const;

export default function CompareStats({ stats }: { stats: ComparisonStats }) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
      {tiles.map((tile, index) => (
        <div
          key={tile.key}
          style={{ animationDelay: `${index * 50}ms` }}
          className="animate-fade-up rounded-2xl border border-slate-200 bg-white p-4 text-center shadow-card"
        >
          <p
            className={`inline-flex h-10 min-w-10 items-center justify-center rounded-xl px-2 text-xl font-semibold ${tile.chip} ${tile.value}`}
          >
            {stats[tile.key]}
          </p>

          <p className="mt-2 text-xs text-slate-500">{tile.label}</p>
        </div>
      ))}
    </div>
  );
}
