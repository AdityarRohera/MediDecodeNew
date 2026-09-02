"use client";

import Link from "next/link";
import { Calendar, Eye, FileText, FlaskConical, Inbox } from "lucide-react";

import { HealthScoreBadge } from "./HealthScore";
import { StatusBadge } from "./StatusBadge";
import EmptyState from "@/components/common/EmptyState";
import { formatDate } from "@/components/analysis/shared";

type Report = {
  REPORT_ID: string;
  REPORT_NAME: string;
  REPORT_TYPE: string;
  UPLOADED_DATE: string;
  HEALTH_SCORE: number | null;
  HEALTH_STATUS: string | null;
  STATUS: string;
};

const isAnalyzed = (report: Report) =>
  report.STATUS?.toUpperCase() === "COMPLETED";

function RowActions({ report }: { report: Report }) {
  const analyzed = isAnalyzed(report);

  return (
    <Link
      href={`/reports/${report.REPORT_ID}`}
      title={analyzed ? "View analysis" : "Analyze this report"}
      className={
        analyzed
          ? "inline-flex h-9 items-center gap-1.5 rounded-lg border border-slate-200 px-3 text-xs font-semibold text-slate-700 transition hover:border-brand-300 hover:bg-brand-50 hover:text-brand-700"
          : "inline-flex h-9 items-center gap-1.5 rounded-lg bg-brand-600 px-3 text-xs font-semibold text-white transition hover:bg-brand-700"
      }
    >
      {analyzed ? <Eye size={15} /> : <FlaskConical size={15} />}
      {analyzed ? "View" : "Analyze"}
    </Link>
  );
}

export default function ReportTable({ reports }: { reports: Report[] }) {
  if (!reports?.length) {
    return (
      <EmptyState
        icon={Inbox}
        title="No reports here yet"
        message="Upload a lab report and MediDecode will explain every value, organ by organ, in under a minute."
        actionLabel="Upload your first report"
        actionHref="/upload"
        bordered={false}
      />
    );
  }

  return (
    <>
      {/* Desktop table */}
      <div className="hidden overflow-x-auto md:block">
        <table className="w-full min-w-[760px]">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50/80">
              <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                Report
              </th>

              <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                Type
              </th>

              <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                Uploaded
              </th>

              <th className="px-5 py-3 text-center text-xs font-semibold uppercase tracking-wider text-slate-500">
                Score
              </th>

              <th className="px-5 py-3 text-center text-xs font-semibold uppercase tracking-wider text-slate-500">
                Status
              </th>

              <th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wider text-slate-500">
                Action
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {reports.map((report, index) => (
              <tr
                key={report.REPORT_ID}
                style={{ animationDelay: `${index * 35}ms` }}
                className="animate-fade-up transition-colors hover:bg-brand-50/40"
              >
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-50">
                      <FileText className="h-5 w-5 text-red-500" />
                    </span>

                    <div className="min-w-0">
                      <Link
                        href={`/reports/${report.REPORT_ID}`}
                        className="block max-w-[260px] truncate text-sm font-semibold text-slate-900 transition hover:text-brand-700"
                      >
                        {report.REPORT_NAME || "Untitled report"}
                      </Link>

                      <p className="mt-0.5 font-mono text-xs text-slate-400">
                        {report.REPORT_ID.slice(0, 8)}
                      </p>
                    </div>
                  </div>
                </td>

                <td className="px-5 py-3.5">
                  <span className="inline-flex max-w-[160px] truncate rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700">
                    {report.REPORT_TYPE || "Unknown"}
                  </span>
                </td>

                <td className="px-5 py-3.5">
                  <span className="flex items-center gap-2 text-sm text-slate-600">
                    <Calendar size={15} className="text-slate-400" />
                    {formatDate(report.UPLOADED_DATE)}
                  </span>
                </td>

                <td className="px-5 py-3.5">
                  <div className="flex justify-center">
                    <HealthScoreBadge score={report.HEALTH_SCORE} />
                  </div>
                </td>

                <td className="px-5 py-3.5">
                  <div className="flex justify-center">
                    <StatusBadge
                      status={report.HEALTH_STATUS}
                      reportStatus={report.STATUS}
                    />
                  </div>
                </td>

                <td className="px-5 py-3.5">
                  <div className="flex justify-end">
                    <RowActions report={report} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="divide-y divide-slate-100 md:hidden">
        {reports.map((report, index) => (
          <div
            key={report.REPORT_ID}
            style={{ animationDelay: `${index * 35}ms` }}
            className="animate-fade-up p-4"
          >
            <div className="flex items-start gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-50">
                <FileText className="h-5 w-5 text-red-500" />
              </span>

              <div className="min-w-0 flex-1">
                <Link
                  href={`/reports/${report.REPORT_ID}`}
                  className="block truncate text-sm font-semibold text-slate-900"
                >
                  {report.REPORT_NAME || "Untitled report"}
                </Link>

                <p className="mt-1 flex items-center gap-2 text-xs text-slate-500">
                  <Calendar size={13} />
                  {formatDate(report.UPLOADED_DATE)}
                </p>
              </div>

              <HealthScoreBadge score={report.HEALTH_SCORE} />
            </div>

            <div className="mt-3 flex items-center justify-between gap-3">
              <div className="flex min-w-0 items-center gap-2">
                <span className="truncate rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700">
                  {report.REPORT_TYPE || "Unknown"}
                </span>

                <StatusBadge
                  status={report.HEALTH_STATUS}
                  reportStatus={report.STATUS}
                />
              </div>

              <RowActions report={report} />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
