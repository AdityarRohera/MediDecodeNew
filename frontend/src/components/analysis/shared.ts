export type TestStatus = "NORMAL" | "BORDERLINE" | "CRITICAL";

export type ChangeType = "IMPROVED" | "WORSENED" | "SAME";

// Single place for the three status colours used across the analysis tab.
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
};

export const changeStyle: Record<
  ChangeType,
  { label: string; text: string }
> = {
  IMPROVED: { label: "Improved", text: "text-emerald-600" },
  WORSENED: { label: "Worsened", text: "text-red-600" },
  SAME: { label: "No change", text: "text-slate-400" },
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
