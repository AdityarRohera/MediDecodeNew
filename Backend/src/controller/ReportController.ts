import{ response, type Request , type Response } from "express";
import * as ReportServices from "../services/ReportServices";
import type { AuthenticatedRequest } from "../middlewares/auth";

export const uploadReport = async (
    req: Request,
    res: Response
) => {

    console.log("----------------Inside Upload Report Controller -----------------");


    try {

        const userId = (req as AuthenticatedRequest).user.userId;
        const file = req.file;

        if (!file) {
            return res.status(400).json({
                success: false,
                message: "Report file is required"
            });
        }

        console.log("Getting user id ----------> " , userId);

        const report =
            await ReportServices.uploadReportService(
                file,
                userId
            );

        return res.status(201).json({
            success: true,
            message: "Report uploaded successfully",
            data: report
        });

    } catch (error) {

        console.error(
            "Error in uploadReport controller:",
            error
        );

        return res.status(500).json({
            success: false,
            message:
                error instanceof Error
                    ? error.message
                    : "Internal Server Error"
        });
    }
};


// ANALYZE REPORT HANDLER

export const analyzeReport = async (
    req: Request,
    res: Response
) => {

    console.log('--------Inside analysis report controller ----------')
    try {

        const {reportId} = req.params;

        if(!reportId){
            return res.status(400).json({
                success : false,
                message : "report id required"
            })
        }

        // ANALYZE REPORT
        const response = await ReportServices.analyzeReportService(reportId as string)

        return res.status(201).json({
            success: true,
            message: "Report Analyze successfully",
            data: response
        });

    } catch (error) {

        console.error(
            "Error in analyzeReport controller:",
            error
        );

        return res.status(500).json({
            success: false,
            message:
                error instanceof Error
                    ? error.message
                    : "Internal Server Error"
        });
    }
};


export const getAnalysesReport = async (
    req: Request,
    res: Response
) => {
    try {

        const userId = (req as AuthenticatedRequest).user.userId;
        const {reportId} = req.params;

        if(!reportId){
            return res.status(400).json({
                success : false,
                message : "report id required"
            })
        }

        // ANALYZE REPORT
        const response = await ReportServices.getAnalysisReportService(reportId as string)

        return res.status(201).json({
            success: true,
            message: "Report Analyze successfully",
            data: response
        });


    } catch (error) {

        console.error(
            "Error in analyzeReport controller:",
            error
        );

        return res.status(500).json({
            success: false,
            message:
                error instanceof Error
                    ? error.message
                    : "Internal Server Error"
        });
    }
};


export const allReports = async (
    req: Request,
    res: Response
) => {
    try {

        const userId = (req as AuthenticatedRequest).user.userId;

        const {ReportName , ReportType , Date , Month , Score , healthStatus} = req.query;

        const filter = {
            ReportName, ReportType, Date, Month ,Score, healthStatus
        }

        // FETCH REPORTS
        const response = await ReportServices.getReportsService(userId as string , filter);

        if(response.length === 0){
            return res.status(300).json({
                success : false,
                message : "Reports not found for this user",
            })
        }

        return res.status(201).json({
            success: true,
            message: "Report Analyze successfully",
            data: response
        });


    } catch (error) {

        console.error(
            "Error in getting reports controller",
            error
        );

        return res.status(500).json({
            success: false,
            message:
                error instanceof Error
                    ? error.message
                    : "Internal Server Error"
        });
    }
};

