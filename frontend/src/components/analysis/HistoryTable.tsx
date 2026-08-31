import Link from "next/link";
import { ArrowRight, Eye } from "lucide-react";

import { ComparisonHistoryItem } from "@/data/analysisData";
import { formatDate } from "./shared";

export default function HistoryTable({
  items,
}: {
  items: ComparisonHistoryItem[];
}) {
  return (
    <section className="overflow-hidden rounded-xl border border-slate-200 bg-white">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[720px]">
          <thead className="bg-slate-50">
            <tr className="border-b border-slate-200">
              <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                Reports compared
              </th>

              <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                Period
              </th>

              <th className="px-5 py-3 text-center text-xs font-semibold uppercase tracking-wider text-slate-500">
                Score
              </th>

              <th className="px-5 py-3 text-center text-xs font-semibold uppercase tracking-wider text-slate-500">
                Result
              </th>

              <th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wider text-slate-500">
                Compared on
              </th>

              <th className="px-5 py-3" />
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {items.map((item) => {
              const delta = item.scoreB - item.scoreA;

              return (
                <tr
                  key={item.comparisonId}
                  className="transition hover:bg-cyan-50/40"
                >
                  <td className="px-5 py-4">
                    <p className="text-sm font-semibold text-slate-900">
                      {item.reportBName}
                    </p>

                    <span className="mt-1 inline-flex rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-600">
                      {item.reportType}
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      {formatDate(item.dateA)}
                      <ArrowRight size={14} className="text-slate-300" />
                      {formatDate(item.dateB)}
                    </div>
                  </td>

                  <td className="px-5 py-4 text-center">
                    <div className="flex items-center justify-center gap-2 text-sm text-slate-600">
                      {item.scoreA}
                      <ArrowRight size={14} className="text-slate-300" />
                      <span className="font-semibold text-slate-900">
                        {item.scoreB}
                      </span>

                      <span
                        className={`text-xs font-semibold ${
                          delta >= 0
                            ? "text-emerald-600"
                            : "text-red-600"
                        }`}
                      >
                        {delta >= 0 ? "+" : ""}
                        {delta}
                      </span>
                    </div>
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex items-center justify-center gap-2">
                      <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700">
                        {item.improved} improved
                      </span>

                      <span className="rounded-full bg-red-50 px-2.5 py-1 text-xs font-medium text-red-700">
                        {item.worsened} worsened
                      </span>
                    </div>
                  </td>

                  <td className="px-5 py-4 text-right text-sm text-slate-500">
                    {formatDate(item.comparedOn)}
                  </td>

                  <td className="px-5 py-4 text-right">
                    <Link
                      href={`/dashboard/analysis/compare?a=${item.reportAId}&b=${item.reportBId}`}
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
