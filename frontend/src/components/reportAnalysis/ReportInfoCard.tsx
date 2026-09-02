import { BadgeCheck, Calendar, FileText, Microscope } from "lucide-react";

interface Props {
  reportName: string;
  reportType: string;
  uploadedAt: string;
  analyzedAt: string;
  totalTests: number;
  totalOrgans: number;
}

const formatDate = (date: string) =>
  date
    ? new Date(date).toLocaleDateString("en-IN", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "-";

export default function ReportInfoCard({
  reportName,
  reportType,
  uploadedAt,
  analyzedAt,
  totalTests,
  totalOrgans,
}: Props) {

  const rows = [
    { icon: Microscope, label: "Report type", value: reportType || "General" },
    { icon: Calendar, label: "Uploaded", value: formatDate(uploadedAt) },
    { icon: BadgeCheck, label: "Analyzed on", value: formatDate(analyzedAt) },
  ];

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-card">
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50">
          <FileText className="h-5 w-5 text-brand-600" />
        </span>

        <div className="min-w-0">
          <h2 className="text-sm font-semibold text-slate-900">
            Report details
          </h2>

          <p className="truncate text-xs text-slate-500">{reportName}</p>
        </div>
      </div>

      <div className="mt-4 space-y-3">
        {rows.map((row) => {
          const Icon = row.icon;

          return (
            <div key={row.label} className="flex items-center gap-3">
              <Icon className="h-4 w-4 shrink-0 text-slate-400" />

              <div className="min-w-0">
                <p className="text-xs text-slate-400">{row.label}</p>

                <p className="truncate text-sm font-medium text-slate-800">
                  {row.value}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3 border-t border-slate-100 pt-4">
        <div className="rounded-xl bg-slate-50 p-3 text-center">
          <p className="text-xl font-semibold text-slate-950">
            {totalTests ?? 0}
          </p>

          <p className="mt-0.5 text-xs text-slate-500">Tests</p>
        </div>

        <div className="rounded-xl bg-slate-50 p-3 text-center">
          <p className="text-xl font-semibold text-slate-950">
            {totalOrgans ?? 0}
          </p>

          <p className="mt-0.5 text-xs text-slate-500">Organs</p>
        </div>
      </div>
    </div>
  );
}
