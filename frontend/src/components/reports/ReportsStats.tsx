import {
  Activity,
  CircleCheckBig,
  FileStack,
  TriangleAlert,
} from "lucide-react";

type Props = {
  TotalReports: number;
  HealtyReports: number;
  AttentionReports: number;
  AverageScore: number;
};

const tones = {
  brand: "bg-brand-50 text-brand-600",
  green: "bg-emerald-50 text-emerald-600",
  amber: "bg-amber-50 text-amber-600",
  violet: "bg-violet-50 text-violet-600",
} as const;

function StatTile({
  icon: Icon,
  tone,
  label,
  value,
  hint,
  delay,
}: {
  icon: typeof Activity;
  tone: keyof typeof tones;
  label: string;
  value: number | string;
  hint: string;
  delay: number;
}) {
  return (
    <div
      style={{ animationDelay: `${delay}ms` }}
      className="animate-fade-up rounded-2xl border border-slate-200 bg-white p-4 transition duration-300 hover:-translate-y-0.5 hover:shadow-card"
    >
      <div className="flex items-center gap-3">
        <span
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${tones[tone]}`}
        >
          <Icon size={19} />
        </span>

        <div className="min-w-0">
          <p className="truncate text-xs font-medium text-slate-500">
            {label}
          </p>

          <p className="text-2xl font-semibold leading-tight tracking-tight text-slate-950">
            {value}
          </p>
        </div>
      </div>

      <p className="mt-2.5 truncate text-xs text-slate-400">{hint}</p>
    </div>
  );
}

export default function ReportsStats({
  TotalReports,
  HealtyReports,
  AttentionReports,
  AverageScore,
}: Props) {
  return (
    <div className="grid grid-cols-2 gap-3 xl:grid-cols-4">
      <StatTile
        icon={FileStack}
        tone="brand"
        label="Reports"
        value={TotalReports || 0}
        hint="Matching your current view"
        delay={0}
      />

      <StatTile
        icon={CircleCheckBig}
        tone="green"
        label="Healthy"
        value={HealtyReports || 0}
        hint="All markers in range"
        delay={60}
      />

      <StatTile
        icon={TriangleAlert}
        tone="amber"
        label="Needs attention"
        value={AttentionReports || 0}
        hint="Borderline or critical findings"
        delay={120}
      />

      <StatTile
        icon={Activity}
        tone="violet"
        label="Average score"
        value={AverageScore ? `${AverageScore}/100` : "—"}
        hint="Across analyzed reports"
        delay={180}
      />
    </div>
  );
}
