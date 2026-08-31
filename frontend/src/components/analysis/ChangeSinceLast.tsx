import { ArrowDownRight, ArrowUpRight, Minus } from "lucide-react";

type Props = {
  normal: number;
  borderline: number;
  critical: number;
};

const rows = [
  { key: "normal", label: "Normal", good: "up" },
  { key: "borderline", label: "Borderline", good: "down" },
  { key: "critical", label: "Critical", good: "down" },
] as const;

export default function ChangeSinceLast(props: Props) {
  return (
    <section className="rounded-xl border border-slate-200 bg-white p-5">
      <h2 className="text-sm font-semibold text-slate-900">
        Since your last report
      </h2>

      <div className="mt-4 space-y-3">
        {rows.map((row) => {
          const value = props[row.key];

          const improved =
            row.good === "up" ? value > 0 : value < 0;

          const Icon =
            value === 0
              ? Minus
              : value > 0
              ? ArrowUpRight
              : ArrowDownRight;

          const tone =
            value === 0
              ? "text-slate-400"
              : improved
              ? "text-emerald-600"
              : "text-red-600";

          return (
            <div
              key={row.key}
              className="flex items-center justify-between"
            >
              <span className="text-sm text-slate-600">
                {row.label} tests
              </span>

              <span
                className={`flex items-center gap-1 text-sm font-semibold ${tone}`}
              >
                <Icon size={15} />
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
