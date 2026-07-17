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

    const filter = {
      reportName: req.query.reportName as string,
      reportType: req.query.reportType as string,
      healthStatus: req.query.healthStatus as string,

      startDate: req.query.startDate as string,
      endDate: req.query.endDate as string,

      minScore: req.query.minScore as string,
      maxScore: req.query.maxScore as string,

      sortBy: req.query.sortBy as string,

      page: Number(req.query.page) || 1,
      limit: Number(req.query.limit) || 10,
    };

    console.log("Getting filter -> " , filter);

    const reports =
      await ReportServices.getReportsService(
        userId,
        filter
      );

    return res.status(200).json({
      success: true,
      message: "Reports fetched successfully",
      data: reports,
    });
  } catch (error) {
    console.error(
      "Error fetching reports",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Internal Server Error",
    });
  }
};

