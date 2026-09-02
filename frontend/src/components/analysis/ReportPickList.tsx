"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Calendar, Check, FileText, GitCompare } from "lucide-react";

import { HealthScoreBadge } from "@/components/reports/HealthScore";
import { formatDate, normalizeType } from "./shared";

const timeOf = (report: any) => new Date(report.UPLOADED_DATE).getTime();

export default function ReportPickList({ reports }: { reports: any[] }) {
  const router = useRouter();

  const [selected, setSelected] = useState<string[]>([]);

  /*
      Report type is free text from the AI, so the same lab report
      can come back as "Hematology" one time and "Blood Test" the
      next. Blocking on it would make most real pairs unselectable,
      so a mismatch is only flagged, never disabled.
  */
  const pickedType = selected.length
    ? normalizeType(
        reports.find((r: any) => r.REPORT_ID === selected[0])?.REPORT_TYPE
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

    router.push(`/analysis/compare?a=${a.REPORT_ID}&b=${b.REPORT_ID}`);
  };

  return (
    <section className="animate-fade-up overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-card">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 p-5">
        <div>
          <h2 className="text-sm font-semibold text-slate-900">
            Select two reports to compare
          </h2>

          <p className="mt-0.5 text-xs text-slate-500">
            Pick any two. Reports of the same type line up best.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs font-medium text-slate-500">
            {selected.length} of 2 selected
          </span>

          <button
            onClick={compare}
            disabled={selected.length !== 2}
            className="flex h-10 items-center gap-2 rounded-xl bg-brand-600 px-5 text-sm font-semibold text-white shadow-sm shadow-brand-900/20 transition hover:bg-brand-700 active:scale-[0.98] disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400 disabled:shadow-none"
          >
            <GitCompare size={16} />
            Compare
          </button>
        </div>
      </div>

      <div className="scrollbar-slim max-h-[430px] divide-y divide-slate-100 overflow-y-auto">
        {reports.map((report: any) => {
          const checked = selected.includes(report.REPORT_ID);

          const wrongType =
            pickedType !== null &&
            normalizeType(report.REPORT_TYPE) !== pickedType;

          const disabled = !checked && selected.length >= 2;

          return (
            <label
              key={report.REPORT_ID}
              className={`flex items-center gap-3.5 p-4 transition ${
                disabled
                  ? "cursor-not-allowed opacity-45"
                  : "cursor-pointer hover:bg-brand-50/40"
              } ${checked ? "bg-brand-50/60" : ""}`}
            >
              <input
                type="checkbox"
                checked={checked}
                disabled={disabled}
                onChange={() => toggle(report.REPORT_ID)}
                className="sr-only"
              />

              <span
                className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition ${
                  checked
                    ? "border-brand-600 bg-brand-600 text-white"
                    : "border-slate-300 bg-white"
                }`}
              >
                {checked && <Check size={13} strokeWidth={3} />}
              </span>

              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-50">
                <FileText className="h-5 w-5 text-red-500" />
              </span>

              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm font-semibold text-slate-900">
                  {report.REPORT_NAME || "Untitled report"}
                </span>

                <span className="mt-1 flex flex-wrap items-center gap-2.5">
                  <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-600">
                    {report.REPORT_TYPE || "Unknown"}
                  </span>

                  <span className="flex items-center gap-1.5 text-xs text-slate-500">
                    <Calendar size={13} />
                    {formatDate(report.UPLOADED_DATE)}
                  </span>

                  {wrongType && !checked && (
                    <span className="text-xs text-amber-600">
                      Different type
                    </span>
                  )}
                </span>
              </span>

              <HealthScoreBadge score={report.HEALTH_SCORE} />
            </label>
          );
        })}
      </div>
    </section>
  );
}
