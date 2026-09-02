interface ScoreProps {
  score: number | null | undefined;
  size?: number;
}

/*
    Small score ring used in lists. A report that has not been
    analyzed has no score, so it renders as a neutral dash instead
    of a made up number.
*/
export function HealthScoreBadge({ score, size = 40 }: ScoreProps) {
  const hasScore = typeof score === "number";

  const tone = !hasScore
    ? { ring: "#cbd5e1", text: "text-slate-400" }
    : score >= 80
    ? { ring: "#10b981", text: "text-emerald-600" }
    : score >= 60
    ? { ring: "#f59e0b", text: "text-amber-600" }
    : { ring: "#ef4444", text: "text-red-600" };

  const radius = size / 2 - 3;
  const circumference = 2 * Math.PI * radius;

  const progress = hasScore ? Math.min(100, Math.max(0, score)) : 0;

  return (
    <div
      className="relative shrink-0"
      style={{ width: size, height: size }}
      title={hasScore ? `Health score ${score} of 100` : "Not analyzed yet"}
    >
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#e2e8f0"
          strokeWidth="3"
        />

        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={tone.ring}
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference - (progress / 100) * circumference}
          className="transition-[stroke-dashoffset] duration-700 ease-out"
        />
      </svg>

      <span
        className={`absolute inset-0 flex items-center justify-center text-xs font-bold ${tone.text}`}
      >
        {hasScore ? score : "—"}
      </span>
    </div>
  );
}
