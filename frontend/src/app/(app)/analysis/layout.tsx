import AnalysisTabs from "@/components/analysis/AnalysisTabs";

export default function AnalysisLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-4">
      <AnalysisTabs />

      {children}
    </div>
  );
}
