// Marks a block that is still rendering sample data
// because its API endpoint is not built yet.
export default function SampleBadge() {
  return (
    <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-medium text-slate-500">
      Sample data
    </span>
  );
}
