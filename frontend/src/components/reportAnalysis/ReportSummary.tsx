import { ClipboardList, Stethoscope, TriangleAlert } from "lucide-react";

type Props = {
  reportSummary: string;
  doctorRecommendation: string;
  criticalTests: number;
  borderlineTests: number;
};

const recommendationLabels: Record<string, string> = {
  NOT_REQUIRED: "No consultation needed",
  CONSIDER_VISIT: "Consider a doctor visit",
  RECOMMENDED: "Doctor visit recommended",
};

const recommendationTone: Record<string, string> = {
  NOT_REQUIRED: "border-emerald-100 bg-emerald-50 text-emerald-800",
  CONSIDER_VISIT: "border-amber-100 bg-amber-50 text-amber-800",
  RECOMMENDED: "border-red-100 bg-red-50 text-red-800",
};

export default function ReportSummaryCard({
  reportSummary,
  doctorRecommendation,
  criticalTests,
  borderlineTests,
}: Props) {
  const tone =
    recommendationTone[doctorRecommendation] ||
    "border-slate-200 bg-slate-50 text-slate-800";

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-card">
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50">
          <ClipboardList className="h-5 w-5 text-brand-600" />
        </span>

        <div>
          <h2 className="text-sm font-semibold text-slate-900">
            Report summary
          </h2>

          <p className="text-xs text-slate-500">AI generated analysis</p>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3">
        <div className="rounded-xl border border-red-100 bg-red-50 p-3">
          <p className="text-xs font-medium text-red-600">Critical findings</p>

          <p className="mt-0.5 text-2xl font-semibold text-red-700">
            {criticalTests ?? 0}
          </p>
        </div>

        <div className="rounded-xl border border-amber-100 bg-amber-50 p-3">
          <p className="text-xs font-medium text-amber-600">
            Borderline findings
          </p>

          <p className="mt-0.5 text-2xl font-semibold text-amber-700">
            {borderlineTests ?? 0}
          </p>
        </div>
      </div>

      <div className="mt-5">
        <h3 className="flex items-center gap-2 text-sm font-semibold text-slate-900">
          <Stethoscope className="h-4 w-4 text-slate-500" />
          What this report says
        </h3>

        <p className="mt-2 text-sm leading-relaxed text-slate-600">
          {reportSummary}
        </p>
      </div>

      <div className={`mt-5 rounded-xl border p-4 ${tone}`}>
        <div className="flex items-start gap-3">
          <TriangleAlert className="mt-0.5 h-4 w-4 shrink-0" />

          <div>
            <p className="text-xs font-semibold uppercase tracking-wider opacity-80">
              Doctor recommendation
            </p>

            <h3 className="mt-1 text-sm font-bold">
              {recommendationLabels[doctorRecommendation] ||
                doctorRecommendation}
            </h3>

            <p className="mt-1.5 text-xs leading-relaxed opacity-90">
              This summary is educational. Confirm anything that matters with a
              qualified healthcare professional.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
