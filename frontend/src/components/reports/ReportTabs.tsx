"use client";

import { useRouter, useSearchParams } from "next/navigation";

const tabs = [
  { label: "All Reports", value: "all" },
  { label: "Analyzed", value: "completed" },
  { label: "Pending Analysis", value: "uploaded" },
];

export default function ReportTabs() {
  const router = useRouter();
  const searchParams = useSearchParams();

  console.log(searchParams);

  const currentStatus = searchParams.get("status") ?? "all";

  const handleTabChange = (status: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (status === "all") {
      params.delete("status");
    } else {
      params.set("status", status);
    }

    // Reset pagination whenever tab changes
    params.set("page", "1");

    router.push(`/dashboard/reports?${params.toString()}`);
  };

  return (
    <div className="border-b border-slate-200 px-6">
      <div className="flex gap-8">
        {tabs.map((tab) => {
          const active = currentStatus === tab.value;

          return (
            <button
              key={tab.value}
              onClick={() => handleTabChange(tab.value)}
              className={`relative py-3 text-sm font-medium transition-colors ${
                active
                  ? "text-blue-600"
                  : "text-slate-500 hover:text-slate-900"
              }`}
            >
              {tab.label}

              {active && (
                <span className="absolute bottom-0 left-0 h-[2.5px] w-full rounded-full bg-blue-600" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}