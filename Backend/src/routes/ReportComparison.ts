import express from 'express'
const comparisonRoute = express.Router();
import * as ReportComparisonController from '../controller/ReportComparisonController';
import { userAuth } from '../middlewares/auth';

// POST /api/report-comparisons
comparisonRoute.post("/report-comparisons" , userAuth, ReportComparisonController.createComparison);

// GET ALL COMPARISONS (history) - kept above the :comparisonId route
comparisonRoute.get("/report-comparisons" , userAuth , ReportComparisonController.getAllComparisons);

comparisonRoute.get("/report-comparisons/:comparisonId" , userAuth , ReportComparisonController.getComparison);
export default comparisonRoute