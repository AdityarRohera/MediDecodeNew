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
  const circumference = 2 * Math.PI * 66;
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

  return (
    <div
      className="
      bg-white
      border
      border-slate-200
      rounded-3xl
      p-6
      shadow-sm
      h-full
      "
    >
      <h2 className="text-lg font-semibold text-slate-900">
        Health Score
      </h2>

      {/* Score Ring */}

      <div className="flex justify-center mt-8">
        <div className="relative w-44 h-44">

          <svg
            width="176"
            height="176"
            className="-rotate-90"
          >
            <circle
              cx="88"
              cy="88"
              r="66"
              stroke="#E2E8F0"
              strokeWidth="12"
              fill="transparent"
            />

            <circle
              cx="88"
              cy="88"
              r="66"
              stroke="#22C55E"
              strokeWidth="12"
              strokeLinecap="round"
              fill="transparent"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
            />
          </svg>

          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <h1 className="text-5xl font-bold text-slate-900">
              {score}
            </h1>

            <span className="text-sm text-slate-400">
              /100
            </span>
          </div>
        </div>
      </div>

      {/* Status */}

      <div className="text-center mt-4">
        <h3
          className={`text-xl font-semibold ${status.color}`}
        >
          {status.label}
        </h3>

        <p className="text-sm text-slate-500 mt-2 leading-6">
          Based on the overall analysis of your
          laboratory results.
        </p>
      </div>

      {/* Divider */}

      <div className="h-px bg-slate-200 my-6" />

      {/* Quick Stats */}

      <div className="space-y-3">

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