"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Calendar, FileText, GitCompare } from "lucide-react";

import { HealthScoreBadge } from "@/components/reports/HealthScore";
import { formatDate, normalizeType } from "./shared";

const timeOf = (report: any) =>
  new Date(report.UPLOADED_DATE).getTime();

export default function ReportPickList({
  reports,
}: {
  reports: any[];
}) {
  const router = useRouter();

  const [selected, setSelected] = useState<string[]>([]);

  // Once one report is picked, only its own type stays selectable
  // so the same tests line up on both sides.
  const pickedType = selected.length
    ? normalizeType(
        reports.find((r: any) => r.REPORT_ID === selected[0])
          ?.REPORT_TYPE
      )
    : null;

  const toggle = (reportId: string) =>
    setSelected((current) =>
      current.includes(reportId)
        ? current.filter((id) => id !== reportId)
        : current.length >= 2
        ? current
        : [...current, reportId]
    );

  const compare = () => {
    if (selected.length !== 2) return;

    // Older report first, so the comparison always reads forward.
    const [a, b] = selected
      .map((id) => reports.find((r: any) => r.REPORT_ID === id))
      .sort((x: any, y: any) => timeOf(x) - timeOf(y));

    router.push(
      `/dashboard/analysis/compare?a=${a.REPORT_ID}&b=${b.REPORT_ID}`
    );
  };

  return (
    <section className="rounded-xl border border-slate-200 bg-white">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 p-5">
        <div>
          <h2 className="text-sm font-semibold text-slate-900">
            Select two reports to compare
          </h2>

          <p className="mt-1 text-xs text-slate-500">
            Only reports of the same type can be compared.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs font-medium text-slate-500">
            {selected.length} of 2 selected
          </span>

          <button
            onClick={compare}
            disabled={selected.length !== 2}
            className="flex h-10 items-center gap-2 rounded-lg bg-cyan-600 px-5 text-sm font-semibold text-white transition hover:bg-cyan-700 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400"
          >
            <GitCompare size={16} />
            Compare reports
          </button>
        </div>
      </div>

      <div className="divide-y divide-slate-100">
        {reports.map((report: any) => {
          const checked = selected.includes(report.REPORT_ID);

          const wrongType =
            pickedType !== null &&
            normalizeType(report.REPORT_TYPE) !== pickedType;

          const disabled =
            !checked && (wrongType || selected.length >= 2);

          return (
            <label
              key={report.REPORT_ID}
              className={`flex items-center gap-4 p-4 transition ${
                disabled
                  ? "cursor-not-allowed opacity-40"
                  : "cursor-pointer hover:bg-cyan-50/40"
              }`}
            >
              <input
                type="checkbox"
                checked={checked}
                disabled={disabled}
                onChange={() => toggle(report.REPORT_ID)}
                className="h-4 w-4 shrink-0 accent-cyan-600"
              />

              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-50">
                <FileText className="h-5 w-5 text-red-500" />
              </div>

              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-slate-900">
                  {report.REPORT_NAME}
                </p>

                <div className="mt-1 flex items-center gap-3">
                  <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-600">
                    {report.REPORT_TYPE}
                  </span>

                  <span className="flex items-center gap-1.5 text-xs text-slate-500">
                    <Calendar size={13} />
                    {formatDate(report.UPLOADED_DATE)}
                  </span>
                </div>
              </div>

              {wrongType && !checked && (
                <span className="shrink-0 text-xs text-slate-400">
                  Different type
                </span>
              )}

              <HealthScoreBadge score={report.HEALTH_SCORE ?? 0} />
            </label>
          );
        })}
      </div>
    </section>
  );
}
