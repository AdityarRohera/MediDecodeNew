

import StatsCard from "../reportAnalysis/StatsCard";

// type ReportsStatsProps = {
//   reports?: unknown[];
// };

function ReportsStats({ TotalReports , HealtyReports , AttentionReports}: any) {
  // const totalReports = reports.length || 25;

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <StatsCard
        title="Total Reports"
        value={TotalReports || 0}
        subtitle="+4 this month"
        variant="purple"
      />

      <StatsCard
        title="Healthy"
        value={HealtyReports || 0}
        subtitle="72% stable"
        variant="green"
      />

      <StatsCard
        title="Attention Needed"
        value={AttentionReports || 0}
        subtitle="Review soon"
        variant="yellow"
      />

      <StatsCard
        title="Average Score"
        value={HealtyReports/TotalReports*100 || 0}
        subtitle="Good range"
        variant="green"
      />
    </div>
  );
}

export default ReportsStats;
