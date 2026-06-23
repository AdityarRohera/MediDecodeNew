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

    const queryParams: any[] = [];
    const filterConditions: string[] = [];

    let queryText = `
        SELECT *
        FROM "REPORTS"
    `;

    queryParams.push(userId);

    filterConditions.push(
        `"USER_ID" = $${queryParams.length}`
    );

    if (filter.reportName) {

        queryParams.push(`%${filter.reportName}%`);

        filterConditions.push(
            `"REPORT_NAME" ILIKE $${queryParams.length}`
        );
    }

    if (filter.reportType) {

        queryParams.push(filter.reportType);

        filterConditions.push(
            `"REPORT_TYPE" = $${queryParams.length}`
        );
    }

    if (filter.healthStatus) {

        queryParams.push(filter.healthStatus);

        filterConditions.push(
            `"HEALTH_STATUS" = $${queryParams.length}`
        );
    }

    if (filterConditions.length > 0) {

        queryText += `
            WHERE ${filterConditions.join(' AND ')}
        `;
    }

    queryText += `
        ORDER BY "UPLOADED_DATE" DESC
    `;

    const result = await pool.query(
        queryText,
        queryParams
    );

    console.log(result.rows);

    return result.rows;
};