import { cookies } from "next/headers";
import { TriangleAlert } from "lucide-react";

import { fetchAllreports } from "@/services/operations/reports/report";

import WelcomeBanner from "@/components/reports/WelcomeBanner";
import ReportsStats from "@/components/reports/ReportsStats";
import ReportsFilters from "@/components/reports/ReportFilter";
import ReportTabs from "@/components/reports/ReportTabs";
import ReportTable from "@/components/reports/ReportTable";
import ReportsPagination from "@/components/reports/ReportPagination";
import EmptyState from "@/components/common/EmptyState";

export default async function ReportsPage({ searchParams }: any) {
  const param = await searchParams;
  const cookieStore = await cookies();

  let reports: any[] = [];
  let failed = false;

  try {
    const res = await fetchAllreports(param, cookieStore);

    reports = res.data ?? [];
  } catch (err) {
    console.log("---------Error comes in getting all reports------", err);

    failed = true;
  }

  const totalReports = reports.length;

  const healthyReportsCount = reports.filter(
    (report: any) => report.HEALTH_STATUS === "GOOD"
  ).length;

  const attentionNeededCount = reports.filter(
    (report: any) =>
      report.HEALTH_STATUS === "NEEDS_REVIEW" ||
      report.HEALTH_STATUS === "CRITICAL"
  ).length;

  const scoredReports = reports.filter(
    (report: any) => typeof report.HEALTH_SCORE === "number"
  );

  const averageScore = scoredReports.length
    ? Math.round(
        scoredReports.reduce(
          (sum: number, report: any) => sum + report.HEALTH_SCORE,
          0
        ) / scoredReports.length
      )
    : 0;

  /*
      The API does not return a total, so a full page is treated as
      a sign that there is probably another one behind it.
  */
  const currentPage = Number(param?.page) || 1;
  const pageLimit = Number(param?.limit) || 10;
  const hasNextPage = reports.length === pageLimit;

  if (failed) {
    return (
      <EmptyState
        icon={TriangleAlert}
        tone="danger"
        title="We could not load your reports"
        message="Something went wrong while talking to the server. Refresh the page and try again in a moment."
      />
    );
  }

  return (
    <div className="space-y-4">
      {param?.welcome && <WelcomeBanner />}

      <ReportsStats
        TotalReports={totalReports}
        HealtyReports={healthyReportsCount}
        AttentionReports={attentionNeededCount}
        AverageScore={averageScore}
      />

      <section className="animate-fade-up overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-card">
        <ReportTabs />

        <ReportsFilters appliedFilters={param} />

        <ReportTable reports={reports} />

        <ReportsPagination
          currentPage={currentPage}
          hasNextPage={hasNextPage}
          showing={totalReports}
        />
      </section>
    </div>
  );
}
