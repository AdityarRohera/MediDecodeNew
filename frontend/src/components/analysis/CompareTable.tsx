"use client";

import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";

import RangeBar from "./RangeBar";
import {
  changeStyle,
  ComparedOrgan,
  formatShortDate,
  statusStyle,
} from "./shared";

type Props = {
  organs: ComparedOrgan[];
  dateA: string;
  dateB: string;
};

export default function CompareTable({
  organs,
  dateA,
  dateB,
}: Props) {
  const [openOrgans, setOpenOrgans] = useState<string[]>([
    organs[0]?.organName,
  ]);

  const [changedOnly, setChangedOnly] = useState(false);

  const toggle = (organName: string) =>
    setOpenOrgans((current) =>
      current.includes(organName)
        ? current.filter((name) => name !== organName)
        : [...current, organName]
    );

  if (organs.length === 0) {
    return (
      <section className="rounded-xl border border-slate-200 bg-white p-10 text-center">
        <p className="text-sm text-slate-500">
          No shared tests were found between these two reports.
        </p>
      </section>
    );
  }

  return (
    <section className="rounded-xl border border-slate-200 bg-white">
      <div className="flex items-center justify-between border-b border-slate-200 px-5 py-3">
        <h2 className="text-sm font-semibold text-slate-900">
          Test by test
        </h2>

        <label className="flex cursor-pointer items-center gap-2 text-xs text-slate-600">
          <input
            type="checkbox"
            checked={changedOnly}
            onChange={(e) => setChangedOnly(e.target.checked)}
            className="h-3.5 w-3.5 accent-cyan-600"
          />
          Show changed only
        </label>
      </div>

      {organs.map((organ) => {
        const open = openOrgans.includes(organ.organName);

        const tests = changedOnly
          ? organ.tests.filter((test) => test.change !== "SAME")
          : organ.tests;

        const changed = organ.tests.filter(
          (test) => test.change !== "SAME"
        ).length;

        return (
          <div
            key={organ.organName}
            className="border-b border-slate-100 last:border-b-0"
          >
            <button
              onClick={() => toggle(organ.organName)}
              className="flex w-full items-center gap-3 bg-slate-50 px-5 py-3 text-left transition hover:bg-slate-100"
            >
              {open ? (
                <ChevronDown size={16} className="text-slate-400" />
              ) : (
                <ChevronRight size={16} className="text-slate-400" />
              )}

              <span className="flex-1 text-sm font-semibold text-slate-900">
                {organ.organName}
              </span>

              {!open && changed > 0 && (
                <span
                  className={`text-xs font-medium ${
                    changeStyle[organ.change].text
                  }`}
                >
                  {changed} changed
                </span>
              )}

              <span
                className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                  statusStyle[organ.statusA].bg
                } ${statusStyle[organ.statusA].text}`}
              >
                {statusStyle[organ.statusA].label}
              </span>

              <span className="text-slate-300">→</span>

              <span
                className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                  statusStyle[organ.statusB].bg
                } ${statusStyle[organ.statusB].text}`}
              >
                {statusStyle[organ.statusB].label}
              </span>
            </button>

            {open && (
              <>
                {organ.feedback && (
                  <p className="border-b border-slate-100 px-5 py-3 text-xs leading-relaxed text-slate-500">
                    {organ.feedback}
                  </p>
                )}

                <div className="overflow-x-auto">
                  <table className="w-full min-w-[680px]">
                    <thead>
                      <tr className="border-b border-slate-100">
                        <th className="px-5 py-2 text-left text-xs font-medium text-slate-400">
                          Test
                        </th>

                        <th className="px-3 py-2 text-left text-xs font-medium text-slate-400">
                          Range
                        </th>

                        <th className="px-3 py-2 text-left text-xs font-medium text-slate-400">
                          {formatShortDate(dateA)}
                        </th>

                        <th className="px-3 py-2 text-left text-xs font-medium text-slate-400">
                          {formatShortDate(dateB)}
                        </th>

                        <th className="px-3 py-2 text-left text-xs font-medium text-slate-400">
                          Change
                        </th>

                        <th className="px-5 py-2 text-left text-xs font-medium text-slate-400">
                          Position in range
                        </th>
                      </tr>
                    </thead>

                    <tbody className="divide-y divide-slate-50">
                      {tests.map((test) => (
                        <tr key={test.testName}>
                          <td className="px-5 py-3">
                            <p className="text-sm font-medium text-slate-900">
                              {test.testName}
                            </p>

                            {test.feedback && (
                              <p className="mt-0.5 max-w-xs text-xs leading-relaxed text-slate-500">
                                {test.feedback}
                              </p>
                            )}
                          </td>

                          <td className="px-3 py-3 text-xs text-slate-500">
                            {test.range || "-"}
                            {test.unit && (
                              <span className="block text-slate-400">
                                {test.unit}
                              </span>
                            )}
                          </td>

                          <td
                            className={`px-3 py-3 text-sm ${
                              statusStyle[test.statusA].text
                            }`}
                          >
                            {test.rawA}
                          </td>

                          <td
                            className={`px-3 py-3 text-sm font-semibold ${
                              statusStyle[test.statusB].text
                            }`}
                          >
                            {test.rawB}
                          </td>

                          <td
                            className={`px-3 py-3 text-xs font-medium ${
                              changeStyle[test.change].text
                            }`}
                          >
                            {changeStyle[test.change].label}
                          </td>

                          <td className="px-5 py-3">
                            <RangeBar
                              low={test.low}
                              high={test.high}
                              valueA={test.valueA}
                              valueB={test.valueB}
                              statusA={test.statusA}
                              statusB={test.statusB}
                            />
                          </td>
                        </tr>
                      ))}

                      {tests.length === 0 && (
                        <tr>
                          <td
                            colSpan={6}
                            className="px-5 py-4 text-center text-xs text-slate-400"
                          >
                            No changed tests in this group.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </>
            )}
          </div>
        );
      })}
    </section>
  );
}
