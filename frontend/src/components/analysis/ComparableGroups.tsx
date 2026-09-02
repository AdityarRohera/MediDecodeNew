import Link from "next/link";
import { ArrowRight } from "lucide-react";

export type ComparableGroup = {
  reportType: string;
  count: number;
  latestTwo: string[];
};

export default function ComparableGroups({
  groups,
}: {
  groups: ComparableGroup[];
}) {
  return (
    <section className="animate-fade-up rounded-2xl border border-slate-200 bg-white p-5 shadow-card">
      <h2 className="text-sm font-semibold text-slate-900">Ready to compare</h2>

      <p className="mt-0.5 text-xs text-slate-500">
        Reports of the same type line up test by test.
      </p>

      <div className="mt-3 divide-y divide-slate-100">
        {groups.map((group) => {
          const ready = group.count >= 2;

          return (
            <div
              key={group.reportType}
              className="flex items-center gap-3 py-3"
            >
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-slate-900">
                  {group.reportType}
                </p>

                <p className="mt-0.5 text-xs text-slate-500">
                  {group.count} {group.count === 1 ? "report" : "reports"}
                  {!ready && " · needs 1 more"}
                </p>
              </div>

              {ready ? (
                <Link
                  href={`/analysis/compare?a=${group.latestTwo[0]}&b=${group.latestTwo[1]}`}
                  className="group flex shrink-0 items-center gap-1.5 rounded-lg bg-brand-50 px-3 py-2 text-xs font-semibold text-brand-700 transition hover:bg-brand-100"
                >
                  Compare latest 2
                  <ArrowRight
                    size={14}
                    className="transition-transform group-hover:translate-x-0.5"
                  />
                </Link>
              ) : (
                <span className="shrink-0 text-xs text-slate-400">
                  Not available
                </span>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
