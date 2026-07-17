import { GitCompare, FileText, TrendingUp } from "lucide-react";
import Link from "next/link";

export default function AnalysisPage() {
  return (
    <div className="px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-6">

        {/* Header */}
        <div className="max-w-2xl">
          <span className="inline-flex rounded-full border border-cyan-200 bg-cyan-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-cyan-700">
            Analysis
          </span>

          <h1 className="mt-4 text-3xl font-bold text-slate-950 sm:text-4xl">
            Compare Reports
          </h1>

          <p className="mt-2 text-slate-500">
            Compare two of your lab reports side by side to see how your health
            markers have changed over time.
          </p>
        </div>

        {/* Empty state */}
        <section className="rounded-lg border border-slate-200 bg-white p-10 text-center shadow-sm sm:p-16">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-linear-to-br from-cyan-500 to-blue-600 shadow-md shadow-blue-900/10">
            <GitCompare className="h-8 w-8 text-white" />
          </div>

          <h2 className="mt-5 text-xl font-semibold text-slate-900">
            Select reports to compare
          </h2>

          <p className="mx-auto mt-2 max-w-md text-slate-500">
            Upload at least two reports and pick them from your reports list to
            start a comparison.
          </p>

          <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/dashboard/reports"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-cyan-600 px-5 text-sm font-semibold text-white shadow-sm shadow-cyan-900/10 transition hover:bg-cyan-700 focus:outline-none focus:ring-4 focus:ring-cyan-100"
            >
              <FileText size={18} />
              Browse Reports
            </Link>

            <Link
              href="/dashboard/upload"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              <TrendingUp size={18} />
              Upload New Report
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
