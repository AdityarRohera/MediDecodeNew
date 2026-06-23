
import { BASE_URL , REPORT_ENDPOINTS } from "@/services/ApiConfig";
import axios from "axios";


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

export const fetchAllreports = async(cookieStore : any) => {

    console.log("--------Inside getting all reports---------");
    try{

        console.log(`${BASE_URL}${REPORT_ENDPOINTS.ALL_REPORTS}`);
        const response = await axios.get(`${BASE_URL}${REPORT_ENDPOINTS.ALL_REPORTS}` , {
            headers : {cookie : cookieStore}
        })

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