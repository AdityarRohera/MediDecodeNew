import OrganTableCard from "./OrganTableCard";

export default function TestResultsTable({
  analysis,
}: any) {
  return (
    <div className="space-y-6">

      {analysis.map((organ : any) => (
        <OrganTableCard
          key={organ.organName}
          organ={organ}
        />
      ))}

    </div>
  );
}