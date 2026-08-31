import { statusStyle, TestStatus } from "./shared";

type Props = {
  low: number | null;
  high: number | null;
  valueA: number | null;
  valueB: number | null;
  statusA: TestStatus;
  statusB: TestStatus;
};

const clamp = (value: number) =>
  Math.min(100, Math.max(0, value));

export default function RangeBar({
  low,
  high,
  valueA,
  valueB,
  statusA,
  statusB,
}: Props) {
  if (low === null || high === null || valueA === null || valueB === null) {
    return <span className="text-xs text-slate-400">-</span>;
  }

  // Pad the reference range so out of range values stay visible.
  const padding = (high - low || 1) * 0.4;

  const min = Math.min(low - padding, valueA, valueB);
  const max = Math.max(high + padding, valueA, valueB);

  // Keep the plotted dots inside a 6-94 band so an out of range
  // value never sits half clipped on the edge of the track.
  const toPercent = (value: number) =>
    6 + clamp(((value - min) / (max - min || 1)) * 100) * 0.88;

  return (
    <div className="relative h-4 w-full min-w-[90px]">
      <div className="absolute inset-x-0 top-1.5 h-1 rounded-full bg-slate-200" />

      <div
        className="absolute top-1.5 h-1 rounded-full bg-emerald-200"
        style={{
          left: `${toPercent(low)}%`,
          width: `${toPercent(high) - toPercent(low)}%`,
        }}
      />

      <span
        title="Older report"
        className={`absolute top-0 h-3.5 w-3.5 -translate-x-1/2 rounded-full border-2 bg-white ${statusStyle[statusA].text}`}
        style={{
          left: `${toPercent(valueA)}%`,
          borderColor: "currentColor",
        }}
      />

      <span
        title="Newer report"
        className={`absolute top-0 h-3.5 w-3.5 -translate-x-1/2 rounded-full ${statusStyle[statusB].dot}`}
        style={{ left: `${toPercent(valueB)}%` }}
      />
    </div>
  );
}
