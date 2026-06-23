import ReportsHeader from "@/components/reports/ReportHeader";
import ReportsStats from "@/components/reports/ReportsStats";
import ReportsFilters from "@/components/reports/ReportFilter";
import ReportTable from "@/components/reports/ReportTable";
import ReportsPagination from "@/components/reports/ReportPagination";
import { cookies } from "next/headers";
import { fetchAllreports } from "@/services/operations/reports/report";

export default async function ReportsPage({searchParams} : any) {

  const param = await searchParams;
  console.log("Geting params in reports server component -------------" , param);

  const cookieStore = await cookies();
  let reports: unknown[] = []; // api response

  try{
      const res = await fetchAllreports(cookieStore);
      reports = res.data;
      console.log("Getting reports of user ---->" , reports);
    
  } catch(err) {
      console.log("---------Error comes in getting all reports------" , err);
  }

  // Getting Total reports
  const TotalReports = reports.length;
  const healthyReportsCount = reports.filter((report: any) => report['HEALTH_STATUS'] === 'GOOD').length;
  const AttentionNeededCount = reports.filter((report : any) => report['HEALTH_STATUS'] === 'NEEDS_REVIEW' || report['HEALTH_STATUS'] === 'CRITICAL').length;


  console.log(TotalReports , "  " , healthyReportsCount , " " , AttentionNeededCount);

  return (
      <main className="min-h-screen bg-slate-50 px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <ReportsHeader />

        <ReportsStats TotalReports={TotalReports} HealtyReports={healthyReportsCount} AttentionReports={AttentionNeededCount} />

        <section className="rounded-lg border border-slate-200 bg-white shadow-sm">
          <ReportsFilters />
          <ReportTable reports={reports}/>
          <ReportsPagination currentPage={1} totalPages={5} />

        </section>
      </div>
    </main>
    
  );
}
