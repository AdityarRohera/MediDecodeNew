
import { Request , Response } from "express"

import { AuthenticatedRequest } from "../middlewares/auth";
import { createChatMessageService, getChatService } from "../services/ChatService";


// export const getChatHandler = async(req : Request , res : Response) => {

//     console.log("--------------Inside get chat hnadler----------------")
//     const userId = (req as AuthenticatedRequest).user.userId;
//     const resportId = req.params;

//     try{


//         const response = await getChatService(userId , resportId);
//         return res.status(200).json({
//             status : true,
//             message : "Get Chats successfully",
//             data : response
//         })


//     } catch(err : unknown){

//         if(typeof err === "object" && err !== null){
//             const error = err as {
//                 code : string,
//                 message : string
//             }

//             // switch(error.code){

//             //     case "":
//             //         return res.status(500).json({
//             //             status : false,
//             //             message : error.message
//             //         })

//             //     default : break;
//             // }


//             if(error.code === "INVALIDE_REPORT_ID"){
//                 return res.status(400).json({
//                     status : false,
//                     message : error.message
//                 })
//             }

//           }

//           return res.status(500).json({
//             status : false,
//             message : "Internal Server Error"
//           })

//         }

        
//     }


export const getChatHandler = async (
    req: Request,
    res: Response
) => {

    try {

        const userId = (req as AuthenticatedRequest).user.userId;
        const { reportId } = req.params;

        if (!reportId) {
            return res.status(400).json({
                success: false,
                message: "Report ID is required"
            });
        }

        const response = await getChatService(
            userId,
            reportId as string
        );

        return res.status(200).json({
            success: true,
            message: "Chat fetched successfully",
            data: response
        });

    } catch (err: unknown) {

        console.log("Error in getChatHandler:", err);

        if (typeof err === "object" && err !== null && "code" in err) {

            const error = err as {
                code: string;
                message: string;
            };

            switch (error.code) {

                case "INVALID_REPORT_ID":
                    return res.status(400).json({
                        success: false,
                        message: error.message
                    });

                case "REPORT_NOT_FOUND":
                    return res.status(404).json({
                        success: false,
                        message: error.message
                    });

                default:
                    break;
            }
        }

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};


export const createMessageHandler = async (
    req: Request,
    res: Response
) => {

    try {

        const userId = (req as AuthenticatedRequest).user.userId;
        const { chatId } = req.params;
        const { message } = req.body;

        if (!chatId) {
            return res.status(400).json({
                success: false,
                message: "Chat ID is required"
            });
        }

        if (!message || typeof message !== "string" || !message.trim()) {
            return res.status(400).json({
                success: false,
                message: "Message is required"
            });
        }

        const response = await createChatMessageService(
            userId as string,
            chatId as string,
            message.trim()
        );

        return res.status(200).json({
            success: true,
            message: "Message sent successfully",
            data: response
        });

    } catch (err: unknown) {

        console.log("Error in createMessageHandler:", err);

        if (typeof err === "object" && err !== null && "code" in err) {

            const error = err as {
                code: string;
                message: string;
            };

            if (error.code === "CHAT_NOT_FOUND") {
                return res.status(404).json({
                    success: false,
                    message: error.message
                });
            }

            if (error.code === "REPORT_NOT_FOUND") {
                return res.status(404).json({
                    success: false,
                    message: error.message
                });
            }
        }

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};