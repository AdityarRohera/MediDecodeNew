import { TestStatus } from "@/components/analysis/shared";

/*
    Sample data for the analysis tab.

    Compare and history now run off the real API. Only the organ
    matrix is still sample data, so this helper stands in until that
    endpoint exists. Swap the function body with the real call later,
    the component props stay the same.
*/




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
