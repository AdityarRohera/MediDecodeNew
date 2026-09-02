import { cookies } from "next/headers";
import { FileText } from "lucide-react";

import { fetchAllreports } from "@/services/operations/reports/report";
import { getOrganMatrix } from "@/data/analysisData";

import ScoreTrend from "@/components/analysis/ScoreTrend";
import OrganMatrix from "@/components/analysis/OrganMatrix";
import ComparableGroups, {
  ComparableGroup,
} from "@/components/analysis/ComparableGroups";
import ChangeSinceLast from "@/components/analysis/ChangeSinceLast";
import { normalizeType } from "@/components/analysis/shared";
import EmptyState from "@/components/common/EmptyState";

export default async function AnalysisOverviewPage() {
  const cookieStore = await cookies();

  let reports: any[] = [];

  try {
    const res = await fetchAllreports({status : 'COMPLETED'} , cookieStore);

    reports = res.data ?? [];
  } catch (err) {
    console.log("-------Error comes in analysis overview-------", err);
  }

  // Oldest first, so the trend reads left to right.
  const analyzed = reports
    .filter((report: any) => report.STATUS === "COMPLETED")
    .sort(
      (a: any, b: any) =>
        new Date(a.UPLOADED_DATE).getTime() -
        new Date(b.UPLOADED_DATE).getTime()
    );

  if (analyzed.length < 2) {
    return (
      <EmptyState
        icon={FileText}
        title="Not enough reports yet"
        message="You need at least two analyzed reports before we can show a trend. Upload one more to get started."
        actionLabel="Upload report"
        actionHref="/upload"
      />
    );
  }

  const points = analyzed.map((report: any) => ({
    reportId: report.REPORT_ID,
    score: report.HEALTH_SCORE ?? 0,
    date: report.UPLOADED_DATE,
  }));

  const previous = analyzed[analyzed.length - 2];
  const latest = analyzed[analyzed.length - 1];

  const diff = (key: string) =>
    (latest[key] ?? 0) - (previous[key] ?? 0);

  // Group by report type so we know which reports can be compared.
  const groups: ComparableGroup[] = Object.values(
    analyzed.reduce((acc: any, report: any) => {
      const type = normalizeType(report.REPORT_TYPE);

      if (!acc[type]) {
        acc[type] = { reportType: type, count: 0, latestTwo: [] };
      }

      acc[type].count += 1;

      // Newest two ids, oldest of the pair first.
      acc[type].latestTwo = [
        ...acc[type].latestTwo,
        report.REPORT_ID,
      ].slice(-2);

      return acc;
    }, {})
  );

  const matrix = getOrganMatrix();

  return (
    <div className="space-y-4">
      <ScoreTrend points={points} />

      <div className="grid gap-4 lg:grid-cols-2">
        <OrganMatrix
          columns={matrix.columns}
          rows={matrix.rows}
        />

        <div className="space-y-4">
          <ChangeSinceLast
            normal={diff("NORMAL_TESTS")}
            borderline={diff("BORDERLINE_TESTS")}
            critical={diff("CRITICAL_TESTS")}
          />

          <ComparableGroups groups={groups} />
        </div>
      </div>
    </div>
  );
}
