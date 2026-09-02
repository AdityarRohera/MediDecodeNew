export type TestStatus =
  | "NORMAL"
  | "BORDERLINE"
  | "CRITICAL"
  | "NOT_AVAILABLE";

export type ChangeType =
  | "IMPROVED"
  | "WORSENED"
  | "SAME"
  | "NEW"
  | "REMOVED";

// Single place for the status colours used across the analysis tab.
export const statusStyle: Record<
  TestStatus,
  { label: string; text: string; bg: string; dot: string }
> = {
  NORMAL: {
    label: "Normal",
    text: "text-emerald-700",
    bg: "bg-emerald-50",
    dot: "bg-emerald-500",
  },

  BORDERLINE: {
    label: "Borderline",
    text: "text-amber-700",
    bg: "bg-amber-50",
    dot: "bg-amber-500",
  },

  CRITICAL: {
    label: "Critical",
    text: "text-red-700",
    bg: "bg-red-50",
    dot: "bg-red-500",
  },

  NOT_AVAILABLE: {
    label: "Not available",
    text: "text-slate-500",
    bg: "bg-slate-100",
    dot: "bg-slate-300",
  },
};

export const changeStyle: Record<
  ChangeType,
  { label: string; text: string }
> = {
  IMPROVED: { label: "Improved", text: "text-emerald-600" },
  WORSENED: { label: "Worsened", text: "text-red-600" },
  SAME: { label: "No change", text: "text-slate-400" },
  NEW: { label: "New test", text: "text-cyan-600" },
  REMOVED: { label: "Not redone", text: "text-slate-400" },
};

export const formatDate = (value?: string) => {
  if (!value) return "-";

  return new Date(value).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

export const formatShortDate = (value?: string) => {
  if (!value) return "-";

  return new Date(value).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
  });
};

// Health score drives the same three tones as test status.
export const scoreTone = (score: number) =>
  score >= 80 ? "NORMAL" : score >= 60 ? "BORDERLINE" : "CRITICAL";

/*
    Report types come back as free text from the AI, so "CBC",
    "cbc" and " CBC " would look like three different types.
    Normalising here keeps the grouping and the same-type check
    honest until the backend returns a fixed enum.
*/
export const normalizeType = (value?: string) =>
  (value || "Other").trim().toUpperCase();

/*
    The comparison API returns the AI's own wording, so
    "Normal" / "Declined" have to be mapped onto the keys the
    components already use. Anything unknown falls back rather
    than crashing a lookup.
*/
const STATUS_MAP: Record<string, TestStatus> = {
  NORMAL: "NORMAL",
  BORDERLINE: "BORDERLINE",
  CRITICAL: "CRITICAL",
};

export const toStatus = (value?: string): TestStatus =>
  STATUS_MAP[(value || "").trim().toUpperCase()] ?? "NOT_AVAILABLE";

const CHANGE_MAP: Record<string, ChangeType> = {
  IMPROVED: "IMPROVED",
  DECLINED: "WORSENED",
  WORSENED: "WORSENED",
  SAME: "SAME",
  NEW: "NEW",
  REMOVED: "REMOVED",
};

export const toChange = (value?: string): ChangeType =>
  CHANGE_MAP[(value || "").trim().toUpperCase()] ?? "SAME";

// "11.2 g/dL" -> 11.2, "Positive" -> null
export const parseNumber = (value?: string | number | null) => {
  if (value === null || value === undefined) return null;

  const match = String(value).match(/-?\d+(?:\.\d+)?/);

  return match ? Number(match[0]) : null;
};

/*
    Reference ranges are free text too. Only ranges with two real
    bounds are usable, a one sided range like "> 40" has no top so
    the bar is skipped rather than inventing a value.
*/
export const parseRange = (value?: string) => {
  const text = String(value || "").trim();

  const pair = text.match(
    /(-?\d+(?:\.\d+)?)\s*(?:-|–|to)\s*(-?\d+(?:\.\d+)?)/i
  );

  if (pair) {
    return { low: Number(pair[1]), high: Number(pair[2]) };
  }

  // "< 100", "<= 41", "≤41"
  const upper = text.match(/^[<≤]=?\s*(-?\d+(?:\.\d+)?)/);

  if (upper) {
    return { low: 0, high: Number(upper[1]) };
  }

  return { low: null, high: null };
};

export type ComparisonSide = {
  reportId: string;
  reportName: string;
  reportType: string;
  date: string;
  score: number;
};

export type ComparisonStats = {
  improved: number;
  worsened: number;
  unchanged: number;
  newTests: number;
  notRepeated: number;
};

export type ComparedTest = {
  testName: string;
  range: string;
  unit: string;
  low: number | null;
  high: number | null;
  valueA: number | null;
  valueB: number | null;
  rawA: string;
  rawB: string;
  statusA: TestStatus;
  statusB: TestStatus;
  change: ChangeType;
  feedback: string;
};

export type ComparedOrgan = {
  organName: string;
  statusA: TestStatus;
  statusB: TestStatus;
  change: ChangeType;
  feedback: string;
  tests: ComparedTest[];
};

export type ComparisonView = {
  overallChange: ChangeType;
  summary: string;
  stats: ComparisonStats;
  organs: ComparedOrgan[];
};

const changedCount = (organ: ComparedOrgan) =>
  organ.tests.filter((test) => test.change !== "SAME").length;

/*
    Turns COMPARISON_RESULT from the API into the props the
    compare components already take. Values stay as the AI sent
    them, the parsed numbers are only used to draw the range bar.
*/
export const buildComparison = (result: any): ComparisonView => {
  const stats: ComparisonStats = {
    improved: 0,
    worsened: 0,
    unchanged: 0,
    newTests: 0,
    notRepeated: 0,
  };

  const organs: ComparedOrgan[] = (result?.organs ?? []).map(
    (organ: any) => ({
      organName: organ?.organ || "Other",
      statusA: toStatus(organ?.previousStatus),
      statusB: toStatus(organ?.currentStatus),
      change: toChange(organ?.change),
      feedback: organ?.feedback || "",

      tests: (organ?.tests ?? []).map((test: any) => {
        const change = toChange(test?.change);
        const { low, high } = parseRange(test?.expectedRange);

        if (change === "IMPROVED") stats.improved += 1;
        else if (change === "WORSENED") stats.worsened += 1;
        else if (change === "NEW") stats.newTests += 1;
        else if (change === "REMOVED") stats.notRepeated += 1;
        else stats.unchanged += 1;

        return {
          testName: test?.testName || "-",
          range: test?.expectedRange || "",
          unit: test?.unitOfMeasurement || "",
          low,
          high,
          valueA: parseNumber(test?.oldValue),
          valueB: parseNumber(test?.newValue),
          rawA: test?.oldValue || "-",
          rawB: test?.newValue || "-",
          statusA: toStatus(test?.oldStatus),
          statusB: toStatus(test?.newStatus),
          change,
          feedback: test?.feedback || "",
        };
      }),
    })
  );

  // Most changed organ first, so the group that opens by default
  // is the one worth reading.
  organs.sort((a, b) => changedCount(b) - changedCount(a));

  return {
    overallChange: toChange(result?.overallChange),
    summary: result?.summary || "",
    stats,
    organs,
  };
};
