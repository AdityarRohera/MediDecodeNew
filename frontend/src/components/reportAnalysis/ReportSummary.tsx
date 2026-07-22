import {
  ClipboardList,
  Stethoscope,
  TriangleAlert,
} from "lucide-react";

type Props = {
  reportSummary: string;
  doctorRecommendation: string;
  criticalTests: number;
  borderlineTests: number;
};

const recommendationLabels: Record<string, string> = {
  NOT_REQUIRED: "No Consultation Needed",
  CONSIDER_VISIT: "Consider a Doctor Visit",
  RECOMMENDED: "Doctor Visit Recommended",
};

export default function ReportSummaryCard({
  reportSummary,
  doctorRecommendation,
  criticalTests,
  borderlineTests,
}: Props) {
  return (
    <div
      className="
      bg-white
      rounded-2xl
      border border-slate-200
      p-5
      shadow-sm
      "
    >
      {/* Header */}

      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-xl bg-blue-50 flex items-center justify-center">
          <ClipboardList className="h-5 w-5 text-blue-600" />
        </div>

        <div>
          <h2 className="text-base font-semibold text-slate-900">
            Report Summary
          </h2>

          <p className="text-sm text-slate-500">
            AI generated analysis
          </p>
        </div>
      </div>

      {/* Findings */}

      <div className="grid grid-cols-2 gap-3 mt-4">

        <div className="rounded-xl bg-red-50 border border-red-100 p-3">
          <p className="text-red-600 text-xs font-medium">
            Critical Findings
          </p>

          <h3 className="text-2xl font-bold text-red-700 mt-0.5">
            {criticalTests}
          </h3>
        </div>

        <div className="rounded-xl bg-amber-50 border border-amber-100 p-3">
          <p className="text-amber-600 text-xs font-medium">
            Borderline Findings
          </p>

          <h3 className="text-2xl font-bold text-amber-700 mt-0.5">
            {borderlineTests}
          </h3>
        </div>

      </div>

      {/* Summary */}

      <div className="mt-5">
        <div className="flex items-center gap-2 mb-2">
          <Stethoscope className="h-4 w-4 text-slate-600" />

          <h3 className="text-sm font-semibold text-slate-900">
            AI Analysis
          </h3>
        </div>

        <p className="text-slate-600 leading-6 text-sm">
          {reportSummary}
        </p>
      </div>

      {/* Recommendation */}

      <div
        className="
        mt-5
        rounded-xl
        border
        border-amber-200
        bg-gradient-to-r
        from-amber-50
        to-orange-50
        p-4
        "
      >
        <div className="flex items-start gap-3">

          <div className="mt-0.5">
            <TriangleAlert className="h-4 w-4 text-amber-600" />
          </div>

          <div>
            <p className="text-xs uppercase tracking-wider text-amber-700 font-semibold">
              Doctor Recommendation
            </p>

            <h3 className="mt-1 text-base font-bold text-amber-800">
              {recommendationLabels[doctorRecommendation] || doctorRecommendation}
            </h3>

            <p className="mt-1.5 text-xs text-slate-700 leading-5">
              Based on the abnormalities detected in this
              report, consultation with a healthcare
              professional is advised.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}