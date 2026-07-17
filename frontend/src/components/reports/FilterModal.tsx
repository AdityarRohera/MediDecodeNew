"use client";

import { X, Calendar, Filter } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter , usePathname , useSearchParams } from "next/navigation";

export default function FilterModal({onClose}: {onClose: () => void}) {

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [filterForm , setFilterForm] = useState<any>({reportType : "" , healthStatus : "" , startDate : "" , endDate : "" , minScore : "0" , maxScore : "100" , sortBy : "" , page:""  , limit:""});

  const changeHandler = (e : any) => {
    const {value , name} = e.target;

    setFilterForm((prev : any) => {
      return {
        ... prev , [name] : value
      }
    })
  }

  console.log(filterForm);

  const resetHandler = () => {
    setFilterForm({reportType : "" , healthStatus : "" , startDate : "" , endDate : "" , minScore : "0" , maxScore : "100" , sortBy : "" , page:""  , limit:""});
  }

  
  // Submit Handler
  const submitHandler = () => {

     const params = new URLSearchParams(searchParams.toString());
     
     for(const [key , value] of  Object.entries(filterForm)){
          if(value !== ""){
            params.set(key , value as string)
          } else {
            params.delete(key);
          }
     }

     router.push(`${pathname}?${params.toString()}`);
     onClose();
  }


  useEffect(() => {
  setFilterForm({
    reportType: searchParams.get("reportType") || "",
    healthStatus: searchParams.get("healthStatus") || "",
    startDate: searchParams.get("startDate") || "",
    endDate: searchParams.get("endDate") || "",
    minScore: searchParams.get("minScore") || "0",
    maxScore: searchParams.get("maxScore") || "100",
    sortBy: searchParams.get("sortBy") || "newest",
    limit: searchParams.get("limit") || "10", 
  });
}, [searchParams]);



  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm px-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl rounded-2xl bg-white shadow-2xl overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-cyan-50 p-2">
              <Filter className="h-5 w-5 text-cyan-600" />
            </div>

            <div>
              <h2 className="text-xl font-semibold text-slate-900">
                Filter Reports
              </h2>
              <p className="text-sm text-slate-500">
                Refine reports using advanced filters
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="grid grid-cols-1 gap-5 p-6 md:grid-cols-2">
          {/* Report Type */}
          <div>
            <label htmlFor="reportType" className="mb-2 block text-sm font-medium text-slate-700">
              Report Type
            </label>

            <select name="reportType" onChange={changeHandler} value={filterForm.reportType || ""} id="reportType" className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-cyan-500">
              <option value="">All Types</option>
              <option value={"blood"}>Blood Test</option>
              <option value={"urine"}>Urine Test</option>
              <option value={"hematology"}>Hematology</option>
              <option value={"biochemistry"}>Biochemistry</option>
              <option value={"cardiology"}>Cardiology</option>
              <option value={"x-ray"}>X-Ray</option>
            </select>
          </div>

          {/* Status */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Status
            </label>

            <select onChange={changeHandler} name="healthStatus" value={filterForm.healthStatus || ""} className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-cyan-500">
              <option value="">All Status</option>
              <option value={"good"}>Good</option>
              <option value={"need-improvment"}>Needs Review</option>
              <option value={"critical"}>Critical</option>
            </select>
          </div>

          {/* Date From */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              From Date
            </label>

            <div className="relative">
              <Calendar
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                onChange={changeHandler}
                name="startDate"
                type="date"
                value={filterForm.startDate}
                className="w-full rounded-xl border border-slate-200 pl-10 pr-4 py-3 outline-none focus:border-cyan-500"
              />
            </div>
          </div>

          {/* Date To */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              To Date
            </label>

            <div className="relative">
              <Calendar
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="date"
                onChange={changeHandler}
                name="endDate"
                value={filterForm.endDate}
                className="w-full rounded-xl border border-slate-200 pl-10 pr-4 py-3 outline-none focus:border-cyan-500"
              />
            </div>
          </div>

          {/* Score Range */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Minimum Score
            </label>

            <input
              onChange={changeHandler}
              name="minScore"
              value={filterForm.minScore}
              type="number"
              placeholder="0"
              className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-cyan-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Maximum Score
            </label>

            <input
              onChange={changeHandler}
              name="maxScore"
              value={filterForm.maxScore}
              type="number"
              placeholder="100"
              className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-cyan-500"
            />
          </div>

          {/* Sort */}
          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Sort By
            </label>

            <select onChange={changeHandler} name="sortBy" value={filterForm.sortBy} className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-cyan-500">
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="score_high">
                Highest Score First
              </option>
              <option value="score_low">
                Lowest Score First
              </option>
            </select>
          </div>

          {/* Pagination Limit */}
          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Reports Per Page
            </label>

            <select onChange={changeHandler} name="limit" value={filterForm.limit} className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-cyan-500">
              <option value="5">5 Reports</option>
              <option value="10">10 Reports</option>
              <option value="25">25 Reports</option>
              <option value="50">50 Reports</option>
              <option value="100">100 Reports</option>
            </select>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 border-t border-slate-200 bg-slate-50 px-6 py-4">
          <button onClick={resetHandler} className="rounded-xl border border-slate-200 bg-white px-5 py-2.5 font-medium text-slate-700 transition hover:bg-slate-100">
            Reset
          </button>

          <button onClick={submitHandler} className="rounded-xl bg-cyan-600 px-5 py-2.5 font-medium text-white transition hover:bg-cyan-700">
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
}