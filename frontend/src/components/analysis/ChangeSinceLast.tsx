import { ArrowDownRight, ArrowUpRight, Minus } from "lucide-react";

type Props = {
  normal: number;
  borderline: number;
  critical: number;
};

const rows = [
  { key: "normal", label: "Normal tests", good: "up" },
  { key: "borderline", label: "Borderline tests", good: "down" },
  { key: "critical", label: "Critical tests", good: "down" },
] as const;

export default function ChangeSinceLast(props: Props) {
  return (
    <section className="animate-fade-up rounded-2xl border border-slate-200 bg-white p-5 shadow-card">
      <h2 className="text-sm font-semibold text-slate-900">
        Since your last report
      </h2>

      <p className="mt-0.5 text-xs text-slate-500">
        How the test counts moved between your two most recent reports.
      </p>

      <div className="mt-4 space-y-2">
        {rows.map((row) => {
          const value = props[row.key];

          const improved = row.good === "up" ? value > 0 : value < 0;

          const Icon =
            value === 0 ? Minus : value > 0 ? ArrowUpRight : ArrowDownRight;

          const tone =
            value === 0
              ? "bg-slate-100 text-slate-500"
              : improved
              ? "bg-emerald-50 text-emerald-700"
              : "bg-red-50 text-red-700";

          return (
            <div
              key={row.key}
              className="flex items-center justify-between rounded-xl bg-slate-50 px-3.5 py-2.5"
            >
              <span className="text-sm text-slate-600">{row.label}</span>

              <span
                className={`flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ${tone}`}
              >
                <Icon size={14} />
                {value > 0 ? "+" : ""}
                {value}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
