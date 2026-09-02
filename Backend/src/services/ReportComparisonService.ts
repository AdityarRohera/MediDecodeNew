import { geminiClient } from "../config/gemini";
import { countComparisonsQuery, createReportComparisonQuery, getAllComparisonsQuery, getComparisonQuery, getExistingComparisonQuery } from "../queries/ReportComparison";
import { getFullAnalysisQuery2 } from "../queries/ReportQuery";



const COMPARISON_SYSTEM_PROMPT = `
You are a medical laboratory report comparison assistant.

Your task is to compare TWO laboratory reports belonging to the SAME USER.

The first report is the PREVIOUS report.
The second report is the CURRENT report.

IMPORTANT RULES:

1. Compare only information provided in the input.
2. Never invent a test, value, unit, reference range, organ, or medical history.
3. Never change or modify the actual laboratory values.
4. Use the provided reference range when determining whether a result is normal, borderline, or critical.
5. If a reference range is missing, do not invent one.
6. If a test exists only in the previous report, classify it as "REMOVED".
7. If a test exists only in the current report, classify it as "NEW".
8. If both reports contain the same test, compare their values.
9. Consider the clinical meaning of the change, not only whether the number increased or decreased.
10. An increase is not automatically a decline. For example, some tests are better when higher.
11. Use the expected/reference range and test context when determining whether the change is improved, declined, or same.
12. Do not provide a diagnosis.
13. Do not recommend medication or treatment.
14. Provide concise, user-friendly explanations.
15. Preserve the report dates exactly as provided.
16. Organize the response by organ.
17. Put individual test comparisons inside their corresponding organ.
18. Return ONLY valid JSON.
`;


const buildComparisonPrompt = (
    previousReport: any,
    currentReport: any
) => {
    return `
Compare the following two medical laboratory reports.

The reports have already been ordered by ANALYSIS_DATE.

========================
PREVIOUS REPORT
========================

Report ID:
${previousReport.REPORT_ID}

Report Name:
${previousReport.REPORT_NAME || ""}

Analysis Date:
${previousReport.ANALYSIS_DATE}

Health Score:
${previousReport.HEALTH_SCORE ?? "Not available"}

Health Status:
${previousReport.HEALTH_STATUS || "Not available"}

Report Summary:
${previousReport.REPORT_SUMMARY || ""}

Organ and Test Analysis:
${JSON.stringify(previousReport.analysis, null, 2)}


========================
CURRENT REPORT
========================

Report ID:
${currentReport.REPORT_ID}

Report Name:
${currentReport.REPORT_NAME || ""}

Analysis Date:
${currentReport.ANALYSIS_DATE}

Health Score:
${currentReport.HEALTH_SCORE ?? "Not available"}

Health Status:
${currentReport.HEALTH_STATUS || "Not available"}

Report Summary:
${currentReport.REPORT_SUMMARY || ""}

Organ and Test Analysis:
${JSON.stringify(currentReport.analysis, null, 2)}


========================
TASK
========================

Compare the PREVIOUS REPORT with the CURRENT REPORT.

Organize the comparison by organ and then by test.

For every test that exists in either report:

- Match the test using the organ name and test name.
- Compare the previous result with the current result.
- Use REFERENCE_RANGE when available.
- Preserve the original values exactly.
- Do not invent missing values.
- If a test exists only in the previous report, mark it as "Removed".
- If a test exists only in the current report, mark it as "New".
- If both reports contain the test, determine whether the result Improved, Declined, or stayed the Same.
- Consider the reference range and test context. Do not assume that increasing a value is always better.
- Include both previous and current status.
- Provide concise feedback.

Do not provide a diagnosis.
Do not prescribe medication.
Do not recommend treatment.
Do not invent medical information.

Return ONLY valid JSON using this structure:

{
    "overallChange": "Improved | Declined | Same",
    "summary": "Short overall comparison",
    "healthScore": {
        "previous": number | null,
        "current": number | null,
        "change": number | null
    },
    "organs": [
        {
            "organ": "string",
            "previousStatus": "Normal | Borderline | Critical | Not Available",
            "currentStatus": "Normal | Borderline | Critical | Not Available",
            "change": "Improved | Declined | Same | New | Removed",
            "feedback": "Short explanation",

            "tests": [
                {
                    "testName": "string",
                    "oldValue": "string",
                    "newValue": "string",
                    "expectedRange": "string",
                    "unitOfMeasurement": "string",

                    "oldStatus": "Normal | Borderline | Critical | Not Available",
                    "newStatus": "Normal | Borderline | Critical | Not Available",

                    "change": "Improved | Declined | Same | New | Removed",

                    "feedback": "Short explanation"
                }
            ]
        }
    ]
}
`;
};

export const createComparison = async ({
    userId,
    report1Id,
    report2Id
}: {
    userId: string;
    report1Id: string;
    report2Id: string;
}) => {

    // 1. Same report validation
    if (report1Id === report2Id) {
        const error: any = new Error(
            "Cannot compare the same report"
        );

        error.statusCode = 400;
        throw error;
    }


    // 2. Check whether comparison already exists
    const existingComparison =
        await getExistingComparisonQuery(
            userId,
            report1Id,
            report2Id
        );

    if (existingComparison.rows.length > 0) {

        return {
            alreadyExists: true,
            comparison: existingComparison.rows[0]
        };
    }


    // 3. Fetch both complete reports
    const [report1Result, report2Result] = await Promise.all([
        getFullAnalysisQuery2(report1Id, userId),
        getFullAnalysisQuery2(report2Id, userId)
    ]);

    const report1 = report1Result.rows[0];
    const report2 = report2Result.rows[0];


    // 4. Validate reports
    if (!report1) {
        const error: any = new Error(
            "Report 1 not found"
        );

        error.statusCode = 404;
        throw error;
    }

    if (!report2) {
        const error: any = new Error(
            "Report 2 not found"
        );

        error.statusCode = 404;
        throw error;
    }


    // 5. Validate analysis dates
    if (!report1.ANALYSIS_DATE || !report2.ANALYSIS_DATE) {
        const error: any = new Error(
            "Both reports must have an analysis date"
        );

        error.statusCode = 400;
        throw error;
    }


    // 6. Determine previous and current report
    const date1 = new Date(report1.ANALYSIS_DATE);
    const date2 = new Date(report2.ANALYSIS_DATE);

    let previousReport;
    let currentReport;

    if (date1 < date2) {

        previousReport = report1;
        currentReport = report2;

    } else if (date2 < date1) {

        previousReport = report2;
        currentReport = report1;

    } else {

        const error: any = new Error(
            "Both reports have the same analysis date"
        );

        error.statusCode = 400;
        throw error;
    }


    // 7. Build prompt
    const prompt = buildComparisonPrompt(
        previousReport,
        currentReport
    );


    // 8. Call Gemini
    const response = await geminiClient.models.generateContent({
        model: "gemini-2.5-flash",

        contents: `
            ${COMPARISON_SYSTEM_PROMPT}

            ${prompt}
        `,

        config: {
            responseMimeType: "application/json"
        }
    });


    // 9. Get Gemini response
    const content = response.text;

    if (!content) {
        const error: any = new Error(
            "Empty response received from Gemini"
        );

        error.statusCode = 500;
        throw error;
    }


    // 10. Parse Gemini JSON
    let comparisonResult;

    try {
        comparisonResult = JSON.parse(content);
    } catch (error) {
        const err: any = new Error(
            "Invalid comparison response from Gemini"
        );

        err.statusCode = 500;
        throw err;
    }


    // 11. Save comparison
    const savedComparison =
        await createReportComparisonQuery({
            userId,
            report1Id,
            report2Id,
            comparisonResult
        });


    // 12. Return
    return {
        alreadyExists: false,
        comparison: savedComparison.rows[0]
    };
};


export const getAllComparisons = async ({
    userId,
    page,
    limit
}: {
    userId: string;
    page: number;
    limit: number;
}) => {

    const safeLimit = Math.min(Math.max(limit || 10, 1), 50);
    const safePage = Math.max(page || 1, 1);
    const offset = (safePage - 1) * safeLimit;

    const [listResult, countResult] = await Promise.all([
        getAllComparisonsQuery(userId, safeLimit, offset),
        countComparisonsQuery(userId)
    ]);

    /*
        REPORT_1 and REPORT_2 are stored in the order the client sent
        them, so previous and current are worked out here by
        ANALYSIS_DATE, the same rule createComparison uses.
    */
    const items = listResult.rows.map((row: any) => {

        const firstIsOlder =
            new Date(row.R1_DATE).getTime() <=
            new Date(row.R2_DATE).getTime();

        const previous = firstIsOlder
            ? {
                reportId: row.R1_ID,
                reportName: row.R1_NAME,
                reportType: row.R1_TYPE,
                date: row.R1_DATE,
                score: row.R1_SCORE
              }
            : {
                reportId: row.R2_ID,
                reportName: row.R2_NAME,
                reportType: row.R2_TYPE,
                date: row.R2_DATE,
                score: row.R2_SCORE
              };

        const current = firstIsOlder
            ? {
                reportId: row.R2_ID,
                reportName: row.R2_NAME,
                reportType: row.R2_TYPE,
                date: row.R2_DATE,
                score: row.R2_SCORE
              }
            : {
                reportId: row.R1_ID,
                reportName: row.R1_NAME,
                reportType: row.R1_TYPE,
                date: row.R1_DATE,
                score: row.R1_SCORE
              };

        return {
            comparisonId: row.COMPARISON_ID,
            comparedAt: row.COMPARED_AT,
            overallChange: row.OVERALL_CHANGE,
            summary: row.SUMMARY,
            previous,
            current,
            stats: {
                improved: Number(row.IMPROVED ?? 0),
                worsened: Number(row.WORSENED ?? 0),
                unchanged: Number(row.UNCHANGED ?? 0),
                newTests: Number(row.NEW_TESTS ?? 0),
                notRepeated: Number(row.NOT_REPEATED ?? 0)
            }
        };
    });

    return {
        items,
        total: countResult.rows[0].TOTAL,
        page: safePage,
        limit: safeLimit
    };
};


export const getComparison = async ({
    userId,
    comparisonId
}: {
    userId: string;
    comparisonId: string;
}) => {

    const result =
        await getComparisonQuery(
            userId,
            comparisonId
        );


    if (result.rows.length === 0) {

        const error: any = new Error(
            "Comparison not found"
        );

        error.statusCode = 404;

        throw error;
    }


    return result.rows[0];
};