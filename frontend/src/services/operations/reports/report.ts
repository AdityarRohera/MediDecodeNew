
import { BASE_URL , COMPARISON_ENDPOINTS, REPORT_ENDPOINTS } from "@/services/ApiConfig";
import axios from "axios";


// COMPARE TWO REPORTS
export const createComparison = async(report1Id : any , report2Id : any) => {

    console.log('-----------Inside Create Comparison-------------');
    try{

        const response = await axios.post(
            `${BASE_URL}${COMPARISON_ENDPOINTS.CREATE}`,
            { report1Id , report2Id },
            { withCredentials : true }
        )

        return response.data;

    } catch(err){
        console.log("---------Error comes in create comparison----------")

        throw err
    }
}


// GET ALL SAVED COMPARISONS (history)
export const fetchAllComparisons = async(params : any = {} , cookieStore : any) => {

    console.log('-----------Inside Fetch All Comparisons-------------');
    try{

        const response = await axios.get(
            `${BASE_URL}${COMPARISON_ENDPOINTS.GET}`,
            { params , headers : {cookie : cookieStore} }
        )

        return response.data;

    } catch(err){
        console.log("---------Error comes in fetch all comparisons----------")

        throw err
    }
}


// GET A SAVED COMPARISON
export const fetchComparison = async(comparisonId : any) => {

    console.log('-----------Inside Fetch Comparison-------------');
    try{

        const response = await axios.get(
            `${BASE_URL}${COMPARISON_ENDPOINTS.GET}/${comparisonId}`,
            { withCredentials : true }
        )

        return response.data;

    } catch(err){
        console.log("---------Error comes in fetch comparison----------")

        throw err
    }
}


export const fullReportAnalysis = async(reportId : any , cookieStore : any) => {

    console.log("---------Inside full report analysis serbice---------");
    try{

        console.log(`${BASE_URL}${REPORT_ENDPOINTS.ANALYZE}/${reportId}/analyze`);

        const response = await axios.get(`${BASE_URL}${REPORT_ENDPOINTS.ANALYZE}/${reportId}/analyze` , 
            {   
                headers : {cookie : cookieStore}
            }
        )

        // console.log("------getting response-------" , response);

        return response.data;

    } catch(err : any) {
        console.log("------Error comes in full report analysis-----")
        console.log("Status:", err.response?.status);
        console.log("Data:", err.response?.data);
        console.log("URL:", err.config?.url);
        throw err;
    }
}

export const fetchAllreports = async(params : any = {} , cookieStore : any) => {

    console.log("--------Inside getting all reports---------");
    console.log("-----------params---------" , params)
    try{

        console.log(`${BASE_URL}${REPORT_ENDPOINTS.ALL_REPORTS}`);
        const response = await axios.get(`${BASE_URL}${REPORT_ENDPOINTS.ALL_REPORTS}?` , {
            params , headers : {cookie : cookieStore}
        })

        console.log(response.data)

        return response.data;

    } catch(err) {
        console.log("-------Error comes in fetching all reports-------")

        throw err;
    }
}

export const uploadReport = async(formData : any) => {

    console.log('-----------Inside Upload Report-------------');
    try{

        const response = await axios.post(`${BASE_URL}${REPORT_ENDPOINTS.UPLOAD}` , formData , {withCredentials : true})
        return response.data;

    } catch(err){
        console.log("---------Error comes inside uplaod Report----------")

        throw err
    }
}


// ANALYSE REPORT

export const analyseReport = async(reportId: any, cookieStore?: any) => {
    console.log('-----------Inside Analyse Report-------------');

    try{

        const response = await axios.post(
    `${BASE_URL}${REPORT_ENDPOINTS.ANALYZE}/${reportId}/analyze`,
    {},
    cookieStore
      ? {
          headers: {
            cookie: cookieStore.toString(),
          },
        }
      : {
          withCredentials: true,
        }
);

        return response.data;

    } catch(err){
        console.log("---------Error comes anylise report Report----------")

        throw err 
    }
}