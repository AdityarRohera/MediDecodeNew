import { ArrowRight } from "lucide-react";
import { ComparisonSide } from "@/data/analysisData";
import { formatDate } from "./shared";

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
    <section className="rounded-xl border border-slate-200 bg-white p-5">
      <div className="flex items-center gap-4">
        <div className="min-w-0 flex-1">
          <p className="text-xs text-slate-400">Older report</p>

          <p className="mt-0.5 truncate text-sm font-semibold text-slate-900">
            {reportA.reportName}
          </p>

          <p className="text-xs text-slate-500">
            {formatDate(reportA.date)}
          </p>

          <p className="mt-2 text-2xl font-bold text-slate-900">
            {reportA.score}
          </p>
        </div>

        <div className="shrink-0 text-center">
          <ArrowRight className="mx-auto h-5 w-5 text-slate-300" />

          <p className="mt-1 text-xs text-slate-400">
            {daysApart} days
          </p>
        </div>

        <div className="min-w-0 flex-1 text-right">
          <p className="text-xs text-slate-400">Newer report</p>

          <p className="mt-0.5 truncate text-sm font-semibold text-slate-900">
            {reportB.reportName}
          </p>

          <p className="text-xs text-slate-500">
            {formatDate(reportB.date)}
          </p>

          <div className="mt-2 flex items-baseline justify-end gap-2">
            <span className="text-2xl font-bold text-slate-900">
              {reportB.score}
            </span>

            <span
              className={`text-sm font-semibold ${
                delta >= 0 ? "text-emerald-600" : "text-red-600"
              }`}
            >
              {delta >= 0 ? "+" : ""}
              {delta}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
