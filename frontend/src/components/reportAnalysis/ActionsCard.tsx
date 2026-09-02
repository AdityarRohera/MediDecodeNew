"use client";

import Link from "next/link";
import { useState } from "react";
import { BarChart3, Check, Download, Share2, Upload } from "lucide-react";

type Props = {
  fileUrl?: string;
};

/*
    Every action here does something real: open the original file,
    copy a link to this analysis, jump into a comparison, or upload
    the next report.
*/
export default function ActionsCard({ fileUrl }: Props) {
  const [copied, setCopied] = useState(false);

  const shareHandler = async () => {
    await navigator.clipboard.writeText(window.location.href);

    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const tileClass =
    "group flex flex-col gap-2 rounded-xl border border-slate-200 p-3 text-left transition hover:border-brand-200 hover:bg-brand-50";

  const iconClass =
    "flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-slate-700 transition group-hover:bg-white group-hover:text-brand-700";

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-card">
      <h2 className="text-sm font-semibold text-slate-900">Quick actions</h2>

      <p className="mt-1 text-xs text-slate-500">
        Open, share or build on this report
      </p>

      <div className="mt-4 grid grid-cols-2 gap-2.5">
        {fileUrl && (
          <a
            href={fileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={tileClass}
          >
            <span className={iconClass}>
              <Download size={16} />
            </span>

            <span className="text-sm font-medium text-slate-900">Original</span>
          </a>
        )}

        <button onClick={shareHandler} className={tileClass}>
          <span className={iconClass}>
            {copied ? (
              <Check size={16} className="text-emerald-600" />
            ) : (
              <Share2 size={16} />
            )}
          </span>

          <span className="text-sm font-medium text-slate-900">
            {copied ? "Link copied" : "Share"}
          </span>
        </button>

        <Link href="/analysis/compare" className={tileClass}>
          <span className={iconClass}>
            <BarChart3 size={16} />
          </span>

          <span className="text-sm font-medium text-slate-900">Compare</span>
        </Link>

        <Link href="/upload" className={tileClass}>
          <span className={iconClass}>
            <Upload size={16} />
          </span>

          <span className="text-sm font-medium text-slate-900">
            New report
          </span>
        </Link>
      </div>
    </div>
  );
}
