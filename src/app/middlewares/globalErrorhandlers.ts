/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from "express";
import { envVars } from "../config/env";
import { TErrorSources } from "../interfaces/error.types";

export const globalErrorHandler = async (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (envVars.NODE_ENV === "development") {
        console.log(err);
    }

    const errorSources: TErrorSources[] = [];
    const statusCode = 500;
    const message = "Something went wrong!";
    

    res.status(statusCode).json({
        success: false,
        message,
        errorSources,
        err: envVars.NODE_ENV === "development" ? err: null,
        stack: envVars.NODE_ENV === "development" ? err.stack: null
    })
}