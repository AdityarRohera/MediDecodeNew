"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, TriangleAlert } from "lucide-react";

import { analyseReport } from "@/services/operations/reports/report";
import StatusShell from "./StatusShell";

export default function UploadedState({
  reportId,
}: {
  reportId: string;
}) {

  const router = useRouter();

  const [failed, setFailed] = useState(false);

  useEffect(() => {

    const startAnalysis = async () => {

      try {

        await analyseReport(reportId);

        router.refresh();

      } catch (error) {
        console.log("Error starting analysis ----> ", error);

        setFailed(true);
      }
    };

    startAnalysis();

  }, [reportId]);

  if (failed) {
    return (
      <StatusShell
        icon={TriangleAlert}
        tone="danger"
        title="We could not start the analysis"
        message="The report was uploaded, but the analysis did not start. Refresh the page to try again."
      >
        <button
          onClick={() => router.refresh()}
          className="mt-6 inline-flex h-11 items-center justify-center rounded-xl bg-brand-600 px-5 text-sm font-semibold text-white transition hover:bg-brand-700"
        >
          Retry
        </button>
      </StatusShell>
    );
  }

  return (
    <StatusShell
      icon={Loader2}
      spinning
      title="Starting analysis"
      message="Preparing your report for the AI. Hang tight, this only takes a moment."
    />
  );
}
