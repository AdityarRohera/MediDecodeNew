import { cookies } from "next/headers";
import { GitCompare, TriangleAlert } from "lucide-react";

import { fetchAllreports } from "@/services/operations/reports/report";
import { normalizeType } from "@/components/analysis/shared";

import ReportPickList from "@/components/analysis/ReportPickList";
import CompareResult from "@/components/analysis/CompareResult";
import EmptyState from "@/components/analysis/EmptyState";

const toSide = (report: any) => ({
  reportId: report.REPORT_ID,
  reportName: report.REPORT_NAME,
  reportType: report.REPORT_TYPE,
  date: report.ANALYSIS_DATE ?? report.UPLOADED_DATE,
  score: report.HEALTH_SCORE ?? 0,
});

export default async function ComparePage({ searchParams }: any) {
  const params = await searchParams;
  const cookieStore = await cookies();

  let reports: any[] = [];

  try {
    const res = await fetchAllreports(
      { status: "COMPLETED", limit: 100 },
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

  // Guards a hand edited url, the picker already blocks a bad pair.
  const valid =
    first && second && first.REPORT_ID !== second.REPORT_ID;

  /*
      Type comes back as free text from the AI, so the same lab
      report can be labelled differently on each upload. A mismatch
      is worth a heads up but is not a reason to refuse.
  */
  const mixedTypes =
    valid &&
    normalizeType(first.REPORT_TYPE) !==
      normalizeType(second.REPORT_TYPE);

  /*
      The API decides previous and current by ANALYSIS_DATE, so the
      header has to be ordered the same way or the two sides would
      read backwards against the summary.
  */
  const [rowA, rowB] = valid
    ? [first, second].sort(
        (a: any, b: any) =>
          new Date(a.ANALYSIS_DATE ?? a.UPLOADED_DATE).getTime() -
          new Date(b.ANALYSIS_DATE ?? b.UPLOADED_DATE).getTime()
      )
    : [];

  return (
    <div className="space-y-5">
      <ReportPickList reports={analyzed} />

      {params?.a && params?.b && !valid && (
        <EmptyState
          icon={TriangleAlert}
          title="These reports cannot be compared"
          message="Pick two different reports from your list. Check the link if you edited it by hand."
        />
      )}

      {mixedTypes && (
        <p className="flex items-start gap-2 rounded-xl border border-amber-100 bg-amber-50 p-4 text-xs text-amber-800">
          <TriangleAlert size={15} className="mt-px shrink-0" />
          These reports are labelled{" "}
          <span className="font-semibold">{first.REPORT_TYPE || "Unknown"}</span>{" "}
          and{" "}
          <span className="font-semibold">{second.REPORT_TYPE || "Unknown"}</span>.
          Tests that do not appear in both will show as new or not redone.
        </p>
      )}

      {valid && (
        <CompareResult
          key={`${rowA.REPORT_ID}-${rowB.REPORT_ID}`}
          reportA={toSide(rowA)}
          reportB={toSide(rowB)}
          comparisonId={params?.id}
        />
      )}
    </div>
  );
}
