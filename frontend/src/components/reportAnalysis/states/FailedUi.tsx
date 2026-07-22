"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AlertTriangle, RotateCw } from "lucide-react";
import { analyseReport } from "@/services/operations/reports/report";

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
    <div className="flex min-h-[70vh] items-center justify-center px-4">

      <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-sm">

        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50">
          <AlertTriangle className="h-8 w-8 text-red-500" />
        </div>

        <h1 className="mt-6 text-xl font-semibold text-slate-900">
          Analysis Failed
        </h1>

        <p className="mt-2 text-slate-500">
          Something went wrong while analyzing this report.
        </p>

        <button
          disabled={loading}
          onClick={retryHandler}
          className="mt-6 inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-red-600 px-6 text-sm font-semibold text-white shadow-sm transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <RotateCw size={16} className={loading ? "animate-spin" : ""} />
          {loading ? "Retrying..." : "Retry Analysis"}
        </button>

      </div>

    </div>
  );
}
