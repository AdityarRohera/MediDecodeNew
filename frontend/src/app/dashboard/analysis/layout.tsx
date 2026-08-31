import AnalysisTabs from "@/components/analysis/AnalysisTabs";

export default function AnalysisLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-5">
        <div className="max-w-2xl">
          <span className="inline-flex rounded-full border border-cyan-200 bg-cyan-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-cyan-700">
            Analysis
          </span>

          <h1 className="mt-3 text-3xl font-bold text-slate-950">
            Track your progress
          </h1>

          <p className="mt-1.5 text-slate-500">
            See how your health markers moved across reports, and
            compare any two reports side by side.
          </p>
        </div>

        <AnalysisTabs />

        {children}
      </div>
    </div>
  );
}
