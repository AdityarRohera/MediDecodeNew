import { pool } from "../config/dbConnect"


export const createReportQuery = async ({
    userId,
    fileName,
    fileUrl,
    publicId
}: {
    userId: string;
    fileName: string;
    fileUrl: string;
    publicId: string;
}) => {

    const result = await pool.query(
        `
        INSERT INTO "REPORTS"
        (
            "USER_ID",
            "FILE_NAME",
            "FILE_URL",
            "CLOUDINARY_PUBLIC_ID",
            "STATUS"
        )
        VALUES ($1, $2, $3, $4, 'UPLOADED')
        RETURNING *;
        `,
        [
            userId,
            fileName,
            fileUrl,
            publicId
        ]
    );

    return result.rows[0];
};


export const findReportById = async (reportId : any) => {
    return await pool.query(
        `
            SELECT * FROM "REPORTS"
            WHERE "REPORT_ID" = $1;
        ` , [reportId]
    )
}


export const updateReportStatus = async (
    reportId: string,
    status:
        | "PROCESSING"
        | "COMPLETED"
        | "FAILED"
) => {

    return pool.query(
        `
        UPDATE "REPORTS"
        SET
            "STATUS" = $2
        WHERE "REPORT_ID" = $1
        `,
        [reportId, status]
    );
};

export const updateReportAnalysisSummary = async (
    client: any,
    reportId: string,
    reportSummary: string,
    doctorRecommendation: string,
    healthScore: number,
    reportName : string,
    reportType : string,
    healthStatus : string,
    totalTests: number,
    normalTests: number,
    borderlineTests: number,
    criticalTests: number
) => {

    return client.query(
        `
        UPDATE "REPORTS"
        SET
            "REPORT_SUMMARY" = $2,
            "DOCTOR_RECOMMENDATION" = $3,
            "REPORT_NAME" = $4,
            "REPORT_TYPE" = $5,
            "HEALTH_STATUS" = $6, 
            "HEALTH_SCORE" = $7,
            "TOTAL_TESTS" = $8,
            "NORMAL_TESTS" = $9,
            "BORDERLINE_TESTS" = $10,
            "CRITICAL_TESTS" = $11,
            "ANALYSIS_DATE" = CURRENT_TIMESTAMP
        WHERE "REPORT_ID" = $1
        `,
        [
            reportId,
            reportSummary,
            doctorRecommendation,
            reportName,
            reportType,
            healthStatus,
            healthScore,
            totalTests,
            normalTests,
            borderlineTests,
            criticalTests
        ]
    );
};

export const bulkInsertAnalysis = async (
    client: any,
    reportId: string,
    organNames: string[],
    organStatuses: string[],
    organExplanations: string[]
) => {

    return client.query(
        `
        INSERT INTO "REPORT_ANALYSIS"
        (
            "REPORT_ID",
            "ORGAN_NAME",
            "ORGAN_STATUS",
            "ORGAN_EXPLANATION"
        )
        SELECT
            $1::uuid,
            UNNEST($2::text[]),
            UNNEST($3::text[]),
            UNNEST($4::text[])
        RETURNING
            "ANALYSIS_ID" AS analysis_id,
            "ORGAN_NAME" AS organ_name
        `,
        [
            reportId,
            organNames,
            organStatuses,
            organExplanations
        ]
    );
};

export const bulkInsertTestResults = async (
    client: any,
    analysisIds: string[],
    testNames: string[],
    results: string[],
    referenceRanges: string[],
    testStatuses: string[]
) => {

    return client.query(
        `
        INSERT INTO "TEST_RESULTS"
        (
            "ANALYSIS_ID",
            "TEST_NAME",
            "RESULT",
            "REFERENCE_RANGE",
            "TEST_STATUS"
        )
        SELECT
            UNNEST($1::uuid[]),
            UNNEST($2::text[]),
            UNNEST($3::text[]),
            UNNEST($4::text[]),
            UNNEST($5::text[])
        `,
        [
            analysisIds,
            testNames,
            results,
            referenceRanges,
            testStatuses
        ]
    );
};

export const getFullAnalysisQuery = async(reportId : any) => {
    return pool.query(
        `
            SELECT 
                    R.*,

                    json_agg(
                        json_build_object(
                            'analysisId', RA."ANALYSIS_ID",
                            'organName', RA."ORGAN_NAME",
                            'organStatus', RA."ORGAN_STATUS",
                            'organExplanation', RA."ORGAN_EXPLANATION",
                            'createdAt', RA."CREATED_AT",

                            'tests',
                            (
                                SELECT json_agg(
                                    row_to_json(TR)
                                    ORDER BY TR."TEST_NAME"
                                )
                                FROM "TEST_RESULTS" TR
                                WHERE TR."ANALYSIS_ID" = RA."ANALYSIS_ID"
                            )
                        )
                        ORDER BY RA."ORGAN_NAME"
                    ) AS analysis

            FROM "REPORTS" R

            LEFT JOIN "REPORT_ANALYSIS" RA
            ON RA."REPORT_ID" = R."REPORT_ID"

            WHERE R."REPORT_ID" = $1

            GROUP BY R."REPORT_ID";
        `,
        [reportId]
    )
}

export const getAllReports = async (
  userId: string,
  filter: any
) => {

  const conditions: string[] = [];
  const values: any[] = [];

  let query = `
    SELECT *
    FROM "REPORTS"
  `;

  values.push(userId);

  conditions.push(
    `"USER_ID" = $${values.length}`
  );

  // Report Name
  if (filter.reportName?.trim()) {
    values.push(`%${filter.reportName.trim()}%`);

    conditions.push(
      `"REPORT_NAME" ILIKE $${values.length}`
    );
  }

  // Report Type (Case Insensitive)
  if (filter.reportType?.trim()) {
    values.push(filter.reportType.trim());

    conditions.push(
      `"REPORT_TYPE" ILIKE $${values.length}`
    );
  }

  // Health Status (Case Insensitive)
  if (filter.healthStatus?.trim()) {
    values.push(filter.healthStatus.trim());

    conditions.push(
      `"HEALTH_STATUS" ILIKE $${values.length}`
    );
  }

  // Start Date
  if (filter.startDate) {
    values.push(filter.startDate);

    conditions.push(
      `"UPLOADED_DATE" >= $${values.length}`
    );
  }

  // End Date
  if (filter.endDate) {
    values.push(filter.endDate);

    conditions.push(
      `"UPLOADED_DATE" <= $${values.length}`
    );
  }

  // Min Score
  if (
    filter.minScore !== undefined &&
    filter.minScore !== ""
  ) {
    values.push(Number(filter.minScore));

    conditions.push(
      `"HEALTH_SCORE" >= $${values.length}`
    );
  }

  // Max Score
  if (
    filter.maxScore !== undefined &&
    filter.maxScore !== ""
  ) {
    values.push(Number(filter.maxScore));

    conditions.push(
      `"HEALTH_SCORE" <= $${values.length}`
    );
  }

  query += `
    WHERE ${conditions.join(" AND ")}
  `;

  // Sorting
  switch (filter.sortBy) {

    case "oldest":
      query += `
        ORDER BY "UPLOADED_DATE" ASC
      `;
      break;

    case "scoreHigh":
      query += `
        ORDER BY "HEALTH_SCORE" DESC
      `;
      break;

    case "scoreLow":
      query += `
        ORDER BY "HEALTH_SCORE" ASC
      `;
      break;

    default:
      query += `
        ORDER BY "UPLOADED_DATE" DESC
      `;
  }

  // Pagination
  const page = Number(filter.page) || 1;
  const limit = Number(filter.limit) || 10;

  const offset = (page - 1) * limit;

  values.push(limit);
  values.push(offset);

  query += `
    LIMIT $${values.length - 1}
    OFFSET $${values.length}
  `;

  console.log("Query:", query);
  console.log("Values:", values);

  const result = await pool.query(
    query,
    values
  );

  return result.rows;
};