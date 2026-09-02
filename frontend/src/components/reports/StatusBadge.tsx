import {
  CheckCircle2,
  Clock3,
  Loader2,
  Siren,
  TriangleAlert,
  XCircle,
} from "lucide-react";

type Props = {
  // Health outcome from the analysis, missing until it finishes.
  status?: string | null;
  // Pipeline status of the report itself.
  reportStatus?: string | null;
};

const healthStyles: Record<
  string,
  { label: string; className: string; icon: typeof CheckCircle2 }
> = {
  GOOD: {
    label: "Healthy",
    className: "bg-emerald-50 text-emerald-700",
    icon: CheckCircle2,
  },
  NEEDS_REVIEW: {
    label: "Needs review",
    className: "bg-amber-50 text-amber-700",
    icon: TriangleAlert,
  },
  CRITICAL: {
    label: "Critical",
    className: "bg-red-50 text-red-700",
    icon: Siren,
  },
};

const pipelineStyles: Record<
  string,
  { label: string; className: string; icon: typeof CheckCircle2 }
> = {
  UPLOADED: {
    label: "Not analyzed",
    className: "bg-slate-100 text-slate-600",
    icon: Clock3,
  },
  PROCESSING: {
    label: "Analyzing",
    className: "bg-blue-50 text-blue-700",
    icon: Loader2,
  },
  FAILED: {
    label: "Failed",
    className: "bg-red-50 text-red-700",
    icon: XCircle,
  },
};

export function StatusBadge({ status, reportStatus }: Props) {
  const pipeline = (reportStatus || "").toUpperCase();

  // Before the analysis completes, the pipeline state is the truth.
  const config =
    pipeline && pipeline !== "COMPLETED"
      ? pipelineStyles[pipeline]
      : healthStyles[(status || "").toUpperCase()];

  const resolved = config ?? {
    label: "Pending",
    className: "bg-slate-100 text-slate-600",
    icon: Clock3,
  };

  const Icon = resolved.icon;

  return (
    <span
      className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-semibold ${resolved.className}`}
    >
      <Icon
        size={14}
        className={pipeline === "PROCESSING" ? "animate-spin" : ""}
      />
      {resolved.label}
    </span>
  );
}
