import axios from "axios";
import { BASE_URL } from "@/services/ApiConfig";
import { CHAT_ENDPOINTS } from "@/services/ApiConfig";


// ---------------------------------------------
// GET CHAT FOR REPORT
// ---------------------------------------------

export const getChat = async (
    reportId: string,
    cookieStore?: any
) => {

    console.log("----------- Inside Get Chat -------------");

    try {

        const response = await axios.get(
            `${BASE_URL}${CHAT_ENDPOINTS.GET_CHAT}/${reportId}/chat`,
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

    } catch (err) {

        console.log(
            "--------- Error comes in Get Chat ----------"
        );

        throw err;
    }
};


// ---------------------------------------------
// SEND CHAT MESSAGE
// ---------------------------------------------

export const sendChatMessage = async (
    chatId: string,
    message: string,
    cookieStore?: any
) => {

    console.log("----------- Inside Send Chat Message -------------");

    try {

        const response = await axios.post(
            `${BASE_URL}${CHAT_ENDPOINTS.SEND_MESSAGE}/${chatId}/messages`,
            {
                message,
            },
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

        console.log(response);

        return response.data;

    } catch (err) {

        console.log(
            "--------- Error comes in Send Chat Message ----------"
        );

        throw err;
    }
};