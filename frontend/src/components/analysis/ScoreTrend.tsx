import { ArrowDownRight, ArrowUpRight, Minus } from "lucide-react";

import { formatShortDate, scoreTone, statusStyle } from "./shared";

export type TrendPoint = {
  reportId: string;
  score: number;
  date: string;
};

const WIDTH = 640;
const HEIGHT = 180;
const PAD_X = 24;
const PAD_Y = 22;

export default function ScoreTrend({ points }: { points: TrendPoint[] }) {
  const step =
    points.length > 1 ? (WIDTH - PAD_X * 2) / (points.length - 1) : 0;

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

  const Icon = delta === 0 ? Minus : delta > 0 ? ArrowUpRight : ArrowDownRight;

  const tone =
    delta === 0
      ? "bg-slate-100 text-slate-600"
      : delta > 0
      ? "bg-emerald-50 text-emerald-700"
      : "bg-red-50 text-red-700";

  return (
    <section className="animate-fade-up rounded-2xl border border-slate-200 bg-white p-5 shadow-card">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-sm font-semibold text-slate-900">
            Health score trend
          </h2>

          <p className="mt-0.5 text-xs text-slate-500">
            {points.length} analyzed reports, oldest to newest
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-2xl font-semibold leading-none tracking-tight text-slate-950">
              {last}
            </p>

            <p className="mt-1 text-xs text-slate-400">latest score</p>
          </div>

          <span
            className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ${tone}`}
          >
            <Icon size={14} />
            {delta > 0 ? "+" : ""}
            {delta} overall
          </span>
        </div>
      </div>

      <svg
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        className="mt-4 w-full"
        role="img"
        aria-label="Health score across reports"
      >
        <defs>
          <linearGradient id="trendArea" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#16a7ad" stopOpacity="0.28" />
            <stop offset="100%" stopColor="#16a7ad" stopOpacity="0" />
          </linearGradient>
        </defs>

        {[0, 50, 100].map((value) => (
          <line
            key={value}
            x1={0}
            x2={WIDTH}
            y1={toY(value)}
            y2={toY(value)}
            className="stroke-slate-100"
            strokeWidth={1}
          />
        ))}

        <polygon points={area} fill="url(#trendArea)" />

        {/* The line draws itself once, which reads as the score moving. */}
        <polyline
          points={line}
          fill="none"
          className="animate-draw stroke-brand-600"
          strokeWidth={2.5}
          strokeLinejoin="round"
          strokeLinecap="round"
          strokeDasharray={2000}
          style={{ "--draw-length": 2000 } as React.CSSProperties}
        />

        {coords.map((point) => (
          <circle
            key={point.reportId}
            cx={point.x}
            cy={point.y}
            r={5}
            className={`fill-white ${statusStyle[scoreTone(point.score)].text}`}
            stroke="currentColor"
            strokeWidth={3}
          />
        ))}
      </svg>

      <div className="mt-1 flex justify-between gap-2 text-xs text-slate-500">
        {points.map((point) => (
          <span key={point.reportId} className="truncate">
            {formatShortDate(point.date)} · {point.score}
          </span>
        ))}
      </div>
    </section>
  );
}
