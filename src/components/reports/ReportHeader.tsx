

import { Upload } from "lucide-react";

export default function ReportsHeader() {
  return (
    <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
      <div className="max-w-2xl">
        <span className="inline-flex rounded-full border border-cyan-200 bg-cyan-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-cyan-700">
          Reports dashboard
        </span>

        <h1 className="mt-4 text-3xl font-bold text-slate-950 sm:text-4xl">
          My Reports
        </h1>

        <p className="mt-2 text-slate-500">
          View, manage, and analyze your uploaded medical reports in one place.
        </p>
      </div>

      <button
        className="
        inline-flex
        h-11
        items-center
        justify-center
        gap-2
        rounded-lg
        bg-cyan-600
        px-4
        text-sm
        font-semibold
        text-white
        shadow-sm
        shadow-cyan-900/10
        transition
        hover:bg-cyan-700
        focus:outline-none
        focus:ring-4
        focus:ring-cyan-100
      "
      >
        <Upload size={18} />
        Upload Report
      </button>
    </div>
  );
}
