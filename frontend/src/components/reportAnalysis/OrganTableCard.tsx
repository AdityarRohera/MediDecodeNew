"use client";

import { useState } from "react";
import {
  ChevronDown,
  AlertCircle,
  AlertTriangle,
  CheckCircle2,
} from "lucide-react";

interface Test {
  TEST_NAME: string;
  RESULT: string;
  REFERENCE_RANGE: string;
  TEST_STATUS: string;
}

interface Organ {
  organName: string;
  organStatus: string;
  organExplanation: string;
  tests: Test[];
}

interface Props {
  organ: Organ;
  defaultOpen?: boolean;
}

export default function OrganTableCard({
  organ,
  defaultOpen = false,
}: Props) {
  const [open, setOpen] = useState(defaultOpen);

  const normalCount = organ.tests.filter(
    (t) => t.TEST_STATUS === "NORMAL"
  ).length;

  const borderlineCount = organ.tests.filter(
    (t) => t.TEST_STATUS === "BORDERLINE"
  ).length;

  const criticalCount = organ.tests.filter(
    (t) => t.TEST_STATUS === "CRITICAL"
  ).length;

  const badgeStyles = {
    NORMAL:
      "bg-emerald-50 text-emerald-700 border border-emerald-100",
    BORDERLINE:
      "bg-amber-50 text-amber-700 border border-amber-100",
    CRITICAL:
      "bg-red-50 text-red-700 border border-red-100",
  };

  return (
    <div
      className="
      bg-white
      rounded-2xl
      border
      border-slate-200
      shadow-sm
      overflow-hidden
    "
    >
      {/* CLICKABLE HEADER */}

      <button onClick={() => setOpen(!open)} className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-slate-50 transition">
        <div>
          <div className="flex items-center gap-3">
            <h2 className="text-lg font-semibold">
              {organ.organName}
            </h2>

            <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${badgeStyles[organ.organStatus as keyof typeof badgeStyles]}`}>
              {organ.organStatus}
            </span>
          </div>

          <div className="flex gap-5 mt-2 text-sm">
            <span className="text-slate-500">
              {organ.tests.length} Tests
            </span>

            <span className="text-red-600 font-medium">
              {criticalCount} Critical
            </span>

            <span className="text-amber-600 font-medium">
              {borderlineCount} Borderline
            </span>

            <span className="text-emerald-600 font-medium">
              {normalCount} Normal
            </span>
          </div>
        </div>

        <ChevronDown
          className={`
          h-5 w-5 text-slate-500
          transition-transform duration-300
          ${open ? "rotate-180" : ""}
        `}
        />
      </button>

      {/* EXPANDABLE CONTENT */}

      <div
        className={`
        grid
        transition-all
        duration-300
        ease-in-out
        ${
          open
            ? "grid-rows-[1fr] opacity-100"
            : "grid-rows-[0fr] opacity-0"
        }
      `}
      >
        <div className="overflow-hidden">

          {/* AI SUMMARY */}

          <div className="border-t border-slate-100 p-5">

            <div
              className="
              rounded-xl
              bg-blue-50
              border
              border-blue-100
              p-4
            "
            >
              <h3 className="text-sm font-semibold text-slate-900">
                AI Analysis
              </h3>

              <p className="mt-2 text-sm text-slate-600 leading-6">
                {organ.organExplanation}
              </p>
            </div>

          </div>

          {/* TABLE */}

          <div className="overflow-x-auto">

            <table className="w-full">

              <thead className="bg-slate-50 border-y border-slate-100">

                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Test
                  </th>

                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Result
                  </th>

                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Reference Range
                  </th>

                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Status
                  </th>
                </tr>

              </thead>

              <tbody>

                {organ.tests.map((test) => (
                  <tr
                    // key={test.testName}
                    className="
                    border-b
                    border-slate-100
                    hover:bg-slate-50
                  "
                  >
                    <td className="px-6 py-3.5 text-sm font-medium">
                      {test.TEST_NAME}
                    </td>

                    <td className="px-6 py-3.5 text-sm font-semibold">
                      {test.RESULT}
                    </td>

                    <td className="px-6 py-3.5 text-sm text-slate-500">
                      {test.REFERENCE_RANGE || "-"}
                    </td>

                    <td className="px-6 py-3.5">
                      {test.TEST_STATUS === "NORMAL" && (
                        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold">
                          <CheckCircle2 size={14} />
                          NORMAL
                        </span>
                      )}

                      {test.TEST_STATUS === "BORDERLINE" && (
                        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 text-amber-700 text-xs font-semibold">
                          <AlertTriangle size={14} />
                          BORDERLINE
                        </span>
                      )}

                      {test.TEST_STATUS === "CRITICAL" && (
                        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 text-red-700 text-xs font-semibold">
                          <AlertCircle size={14} />
                          CRITICAL
                        </span>
                      )}
                    </td>
                  </tr>
                ))}

              </tbody>

            </table>

          </div>

        </div>
      </div>
    </div>
  );
}