import { formatShortDate, scoreTone, statusStyle } from "./shared";

export type TrendPoint = {
  reportId: string;
  score: number;
  date: string;
};

const WIDTH = 640;
const HEIGHT = 170;
const PAD_X = 22;
const PAD_Y = 18;

export default function ScoreTrend({
  points,
}: {
  points: TrendPoint[];
}) {
  const step =
    points.length > 1
      ? (WIDTH - PAD_X * 2) / (points.length - 1)
      : 0;

  const toY = (score: number) =>
    HEIGHT - PAD_Y - (score / 100) * (HEIGHT - PAD_Y * 2);

  const coords = points.map((point, index) => ({
    ...point,
    x: PAD_X + index * step,
    y: toY(point.score),
  }));

  const line = coords.map((c) => `${c.x},${c.y}`).join(" ");

  const area = `${PAD_X},${HEIGHT - PAD_Y} ${line} ${
    PAD_X + (points.length - 1) * step
  },${HEIGHT - PAD_Y}`;

  const first = points[0].score;
  const last = points[points.length - 1].score;
  const delta = last - first;

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-5">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-slate-900">
          Health score trend
        </h2>

        <span
          className={`text-sm font-semibold ${
            delta >= 0 ? "text-emerald-600" : "text-red-600"
          }`}
        >
          {delta >= 0 ? "+" : ""}
          {delta} since first report
        </span>
      </div>

      <svg
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        className="mt-4 w-full"
        role="img"
        aria-label="Health score across reports"
      >
        {[0, 50, 100].map((value) => (
          <line
            key={value}
            x1={0}
            x2={WIDTH}
            y1={toY(value)}
            y2={toY(value)}
            className="stroke-slate-200"
            strokeWidth={1}
          />
        ))}

        <polygon points={area} className="fill-cyan-50" />

        <polyline
          points={line}
          fill="none"
          className="stroke-cyan-600"
          strokeWidth={2.5}
          strokeLinejoin="round"
          strokeLinecap="round"
        />

        {coords.map((point) => (
          <circle
            key={point.reportId}
            cx={point.x}
            cy={point.y}
            r={5}
            className={`fill-white ${
              statusStyle[scoreTone(point.score)].text
            }`}
            stroke="currentColor"
            strokeWidth={3}
          />
        ))}
      </svg>

      <div className="mt-2 flex justify-between text-xs text-slate-500">
        {points.map((point) => (
          <span key={point.reportId}>
            {formatShortDate(point.date)} · {point.score}
          </span>
        ))}
      </div>
    </section>
  );
}
