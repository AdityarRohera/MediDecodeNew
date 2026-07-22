"use client"

import {
  Calendar,
  Eye,
  FileText,
  FlaskConical,
  MoreVertical,
} from "lucide-react";

import { HealthScoreBadge } from "./HealthScore";
import { ReportStatus, StatusBadge } from "./StatusBadge";
import { useRouter } from "next/navigation";

export default function ReportTable({ reports }: any) {

  const router = useRouter();

  console.log("Geting report --------------------------> " , reports);
  return (
    <div className="overflow-hidden rounded-b-xl">
      <table className="w-full">
        <thead className="sticky top-0 bg-slate-50">
          <tr className="border-b border-slate-200">
            <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
              Report
            </th>

            <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
              Type
            </th>

            <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
              Uploaded
            </th>

            <th className="px-6 py-3 text-center text-xs font-semibold uppercase tracking-wider text-slate-500">
              Score
            </th>

            <th className="px-6 py-3 text-center text-xs font-semibold uppercase tracking-wider text-slate-500">
              Status
            </th>

            <th className="px-6 py-3 text-right text-xs font-semibold uppercase tracking-wider text-slate-500">
              Actions
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-slate-100 bg-white">
          {reports.map((report: any) => {
            const analyzed =
              report.STATUS?.toLowerCase() === "completed";

            return (
              <tr
                key={report.REPORT_ID}
                className="transition-all duration-200 hover:bg-cyan-50/40"
              >
                {/* Report */}

                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-50">
                      <FileText className="h-5 w-5 text-red-500" />
                    </div>

                    <div>
                      <h3 className="font-semibold text-slate-900">
                        {report.REPORT_NAME}
                      </h3>

                      <p className="mt-1 text-xs text-slate-500">
                        {report.REPORT_ID.slice(0, 8)}
                      </p>
                    </div>
                  </div>
                </td>

                {/* Type */}

                <td className="px-6 py-4">
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
                    {report.REPORT_TYPE}
                  </span>
                </td>

                {/* Date */}

                <td className="px-6 py-4">
                  <div className="flex items-center gap-2 text-slate-600">
                    <Calendar size={15} />
                    {report.UPLOADED_DATE.slice(0, 10)}
                  </div>
                </td>

                {/* Score */}

                <td className="px-6 py-4 text-center">
                  <HealthScoreBadge
                    score={report.HEALTH_SCORE ?? 50}
                  />
                </td>

                {/* Status */}

                <td className="px-6 py-4 text-center">
                  <StatusBadge
                    status={
                      (report.HEALTH_STATUS || "GOOD") as ReportStatus
                    }
                  />
                </td>

                {/* Actions */}

                <td className="px-6 py-4">
                  <div className="flex items-center justify-end gap-2">
                    {analyzed ? (
                      <button
                      onClick={() => router.push(`/dashboard/reports/${report.REPORT_ID}`)}
                        title="View Analysis"
                        className="rounded-lg border border-slate-200 p-2.5 transition hover:border-cyan-500 hover:bg-cyan-50"
                      >
                        <Eye
                          size={18}
                          className="text-cyan-600"
                        />
                      </button>
                    ) : (
                      <button className="flex items-center gap-2 rounded-lg bg-cyan-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-cyan-700">
                        <FlaskConical size={16} />
                        Analyze
                      </button>
                    )}

                    <button className="rounded-lg border border-slate-200 p-2.5 transition hover:bg-slate-100">
                      <MoreVertical
                        size={18}
                        className="text-slate-500"
                      />
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}