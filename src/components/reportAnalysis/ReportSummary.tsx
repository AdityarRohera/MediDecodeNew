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
      rounded-3xl
      border border-slate-200
      p-6
      shadow-sm
      "
    >
      {/* Header */}

      <div className="flex items-center gap-3">
        <div className="h-11 w-11 rounded-2xl bg-blue-50 flex items-center justify-center">
          <ClipboardList className="h-5 w-5 text-blue-600" />
        </div>

        <div>
          <h2 className="text-lg font-semibold text-slate-900">
            Report Summary
          </h2>

          <p className="text-md text-slate-500">
            AI generated analysis
          </p>
        </div>
      </div>

      {/* Findings */}

      <div className="grid grid-cols-2 gap-4 mt-6">

        <div className="rounded-2xl bg-red-50 border border-red-100 p-4">
          <p className="text-red-600 text-sm font-medium">
            Critical Findings
          </p>

          <h3 className="text-3xl font-bold text-red-700 mt-1">
            {criticalTests}
          </h3>
        </div>

        <div className="rounded-2xl bg-amber-50 border border-amber-100 p-4">
          <p className="text-amber-600 text-sm font-medium">
            Borderline Findings
          </p>

          <h3 className="text-3xl font-bold text-amber-700 mt-1">
            {borderlineTests}
          </h3>
        </div>

      </div>

      {/* Summary */}

      <div className="mt-6">
        <div className="flex items-center gap-2 mb-3">
          <Stethoscope className="h-4 w-4 text-slate-600" />

          <h3 className="font-semibold text-slate-900">
            AI Analysis
          </h3>
        </div>

        <p className="text-slate-600 leading-7 text-[15px]">
          {reportSummary}
        </p>
      </div>

      {/* Recommendation */}

      <div
        className="
        mt-6
        rounded-2xl
        border
        border-amber-200
        bg-gradient-to-r
        from-amber-50
        to-orange-50
        p-5
        "
      >
        <div className="flex items-start gap-3">

          <div className="mt-1">
            <TriangleAlert className="h-5 w-5 text-amber-600" />
          </div>

          <div>
            <p className="text-xs uppercase tracking-wider text-amber-700 font-semibold">
              Doctor Recommendation
            </p>

            <h3 className="mt-1 text-lg font-bold text-amber-800">
              {doctorRecommendation}
            </h3>

            <p className="mt-2 text-sm text-slate-700 leading-6">
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