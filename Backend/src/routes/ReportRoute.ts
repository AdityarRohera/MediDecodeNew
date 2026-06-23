import express from 'express';
import { upload } from "../config/multer";
import * as ReportController from '../controller/ReportController';
import { userAuth } from '../middlewares/auth';
const ReportRoute = express.Router();

ReportRoute.post('/upload' , userAuth , upload.single('Report') , ReportController.uploadReport);


// ANALYZE REPORT
ReportRoute.post('/:reportId/analyze' , userAuth ,  ReportController.analyzeReport);


// GET ALL REPORTS
ReportRoute.get('/' , userAuth , ReportController.allReports)

// GET FULL REPORT
ReportRoute.get('/:reportId/analyze' , userAuth , ReportController.getAnalysesReport)

export default ReportRoute;

