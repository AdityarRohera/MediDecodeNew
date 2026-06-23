

// user api
import dotenv from 'dotenv'
// dotenv.config();

export const AUTH_ENDPOINTS = {
    REGISTER : '/user/register',
    LOGIN : '/user/login',
    ME : '/user/profile'
}

export const REPORT_ENDPOINTS = {
    UPLOAD : '/reports/upload',
    ANALYZE : '/reports',
    ALL_REPORTS : '/reports'
}

export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;