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
    response = (await fullReportAnalysis(reportId, cookieStore)).data;
  } catch (error) {
    console.log("-------Error comes in loading report-------", error);

    return <ErrorState title="Unable to load report" />;
  }

  if (!response) {
    return <NotFoundState />;
  }

  switch (response.STATUS) {
    case "UPLOADED":
      return <UploadedState reportId={reportId} />;

    case "PROCESSING":
      return <ProcessingState />;

    case "FAILED":
      return <FailedState reportId={reportId} />;

    case "COMPLETED":
      return <CompletedReport response={response} />;

    default:
      return <ErrorState title="Invalid report status" />;
  }
}
