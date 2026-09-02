"use client";

import { useState } from "react";
import {
  AlertCircle,
  AlertTriangle,
  CheckCircle2,
  ChevronDown,
  Sparkles,
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

const statusBadge: Record<
  string,
  { className: string; icon: typeof CheckCircle2 }
> = {
  NORMAL: {
    className: "bg-emerald-50 text-emerald-700",
    icon: CheckCircle2,
  },
  BORDERLINE: {
    className: "bg-amber-50 text-amber-700",
    icon: AlertTriangle,
  },
  CRITICAL: {
    className: "bg-red-50 text-red-700",
    icon: AlertCircle,
  },
};

function TestStatusBadge({ status }: { status: string }) {
  const config = statusBadge[status] ?? {
    className: "bg-slate-100 text-slate-600",
    icon: CheckCircle2,
  };

  const Icon = config.icon;

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${config.className}`}
    >
      <Icon size={13} />
      {status || "UNKNOWN"}
    </span>
  );
}

export default function OrganTableCard({ organ, defaultOpen = false }: Props) {
  const [open, setOpen] = useState(defaultOpen);

  const countOf = (status: string) =>
    organ.tests.filter((test) => test.TEST_STATUS === status).length;

  const criticalCount = countOf("CRITICAL");
  const borderlineCount = countOf("BORDERLINE");
  const normalCount = countOf("NORMAL");

  const organTone =
    organ.organStatus === "CRITICAL"
      ? "bg-red-50 text-red-700"
      : organ.organStatus === "BORDERLINE"
      ? "bg-amber-50 text-amber-700"
      : "bg-emerald-50 text-emerald-700";

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-card">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center gap-3 px-5 py-4 text-left transition hover:bg-slate-50"
      >
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2.5">
            <h2 className="text-sm font-semibold text-slate-900">
              {organ.organName}
            </h2>

            <span
              className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${organTone}`}
            >
              {organ.organStatus}
            </span>

            <span className="text-xs text-slate-400">
              {organ.tests.length} tests
            </span>
          </div>

          <div className="mt-1.5 flex flex-wrap gap-3 text-xs font-medium">
            {criticalCount > 0 && (
              <span className="text-red-600">{criticalCount} critical</span>
            )}

            {borderlineCount > 0 && (
              <span className="text-amber-600">
                {borderlineCount} borderline
              </span>
            )}

            {normalCount > 0 && (
              <span className="text-emerald-600">{normalCount} normal</span>
            )}
          </div>
        </div>

        <ChevronDown
          className={`h-5 w-5 shrink-0 text-slate-400 transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      <div
        className={`grid transition-all duration-300 ease-out ${
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          {organ.organExplanation && (
            <div className="border-t border-slate-100 p-5">
              <div className="rounded-xl border border-brand-100 bg-brand-50/60 p-4">
                <h3 className="flex items-center gap-2 text-sm font-semibold text-slate-900">
                  <Sparkles size={15} className="text-brand-600" />
                  What this means
                </h3>

                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {organ.organExplanation}
                </p>
              </div>
            </div>
          )}

          <div className="scrollbar-slim overflow-x-auto">
            <table className="w-full min-w-[560px]">
              <thead className="border-y border-slate-100 bg-slate-50">
                <tr>
                  {["Test", "Result", "Reference range", "Status"].map(
                    (heading) => (
                      <th
                        key={heading}
                        className="px-5 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-slate-500"
                      >
                        {heading}
                      </th>
                    )
                  )}
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {organ.tests.map((test, index) => (
                  <tr
                    key={`${test.TEST_NAME}-${index}`}
                    className="transition hover:bg-slate-50"
                  >
                    <td className="px-5 py-3 text-sm font-medium text-slate-900">
                      {test.TEST_NAME}
                    </td>

                    <td className="px-5 py-3 font-mono text-sm font-semibold text-slate-900">
                      {test.RESULT}
                    </td>

                    <td className="px-5 py-3 font-mono text-sm text-slate-500">
                      {test.REFERENCE_RANGE || "-"}
                    </td>

                    <td className="px-5 py-3">
                      <TestStatusBadge status={test.TEST_STATUS} />
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
