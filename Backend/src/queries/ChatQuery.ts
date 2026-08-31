import { pool } from "../config/dbConnect"



export const getChatQuery = async(resportId : any , userId : any) => {
    try{

        const query = `
            SELECT "CHAT_ID" , "USER_ID" , "REPORT_ID" , "CREATED_AT" FROM "CHAT_SESSIONS"
            WHERE "USER_ID" = $1 AND "REPORT_ID" = $2
        `
        return await pool.query(query , [resportId , userId]);

    } catch(err){
        throw err
    }

}

export const newChatSessionQuery = async(resportId : any , userId : any) => {
    try{

        const query = `
            INSERT INTO "CHAT_SESSIONS" ("USER_ID" , "REPORT_ID")
            VALUES ($1 , $2)
            RETURNING "CHAT_ID" , "USER_ID" , "REPORT_ID" , "CREATED_AT";
        `
        return await pool.query(query , [userId , resportId]);

    } catch(err){
        throw err
    }

}


export const getChatMessagesQuery = async(chat_id : any) => {
    try{

        const query = `
            SELECT * FROM "CHAT_MESSAGES"
            WHERE "CHAT_ID" = $1
        `
        return await pool.query(query , [chat_id]);

    } catch(err){
        throw err
    }

}


export const getChatSummaryQuery = async(chat_id : any) => {
    try{

        const query = `
            SELECT "CHAT_ID" , "CHAT_SUMMARY" FROM "CHAT_SESSIONS"
            WHERE "CHAT_ID" = $1
        `
        return await pool.query(query , [chat_id]);

    } catch(err){
        throw err
    }

}

export const getRecentChatMessagesQuery = async (
    chatId: string
) => {

    return pool.query(
        `
        SELECT
            "MESSAGE_ID",
            "ROLE",
            "MESSAGE",
            "CREATED_AT"
        FROM "CHAT_MESSAGES"
        WHERE "CHAT_ID" = $1
        ORDER BY "CREATED_AT" DESC
        LIMIT 5
        `,
        [chatId]
    );
};

export const createChatMessageQuery = async ({
    chatId,
    role,
    message
}: {
    chatId: string;
    role: "USER" | "ASSISTANT" | "SYSTEM";
    message: string;
}) => {

    return pool.query(
        `
        INSERT INTO "CHAT_MESSAGES" (
            "CHAT_ID",
            "ROLE",
            "MESSAGE"
        )
        VALUES ($1, $2, $3)
        RETURNING
            "MESSAGE_ID",
            "CHAT_ID",
            "ROLE",
            "MESSAGE",
            "CREATED_AT";
        `,
        [chatId, role, message]
    );
};


export const getChatByUserQuery = async (
    chatId: string,
    userId: string
) => {

    return pool.query(
        `
        SELECT
            "CHAT_ID",
            "USER_ID",
            "REPORT_ID",
            "CHAT_SUMMARY"
        FROM "CHAT_SESSIONS"
        WHERE "CHAT_ID" = $1
          AND "USER_ID" = $2
        `,
        [chatId, userId]
    );
};