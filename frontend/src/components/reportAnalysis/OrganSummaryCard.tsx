import { AlertCircle, AlertTriangle, CheckCircle2 } from "lucide-react";

type Test = {
  testName: string;
  result: string;
  range: string;
  status: string;
};

type Organ = {
  organName: string;
  organStatus: string;
  organExplanation: string;
  tests: Test[];
};

const statusConfig = (status: string) => {
  switch (status) {
    case "CRITICAL":
      return {
        icon: AlertCircle,
        iconColor: "text-red-500",
        badge: "bg-red-50 text-red-700",
        label: "Critical",
      };

    case "BORDERLINE":
      return {
        icon: AlertTriangle,
        iconColor: "text-amber-500",
        badge: "bg-amber-50 text-amber-700",
        label: "Borderline",
      };

    default:
      return {
        icon: CheckCircle2,
        iconColor: "text-emerald-500",
        badge: "bg-emerald-50 text-emerald-700",
        label: "Normal",
      };
  }
};

export default function OrganSummaryCard({
  analysis,
}: {
  analysis: Organ[];
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-card">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-slate-900">
          Organ analysis
        </h2>

        <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
          {analysis.length} organs
        </span>
      </div>

      <div className="mt-4 space-y-2">
        {analysis.map((organ) => {
          const config = statusConfig(organ.organStatus);
          const Icon = config.icon;

          return (
            <div
              key={organ.organName}
              className="flex items-center justify-between gap-3 rounded-xl border border-slate-100 p-3 transition hover:border-slate-200 hover:bg-slate-50"
            >
              <div className="flex min-w-0 items-center gap-3">
                <Icon className={`h-5 w-5 shrink-0 ${config.iconColor}`} />

                <div className="min-w-0">
                  <h3 className="text-sm font-medium leading-snug text-slate-900">
                    {organ.organName}
                  </h3>

                  <p className="text-xs text-slate-500">
                    {organ.tests.length} tests
                  </p>
                </div>
              </div>

              <span
                className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold ${config.badge}`}
              >
                {config.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
