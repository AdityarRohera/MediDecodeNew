
import { BASE_URL , AUTH_ENDPOINTS } from "@/services/ApiConfig"
import axios from "axios";

export const register = async (data: any) => {

    console.log("get______________" , data)

    console.log("-------Inside register service ---------")
  try {
    const response = await axios.post(
      `${BASE_URL}${AUTH_ENDPOINTS.REGISTER}`,
      data,
      {
        headers: {
          Accept: "application/json",
        },
      }
    );

    return response.data;

  } catch (error: any) {
    throw new Error(
      error?.response?.data?.message ||
      "Registration failed"
    );
  }
};

export const signin = async(data : any) => {

    console.log("-------Inside Login service ---------")
    try{

        const response = await axios.post(
            `${BASE_URL}${AUTH_ENDPOINTS.LOGIN}`,
            data,
            {
                withCredentials: true,
                headers : {Accept : "application/json"}
            }
        )

        return response.data

    } catch(err) {
        console.log("Error comes in signin service" , err);

        throw new Error(
            err?.response?.data?.message ||
            "Failed to signin"
        )
    }
}

export const getCurrentUser = async(cookieStored? : any) => {

    console.log("-------Inside gettinguser service ---------");

    try{

        const response = await axios.get(`${BASE_URL}${AUTH_ENDPOINTS.ME}` , 
            cookieStored ? {headers : {cookie: cookieStored.toString()}} : {withCredentials : true}
        );

        return response.data;

    } catch(err){

        console.log("Getting error in fetching user -----> " , err);

        // Unauthorized / No user
        if (err.response?.status === 401) {
            return null;
        }

        throw new Error(
            err?.response?.data?.message ||
            "Failed to fetch user"
        )
    }
}