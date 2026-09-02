"use client";

import { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Search, SlidersHorizontal, X } from "lucide-react";

import FilterModal from "./FilterModal";

// Params that are plumbing rather than a filter the user picked.
const HIDDEN_PARAMS = ["page", "limit", "status", "welcome"];

const LABELS: Record<string, string> = {
  reportName: "Name",
  reportType: "Type",
  healthStatus: "Health",
  startDate: "From",
  endDate: "To",
  minScore: "Min score",
  maxScore: "Max score",
  sortBy: "Sort",
};

export default function ReportsFilters({
  appliedFilters,
}: {
  appliedFilters: Record<string, string>;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState(appliedFilters?.reportName || "");

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const push = (params: URLSearchParams) => {
    params.set("page", "1");
    params.delete("welcome");

    router.push(`${pathname}?${params.toString()}`);
  };

  const applySearch = () => {
    const params = new URLSearchParams(searchParams.toString());

    if (search.trim()) {
      params.set("reportName", search.trim());
    } else {
      params.delete("reportName");
    }

    push(params);
  };

  const removeFilter = (key: string) => {
    const params = new URLSearchParams(searchParams.toString());

    params.delete(key);

    if (key === "reportName") setSearch("");

    push(params);
  };

  const clearAll = () => {
    const params = new URLSearchParams();

    const status = searchParams.get("status");

    if (status) params.set("status", status);

    setSearch("");
    push(params);
  };

  const chips = Object.entries(appliedFilters || {}).filter(
    ([key, value]) =>
      !HIDDEN_PARAMS.includes(key) &&
      value !== undefined &&
      value !== null &&
      value !== "" &&
      value !== "all"
  );

  return (
    <>
      <div className="border-b border-slate-200 px-4 py-3 sm:px-5">
        <div className="flex flex-col gap-2.5 lg:flex-row lg:items-center">
          <div className="relative w-full lg:max-w-md">
            <Search
              size={16}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && applySearch()}
              placeholder="Search by report name, then press Enter"
              className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-9 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-brand-500 focus:bg-white focus:ring-4 focus:ring-brand-100"
            />

            {search && (
              <button
                onClick={() => {
                  setSearch("");

                  if (appliedFilters?.reportName) removeFilter("reportName");
                }}
                aria-label="Clear search"
                className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded-lg p-1 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
              >
                <X size={15} />
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 lg:ml-auto">
            <button
              onClick={() => setIsOpen(true)}
              className="inline-flex h-10 items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 text-sm font-semibold text-slate-700 transition hover:border-brand-300 hover:bg-brand-50 hover:text-brand-700"
            >
              <SlidersHorizontal size={16} />
              Filters
              {chips.length > 0 && (
                <span className="rounded-full bg-brand-600 px-1.5 py-0.5 text-[11px] font-bold text-white">
                  {chips.length}
                </span>
              )}
            </button>

            {chips.length > 0 && (
              <button
                onClick={clearAll}
                className="h-10 rounded-xl px-3 text-sm font-medium text-slate-500 transition hover:bg-slate-100 hover:text-slate-800"
              >
                Clear all
              </button>
            )}
          </div>
        </div>

        {chips.length > 0 && (
          <div className="mt-2.5 flex flex-wrap gap-2">
            {chips.map(([key, value]) => (
              <span
                key={key}
                className="inline-flex animate-scale-in items-center gap-1.5 rounded-lg border border-brand-100 bg-brand-50 py-1 pl-2.5 pr-1.5 text-xs font-medium text-brand-800"
              >
                <span className="text-brand-600">{LABELS[key] || key}:</span>
                {String(value)}
                <button
                  onClick={() => removeFilter(key)}
                  aria-label={`Remove ${LABELS[key] || key} filter`}
                  className="rounded p-0.5 text-brand-500 transition hover:bg-white hover:text-brand-800"
                >
                  <X size={13} />
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

      {isOpen && <FilterModal onClose={() => setIsOpen(false)} />}
    </>
  );
}
