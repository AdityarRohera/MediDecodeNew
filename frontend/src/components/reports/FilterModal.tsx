"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Filter, X } from "lucide-react";

const EMPTY = {
  reportType: "",
  healthStatus: "",
  startDate: "",
  endDate: "",
  minScore: "",
  maxScore: "",
  sortBy: "",
  limit: "",
};

const fieldClass =
  "h-11 w-full rounded-xl border border-slate-200 bg-white px-3.5 text-sm text-slate-800 outline-none transition focus:border-brand-500 focus:ring-4 focus:ring-brand-100";

const labelClass = "mb-1.5 block text-sm font-medium text-slate-700";

export default function FilterModal({ onClose }: { onClose: () => void }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [filterForm, setFilterForm] = useState<Record<string, string>>(EMPTY);

  const changeHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { value, name } = e.target;

    setFilterForm((prev) => ({ ...prev, [name]: value }));
  };

  const resetHandler = () => setFilterForm(EMPTY);

  const submitHandler = () => {
    const params = new URLSearchParams(searchParams.toString());

    for (const [key, value] of Object.entries(filterForm)) {
      if (value !== "") {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    }

    params.set("page", "1");
    params.delete("welcome");

    router.push(`${pathname}?${params.toString()}`);
    onClose();
  };

  // Prefill from the url so the modal always shows what is applied.
  useEffect(() => {
    setFilterForm({
      reportType: searchParams.get("reportType") || "",
      healthStatus: searchParams.get("healthStatus") || "",
      startDate: searchParams.get("startDate") || "",
      endDate: searchParams.get("endDate") || "",
      minScore: searchParams.get("minScore") || "",
      maxScore: searchParams.get("maxScore") || "",
      sortBy: searchParams.get("sortBy") || "",
      limit: searchParams.get("limit") || "",
    });
  }, [searchParams]);

  // Escape closes, like every other dialog people are used to.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", onKey);

    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-end justify-center bg-slate-950/50 p-0 backdrop-blur-sm sm:items-center sm:p-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="max-h-[92vh] w-full max-w-2xl animate-scale-in overflow-y-auto rounded-t-2xl bg-white shadow-lift sm:rounded-2xl"
      >
        <div className="sticky top-0 flex items-center justify-between border-b border-slate-200 bg-white px-5 py-4">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50">
              <Filter className="h-5 w-5 text-brand-600" />
            </span>

            <div>
              <h2 className="text-base font-semibold text-slate-900">
                Filter reports
              </h2>

              <p className="text-xs text-slate-500">
                Narrow the list down to what you need
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Close filters"
            className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
          >
            <X size={19} />
          </button>
        </div>

        <div className="grid grid-cols-1 gap-4 p-5 sm:grid-cols-2">
          <div>
            <label htmlFor="reportType" className={labelClass}>
              Report type
            </label>

            <select
              id="reportType"
              name="reportType"
              onChange={changeHandler}
              value={filterForm.reportType}
              className={fieldClass}
            >
              <option value="">All types</option>
              <option value="blood">Blood test</option>
              <option value="urine">Urine test</option>
              <option value="hematology">Hematology</option>
              <option value="biochemistry">Biochemistry</option>
              <option value="cardiology">Cardiology</option>
              <option value="x-ray">X-ray</option>
            </select>
          </div>

          <div>
            <label htmlFor="healthStatus" className={labelClass}>
              Health status
            </label>

            {/* Values match what the analysis writes to the database. */}
            <select
              id="healthStatus"
              name="healthStatus"
              onChange={changeHandler}
              value={filterForm.healthStatus}
              className={fieldClass}
            >
              <option value="">Any status</option>
              <option value="GOOD">Healthy</option>
              <option value="NEEDS_REVIEW">Needs review</option>
              <option value="CRITICAL">Critical</option>
            </select>
          </div>

          <div>
            <label htmlFor="startDate" className={labelClass}>
              From date
            </label>

            <input
              id="startDate"
              type="date"
              name="startDate"
              onChange={changeHandler}
              value={filterForm.startDate}
              className={fieldClass}
            />
          </div>

          <div>
            <label htmlFor="endDate" className={labelClass}>
              To date
            </label>

            <input
              id="endDate"
              type="date"
              name="endDate"
              onChange={changeHandler}
              value={filterForm.endDate}
              className={fieldClass}
            />
          </div>

          <div>
            <label htmlFor="minScore" className={labelClass}>
              Minimum score
            </label>

            <input
              id="minScore"
              type="number"
              min={0}
              max={100}
              name="minScore"
              onChange={changeHandler}
              value={filterForm.minScore}
              placeholder="0"
              className={fieldClass}
            />
          </div>

          <div>
            <label htmlFor="maxScore" className={labelClass}>
              Maximum score
            </label>

            <input
              id="maxScore"
              type="number"
              min={0}
              max={100}
              name="maxScore"
              onChange={changeHandler}
              value={filterForm.maxScore}
              placeholder="100"
              className={fieldClass}
            />
          </div>

          <div>
            <label htmlFor="sortBy" className={labelClass}>
              Sort by
            </label>

            {/* Keys the reports query understands. */}
            <select
              id="sortBy"
              name="sortBy"
              onChange={changeHandler}
              value={filterForm.sortBy}
              className={fieldClass}
            >
              <option value="">Newest first</option>
              <option value="oldest">Oldest first</option>
              <option value="scoreHigh">Highest score first</option>
              <option value="scoreLow">Lowest score first</option>
            </select>
          </div>

          <div>
            <label htmlFor="limit" className={labelClass}>
              Reports per page
            </label>

            <select
              id="limit"
              name="limit"
              onChange={changeHandler}
              value={filterForm.limit}
              className={fieldClass}
            >
              <option value="">10 reports</option>
              <option value="5">5 reports</option>
              <option value="25">25 reports</option>
              <option value="50">50 reports</option>
              <option value="100">100 reports</option>
            </select>
          </div>
        </div>

        <div className="sticky bottom-0 flex items-center justify-end gap-3 border-t border-slate-200 bg-slate-50 px-5 py-4">
          <button
            onClick={resetHandler}
            className="h-11 rounded-xl border border-slate-200 bg-white px-5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
          >
            Reset
          </button>

          <button
            onClick={submitHandler}
            className="h-11 rounded-xl bg-brand-600 px-5 text-sm font-semibold text-white shadow-sm shadow-brand-900/20 transition hover:bg-brand-700"
          >
            Apply filters
          </button>
        </div>
      </div>
    </div>
  );
}
