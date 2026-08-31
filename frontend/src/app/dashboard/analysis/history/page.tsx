import { History } from "lucide-react";

import { getComparisonHistory } from "@/data/analysisData";

import HistoryTable from "@/components/analysis/HistoryTable";
import EmptyState from "@/components/analysis/EmptyState";
import SampleBadge from "@/components/analysis/SampleBadge";

export default function ComparisonHistoryPage() {
  // TODO: replace with GET /reports/comparisons once the API is ready.
  const items = getComparisonHistory();

  if (items.length === 0) {
    return (
      <EmptyState
        icon={History}
        title="No comparisons yet"
        message="Every time you compare two reports, it gets saved here so you can open it again later."
        actionLabel="Compare reports"
        actionHref="/dashboard/analysis/compare"
      />
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-500">
          {items.length} saved{" "}
          {items.length === 1 ? "comparison" : "comparisons"}
        </p>

        <SampleBadge />
      </div>

      <HistoryTable items={items} />
    </div>
  );
}
