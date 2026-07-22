"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { analyseReport } from "@/services/operations/reports/report";

export default function UploadedState({
  reportId,
}: {
  reportId: string;
}) {

  const router = useRouter();

  useEffect(() => {

    const startAnalysis = async () => {

      try {

        await analyseReport(reportId);

        router.refresh();

      } catch (error) {
        console.log("Error starting analysis ----> ", error);
      }
    };

    startAnalysis();

  }, [reportId]);

  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4">

      <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-sm">

        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-linear-to-br from-cyan-500 to-blue-600 shadow-md shadow-blue-900/10">
          <Loader2 className="h-8 w-8 animate-spin text-white" />
        </div>

        <h1 className="mt-6 text-xl font-semibold text-slate-900">
          Starting Analysis
        </h1>

        <p className="mt-2 text-slate-500">
          Preparing your report for AI analysis...
        </p>

      </div>

    </div>
  );
}
