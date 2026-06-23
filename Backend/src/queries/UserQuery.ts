

import { pool } from "../config/dbConnect";

// TYPES HERE
interface CreateUserPayload {
    name: string;
    email: string;
    password: string;
}



// GET USER BY EMAIL
export const getUserByEmailQuery = async (email: string) => {

    return await pool.query(
        `
        SELECT * FROM "USERS"
        WHERE "EMAIL" = $1
        `,
        [email]
    );
};


// CREATE USER QUERY
export const createUserQuery = async ({
    name,
    email,
    password
}: CreateUserPayload) => {

    return await pool.query(
        `
        INSERT INTO "USERS"
        (
            "NAME",
            "EMAIL",
            "PASSWORD"
        )
        VALUES ($1, $2, $3)

        RETURNING
            "USER_ID",
            "NAME",
            "EMAIL",
            "CREATED_AT"
        `,
        [name, email, password]
    );
};

// GET USER BY ID
export const getUserQuery = async(userId : string) => {
    return pool.query(
        `
            SELECT "USER_ID" , "NAME" , "EMAIL" , "CREATED_AT"
            FROM "USERS" WHERE "USER_ID" = $1
        `,
        [userId]
    )
}