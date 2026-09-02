"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { GitCompare, History, TrendingUp } from "lucide-react";

const tabs = [
  { label: "Overview", href: "/analysis", icon: TrendingUp },
  { label: "Compare", href: "/analysis/compare", icon: GitCompare },
  { label: "History", href: "/analysis/history", icon: History },
];

export default function AnalysisTabs() {
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/analysis" ? pathname === href : pathname.startsWith(href);

  return (
    <nav className="inline-flex rounded-xl border border-slate-200 bg-white p-1 shadow-sm">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const active = isActive(tab.href);

        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={`flex items-center gap-2 rounded-lg px-3.5 py-2 text-sm font-medium transition ${
              active
                ? "bg-brand-600 text-white shadow-sm"
                : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
            }`}
          >
            <Icon size={16} />
            {tab.label}
          </Link>
        );
      })}
    </nav>
  );
}
