import { ChangeType, TestStatus } from "@/components/analysis/shared";

/*
    Sample data for the analysis tab.

    The compare + history APIs are not built yet, so these two
    helpers stand in for them. Swap the function bodies with the
    real calls later, the component props stay the same.
*/

export type ComparedTest = {
  testName: string;
  range: string;
  low: number | null;
  high: number | null;
  valueA: number | null;
  valueB: number | null;
  statusA: TestStatus;
  statusB: TestStatus;
  change: ChangeType;
};

export type ComparedOrgan = {
  organName: string;
  statusA: TestStatus;
  statusB: TestStatus;
  tests: ComparedTest[];
};

export type ComparisonSide = {
  reportId: string;
  reportName: string;
  reportType: string;
  date: string;
  score: number;
};

export type Comparison = {
  comparisonId: string;
  reportA: ComparisonSide;
  reportB: ComparisonSide;
  daysApart: number;
  verdict: string;
  stats: {
    improved: number;
    worsened: number;
    unchanged: number;
    newTests: number;
    notRepeated: number;
  };
  organs: ComparedOrgan[];
};

export type ComparisonHistoryItem = {
  comparisonId: string;
  reportType: string;
  reportAId: string;
  reportBId: string;
  reportAName: string;
  reportBName: string;
  dateA: string;
  dateB: string;
  scoreA: number;
  scoreB: number;
  improved: number;
  worsened: number;
  comparedOn: string;
};

const sampleComparison: Comparison = {
  comparisonId: "cmp-1",

  reportA: {
    reportId: "8f2c",
    reportName: "Complete Blood Count",
    reportType: "CBC",
    date: "2026-03-12",
    score: 68,
  },

  reportB: {
    reportId: "d417",
    reportName: "Complete Blood Count",
    reportType: "CBC",
    date: "2026-08-28",
    score: 81,
  },

  daysApart: 169,

  verdict:
    "Hemoglobin and platelets moved back into the normal range. LDL cholesterol rose slightly and is still borderline.",

  stats: {
    improved: 8,
    worsened: 3,
    unchanged: 12,
    newTests: 2,
    notRepeated: 1,
  },

  organs: [
    {
      organName: "Blood",
      statusA: "CRITICAL",
      statusB: "NORMAL",
      tests: [
        {
          testName: "Hemoglobin",
          range: "13 - 17 g/dL",
          low: 13,
          high: 17,
          valueA: 11.2,
          valueB: 13.8,
          statusA: "CRITICAL",
          statusB: "NORMAL",
          change: "IMPROVED",
        },
        {
          testName: "Platelet Count",
          range: "150 - 400",
          low: 150,
          high: 400,
          valueA: 140,
          valueB: 165,
          statusA: "BORDERLINE",
          statusB: "NORMAL",
          change: "IMPROVED",
        },
        {
          testName: "WBC Count",
          range: "4 - 11",
          low: 4,
          high: 11,
          valueA: 9.1,
          valueB: 8.8,
          statusA: "NORMAL",
          statusB: "NORMAL",
          change: "SAME",
        },
      ],
    },

    {
      organName: "Lipid",
      statusA: "BORDERLINE",
      statusB: "BORDERLINE",
      tests: [
        {
          testName: "LDL Cholesterol",
          range: "0 - 100 mg/dL",
          low: 0,
          high: 100,
          valueA: 108,
          valueB: 118,
          statusA: "BORDERLINE",
          statusB: "BORDERLINE",
          change: "WORSENED",
        },
        {
          testName: "HDL Cholesterol",
          range: "40 - 60 mg/dL",
          low: 40,
          high: 60,
          valueA: 38,
          valueB: 44,
          statusA: "BORDERLINE",
          statusB: "NORMAL",
          change: "IMPROVED",
        },
      ],
    },

    {
      organName: "Vitamin",
      statusA: "CRITICAL",
      statusB: "NORMAL",
      tests: [
        {
          testName: "Vitamin D",
          range: "30 - 100 ng/mL",
          low: 30,
          high: 100,
          valueA: 14,
          valueB: 36,
          statusA: "CRITICAL",
          statusB: "NORMAL",
          change: "IMPROVED",
        },
      ],
    },
  ],
};

const sampleHistory: ComparisonHistoryItem[] = [
  {
    comparisonId: "cmp-1",
    reportType: "CBC",
    reportAId: "8f2c",
    reportBId: "d417",
    reportAName: "Complete Blood Count",
    reportBName: "Complete Blood Count",
    dateA: "2026-03-12",
    dateB: "2026-08-28",
    scoreA: 68,
    scoreB: 81,
    improved: 8,
    worsened: 3,
    comparedOn: "2026-08-29",
  },
  {
    comparisonId: "cmp-2",
    reportType: "LIPID PROFILE",
    reportAId: "a91b",
    reportBId: "c30d",
    reportAName: "Lipid Profile",
    reportBName: "Lipid Profile",
    dateA: "2026-01-08",
    dateB: "2026-08-02",
    scoreA: 71,
    scoreB: 66,
    improved: 2,
    worsened: 5,
    comparedOn: "2026-08-03",
  },
  {
    comparisonId: "cmp-3",
    reportType: "CBC",
    reportAId: "5e77",
    reportBId: "8f2c",
    reportAName: "Complete Blood Count",
    reportBName: "Complete Blood Count",
    dateA: "2026-01-05",
    dateB: "2026-03-12",
    scoreA: 42,
    scoreB: 68,
    improved: 11,
    worsened: 1,
    comparedOn: "2026-03-13",
  },
];

export const getComparison = (
  reportAId: string,
  reportBId: string
): Comparison => ({
  ...sampleComparison,
  reportA: { ...sampleComparison.reportA, reportId: reportAId },
  reportB: { ...sampleComparison.reportB, reportId: reportBId },
});

export const getComparisonHistory = () => sampleHistory;

export type OrganMatrixRow = {
  organName: string;
  statuses: TestStatus[];
};

const sampleOrganMatrix: {
  columns: string[];
  rows: OrganMatrixRow[];
} = {
  columns: ["Jan", "Mar", "May", "Jul", "Aug"],

  rows: [
    {
      organName: "Liver",
      statuses: ["CRITICAL", "BORDERLINE", "BORDERLINE", "BORDERLINE", "NORMAL"],
    },
    {
      organName: "Kidney",
      statuses: ["NORMAL", "NORMAL", "NORMAL", "NORMAL", "NORMAL"],
    },
    {
      organName: "Thyroid",
      statuses: ["BORDERLINE", "BORDERLINE", "CRITICAL", "BORDERLINE", "BORDERLINE"],
    },
    {
      organName: "Diabetes",
      statuses: ["NORMAL", "BORDERLINE", "BORDERLINE", "NORMAL", "NORMAL"],
    },
    {
      organName: "Vitamin",
      statuses: ["CRITICAL", "CRITICAL", "BORDERLINE", "NORMAL", "NORMAL"],
    },
  ],
};

export const getOrganMatrix = () => sampleOrganMatrix;
