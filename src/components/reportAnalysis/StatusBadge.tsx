type Props = {
  status: "Normal" | "Borderline" | "Critical";
};

export default function StatusBadge({
  status,
}: Props) {
  const styles = {
    Normal:
      "bg-emerald-50 text-emerald-700 border border-emerald-100",
    Borderline:
      "bg-amber-50 text-amber-700 border border-amber-100",
    Critical:
      "bg-red-50 text-red-700 border border-red-100",
  };

  return (
    <span
      className={`
        px-3
        py-1
        rounded-full
        text-xs
        font-semibold
        ${styles[status]}
      `}
    >
      {status}
    </span>
  );
}