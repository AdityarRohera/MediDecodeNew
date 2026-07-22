import {
  CircleCheckBig,
  TriangleAlert,
  Siren,
} from "lucide-react";

type Props = {
  score: number;
  normalTests: number;
  borderlineTests: number;
  criticalTests: number;
};

export default function HealthScoreCard({
  score,
  normalTests,
  borderlineTests,
  criticalTests,
}: Props) {
  const circumference = 2 * Math.PI * 54;
  const offset =
    circumference - (score / 100) * circumference;

  const getStatus = () => {
    if (score >= 80)
      return {
        label: "Excellent",
        color: "text-emerald-600",
      };

    if (score >= 60)
      return {
        label: "Good",
        color: "text-emerald-600",
      };

    if (score >= 40)
      return {
        label: "Moderate",
        color: "text-amber-600",
      };

    return {
      label: "Critical",
      color: "text-red-600",
    };
  };

  const status = getStatus();

  const ringColor =
    score >= 60 ? "#22C55E" : score >= 40 ? "#F59E0B" : "#EF4444";

  return (
    <div
      className="
      bg-white
      border
      border-slate-200
      rounded-2xl
      p-5
      shadow-sm
      h-full
      "
    >
      <h2 className="text-base font-semibold text-slate-900">
        Health Score
      </h2>

      {/* Score Ring */}

      <div className="flex justify-center mt-5">
        <div className="relative w-36 h-36">

          <svg
            width="144"
            height="144"
            className="-rotate-90"
          >
            <circle
              cx="72"
              cy="72"
              r="54"
              stroke="#E2E8F0"
              strokeWidth="10"
              fill="transparent"
            />

            <circle
              cx="72"
              cy="72"
              r="54"
              stroke={ringColor}
              strokeWidth="10"
              strokeLinecap="round"
              fill="transparent"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
            />
          </svg>

          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <h1 className="text-4xl font-bold text-slate-900">
              {score}
            </h1>

            <span className="text-xs text-slate-400">
              /100
            </span>
          </div>
        </div>
      </div>

      {/* Status */}

      <div className="text-center mt-3">
        <h3
          className={`text-lg font-semibold ${status.color}`}
        >
          {status.label}
        </h3>

        <p className="text-xs text-slate-500 mt-1.5 leading-5">
          Based on the overall analysis of your
          laboratory results.
        </p>
      </div>

      {/* Divider */}

      <div className="h-px bg-slate-200 my-4" />

      {/* Quick Stats */}

      <div className="space-y-2.5">

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CircleCheckBig className="h-4 w-4 text-emerald-500" />
            <span className="text-sm text-slate-600">
              Normal
            </span>
          </div>

          <span className="font-semibold">
            {normalTests}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TriangleAlert className="h-4 w-4 text-amber-500" />
            <span className="text-sm text-slate-600">
              Borderline
            </span>
          </div>

          <span className="font-semibold">
            {borderlineTests}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Siren className="h-4 w-4 text-red-500" />
            <span className="text-sm text-slate-600">
              Critical
            </span>
          </div>

          <span className="font-semibold">
            {criticalTests}
          </span>
        </div>

      </div>
    </div>
  );
}