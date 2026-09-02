
import { Request , Response } from "express";
import { AuthenticatedRequest } from "../middlewares/auth";
import * as ReportComparisonService from "../services/ReportComparisonService";

export const createComparison = async (req : Request, res : Response) => {
  try {
    const userId = (req as AuthenticatedRequest).user.userId;

    const { report1Id, report2Id } = req.body;

    if (!report1Id || !report2Id) {
      return res.status(400).json({
        success: false,
        message: "report1Id and report2Id are required"
      });
    }

    if (report1Id === report2Id) {
      return res.status(400).json({
        success: false,
        message: "You cannot compare the same report"
      });
    }

    const result =
      await ReportComparisonService.createComparison({
        userId,
        report1Id,
        report2Id
      });

    if (result.alreadyExists) {
      return res.status(200).json({
        success: true,
        alreadyExists: true,
        message: "Comparison already exists",
        data: result.comparison
      });
    }

    return res.status(201).json({
      success: true,
      alreadyExists: false,
      message: "Reports compared successfully",
      data: result.comparison
    });

  } catch (error: unknown) {
    console.error("Create comparison error:", error);

    const err = error as {
        statusCode?: number;
        message?: string;
    };

    return res.status(err.statusCode || 500).json({
        success: false,
        message: err.message || "Failed to compare reports"
    });
}
};

export const getAllComparisons = async (
    req: Request,
    res: Response
) => {
    try {

        const userId = (req as AuthenticatedRequest).user.userId;

        const result =
            await ReportComparisonService.getAllComparisons({
                userId,
                page: Number(req.query.page) || 1,
                limit: Number(req.query.limit) || 10
            });

        return res.status(200).json({
            success: true,
            message: "Comparisons fetched successfully",
            data: result
        });

    } catch (error: any) {

        console.error(
            "Get all comparisons error:",
            error
        );

        return res.status(
            error.statusCode || 500
        ).json({
            success: false,
            message:
                error.message ||
                "Failed to fetch comparisons"
        });
    }
};


export const getComparison = async (
    req: Request,
    res: Response
) => {
    try {

        const userId = (req as AuthenticatedRequest).user.userId;
        const { comparisonId } = req.params;


        // Validate comparison ID
        if (!comparisonId) {
            return res.status(400).json({
                success: false,
                message: "comparisonId is required"
            });
        }


        const comparison =
            await ReportComparisonService.getComparison({
                userId,
                comparisonId: comparisonId as string
            });


        return res.status(200).json({
            success: true,
            message: "Comparison fetched successfully",
            data: comparison
        });

    } catch (error: any) {

        console.error(
            "Get comparison error:",
            error
        );


        return res.status(
            error.statusCode || 500
        ).json({
            success: false,
            message:
                error.message ||
                "Failed to fetch comparison"
        });
    }
};