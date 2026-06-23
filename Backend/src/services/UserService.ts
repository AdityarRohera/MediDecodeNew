
import { pool } from "../config/dbConnect.js";
import bcrypt from "bcrypt";
import * as User from "../queries/UserQuery.js";
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'


// Global variable
dotenv.config();
const secret = process.env.TOKEN_SECRET;

interface SignupPayload {
    name: string;
    email: string;
    password: string;
}

interface LoginPayload {
    email: string;
    password: string;
}


export const signupService = async ({
    name,
    email,
    password
}: SignupPayload) => {

    try {

        // CHECK USER EXISTS
        const existingUser = await User.getUserByEmailQuery(email);

        if (existingUser.rows.length > 0) {
            throw new Error("User already exists");
        }

        // HASH PASSWORD
        const hashedPassword = await bcrypt.hash(password, 10);

        // CREATE USER
        const user = await User.createUserQuery(
            {
                name,
                email,
                password: hashedPassword
            }
        );

        return user.rows[0];

    } catch (err) {

        throw err;

    }
};

export const loginService = async ({
    email,
    password,
    
}: LoginPayload) => {

    // FIND USER

    const user = await User.getUserByEmailQuery(email);

    if (user.rows.length === 0) {
        throw new Error("Invalid User");
    }

    const existingUser = user.rows[0];

    // COMPARE PASSWORD

    const isPasswordMatched = await bcrypt.compare(
        password,
        existingUser.PASSWORD
    );

    if (!isPasswordMatched) {
        throw new Error("Incorrect password");
    }

    // CREATE TOKEN
        const token = jwt.sign(
            {
                userId : user.rows[0].USER_ID
            }, secret!
        )

    // REMOVE PASSWORD
    delete existingUser.PASSWORD;
    return {existingUser , token};
};

export const getUser = async (userId : any) => {
    const user = await User.getUserQuery(userId);

    if(user.rowCount === 0){
        throw {
            message: "User not found",
            statusCode: 404
        };
    }

    return user.rows[0];
}