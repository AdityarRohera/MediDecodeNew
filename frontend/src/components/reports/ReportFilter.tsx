"use client";

import { Search, SlidersHorizontal, Filter } from "lucide-react";
import { useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import FilterModal from "./FilterModal";

export default function ReportsFilters({ appliedFilters }: any) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState(appliedFilters?.reportName || "");

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const searchHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter") return;

    const params = new URLSearchParams(searchParams.toString());

    if (search.trim()) {
      params.set("reportName", search.trim());
    } else {
      params.delete("reportName");
    }

    params.set("page", "1");
    router.push(`${pathname}?${params.toString()}`);
  };

  const filters = Object.entries(appliedFilters || {}).filter(
    ([_, value]) =>
      value !== undefined &&
      value !== null &&
      value !== "" &&
      value !== "all"
  );

  const formatLabel = (key: string) => {
    return key
      .replace(/([A-Z])/g, " $1")
      .replace(/^./, (str) => str.toUpperCase());
  };

  return (
    <>
      <div className="border-b border-slate-200 bg-white">
        <div className="px-6 py-4">

          {/* Header */}
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">

            {/* Search */}
            <div className="relative w-full lg:max-w-lg">
              <Search
                size={17}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={searchHandler}
                placeholder="Search reports by name, press Enter..."
                className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm text-slate-800 outline-none transition-all duration-200 placeholder:text-slate-400 focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-100"
              />
            </div>

            {/* Advanced Filter Button */}
            <button
              onClick={() => setIsOpen(true)}
              className="inline-flex h-11 items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 shadow-sm transition-all duration-200 hover:border-cyan-300 hover:bg-cyan-50 hover:text-cyan-700"
            >
              <SlidersHorizontal size={17} />
              Advanced Filters
            </button>
          </div>

          {/* Active Filters */}
          {filters.length > 0 && (
            <div className="mt-4 rounded-2xl border border-cyan-100 bg-gradient-to-r from-cyan-50 via-white to-white p-3.5">

              <div className="mb-3 flex items-center gap-2">
                <Filter size={15} className="text-cyan-600" />

                <span className="text-xs font-bold uppercase tracking-[0.15em] text-slate-500">
                  Active Filters
                </span>

                <span className="rounded-full bg-cyan-600 px-2.5 py-1 text-xs font-semibold text-white">
                  {filters.length}
                </span>
              </div>

              <div className="flex flex-wrap gap-3">
                {filters.map(([key, value]) => (
                  <div
                    key={key}
                    className="flex items-center gap-2 rounded-xl border border-cyan-100 bg-white px-4 py-2 shadow-sm"
                  >
                    <span className="text-xs font-medium uppercase tracking-wide text-slate-500">
                      {formatLabel(key)}
                    </span>

                    <div className="h-1 w-1 rounded-full bg-cyan-500" />

                    <span className="text-sm font-semibold text-slate-800">
                      {String(value)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {isOpen && (
        <FilterModal onClose={() => setIsOpen(false)} />
      )}
    </>
  );
}