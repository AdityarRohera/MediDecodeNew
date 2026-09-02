type Props = {
  status: "Normal" | "Borderline" | "Critical";
};

const styles = {
  Normal: "bg-emerald-50 text-emerald-700",
  Borderline: "bg-amber-50 text-amber-700",
  Critical: "bg-red-50 text-red-700",
};

export default function StatusBadge({ status }: Props) {
  return (
    <span
      className={`rounded-full px-2.5 py-1 text-xs font-semibold ${styles[status]}`}
    >
      {status}
    </span>
  );
}
