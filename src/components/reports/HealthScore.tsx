

interface ScoreProps {
  score: number;
}

export function HealthScoreBadge({
  score,
}: ScoreProps) {
  const colorClass =
    score >= 85
      ? "border-emerald-100 bg-emerald-50 text-emerald-700"
    : score >= 70
      ? "border-amber-100 bg-amber-50 text-amber-700"
      : "border-red-100 bg-red-50 text-red-700";

  return (
    <div
      className={`
        flex
        h-10
        w-10
        items-center
        justify-center
        rounded-full
        border-4
        text-sm
        font-bold
        ${colorClass}
    `}
    >
      {score}
    </div>
  );
}
