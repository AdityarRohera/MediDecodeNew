import ReportHeader from "../ReportHeader";
import HealthScoreCard from "../HealthScoreCard";
import StatsCard from "../StatsCard";
import ReportSummaryCard from "../ReportSummary";
import TestResultsTable from "../TestResultsTable";
import OrganSummaryCard from "../OrganSummaryCard";
import ReportInfoCard from "../ReportInfoCard";
import ActionsCard from "../ActionsCard";
import ChatbotWidget from "@/components/chatbot/ChatbotWidget";

function CompleteAnalysisUi({ response }: any) {
  const totalTests = response.TOTAL_TESTS || 0;

  const percentOf = (value: number) =>
    totalTests ? Math.round(((value || 0) / totalTests) * 100) : 0;

  const analysis = response.analysis ?? [];

  return (
    <div className="animate-fade-up space-y-4">
      <ReportHeader
        reportName={response.REPORT_NAME || response.FILE_NAME}
        reportId={response.REPORT_ID}
        uploadedDate={response.UPLOADED_DATE}
        healthStatus={response.HEALTH_STATUS}
        fileUrl={response.FILE_URL}
      />

      <div className="grid grid-cols-12 gap-4">
        <main className="col-span-12 space-y-4 xl:col-span-9">
          <section className="grid grid-cols-12 gap-4">
            <div className="col-span-12 lg:col-span-4 xl:col-span-3">
              <HealthScoreCard
                score={response.HEALTH_SCORE ?? 0}
                normalTests={response.NORMAL_TESTS}
                borderlineTests={response.BORDERLINE_TESTS}
                criticalTests={response.CRITICAL_TESTS}
              />
            </div>

            <div className="col-span-12 space-y-4 lg:col-span-8 xl:col-span-9">
              <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
                <StatsCard
                  title="Total tests"
                  value={response.TOTAL_TESTS}
                  subtitle="Performed"
                  variant="purple"
                />

                <StatsCard
                  title="Normal"
                  value={response.NORMAL_TESTS}
                  subtitle={`${percentOf(response.NORMAL_TESTS)}%`}
                  variant="green"
                />

                <StatsCard
                  title="Borderline"
                  value={response.BORDERLINE_TESTS}
                  subtitle={`${percentOf(response.BORDERLINE_TESTS)}%`}
                  variant="yellow"
                />

                <StatsCard
                  title="Critical"
                  value={response.CRITICAL_TESTS}
                  subtitle={`${percentOf(response.CRITICAL_TESTS)}%`}
                  variant="red"
                />
              </div>

              <ReportSummaryCard
                reportSummary={response.REPORT_SUMMARY}
                doctorRecommendation={response.DOCTOR_RECOMMENDATION}
                criticalTests={response.CRITICAL_TESTS}
                borderlineTests={response.BORDERLINE_TESTS}
              />
            </div>
          </section>

          <TestResultsTable analysis={analysis} />
        </main>

        <aside className="col-span-12 space-y-4 xl:col-span-3">
          <OrganSummaryCard analysis={analysis} />

          <ReportInfoCard
            reportName={response.REPORT_NAME || response.FILE_NAME}
            reportType={response.REPORT_TYPE}
            uploadedAt={response.UPLOADED_DATE}
            analyzedAt={response.ANALYSIS_DATE}
            totalTests={response.TOTAL_TESTS}
            totalOrgans={analysis.length}
          />

          <ActionsCard fileUrl={response.FILE_URL} />
        </aside>
      </div>

      <ChatbotWidget reportId={response.REPORT_ID} />
    </div>
  );
}

export default CompleteAnalysisUi;
