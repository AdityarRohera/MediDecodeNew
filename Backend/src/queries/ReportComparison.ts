import { pool } from "../config/dbConnect";


export const getExistingComparisonQuery = async (
    userId: string,
    report1Id: string,
    report2Id: string
) => {

    return pool.query(
        `
            SELECT
                "COMPARISON_ID",
                "USER_ID",
                "REPORT_1_ID",
                "REPORT_2_ID",
                "COMPARED_AT",
                "COMPARISON_RESULT"

            FROM "REPORT_COMPARISONS"

            WHERE "USER_ID" = $1

              AND (
                    (
                        "REPORT_1_ID" = $2
                        AND
                        "REPORT_2_ID" = $3
                    )

                    OR

                    (
                        "REPORT_1_ID" = $3
                        AND
                        "REPORT_2_ID" = $2
                    )
                  )

            LIMIT 1;
        `,
        [
            userId,
            report1Id,
            report2Id
        ]
    );
};


export const createReportComparisonQuery = async ({
    userId,
    report1Id,
    report2Id,
    comparisonResult
}: {
    userId: string;
    report1Id: string;
    report2Id: string;
    comparisonResult: any;
}) => {

    return pool.query(
        `
            INSERT INTO "REPORT_COMPARISONS"
            (
                "USER_ID",
                "REPORT_1_ID",
                "REPORT_2_ID",
                "COMPARISON_RESULT"
            )

            VALUES
            (
                $1,
                $2,
                $3,
                $4::jsonb
            )

            RETURNING
                "COMPARISON_ID",
                "USER_ID",
                "REPORT_1_ID",
                "REPORT_2_ID",
                "COMPARED_AT",
                "COMPARISON_RESULT";
        `,
        [
            userId,
            report1Id,
            report2Id,
            JSON.stringify(comparisonResult)
        ]
    );
};

/*
    History list.

    The stats are counted straight out of the stored JSON so the
    whole COMPARISON_RESULT does not have to be sent for every row.
*/
export const getAllComparisonsQuery = async (
    userId: string,
    limit: number,
    offset: number
) => {

    return pool.query(
        `
            SELECT
                C."COMPARISON_ID",
                C."COMPARED_AT",

                C."COMPARISON_RESULT"->>'overallChange' AS "OVERALL_CHANGE",
                C."COMPARISON_RESULT"->>'summary'       AS "SUMMARY",

                R1."REPORT_ID"     AS "R1_ID",
                R1."REPORT_NAME"   AS "R1_NAME",
                R1."REPORT_TYPE"   AS "R1_TYPE",
                R1."ANALYSIS_DATE" AS "R1_DATE",
                R1."HEALTH_SCORE"  AS "R1_SCORE",

                R2."REPORT_ID"     AS "R2_ID",
                R2."REPORT_NAME"   AS "R2_NAME",
                R2."REPORT_TYPE"   AS "R2_TYPE",
                R2."ANALYSIS_DATE" AS "R2_DATE",
                R2."HEALTH_SCORE"  AS "R2_SCORE",

                S."IMPROVED",
                S."WORSENED",
                S."UNCHANGED",
                S."NEW_TESTS",
                S."NOT_REPEATED"

            FROM "REPORT_COMPARISONS" C

            JOIN "REPORTS" R1
                ON R1."REPORT_ID" = C."REPORT_1_ID"

            JOIN "REPORTS" R2
                ON R2."REPORT_ID" = C."REPORT_2_ID"

            LEFT JOIN LATERAL (
                SELECT
                    COUNT(*) FILTER (
                        WHERE UPPER(T->>'change') = 'IMPROVED'
                    ) AS "IMPROVED",

                    COUNT(*) FILTER (
                        WHERE UPPER(T->>'change') IN ('DECLINED', 'WORSENED')
                    ) AS "WORSENED",

                    COUNT(*) FILTER (
                        WHERE UPPER(T->>'change') = 'SAME'
                    ) AS "UNCHANGED",

                    COUNT(*) FILTER (
                        WHERE UPPER(T->>'change') = 'NEW'
                    ) AS "NEW_TESTS",

                    COUNT(*) FILTER (
                        WHERE UPPER(T->>'change') = 'REMOVED'
                    ) AS "NOT_REPEATED"

                FROM jsonb_array_elements(
                        COALESCE(C."COMPARISON_RESULT"->'organs', '[]'::jsonb)
                     ) O

                CROSS JOIN LATERAL jsonb_array_elements(
                        COALESCE(O->'tests', '[]'::jsonb)
                     ) T
            ) S ON TRUE

            WHERE C."USER_ID" = $1

            ORDER BY C."COMPARED_AT" DESC

            LIMIT $2
            OFFSET $3;
        `,
        [
            userId,
            limit,
            offset
        ]
    );
};


export const countComparisonsQuery = async (
    userId: string
) => {

    return pool.query(
        `
            SELECT COUNT(*)::int AS "TOTAL"
            FROM "REPORT_COMPARISONS"
            WHERE "USER_ID" = $1;
        `,
        [userId]
    );
};


export const getComparisonQuery = async (
    userId: string,
    comparisonId: string
) => {

    return pool.query(
        `
            SELECT
                "COMPARISON_ID",
                "USER_ID",
                "REPORT_1_ID",
                "REPORT_2_ID",
                "COMPARED_AT",
                "COMPARISON_RESULT"

            FROM "REPORT_COMPARISONS"

            WHERE "COMPARISON_ID" = $1
              AND "USER_ID" = $2;
        `,
        [
            comparisonId,
            userId
        ]
    );
};