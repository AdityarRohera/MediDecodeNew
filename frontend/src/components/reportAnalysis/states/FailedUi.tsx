"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AlertTriangle, RotateCw } from "lucide-react";

import { analyseReport } from "@/services/operations/reports/report";
import StatusShell from "./StatusShell";

export default function FailedState({
  reportId,
}: {
  reportId: string;
}) {

  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const retryHandler = async () => {

    try {

      setLoading(true);

      await analyseReport(reportId);

      router.refresh();

    } catch (err) {

      console.log("Error retrying analysis ----> ", err);
      router.refresh(); // reload status from DB

    } finally {

      setLoading(false);
    }
  };

  return (
    <StatusShell
      icon={AlertTriangle}
      tone="danger"
      title="Analysis failed"
      message="Something went wrong while reading this report. This can happen with scans that are hard to read. Try again, or upload a clearer copy."
    >
      <button
        disabled={loading}
        onClick={retryHandler}
        className="mt-6 inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-brand-600 px-6 text-sm font-semibold text-white shadow-sm shadow-brand-900/20 transition hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        <RotateCw size={16} className={loading ? "animate-spin" : ""} />
        {loading ? "Retrying..." : "Retry analysis"}
      </button>
    </StatusShell>
  );
}
