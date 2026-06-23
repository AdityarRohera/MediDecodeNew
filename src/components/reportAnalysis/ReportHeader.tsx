import { Download, Share2 } from "lucide-react";

export default function ReportHeader() {
  return (
    <div
      className="
      bg-white
      rounded-3xl
      border border-slate-200
      shadow-[0_2px_8px_rgba(15,23,42,0.04)]
      px-8
      py-7
      flex
      justify-between
      items-center
    "
    >
      <div>

        <div className="flex items-center gap-4">

          <h1 className="text-[44px] font-bold tracking-[-0.03em] text-slate-900">
            Complete Blood Count (CBC)
          </h1>

          <span
            className="
            px-4
            py-1.5
            rounded-full
            bg-emerald-100
            text-emerald-700
            text-sm
            font-semibold
          "
          >
            Analyzed
          </span>

        </div>

        <p className="mt-3 text-[17px] text-slate-500">
          Report ID: REP-2026-0018 • Uploaded on May 28, 2026
        </p>

      </div>

      <div className="flex gap-4">

        <button
          className="
          h-12
          px-6
          rounded-xl
          border
          border-slate-200
          bg-white
          hover:shadow-md
          transition-all
          flex
          items-center
          gap-2
          font-medium
        "
        >
          <Download size={18} />
          Download PDF
        </button>

        <button
          className="
          h-12
          px-6
          rounded-xl
          border
          border-slate-200
          bg-white
          hover:shadow-md
          transition-all
          flex
          items-center
          gap-2
          font-medium
        "
        >
          <Share2 size={18} />
          Share
        </button>

      </div>
    </div>
  );
}