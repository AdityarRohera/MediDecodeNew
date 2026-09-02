"use client";

import { useRouter, useSearchParams } from "next/navigation";

const tabs = [
  { label: "All reports", value: "all" },
  { label: "Analyzed", value: "completed" },
  { label: "Pending", value: "uploaded" },
];

export default function ReportTabs() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentStatus = searchParams.get("status") ?? "all";

  const handleTabChange = (status: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (status === "all") {
      params.delete("status");
    } else {
      params.set("status", status);
    }

    // Any change of tab starts again from the first page.
    params.set("page", "1");
    params.delete("welcome");

    router.push(`/reports?${params.toString()}`);
  };

  return (
    <div className="scrollbar-slim overflow-x-auto border-b border-slate-200 px-4 sm:px-5">
      <div className="flex gap-1">
        {tabs.map((tab) => {
          const active = currentStatus === tab.value;

          return (
            <button
              key={tab.value}
              onClick={() => handleTabChange(tab.value)}
              className={`relative whitespace-nowrap px-3 py-3 text-sm font-medium transition-colors ${
                active
                  ? "text-brand-700"
                  : "text-slate-500 hover:text-slate-900"
              }`}
            >
              {tab.label}

              {active && (
                <span className="absolute inset-x-2 bottom-0 h-0.5 rounded-full bg-brand-600" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
