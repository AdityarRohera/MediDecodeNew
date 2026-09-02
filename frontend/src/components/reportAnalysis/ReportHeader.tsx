"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, Check, Download, Share2 } from "lucide-react";

type Props = {
  reportName: string;
  reportId: string;
  uploadedDate: string;
  healthStatus: string;
  fileUrl: string;
};

const statusStyles: Record<string, string> = {
  GOOD: "bg-emerald-50 text-emerald-700",
  NEEDS_REVIEW: "bg-amber-50 text-amber-700",
  CRITICAL: "bg-red-50 text-red-700",
};

const statusLabels: Record<string, string> = {
  GOOD: "Healthy",
  NEEDS_REVIEW: "Needs review",
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
    ? new Date(uploadedDate).toLocaleDateString("en-IN", {
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

  const buttonClass =
    "inline-flex h-10 items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-50";

  return (
    <div className="animate-fade-up rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-card">
      <Link
        href="/reports"
        className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 transition hover:text-slate-900"
      >
        <ArrowLeft size={14} />
        My reports
      </Link>

      <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2.5">
            <h1 className="truncate text-xl font-semibold tracking-tight text-slate-950 sm:text-2xl">
              {reportName}
            </h1>

            <span
              className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                statusStyles[healthStatus] || "bg-slate-100 text-slate-600"
              }`}
            >
              {statusLabels[healthStatus] || healthStatus}
            </span>
          </div>

          <p className="mt-1 text-sm text-slate-500">
            <span className="font-mono">{reportId?.slice(0, 8)}</span> ·
            Uploaded on {formattedDate}
          </p>
        </div>

        <div className="flex shrink-0 gap-2">
          {fileUrl && (
            <a
              href={fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonClass}
            >
              <Download size={16} />
              Original
            </a>
          )}

          <button onClick={shareHandler} className={buttonClass}>
            {copied ? (
              <Check size={16} className="text-emerald-600" />
            ) : (
              <Share2 size={16} />
            )}
            {copied ? "Copied" : "Share"}
          </button>
        </div>
      </div>
    </div>
  );
}
