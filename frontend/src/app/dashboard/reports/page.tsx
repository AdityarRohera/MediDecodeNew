import ReportsHeader from "@/components/reports/ReportHeader";
import ReportsStats from "@/components/reports/ReportsStats";
import ReportsFilters from "@/components/reports/ReportFilter";
import ReportTable from "@/components/reports/ReportTable";
import ReportsPagination from "@/components/reports/ReportPagination";
import { cookies } from "next/headers";
import { fetchAllreports } from "@/services/operations/reports/report";
import ReportTabs from "@/components/reports/ReportTabs";

export default async function ReportsPage({searchParams} : any) {

  const param = await searchParams;
  console.log("Geting params in reports server component -------------" , param);

  const cookieStore = await cookies();
  let reports: unknown[] = []; // api response


  try{
      const res = await fetchAllreports(param , cookieStore);
      reports = res.data;
      console.log("Getting reports of user ---->" , reports);
    
  } catch(err) {
      console.log("---------Error comes in getting all reports------" , err);
  }


  // Getting Total reports
  const TotalReports = reports.length;
  const healthyReportsCount = reports.filter((report: any) => report['HEALTH_STATUS'] === 'GOOD').length;
  const AttentionNeededCount = reports.filter((report : any) => report['HEALTH_STATUS'] === 'NEEDS_REVIEW' || report['HEALTH_STATUS'] === 'CRITICAL').length;

  const scoredReports = reports.filter((report: any) => typeof report['HEALTH_SCORE'] === 'number');
  const averageScore = scoredReports.length
    ? Math.round(scoredReports.reduce((sum: number, report: any) => sum + report['HEALTH_SCORE'], 0) / scoredReports.length)
    : 0;

  // Pagination is derived from the actual result count since the API
  // doesn't return a total — a full page means there's likely a next one.
  const currentPage = Number(param?.page) || 1;
  const pageLimit = Number(param?.limit) || 10;
  const hasNextPage = reports.length === pageLimit;

  console.log(TotalReports , "  " , healthyReportsCount , " " , AttentionNeededCount);

  return (
      <main className="px-4 py-5 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-5">
        <ReportsHeader />

        <ReportsStats TotalReports={TotalReports} HealtyReports={healthyReportsCount} AttentionReports={AttentionNeededCount} AverageScore={averageScore} />

        <section className="rounded-lg border border-slate-200 bg-white shadow-sm">
          <ReportTabs/>
          <ReportsFilters appliedFilters={param}/>
          <ReportTable reports={reports}/>
          <ReportsPagination currentPage={currentPage} hasNextPage={hasNextPage} />

        </section>
      </div>
    </main>
    
  );
}
