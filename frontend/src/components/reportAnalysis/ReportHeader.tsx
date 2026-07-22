"use client";

import { useState } from "react";
import { Download, Share2, Check } from "lucide-react";

type Props = {
  reportName: string;
  reportId: string;
  uploadedDate: string;
  healthStatus: string;
  fileUrl: string;
};

const statusStyles: Record<string, string> = {
  GOOD: "bg-emerald-100 text-emerald-700",
  NEEDS_REVIEW: "bg-amber-100 text-amber-700",
  CRITICAL: "bg-red-100 text-red-700",
};

const statusLabels: Record<string, string> = {
  GOOD: "Healthy",
  NEEDS_REVIEW: "Needs Review",
  CRITICAL: "Critical",
};

export default function ReportHeader({
  reportName,
  reportId,
  uploadedDate,
  healthStatus,
  fileUrl,
}: Props) {

  const [copied, setCopied] = useState(false);

  const formattedDate = uploadedDate
    ? new Date(uploadedDate).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "-";

  const shareHandler = async () => {
    await navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className="
      bg-white
      rounded-2xl
      border border-slate-200
      shadow-[0_2px_8px_rgba(15,23,42,0.04)]
      px-6
      py-5
      flex
      flex-col
      gap-4
      sm:flex-row
      sm:justify-between
      sm:items-center
    "
    >
      <div>

        <div className="flex flex-wrap items-center gap-3">

          <h1 className="text-xl font-bold tracking-[-0.02em] text-slate-900 sm:text-2xl">
            {reportName}
          </h1>

          <span
            className={`
            px-3
            py-1
            rounded-full
            text-xs
            font-semibold
            ${statusStyles[healthStatus] || "bg-slate-100 text-slate-600"}
          `}
          >
            {statusLabels[healthStatus] || healthStatus}
          </span>

        </div>

        <p className="mt-1.5 text-sm text-slate-500">
          Report ID: {reportId?.slice(0, 8)} • Uploaded on {formattedDate}
        </p>

      </div>

      <div className="flex gap-2.5">

        <a
          href={fileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="
          h-10
          px-4
          rounded-xl
          border
          border-slate-200
          bg-white
          hover:shadow-md
          transition-all
          flex
          items-center
          gap-2
          text-sm
          font-medium
        "
        >
          <Download size={16} />
          Download PDF
        </a>

        <button
          onClick={shareHandler}
          className="
          h-10
          px-4
          rounded-xl
          border
          border-slate-200
          bg-white
          hover:shadow-md
          transition-all
          flex
          items-center
          gap-2
          text-sm
          font-medium
        "
        >
          {copied ? <Check size={16} className="text-emerald-600" /> : <Share2 size={16} />}
          {copied ? "Copied!" : "Share"}
        </button>

      </div>
    </div>
  );
}
