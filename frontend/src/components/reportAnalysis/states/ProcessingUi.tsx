"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

import StatusShell from "./StatusShell";

export default function ProcessingState() {

  const router = useRouter();

  // The analysis finishes on the server, so the page checks back
  // instead of leaving the user on a screen that never moves.
  useEffect(() => {
    const timer = setInterval(() => router.refresh(), 5000);

    return () => clearInterval(timer);
  }, [router]);

  return (
    <StatusShell
      icon={Loader2}
      spinning
      title="Analyzing your report"
      message="Our AI is reading every test and grouping the results. This usually takes less than a minute, and the page updates on its own."
    >
      <div className="mt-6 h-1.5 overflow-hidden rounded-full bg-slate-100">
        <div className="h-full w-1/3 animate-[shimmer_1.4s_linear_infinite] rounded-full bg-linear-to-r from-brand-400 via-brand-600 to-brand-400 bg-[length:200%_100%]" />
      </div>
    </StatusShell>
  );
}
