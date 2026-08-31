import { cookies } from "next/headers";
import {
  GitCompare,
  MessageCircle,
  Sparkles,
  TriangleAlert,
} from "lucide-react";

import { fetchAllreports } from "@/services/operations/reports/report";
import { getComparison } from "@/data/analysisData";
import { normalizeType } from "@/components/analysis/shared";

import ReportPickList from "@/components/analysis/ReportPickList";
import CompareHeader from "@/components/analysis/CompareHeader";
import CompareStats from "@/components/analysis/CompareStats";
import CompareTable from "@/components/analysis/CompareTable";
import EmptyState from "@/components/analysis/EmptyState";
import SampleBadge from "@/components/analysis/SampleBadge";

const DAY = 1000 * 60 * 60 * 24;

const toSide = (report: any) => ({
  reportId: report.REPORT_ID,
  reportName: report.REPORT_NAME,
  reportType: report.REPORT_TYPE,
  date: report.UPLOADED_DATE,
  score: report.HEALTH_SCORE ?? 0,
});

export default async function ComparePage({ searchParams }: any) {
  const params = await searchParams;
  const cookieStore = await cookies();

  let reports: any[] = [];

  try {
    const res = await fetchAllreports(
      { status: "completed", limit: 50 },
      cookieStore
    );

    reports = res.data ?? [];
  } catch (err) {
    console.log("-------Error comes in compare page-------", err);
  }

  const analyzed = reports.filter(
    (report: any) => report.STATUS === "COMPLETED"
  );

  if (analyzed.length < 2) {
    return (
      <EmptyState
        icon={GitCompare}
        title="Nothing to compare yet"
        message="Comparison needs two analyzed reports. Upload one more and we will line them up test by test."
        actionLabel="Upload report"
        actionHref="/dashboard/upload"
      />
    );
  }

  const find = (id?: string) =>
    analyzed.find((report: any) => report.REPORT_ID === id);

  const first = find(params?.a);
  const second = find(params?.b);

  // The picker already blocks a bad pair, this guards a hand edited url.
  const valid =
    first &&
    second &&
    first.REPORT_ID !== second.REPORT_ID &&
    normalizeType(first.REPORT_TYPE) ===
      normalizeType(second.REPORT_TYPE);

  const [rowA, rowB] = valid
    ? [first, second].sort(
        (a: any, b: any) =>
          new Date(a.UPLOADED_DATE).getTime() -
          new Date(b.UPLOADED_DATE).getTime()
      )
    : [];

  // TODO: replace with GET /reports/compare?a=..&b=.. once the API is ready.
  const comparison = valid
    ? getComparison(rowA.REPORT_ID, rowB.REPORT_ID)
    : null;

  const daysApart = valid
    ? Math.round(
        (new Date(rowB.UPLOADED_DATE).getTime() -
          new Date(rowA.UPLOADED_DATE).getTime()) /
          DAY
      )
    : 0;

  return (
    <div className="space-y-5">
      <ReportPickList reports={analyzed} />

      {params?.a && params?.b && !valid && (
        <EmptyState
          icon={TriangleAlert}
          title="These reports cannot be compared"
          message="Pick two different reports of the same type. A blood report can only be compared with another blood report."
        />
      )}

      {comparison && (
        <>
          <CompareHeader
            reportA={toSide(rowA)}
            reportB={toSide(rowB)}
            daysApart={daysApart}
          />

          <section className="rounded-xl border border-cyan-100 bg-cyan-50/60 p-5">
            <div className="flex items-start gap-3">
              <Sparkles className="mt-0.5 h-5 w-5 shrink-0 text-cyan-600" />

              <div className="flex-1">
                <div className="flex items-center justify-between gap-3">
                  <h2 className="text-sm font-semibold text-slate-900">
                    What changed
                  </h2>

                  <SampleBadge />
                </div>

                <p className="mt-1.5 text-sm leading-relaxed text-slate-700">
                  {comparison.verdict}
                </p>

                <p className="mt-2 text-xs text-slate-500">
                  Summary only, not a medical opinion.
                </p>
              </div>
            </div>
          </section>

          <CompareStats stats={comparison.stats} />

          <CompareTable
            organs={comparison.organs}
            dateA={rowA.UPLOADED_DATE}
            dateB={rowB.UPLOADED_DATE}
          />

          <button className="flex h-10 items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 text-sm font-semibold text-slate-700 transition hover:bg-slate-50">
            <MessageCircle size={16} />
            Ask AI about this comparison
          </button>
        </>
      )}
    </div>
  );
}
