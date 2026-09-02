import { cookies } from "next/headers";
import { History, TriangleAlert } from "lucide-react";

import { fetchAllComparisons } from "@/services/operations/reports/report";

import HistoryTable, {
  ComparisonHistoryItem,
} from "@/components/analysis/HistoryTable";
import EmptyState from "@/components/common/EmptyState";

export default async function ComparisonHistoryPage() {
  const cookieStore = await cookies();

  let items: ComparisonHistoryItem[] = [];
  let total = 0;
  let failed = false;

  try {
    const res = await fetchAllComparisons({ limit: 50 }, cookieStore);

    items = res.data?.items ?? [];
    total = res.data?.total ?? items.length;
  } catch (err) {
    console.log("-------Error comes in comparison history-------", err);

    failed = true;
  }

  if (failed) {
    return (
      <EmptyState
        icon={TriangleAlert}
        tone="danger"
        title="Could not load your history"
        message="Something went wrong while fetching your saved comparisons. Please refresh the page and try again."
      />
    );
  }

  if (items.length === 0) {
    return (
      <EmptyState
        icon={History}
        title="No comparisons yet"
        message="Every time you compare two reports, it gets saved here so you can open it again later."
        actionLabel="Compare reports"
        actionHref="/analysis/compare"
      />
    );
  }

  return (
    <div className="space-y-4">
      <p className="text-sm text-slate-500">
        {total} saved {total === 1 ? "comparison" : "comparisons"}
      </p>

      <HistoryTable items={items} />
    </div>
  );
}
