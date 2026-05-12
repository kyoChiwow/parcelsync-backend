import httpStatus from 'http-status-codes';
import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchASync";
import { AdminServices } from "./admin.service";
import { sendResponse } from "../../utils/sendResponse";

const approveCompany = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.body;

    const result = await AdminServices.approveCompanyService(id);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Company has been approved successfully!",
        data: result,
    })
});

const rejectCompany = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.body;

    const result = await AdminServices.rejectCompanyService(id);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Company has been rejected successfully!",
        data: result,
    })
});

export const AdminController = {
    approveCompany,
    rejectCompany
}