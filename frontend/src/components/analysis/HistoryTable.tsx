import Link from "next/link";
import { ArrowRight, Eye, FileText } from "lucide-react";

import { changeStyle, formatDate, toChange } from "./shared";

export type ComparisonHistoryItem = {
  comparisonId: string;
  comparedAt: string;
  overallChange: string;
  summary: string;
  previous: ComparisonHistorySide;
  current: ComparisonHistorySide;
  stats: {
    improved: number;
    worsened: number;
    unchanged: number;
    newTests: number;
    notRepeated: number;
  };
};

type ComparisonHistorySide = {
  reportId: string;
  reportName: string;
  reportType: string;
  date: string;
  score: number | null;
};

const DAY = 1000 * 60 * 60 * 24;

const changeTone: Record<string, string> = {
  IMPROVED: "border-emerald-100 bg-emerald-50 text-emerald-700",
  WORSENED: "border-red-100 bg-red-50 text-red-700",
  SAME: "border-slate-200 bg-slate-50 text-slate-600",
  NEW: "border-cyan-100 bg-cyan-50 text-cyan-700",
  REMOVED: "border-slate-200 bg-slate-50 text-slate-600",
};

export default function HistoryTable({
  items,
}: {
  items: ComparisonHistoryItem[];
}) {
  return (
    <section className="overflow-hidden rounded-xl border border-slate-200 bg-white">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[860px]">
          <thead className="bg-slate-50">
            <tr className="border-b border-slate-200">
              <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                Reports compared
              </th>

              <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                Period
              </th>

              <th className="px-5 py-3 text-center text-xs font-semibold uppercase tracking-wider text-slate-500">
                Health score
              </th>

              <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                Outcome
              </th>

              <th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wider text-slate-500">
                Compared on
              </th>

              <th className="px-5 py-3" />
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {items.map((item) => {
              const change = toChange(item.overallChange);

              const scoreA = item.previous.score ?? 0;
              const scoreB = item.current.score ?? 0;
              const delta = scoreB - scoreA;

              const daysApart = Math.abs(
                Math.round(
                  (new Date(item.current.date).getTime() -
                    new Date(item.previous.date).getTime()) /
                    DAY
                )
              );

              const href = `/dashboard/analysis/compare?a=${item.previous.reportId}&b=${item.current.reportId}&id=${item.comparisonId}`;

              return (
                <tr
                  key={item.comparisonId}
                  className="align-top transition hover:bg-cyan-50/40"
                >
                  <td className="px-5 py-4">
                    <div className="flex gap-3">
                      <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-cyan-50">
                        <FileText className="h-4.5 w-4.5 text-cyan-600" />
                      </div>

                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-slate-900">
                          {item.current.reportName || "Untitled report"}
                        </p>

                        <p className="mt-0.5 truncate text-xs text-slate-500">
                          vs {item.previous.reportName || "Untitled report"}
                        </p>

                        <span className="mt-1.5 inline-flex rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-600">
                          {item.current.reportType || "Unknown type"}
                        </span>
                      </div>
                    </div>
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      {formatDate(item.previous.date)}
                      <ArrowRight size={14} className="text-slate-300" />
                      {formatDate(item.current.date)}
                    </div>

                    <p className="mt-1 text-xs text-slate-400">
                      {daysApart} {daysApart === 1 ? "day" : "days"} apart
                    </p>
                  </td>

                  <td className="px-5 py-4 text-center">
                    <div className="flex items-center justify-center gap-2 text-sm text-slate-600">
                      {scoreA}
                      <ArrowRight size={14} className="text-slate-300" />
                      <span className="font-semibold text-slate-900">
                        {scoreB}
                      </span>
                    </div>

                    <p
                      className={`mt-1 text-xs font-semibold ${
                        delta > 0
                          ? "text-emerald-600"
                          : delta < 0
                          ? "text-red-600"
                          : "text-slate-400"
                      }`}
                    >
                      {delta > 0 ? "+" : ""}
                      {delta}
                    </p>
                  </td>

                  <td className="px-5 py-4">
                    <span
                      className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold ${changeTone[change]}`}
                    >
                      {changeStyle[change].label}
                    </span>

                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {item.stats.improved > 0 && (
                        <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-700">
                          {item.stats.improved} improved
                        </span>
                      )}

                      {item.stats.worsened > 0 && (
                        <span className="rounded-full bg-red-50 px-2 py-0.5 text-xs font-medium text-red-700">
                          {item.stats.worsened} worsened
                        </span>
                      )}

                      {item.stats.unchanged > 0 && (
                        <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-600">
                          {item.stats.unchanged} stable
                        </span>
                      )}

                      {item.stats.newTests > 0 && (
                        <span className="rounded-full bg-cyan-50 px-2 py-0.5 text-xs font-medium text-cyan-700">
                          {item.stats.newTests} new
                        </span>
                      )}

                      {item.stats.notRepeated > 0 && (
                        <span className="rounded-full bg-amber-50 px-2 py-0.5 text-xs font-medium text-amber-700">
                          {item.stats.notRepeated} not redone
                        </span>
                      )}
                    </div>
                  </td>

                  <td className="px-5 py-4 text-right text-sm text-slate-500">
                    {formatDate(item.comparedAt)}
                  </td>

                  <td className="px-5 py-4 text-right">
                    <Link
                      href={href}
                      title="Open comparison"
                      className="inline-flex rounded-lg border border-slate-200 p-2.5 transition hover:border-cyan-500 hover:bg-cyan-50"
                    >
                      <Eye size={18} className="text-cyan-600" />
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}
