import { ComparisonStats } from "./shared";

const tiles = [
  { key: "improved", label: "Improved", tone: "text-emerald-600" },
  { key: "worsened", label: "Worsened", tone: "text-red-600" },
  { key: "unchanged", label: "Unchanged", tone: "text-slate-900" },
  { key: "newTests", label: "New", tone: "text-slate-900" },
  { key: "notRepeated", label: "Not redone", tone: "text-slate-900" },
] as const;

export default function CompareStats({
  stats,
}: {
  stats: ComparisonStats;
}) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
      {tiles.map((tile) => (
        <div
          key={tile.key}
          className="rounded-xl border border-slate-200 bg-white p-3 text-center"
        >
          <p className={`text-2xl font-bold ${tile.tone}`}>
            {stats[tile.key]}
          </p>

          <p className="mt-0.5 text-xs text-slate-500">
            {tile.label}
          </p>
        </div>
      ))}
    </div>
  );
}
