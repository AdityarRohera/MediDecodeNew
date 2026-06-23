

import type { Request , Response } from 'express';
import * as UserService from '../services/UserService.js';

import type { AuthenticatedRequest } from '../middlewares/auth.js'; 

export const signup = async(req : Request , res : Response) => {
    try{

        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        if (password.length < 6) {
            return res.status(400).json({
                success: false,
                message: "Password must be at least 6 characters"
            });
        }

        const response = await UserService.signupService({name, email, password});

        return res.status(201).json({
            success: true,
            message: "User created successfully",
            data: response
        });


    } catch(err : unknown){
        console.log("Error comes in signup" , err);

        let errorMessage;

        if(err instanceof Error){
            
             // USER ALREADY EXISTS
            if (err.message === "User already exists"){
                return res.status(409).json({
                    success: false,
                    message: err.message
                });
            }

            errorMessage = err.message

        }else if(typeof err === "string"){
            errorMessage = err;

        } else{
            errorMessage = err;
        }

        return res.status(500).json({
            success : false,
            message : "Internal server Error",
            error : errorMessage
        })
    }
}

export const login = async (
    req: Request,
    res: Response
) => {

    console.log("---------Inside Login--------------");

    try {

        const { email, password } = req.body;

        // VALIDATION
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required"
            });
        }

        const response = await UserService.loginService({
            email,
            password
        });

        return res.cookie("token" , response.token , {  maxAge: 60 * 60 * 1000 , httpOnly: true , secure : false ,  sameSite: "lax"}).status(200).send({
                success : true,
                message : "Login successfully",
                token : response.token,
                data : response.existingUser
             })

    } catch (err: unknown) {

        console.log("Error comes in login", err);

        let errorMessage;

        if (err instanceof Error) {

            // INVALID CREDENTIALS

            if (err.message === "Invalid user") {
                return res.status(401).json({
                    success: false,
                    message: err.message
                });
            }

            if (err.message === "Incorrect Password") {
                return res.status(401).json({
                    success: false,
                    message: err.message
                });
            }

            errorMessage = err.message;

         } else if (typeof err === "string") {
            errorMessage = err;

        } else {
            errorMessage = "Unknown Error";
        }

        return res.status(500).json({
            success: false,
            message: "Internal server Error",
            error: errorMessage
        });
    }
};


// GET USER PROFILE
export const userProfile = async (req: Request,res: Response) => {

    console.log("-------------Inside Getting user Profile --------------");
    const userId = (req as AuthenticatedRequest).user.userId;

    try {

        const response = await UserService.getUser(userId);

        return res.status(200).json({
            success : true,
            message : "Fetched User Info successfully",
            user : response
        })

    } catch (err: unknown) {

        console.log("Error comes in getting userInfo", err);

        if (err instanceof Error) {
            const error = err as Error & {
            statusCode?: number;
        };

            return res.status(error.statusCode || 500).json({
                success: false,
                message: error.message
            });

         } else {
            return res.status(500).json({
                success: false,
                message: "Internal server Error",
                error: err
            });
         }
    }
};


export const logout = (req: Request, res: Response) => {
  res.clearCookie("token");
  
  return res.status(200).json({
    success: true,
    message: "Logout successful"
  });

};