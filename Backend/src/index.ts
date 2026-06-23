

import express from 'express';
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser';
import { dbConnection } from './config/dbConnect';


// Global variables 
dotenv.config();
const app = express();
const port = process.env.PORT || 3000;



// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: "http://localhost:3001",
    credentials: true
}))
app.use(cookieParser());



// import routes here
import UserRoute from './routes/UserRoute';
import ReportRoute from './routes/ReportRoute';
app.use('/api/v1/user' , UserRoute);
app.use('/api/v1/reports' , ReportRoute);



// 🔹 Start server
const startServer = async () => {
  try {
    await dbConnection();

    app.listen(port, () => {
      console.log(`🚀 Server running at http://localhost:${port}`);
    });

  } catch (err) {
    console.error("❌ App failed to start:", err);
    process.exit(1);
  }
};

startServer();