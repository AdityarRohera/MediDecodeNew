"use client";

import { useEffect, useRef, useState } from "react";
import {
  Loader2,
  RotateCw,
  Sparkles,
  TriangleAlert,
} from "lucide-react";

import {
  createComparison,
  fetchComparison,
} from "@/services/operations/reports/report";

import CompareHeader from "./CompareHeader";
import CompareStats from "./CompareStats";
import CompareTable from "./CompareTable";
import {
  buildComparison,
  ComparisonSide,
  ComparisonView,
  formatDate,
} from "./shared";

const DAY = 1000 * 60 * 60 * 24;

type Props = {
  reportA: ComparisonSide;
  reportB: ComparisonSide;
  comparisonId?: string;
};

export default function CompareResult({
  reportA,
  reportB,
  comparisonId,
}: Props) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [view, setView] = useState<ComparisonView | null>(null);
  const [saved, setSaved] = useState(false);
  const [comparedAt, setComparedAt] = useState("");
  const [attempt, setAttempt] = useState(0);

  /*
      Comparing costs an AI call, so the same pair is only ever
      requested once. Without this, React runs the effect twice in
      development and two comparisons get created.
  */
  const requested = useRef("");

  useEffect(() => {
    const key =
      comparisonId ||
      `${reportA.reportId}-${reportB.reportId}`;

    if (requested.current === key) return;

    requested.current = key;

    const run = async () => {
      setLoading(true);
      setError("");

      try {
        const res = comparisonId
          ? await fetchComparison(comparisonId)
          : await createComparison(
              reportA.reportId,
              reportB.reportId
            );

        const row = res.data;

        setView(buildComparison(row.COMPARISON_RESULT));
        setSaved(Boolean(res.alreadyExists) || Boolean(comparisonId));
        setComparedAt(row.COMPARED_AT);
      } catch (err: any) {
        console.log("-------Error comes in compare result-------", err);

        setError(
          err?.response?.data?.message ||
            "We could not compare these reports. Please try again."
        );
      } finally {
        setLoading(false);
      }
    };

    run();
  }, [comparisonId, reportA.reportId, reportB.reportId, attempt]);

  const retry = () => {
    requested.current = "";
    setAttempt((value) => value + 1);
  };

  if (loading) {
    return (
      <section className="rounded-xl border border-slate-200 bg-white p-10 text-center">
        <Loader2 className="mx-auto h-7 w-7 animate-spin text-cyan-600" />

        <h2 className="mt-4 text-lg font-semibold text-slate-900">
          Comparing your reports
        </h2>

        <p className="mx-auto mt-1.5 max-w-md text-sm text-slate-500">
          We are lining up every test across both reports. This
          takes a few seconds the first time.
        </p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="rounded-xl border border-slate-200 bg-white p-10 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50">
          <TriangleAlert className="h-7 w-7 text-red-500" />
        </div>

        <h2 className="mt-4 text-lg font-semibold text-slate-900">
          Comparison failed
        </h2>

        <p className="mx-auto mt-1.5 max-w-md text-sm text-slate-500">
          {error}
        </p>

        <button
          onClick={retry}
          className="mt-6 inline-flex h-10 items-center gap-2 rounded-lg bg-cyan-600 px-5 text-sm font-semibold text-white transition hover:bg-cyan-700"
        >
          <RotateCw size={16} />
          Try again
        </button>
      </section>
    );
  }

  if (!view) return null;

  const daysApart = Math.round(
    (new Date(reportB.date).getTime() -
      new Date(reportA.date).getTime()) /
      DAY
  );

  return (
    <div className="space-y-5">
      <CompareHeader
        reportA={reportA}
        reportB={reportB}
        daysApart={daysApart}
      />

      <section className="rounded-xl border border-cyan-100 bg-cyan-50/60 p-5">
        <div className="flex items-start gap-3">
          <Sparkles className="mt-0.5 h-5 w-5 shrink-0 text-cyan-600" />

          <div className="flex-1">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-sm font-semibold text-slate-900">
                What changed
              </h2>

              {saved && (
                <span className="rounded-full bg-white px-2.5 py-0.5 text-xs font-medium text-slate-500">
                  Saved comparison · {formatDate(comparedAt)}
                </span>
              )}
            </div>

            <p className="mt-1.5 text-sm leading-relaxed text-slate-700">
              {view.summary}
            </p>

            <p className="mt-2 text-xs text-slate-500">
              Summary only, not a medical opinion.
            </p>
          </div>
        </div>
      </section>

      <CompareStats stats={view.stats} />

      <CompareTable
        organs={view.organs}
        dateA={reportA.date}
        dateB={reportB.date}
      />
    </div>
  );
}
