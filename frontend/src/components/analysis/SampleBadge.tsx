// Marks a block that is still rendering sample data
// because its API endpoint is not built yet.
export default function SampleBadge() {
  return (
    <span className="shrink-0 rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-[11px] font-medium text-slate-500">
      Sample data
    </span>
  );
}
