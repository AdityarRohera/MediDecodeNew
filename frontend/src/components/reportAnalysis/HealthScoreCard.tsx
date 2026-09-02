import { CircleCheckBig, Siren, TriangleAlert } from "lucide-react";

type Props = {
  score: number;
  normalTests: number;
  borderlineTests: number;
  criticalTests: number;
};

const RADIUS = 54;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export default function HealthScoreCard({
  score,
  normalTests,
  borderlineTests,
  criticalTests,
}: Props) {
  const offset = CIRCUMFERENCE - (score / 100) * CIRCUMFERENCE;

  const status =
    score >= 80
      ? { label: "Excellent", color: "text-emerald-600" }
      : score >= 60
      ? { label: "Good", color: "text-emerald-600" }
      : score >= 40
      ? { label: "Moderate", color: "text-amber-600" }
      : { label: "Critical", color: "text-red-600" };

  const ringColor =
    score >= 60 ? "#10b981" : score >= 40 ? "#f59e0b" : "#ef4444";

  const rows = [
    {
      label: "Normal",
      value: normalTests,
      icon: CircleCheckBig,
      color: "text-emerald-500",
    },
    {
      label: "Borderline",
      value: borderlineTests,
      icon: TriangleAlert,
      color: "text-amber-500",
    },
    {
      label: "Critical",
      value: criticalTests,
      icon: Siren,
      color: "text-red-500",
    },
  ];

  return (
    <div className="h-full rounded-2xl border border-slate-200 bg-white p-5 shadow-card">
      <h2 className="text-sm font-semibold text-slate-900">Health score</h2>

      <div className="mt-4 flex justify-center">
        <div className="relative h-36 w-36">
          <svg width="144" height="144" className="-rotate-90">
            <circle
              cx="72"
              cy="72"
              r={RADIUS}
              stroke="#e2e8f0"
              strokeWidth="10"
              fill="transparent"
            />

            {/* The ring fills in on load rather than snapping. */}
            <circle
              cx="72"
              cy="72"
              r={RADIUS}
              stroke={ringColor}
              strokeWidth="10"
              strokeLinecap="round"
              fill="transparent"
              strokeDasharray={CIRCUMFERENCE}
              strokeDashoffset={offset}
              className="animate-draw"
              style={
                { "--draw-length": CIRCUMFERENCE } as React.CSSProperties
              }
            />
          </svg>

          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-4xl font-semibold tracking-tight text-slate-950">
              {score}
            </span>

            <span className="text-xs text-slate-400">/100</span>
          </div>
        </div>
      </div>

      <div className="mt-3 text-center">
        <h3 className={`text-base font-semibold ${status.color}`}>
          {status.label}
        </h3>

        <p className="mt-1 text-xs leading-relaxed text-slate-500">
          Based on the overall analysis of your laboratory results.
        </p>
      </div>

      <div className="mt-4 space-y-1.5 border-t border-slate-100 pt-4">
        {rows.map((row) => {
          const Icon = row.icon;

          return (
            <div
              key={row.label}
              className="flex items-center justify-between rounded-lg px-2 py-1.5 transition hover:bg-slate-50"
            >
              <span className="flex items-center gap-2 text-sm text-slate-600">
                <Icon className={`h-4 w-4 ${row.color}`} />
                {row.label}
              </span>

              <span className="text-sm font-semibold text-slate-900">
                {row.value ?? 0}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
