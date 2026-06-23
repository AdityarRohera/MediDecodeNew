// import HealthScoreCard from "@/components/reportAnalysis/HealthScoreCard";
// import OrganSummaryCard from "@/components/reportAnalysis/OrganSummaryCard";
// import ReportHeader from "@/components/reportAnalysis/ReportHeader";
// import ReportSummaryCard from "@/components/reportAnalysis/ReportSummary";
// import StatsCard from "@/components/reportAnalysis/StatsCard";
// import ReportInfoCard from "@/components/reportAnalysis/ReportInfoCard";
// import ActionsCard from "@/components/reportAnalysis/ActionsCard";
// import TestResultsTable from "@/components/reportAnalysis/TestResultsTable";
// // import { analysis } from "@/data/reportData";
// import { cookies } from "next/headers";
// import { analyseReport, fullReportAnalysis } from "@/services/operations/reports/report";

// export default async function ReportAnalysisPage({params} : any) {

//     // getting full single report analysis
//     const { reportId } = await params;
//     const cookieStore = await cookies();
//     let response : any;

//     try{

//          response = (await fullReportAnalysis(reportId , cookieStore)).data;
//         // console.log("--------geting response---------" , response);

//     } catch(err){
//         console.log("---------Error comes in getting full analysis report ---------" , err);
//     }

//     console.log("--------geting response 1 ---------" , response);


//     if(response.STATUS === 'UPLOADED' && !response.ANALYSIS_DATE){
        
//         try{

//             // NOW analysis this report
//             response = (await analyseReport(cookieStore , reportId)).data;
//             console.log("--------geting response---------" , response);

//         } catch (err){
//             console.log("---------Error comes in analysing full report ---------" , err);
//         }

//     }

//     console.log("--------geting response 2 ---------" , response);


//     return (
//         <div className="space-y-6 p-1 px-5">

//             {/* Header */}
//             <ReportHeader />

//             <div className="grid grid-cols-12 gap-6">

//                 {/* Main Content */}
//                 <main className="col-span-12 xl:col-span-9 space-y-6">

//                     {/* Top Analytics */}
//                     <section className="grid grid-cols-12 gap-6">

//                         {/* Health Score */}
//                         <div className="col-span-12 lg:col-span-3">
//                             <HealthScoreCard score={60} normalTests={response.NORMAL_TESTS} borderlineTests={response.BORDERLINE_TESTS} criticalTests={response.CRITICAL_TESTS}/>
//                         </div>

//                         {/* Stats + Summary */}
//                         <div className="col-span-12 lg:col-span-9 space-y-6">

//                             <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
//                                 <StatsCard
//                                     title="Total Tests"
//                                     value={response.TOTAL_TESTS}
//                                     subtitle="Tests Performed"
//                                     variant="purple"
//                                 />

//                                 <StatsCard
//                                     title="Normal Tests"
//                                     value={response.NORMAL_TESTS}
//                                     subtitle="70% of total"
//                                     variant="green"
//                                 />

//                                 <StatsCard
//                                     title="Borderline"
//                                     value={response.BORDERLINE_TESTS}
//                                     subtitle="20% of total"
//                                     variant="yellow"
//                                 />

//                                 <StatsCard
//                                     title="Critical"
//                                     value={response.CRITICAL_TESTS}
//                                     subtitle="10% of total"
//                                     variant="red"
//                                 />
//                             </div>

//                             <ReportSummaryCard reportSummary={response.REPORT_SUMMARY} doctorRecommendation={response.DOCTOR_RECOMMENDATION} criticalTests={response.CRITICAL_TESTS} borderlineTests={response.BORDERLINE_TESTS} />

//                         </div>
//                     </section>

//                     {/* Organ Test Results */}
//                     <section>
//                         <TestResultsTable analysis={response.analysis} />
//                     </section>

//                 </main>

//                 {/* Right Sidebar */}
//                 <aside className="col-span-12 xl:col-span-3 space-y-6">

//                     <OrganSummaryCard analysis={response.analysis} />

//                     <ReportInfoCard reportName={response.FILE_NAME} reportType="Hematology" fileSize="1" uploadedAt="" totalTests={response.analysis.length} totalOrgans={response.analysis.length}/>

//                     <ActionsCard />

//                 </aside>

//             </div>
//         </div>
//     );
// }


import { cookies } from "next/headers";
import { fullReportAnalysis } from "@/services/operations/reports/report";

import ErrorState from "@/components/reportAnalysis/states/ErrorState";
import NotFoundState from "@/components/reportAnalysis/states/NotFoundState";
import UploadedState from "@/components/reportAnalysis/states/UploadedState";
import ProcessingState from "@/components/reportAnalysis/states/ProcessingUi";
import FailedState from "@/components/reportAnalysis/states/FailedUi";
import CompletedReport from "@/components/reportAnalysis/states/CompleteAnalysisUi";

export default async function ReportPage({
  params,
}: {
  params: Promise<{ reportId: string }>;
}) {

  const { reportId } = await params;
  const cookieStore = await cookies();

  let response;

  try {

    response = (
      await fullReportAnalysis(
        reportId,
        cookieStore
      )
    ).data;

    console.log("Getting response in report page first " , response)

  } catch (error) {

    return (
      <ErrorState
        title="Unable to load report"
      />
    );
  }

  if (!response) {
    return <NotFoundState />;
  }

  switch (response.STATUS) {

    case "UPLOADED":
      return (
        <UploadedState
          reportId={reportId}
        />
      );

    case "PROCESSING":
      return <ProcessingState />;

    case "FAILED":
      return (
        <FailedState
          reportId={reportId}
        />
      );

    case "COMPLETED":
      return (
        <CompletedReport
          response={response}
        />
      );

    default:
      return (
        <ErrorState
          title="Invalid Report Status"
        />
      );
  }
}