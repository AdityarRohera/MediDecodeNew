

import StatsCard from "../reportAnalysis/StatsCard";

// type ReportsStatsProps = {
//   reports?: unknown[];
// };

function ReportsStats({ TotalReports , HealtyReports , AttentionReports , AverageScore}: any) {

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <StatsCard
        title="Total Reports"
        value={TotalReports || 0}
        subtitle="All uploaded reports"
        variant="purple"
      />

      <StatsCard
        title="Healthy"
        value={HealtyReports || 0}
        subtitle="Reports in good health"
        variant="green"
      />

      <StatsCard
        title="Attention Needed"
        value={AttentionReports || 0}
        subtitle="Reports to review"
        variant="yellow"
      />

      <StatsCard
        title="Average Score"
        value={AverageScore || 0}
        subtitle="Across analyzed reports"
        variant="green"
      />
    </div>
  );
}

export default ReportsStats;
