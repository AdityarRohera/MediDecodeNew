
import { uploadFile , deleteFile  } from "../config/Cloudinary";
import * as ReportQueries from "../queries/ReportQuery";
import { geminiClient } from "../config/gemini";
import axios from "axios";
import { PDFParse } from 'pdf-parse';
import { pool } from "../config/dbConnect";


// // Client for openai
// const client = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY, // This is the default and can be omitted
// });


export const extractTextFromPdf = async (
  pdfUrl: string
) => {
    const parser = new PDFParse({ url: pdfUrl});
	const result = await parser.getText();

  return result.text;
};

export const uploadReportService = async (
    file: Express.Multer.File,
    userId: string
) => {

    let uploadedFile: any = null;

    try {

        console.log(file)

        // Upload to Cloudinary
        uploadedFile = await uploadFile(file.path);


        console.log("Uploaded working file ********8")

        // Create report in DB
        const report =
            await ReportQueries.createReportQuery({
                userId,
                fileName: file.originalname,
                fileUrl: uploadedFile.secure_url,
                publicId: uploadedFile.public_id
            });

        return report;

    } catch (err) {

        console.error(
            "Error in uploadReportService:",
            err
        );

        if (uploadedFile?.public_id) {
        await deleteFile(
            uploadedFile.public_id,
            uploadedFile.resource_type
        );
    }

        throw err;

    }
};



// export const analyzeReportService = async(reportId : any) => {

//     // validate report id first
//     const reports = await ReportQueries.findReportById(reportId);

//     if(reports.rowCount === 0){
//         throw new Error("Invalide Report Id");
//     }

//     const report = reports.rows[0];

//     // analyze report

//     const pdfText = await extractTextFromPdf(report.FILE_URL);

//     const response = await geminiClient.models.generateContent({
//         model: "gemini-2.5-flash",
//         contents: `
//             ${prompt}

//             Medical Report:

//             ${pdfText}
//         `,
//         config: {
//             responseMimeType: "application/json"
//         }
//     });

//     const analysisResponse = JSON.parse(response.text!);

//     console.log("Getting response after analysis report --------------------------------> " , analysisResponse);

//     const allOrgan = analysisResponse.analysis;

//     const organArray = [];

//     const organTestArray = [];

//     // loop
//     for(let organ = 0; organ<allOrgan.length; organ++){

//             const {organName ,organStatus , organExplanation ,tests} = allOrgan[organ];

//             organArray.push(
//                 {
//                     organName,
//                     organStatus,
//                     organExplanation,
//                 }
//             )

//             for(let organTest = 0; organTest<tests.length; organTest++){

//                 const {testName , result ,range , status} = tests[organTest]

//                 // Now i have all test of organ for a particular organ ex-> Urea
//                  organTestArray.push(
//                     {
//                         testName , result ,range , status
//                     }
//                  )

//             }
//     }



// }



const analyzeReportWithAI = async(FILE_URL : string) => {

     const prompt = `
   You are MediDecode AI.

Analyze the provided laboratory report and return ONLY valid JSON.

Rules:

* Compare every test result with its reference range.
* Classify every test as:

  * NORMAL
  * BORDERLINE
  * CRITICAL

Organ Status Rules:

* NORMAL: all tests normal
* BORDERLINE: at least one borderline and no critical tests
* CRITICAL: at least one critical test

Group tests by organ/system whenever possible:
Blood, Liver, Kidney, Thyroid, Heart, Vitamin, Diabetes, Hormonal, Electrolytes, etc.

Generate:

* reportSummary (simple language)
* doctorRecommendation
* statistics
* organ-wise analysis

doctorRecommendation values:

* NOT_REQUIRED → all tests NORMAL
* CONSIDER_VISIT → one or more BORDERLINE tests and no CRITICAL tests
* RECOMMENDED → at least one CRITICAL test

Important:

* Do not diagnose diseases.
* Do not prescribe medicines.
* Do not recommend treatments.
* Return JSON only.
* No markdown.
* No explanations outside JSON.

Return this exact schema:

Return this exact schema:

{
  "reportName": "",
  "reportType": "",
  "healthScore": 0,
  "healthStatus": "GOOD | NEEDS_REVIEW | CRITICAL",

  "reportSummary": "",
  "doctorRecommendation": "NOT_REQUIRED | CONSIDER_VISIT | RECOMMENDED",

  "stats": {
    "totalTests": 0,
    "normalTests": 0,
    "borderlineTests": 0,
    "criticalTests": 0
  },

  "analysis": [
    {
      "organName": "",
      "organStatus": "NORMAL | BORDERLINE | CRITICAL",
      "organExplanation": "",
      "tests": [
        {
          "testName": "",
          "result": "",
          "range": "",
          "status": "NORMAL | BORDERLINE | CRITICAL"
        }
      ]
    }
  ]
}

    `

    const pdfText = await extractTextFromPdf(FILE_URL);

    const response = await geminiClient.models.generateContent({
        model: "gemini-2.5-flash",
        contents: `
            ${prompt}

            Medical Report:

            ${pdfText}
        `,
        config: {
            responseMimeType: "application/json"
        }
    });

    return JSON.parse(response.text!);
}



export const analyzeReportService = async (
    reportId: string
) => {

    const reportResult =
        await ReportQueries.findReportById(
            reportId
        );

    if (reportResult.rowCount === 0) {
        throw new Error("Invalid Report Id");
    }

    const report = reportResult.rows[0];

    if (report.status === "PROCESSING") {
        throw new Error(
            "Report is already processing"
        );
    }

    if (report.status === "COMPLETED") {
        throw new Error(
            "Report already analyzed"
        );
    }

    const client = await pool.connect();

    try {

        /*
            MARK PROCESSING
        */

        await ReportQueries.updateReportStatus(
            reportId,
            "PROCESSING"
        );

        /*
            AI ANALYSIS
        */

        const aiResponse =
            await analyzeReportWithAI(
                report.FILE_URL
            );

        const {
            reportSummary,
            doctorRecommendation,
            healthScore,
            reportName,
            reportType,
            healthStatus,
            stats,
            analysis,

        } = aiResponse;

        await client.query("BEGIN");

        /*
            UPDATE REPORT
        */

        await ReportQueries.updateReportAnalysisSummary(
            client,
            reportId,
            reportSummary,
            doctorRecommendation,
            healthScore,
            reportName,
            reportType,
            healthStatus,
            stats.totalTests,
            stats.normalTests,
            stats.borderlineTests,
            stats.criticalTests
        );

        /*
            ORGAN ARRAYS
        */

        const organNames =
            analysis.map(
                (item: any) =>
                    item.organName
            );

        const organStatuses =
            analysis.map(
                (item: any) =>
                    item.organStatus
            );

        const organExplanations =
            analysis.map(
                (item: any) =>
                    item.organExplanation
            );

        /*
            INSERT ANALYSIS
        */

        const analysisResult =
            await ReportQueries.bulkInsertAnalysis(
                client,
                reportId,
                organNames,
                organStatuses,
                organExplanations
            );

        /*
            TEST ARRAYS
        */

        const analysisIds: string[] = [];
        const testNames: string[] = [];
        const results: string[] = [];
        const referenceRanges: string[] = [];
        const testStatuses: string[] = [];

        analysis.forEach(
            (
                organ: any,
                index: number
            ) => {

                const analysisId =
                    analysisResult.rows[index]
                        .analysis_id;

                organ.tests.forEach(
                    (test: any) => {

                        analysisIds.push(
                            analysisId
                        );

                        testNames.push(
                            test.testName
                        );

                        results.push(
                            test.result ?? ""
                        );

                        referenceRanges.push(
                            test.range ?? ""
                        );

                        testStatuses.push(
                            test.status
                        );
                    }
                );
            }
        );

        /*
            INSERT TESTS
        */

        if (testNames.length > 0) {

            await ReportQueries.bulkInsertTestResults(
                client,
                analysisIds,
                testNames,
                results,
                referenceRanges,
                testStatuses
            );
        }

        await client.query("COMMIT");

        /*
            MARK COMPLETED
        */

        await ReportQueries.updateReportStatus(
            reportId,
            "COMPLETED"
        );

        return aiResponse;

    } catch (error) {

        await client.query(
            "ROLLBACK"
        );

        await ReportQueries.updateReportStatus(
            reportId,
            "FAILED"
        );

        console.error(
            "Report Analysis Error:",
            error
        );

        throw error;

    } finally {

        client.release();
    }
};

export const getAnalysisReportService = async (reportId : any) => {
    const response = await ReportQueries.getFullAnalysisQuery(reportId);

    return response.rows[0] || null;
}


export const getReportsService = async(userId : any , filter : any) => {
    return await ReportQueries.getAllReports(userId , filter);
}