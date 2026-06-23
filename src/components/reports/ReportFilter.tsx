
"use client"

import { Filter, Search } from "lucide-react";
import { useRouter , useSearchParams } from "next/navigation";
import { useState } from "react";
import FilterModal from "./FilterModal";

export default function ReportsFilters() {

  const router = useRouter();
  const searchParams = useSearchParams();
  const [reportType, setReportType] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const changeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setReportType(value);

    const params = new URLSearchParams(searchParams.toString());

      if (value === "") {
        params.delete("ReportType");
      } else {
        params.set("ReportType", value);
      }
      
    router.push(`/dashboard/reports?${params.toString()}`);
  }


  return (
    <div className="flex flex-col gap-3 border-b border-slate-200 bg-white px-5 py-4 lg:flex-row lg:items-center lg:justify-between">
      <label className="relative block w-full lg:max-w-sm">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <input
          placeholder="Search reports"
          className="h-10 w-full rounded-lg border border-slate-200 bg-slate-50 pl-9 pr-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-100"
        />
      </label>

      <div className="grid gap-3 sm:grid-cols-3 lg:flex">
        <select onChange={changeHandler} value={reportType} className="h-10 rounded-lg border border-slate-200 bg-white px-3 text-sm font-medium text-slate-700 outline-none transition focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100">
          <option value={""}>All types</option>
          <option value={"hematology"}>Hematology</option>
          <option value={"biochemistry"}>Biochemistry</option>
          <option value={"cardiology"}>Cardiology</option>
        </select>

        <select className="h-10 rounded-lg border border-slate-200 bg-white px-3 text-sm font-medium text-slate-700 outline-none transition focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100">
          <option>Newest first</option>
          <option>Oldest first</option>
          <option>Highest score</option>
          <option>Needs attention</option>
        </select>

        <button onClick={() => setIsOpen(true)} className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 focus:outline-none focus:ring-4 focus:ring-slate-100">
          <Filter size={16} />
          Filters
        </button>
      </div>

          {isOpen && (
            <FilterModal onClose={() => setIsOpen(false)} />
          )}

    </div>
  );
}
