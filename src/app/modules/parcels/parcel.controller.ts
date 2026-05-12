import httpStatus from 'http-status-codes';
import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchASync";
import { ParcelServices } from "./parcel.service";
import { sendResponse } from "../../utils/sendResponse";

const createParcel = catchAsync(async (req: Request, res: Response) => {
    const payload = req.body;

    const result = await ParcelServices.createParcelService(payload);

    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: "Parcel created successfully",
        data: result,
    })
});

export const ParcelController = {
    createParcel
}