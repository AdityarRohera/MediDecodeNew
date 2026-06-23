


import ReportHeader from '../ReportHeader'
import HealthScoreCard from '../HealthScoreCard'
import StatsCard from '../StatsCard'
import ReportSummaryCard from '../ReportSummary'
import TestResultsTable from '../TestResultsTable'
import OrganSummaryCard from '../OrganSummaryCard'
import ReportInfoCard from '../ReportInfoCard'
import ActionsCard from '../ActionsCard'


function CompleteAnalysisUi({response} : any) {
  return (
    <div>

        {/* Header */}
                    <ReportHeader />
        
                    <div className="grid grid-cols-12 gap-6">
        
                        {/* Main Content */}
                        <main className="col-span-12 xl:col-span-9 space-y-6">
        
                            {/* Top Analytics */}
                            <section className="grid grid-cols-12 gap-6">
        
                                {/* Health Score */}
                                <div className="col-span-12 lg:col-span-3">
                                    <HealthScoreCard score={60} normalTests={response.NORMAL_TESTS} borderlineTests={response.BORDERLINE_TESTS} criticalTests={response.CRITICAL_TESTS}/>
                                </div>
        
                                {/* Stats + Summary */}
                                <div className="col-span-12 lg:col-span-9 space-y-6">
        
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
                                            subtitle="70% of total"
                                            variant="green"
                                        />
        
                                        <StatsCard
                                            title="Borderline"
                                            value={response.BORDERLINE_TESTS}
                                            subtitle="20% of total"
                                            variant="yellow"
                                        />
        
                                        <StatsCard
                                            title="Critical"
                                            value={response.CRITICAL_TESTS}
                                            subtitle="10% of total"
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
                        <aside className="col-span-12 xl:col-span-3 space-y-6">
        
                            <OrganSummaryCard analysis={response.analysis} />
        
                            <ReportInfoCard reportName={response.FILE_NAME} reportType="Hematology" fileSize="1" uploadedAt="" totalTests={response.analysis.length} totalOrgans={response.analysis.length}/>
        
                            <ActionsCard />
        
                        </aside>
        
                    </div>
      
    </div>
  )
}

export default CompleteAnalysisUi;

