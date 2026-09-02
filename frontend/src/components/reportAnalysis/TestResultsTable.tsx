import OrganTableCard from "./OrganTableCard";

export default function TestResultsTable({ analysis }: any) {
  return (
    <div className="space-y-3">
      <h2 className="text-sm font-semibold text-slate-900">
        Results by organ system
      </h2>

      {/* The first group opens by default so the page is not all collapsed. */}
      {analysis.map((organ: any, index: number) => (
        <OrganTableCard
          key={organ.organName}
          organ={organ}
          defaultOpen={index === 0}
        />
      ))}
    </div>
  );
}
