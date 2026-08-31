import ReportHeader from '../ReportHeader'
import HealthScoreCard from '../HealthScoreCard'
import StatsCard from '../StatsCard'
import ReportSummaryCard from '../ReportSummary'
import TestResultsTable from '../TestResultsTable'
import OrganSummaryCard from '../OrganSummaryCard'
import ReportInfoCard from '../ReportInfoCard'
import ActionsCard from '../ActionsCard'
import ChatbotWidget from '@/components/chatbot/ChatbotWidget'


function CompleteAnalysisUi({response} : any) {

  const totalTests = response.TOTAL_TESTS || 0;

  const percentOf = (value: number) =>
    totalTests ? Math.round((value / totalTests) * 100) : 0;

  return (
    <div className="space-y-5 p-4 sm:p-6">

        {/* Header */}
                    <ReportHeader
                      reportName={response.REPORT_NAME || response.FILE_NAME}
                      reportId={response.REPORT_ID}
                      uploadedDate={response.UPLOADED_DATE}
                      healthStatus={response.HEALTH_STATUS}
                      fileUrl={response.FILE_URL}
                    />

                    <div className="grid grid-cols-12 gap-5">

                        {/* Main Content */}
                        <main className="col-span-12 xl:col-span-9 space-y-5">

                            {/* Top Analytics */}
                            <section className="grid grid-cols-12 gap-5">

                                {/* Health Score */}
                                <div className="col-span-12 lg:col-span-3">
                                    <HealthScoreCard score={response.HEALTH_SCORE ?? 0} normalTests={response.NORMAL_TESTS} borderlineTests={response.BORDERLINE_TESTS} criticalTests={response.CRITICAL_TESTS}/>
                                </div>

                                {/* Stats + Summary */}
                                <div className="col-span-12 lg:col-span-9 space-y-5">

                                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                                        <StatsCard
                                            title="Total Tests"
                                            value={response.TOTAL_TESTS}
                                            subtitle="Tests Performed"
                                            variant="purple"
                                        />

                                        <StatsCard
                                            title="Normal Tests"
                                            value={response.NORMAL_TESTS}
                                            subtitle={`${percentOf(response.NORMAL_TESTS)}% of total`}
                                            variant="green"
                                        />

                                        <StatsCard
                                            title="Borderline"
                                            value={response.BORDERLINE_TESTS}
                                            subtitle={`${percentOf(response.BORDERLINE_TESTS)}% of total`}
                                            variant="yellow"
                                        />

                                        <StatsCard
                                            title="Critical"
                                            value={response.CRITICAL_TESTS}
                                            subtitle={`${percentOf(response.CRITICAL_TESTS)}% of total`}
                                            variant="red"
                                        />
                                    </div>

                                    <ReportSummaryCard reportSummary={response.REPORT_SUMMARY} doctorRecommendation={response.DOCTOR_RECOMMENDATION} criticalTests={response.CRITICAL_TESTS} borderlineTests={response.BORDERLINE_TESTS} />

                                </div>
                            </section>

                            {/* Organ Test Results */}
                            <section>
                                <TestResultsTable analysis={response.analysis} />
                            </section>

                        </main>

                        {/* Right Sidebar */}
                        <aside className="col-span-12 xl:col-span-3 space-y-5">

                            <OrganSummaryCard analysis={response.analysis} />

                            <ReportInfoCard
                              reportName={response.REPORT_NAME || response.FILE_NAME}
                              reportType={response.REPORT_TYPE}
                              uploadedAt={response.UPLOADED_DATE}
                              analyzedAt={response.ANALYSIS_DATE}
                              totalTests={response.TOTAL_TESTS}
                              totalOrgans={response.analysis.length}
                            />

                            <ActionsCard />

                        </aside>

                    </div>

        <ChatbotWidget reportId={response["REPORT_ID"]}/>

    </div>
  )
}

export default CompleteAnalysisUi;
