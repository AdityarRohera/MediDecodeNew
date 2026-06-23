

export type ReportStatus = "GOOD" | "ATTENTION" | "CRITICAL";

export function StatusBadge({ status }: { status: ReportStatus }) {
  const styles = {
    GOOD:
      "bg-emerald-50 text-emerald-700 ring-emerald-600/10",

    ATTENTION:
      "bg-amber-50 text-amber-700 ring-amber-600/10",

    CRITICAL:
      "bg-red-50 text-red-700 ring-red-600/10",
  };

  return (
    <span
      className={`
        inline-flex
        rounded-full
        px-2.5
        py-1
        text-xs
        font-semibold
        ring-1
        ring-inset
        ${styles[status]}
    `}
    >
      {status === "ATTENTION" ? "Needs review" : status.toLowerCase()}
    </span>
  );
}
