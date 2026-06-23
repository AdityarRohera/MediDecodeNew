import {
  CheckCircle2,
  AlertTriangle,
  AlertCircle,
} from "lucide-react";

type Test = {
  testName: string;
  result: string;
  range: string;
  status: string;
};

type Organ = {
  organName: string;
  organStatus: string;
  organExplanation: string;
  tests: Test[];
};

interface Props {
  analysis: Organ[];
}

export default function OrganSummaryCard({
  analysis,
}: Props) {
  const getStatusConfig = (status: string) => {
    switch (status) {
      case "CRITICAL":
        return {
          icon: AlertCircle,
          iconColor: "text-red-500",
          badge:
            "bg-red-50 text-red-700 border border-red-100",
        };

      case "BORDERLINE":
        return {
          icon: AlertTriangle,
          iconColor: "text-amber-500",
          badge:
            "bg-amber-50 text-amber-700 border border-amber-100",
        };

      default:
        return {
          icon: CheckCircle2,
          iconColor: "text-emerald-500",
          badge:
            "bg-emerald-50 text-emerald-700 border border-emerald-100",
        };
    }
  };

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
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-slate-900">
          Organ Analysis
        </h2>

        <span className="text-sm text-slate-500">
          {analysis.length} Organs
        </span>
      </div>

      <div className="mt-6 space-y-3">

        {analysis.map((organ) => {
          const config = getStatusConfig(
            organ.organStatus
          );

          const Icon = config.icon;

          return (
            <div
              key={organ.organName}
              className="
              flex
              items-center
              justify-between
              p-4
              rounded-2xl
              border
              border-slate-100
              hover:bg-slate-50
              transition-colors
            "
            >
              <div className="flex items-center gap-3">

                <Icon
                  className={`w-5 h-5 ${config.iconColor}`}
                />

                <div>
                  <h3 className="font-medium text-slate-900">
                    {organ.organName}
                  </h3>

                  <p className="text-xs text-slate-500">
                    {organ.tests.length} Tests
                  </p>
                </div>

              </div>

              <span
                className={`
                px-2.5 py-1
                rounded-full
                text-xs
                font-semibold
                ${config.badge}
              `}
              >
                {organ.organStatus}
              </span>
            </div>
          );
        })}

      </div>

      <div className="mt-6 pt-5 border-t border-slate-100">

        <div className="flex justify-between text-sm">

          <span className="text-slate-500">
            Total Organs Analyzed
          </span>

          <span className="font-semibold">
            {analysis.length}
          </span>

        </div>

      </div>
    </div>
  );
}