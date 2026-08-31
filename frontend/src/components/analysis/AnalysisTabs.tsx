"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const tabs = [
  { label: "Overview", href: "/dashboard/analysis" },
  { label: "Compare", href: "/dashboard/analysis/compare" },
  { label: "History", href: "/dashboard/analysis/history" },
];

export default function AnalysisTabs() {
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/dashboard/analysis"
      ? pathname === href
      : pathname.startsWith(href);

  return (
    <div className="border-b border-slate-200">
      <div className="flex gap-8">
        {tabs.map((tab) => {
          const active = isActive(tab.href);

          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={`relative py-3 text-sm font-medium transition-colors ${
                active
                  ? "text-cyan-700"
                  : "text-slate-500 hover:text-slate-900"
              }`}
            >
              {tab.label}

              {active && (
                <span className="absolute bottom-0 left-0 h-[2.5px] w-full rounded-full bg-cyan-600" />
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
