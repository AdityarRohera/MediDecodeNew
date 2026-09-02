import { ArrowRight } from "lucide-react";

import { ComparisonSide, formatDate } from "./shared";

type Props = {
  reportA: ComparisonSide;
  reportB: ComparisonSide;
  daysApart: number;
};

export default function CompareHeader({
  reportA,
  reportB,
  daysApart,
}: Props) {
  const delta = reportB.score - reportA.score;

  return (
    <section className="animate-fade-up rounded-2xl border border-slate-200 bg-white p-5 shadow-card">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="min-w-0 flex-1">
          <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
            Older report
          </p>

          <p className="mt-1 truncate text-sm font-semibold text-slate-900">
            {reportA.reportName}
          </p>

          <p className="text-xs text-slate-500">{formatDate(reportA.date)}</p>

          <p className="mt-2 text-3xl font-semibold tracking-tight text-slate-950">
            {reportA.score}
          </p>
        </div>

        <div className="flex shrink-0 flex-row items-center gap-2 sm:flex-col">
          <span className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-slate-50">
            <ArrowRight className="h-4 w-4 text-slate-400" />
          </span>

          <p className="whitespace-nowrap text-xs text-slate-400">
            {daysApart} {daysApart === 1 ? "day" : "days"} apart
          </p>
        </div>

        <div className="min-w-0 flex-1 sm:text-right">
          <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
            Newer report
          </p>

          <p className="mt-1 truncate text-sm font-semibold text-slate-900">
            {reportB.reportName}
          </p>

          <p className="text-xs text-slate-500">{formatDate(reportB.date)}</p>

          <div className="mt-2 flex items-baseline gap-2 sm:justify-end">
            <span className="text-3xl font-semibold tracking-tight text-slate-950">
              {reportB.score}
            </span>

            <span
              className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                delta > 0
                  ? "bg-emerald-50 text-emerald-700"
                  : delta < 0
                  ? "bg-red-50 text-red-700"
                  : "bg-slate-100 text-slate-500"
              }`}
            >
              {delta > 0 ? "+" : ""}
              {delta}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
