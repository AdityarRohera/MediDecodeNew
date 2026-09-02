import Link from "next/link";
import { ArrowRight, Eye, FileText } from "lucide-react";

import { changeStyle, formatDate, toChange } from "./shared";

export type ComparisonHistoryItem = {
  comparisonId: string;
  comparedAt: string;
  overallChange: string;
  summary: string;
  previous: ComparisonHistorySide;
  current: ComparisonHistorySide;
  stats: {
    improved: number;
    worsened: number;
    unchanged: number;
    newTests: number;
    notRepeated: number;
  };
};

type ComparisonHistorySide = {
  reportId: string;
  reportName: string;
  reportType: string;
  date: string;
  score: number | null;
};

const DAY = 1000 * 60 * 60 * 24;

const changeTone: Record<string, string> = {
  IMPROVED: "border-emerald-100 bg-emerald-50 text-emerald-700",
  WORSENED: "border-red-100 bg-red-50 text-red-700",
  SAME: "border-slate-200 bg-slate-50 text-slate-600",
  NEW: "border-brand-100 bg-brand-50 text-brand-700",
  REMOVED: "border-slate-200 bg-slate-50 text-slate-600",
};

const hrefOf = (item: ComparisonHistoryItem) =>
  `/analysis/compare?a=${item.previous.reportId}&b=${item.current.reportId}&id=${item.comparisonId}`;

const deltaOf = (item: ComparisonHistoryItem) =>
  (item.current.score ?? 0) - (item.previous.score ?? 0);

const daysApartOf = (item: ComparisonHistoryItem) =>
  Math.abs(
    Math.round(
      (new Date(item.current.date).getTime() -
        new Date(item.previous.date).getTime()) /
        DAY
    )
  );

function DeltaText({ delta }: { delta: number }) {
  return (
    <span
      className={`text-xs font-semibold ${
        delta > 0
          ? "text-emerald-600"
          : delta < 0
          ? "text-red-600"
          : "text-slate-400"
      }`}
    >
      {delta > 0 ? "+" : ""}
      {delta}
    </span>
  );
}

function StatChips({ stats }: { stats: ComparisonHistoryItem["stats"] }) {
  const chips = [
    {
      value: stats.improved,
      label: "improved",
      tone: "bg-emerald-50 text-emerald-700",
    },
    {
      value: stats.worsened,
      label: "worsened",
      tone: "bg-red-50 text-red-700",
    },
    {
      value: stats.unchanged,
      label: "stable",
      tone: "bg-slate-100 text-slate-600",
    },
    { value: stats.newTests, label: "new", tone: "bg-brand-50 text-brand-700" },
    {
      value: stats.notRepeated,
      label: "not redone",
      tone: "bg-amber-50 text-amber-700",
    },
  ].filter((chip) => chip.value > 0);

  return (
    <div className="flex flex-wrap gap-1.5">
      {chips.map((chip) => (
        <span
          key={chip.label}
          className={`rounded-full px-2 py-0.5 text-xs font-medium ${chip.tone}`}
        >
          {chip.value} {chip.label}
        </span>
      ))}
    </div>
  );
}

export default function HistoryTable({
  items,
}: {
  items: ComparisonHistoryItem[];
}) {
  return (
    <section className="animate-fade-up overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-card">
      {/* Desktop */}
      <div className="scrollbar-slim hidden overflow-x-auto lg:block">
        <table className="w-full min-w-[880px]">
          <thead className="bg-slate-50">
            <tr className="border-b border-slate-200">
              {[
                "Reports compared",
                "Period",
                "Health score",
                "Outcome",
                "Compared on",
                "",
              ].map((heading, index) => (
                <th
                  key={index}
                  className={`px-5 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500 ${
                    index === 2
                      ? "text-center"
                      : index >= 4
                      ? "text-right"
                      : "text-left"
                  }`}
                >
                  {heading}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {items.map((item) => {
              const change = toChange(item.overallChange);
              const delta = deltaOf(item);
              const daysApart = daysApartOf(item);

              return (
                <tr
                  key={item.comparisonId}
                  className="align-top transition hover:bg-brand-50/40"
                >
                  <td className="px-5 py-4">
                    <div className="flex gap-3">
                      <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-50">
                        <FileText className="h-4 w-4 text-brand-600" />
                      </span>

                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-slate-900">
                          {item.current.reportName || "Untitled report"}
                        </p>

                        <p className="mt-0.5 truncate text-xs text-slate-500">
                          vs {item.previous.reportName || "Untitled report"}
                        </p>

                        <span className="mt-1.5 inline-flex rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-600">
                          {item.current.reportType || "Unknown type"}
                        </span>
                      </div>
                    </div>
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      {formatDate(item.previous.date)}
                      <ArrowRight size={14} className="text-slate-300" />
                      {formatDate(item.current.date)}
                    </div>

                    <p className="mt-1 text-xs text-slate-400">
                      {daysApart} {daysApart === 1 ? "day" : "days"} apart
                    </p>
                  </td>

                  <td className="px-5 py-4 text-center">
                    <div className="flex items-center justify-center gap-2 text-sm text-slate-600">
                      {item.previous.score ?? 0}
                      <ArrowRight size={14} className="text-slate-300" />
                      <span className="font-semibold text-slate-900">
                        {item.current.score ?? 0}
                      </span>
                    </div>

                    <div className="mt-1">
                      <DeltaText delta={delta} />
                    </div>
                  </td>

                  <td className="px-5 py-4">
                    <span
                      className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold ${changeTone[change]}`}
                    >
                      {changeStyle[change].label}
                    </span>

                    <div className="mt-2">
                      <StatChips stats={item.stats} />
                    </div>
                  </td>

                  <td className="px-5 py-4 text-right text-sm text-slate-500">
                    {formatDate(item.comparedAt)}
                  </td>

                  <td className="px-5 py-4 text-right">
                    <Link
                      href={hrefOf(item)}
                      title="Open comparison"
                      className="inline-flex rounded-lg border border-slate-200 p-2.5 transition hover:border-brand-400 hover:bg-brand-50"
                    >
                      <Eye size={17} className="text-brand-600" />
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile */}
      <div className="divide-y divide-slate-100 lg:hidden">
        {items.map((item) => {
          const change = toChange(item.overallChange);

          return (
            <Link
              key={item.comparisonId}
              href={hrefOf(item)}
              className="block p-4 transition hover:bg-brand-50/40"
            >
              <div className="flex items-start gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-50">
                  <FileText className="h-4 w-4 text-brand-600" />
                </span>

                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-slate-900">
                    {item.current.reportName || "Untitled report"}
                  </p>

                  <p className="truncate text-xs text-slate-500">
                    vs {item.previous.reportName || "Untitled report"}
                  </p>
                </div>

                <span
                  className={`shrink-0 rounded-full border px-2.5 py-1 text-xs font-semibold ${changeTone[change]}`}
                >
                  {changeStyle[change].label}
                </span>
              </div>

              <div className="mt-3 flex items-center gap-2 text-sm text-slate-600">
                {item.previous.score ?? 0}
                <ArrowRight size={14} className="text-slate-300" />
                <span className="font-semibold text-slate-900">
                  {item.current.score ?? 0}
                </span>
                <DeltaText delta={deltaOf(item)} />

                <span className="ml-auto text-xs text-slate-400">
                  {formatDate(item.comparedAt)}
                </span>
              </div>

              <div className="mt-2.5">
                <StatChips stats={item.stats} />
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
