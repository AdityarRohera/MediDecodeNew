import { CheckCircle2, Clock3 } from "lucide-react";

export type ReportStatus = "GOOD" | "ATTENTION" | "PENDING";

export function StatusBadge({
  status,
}: {
  status: ReportStatus;
}) {
  switch (status) {
    case "GOOD":
      return (
        <span className="flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700">
          <CheckCircle2 size={16} />
          Healthy
        </span>
      );

    case "ATTENTION":
      return (
        <span className="rounded-full bg-amber-50 px-4 py-2 text-sm font-semibold text-amber-700">
          Attention
        </span>
      );

    default:
      return (
        <span className="flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-600">
          <Clock3 size={16} />
          Pending
        </span>
      );
  }
}