import { Request, Response } from "express";
import httpStatus from "http-status-codes";
import { JwtPayload } from "jsonwebtoken";
import { catchAsync } from "../../utils/catchASync";
import { sendResponse } from "../../utils/sendResponse";
import { DeliveryManServices } from "./deliveryMan.service";

const applyForDeliveryMan = catchAsync(async (req: Request, res: Response) => {
  const decodedToken = req.user as JwtPayload;
  const payload = req.body;

  const result = await DeliveryManServices.applyForDeliveryManService(
    decodedToken.userId,
    payload,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Delivery man applied successfully!",
    data: result,
  });
});

const getAllApplications = catchAsync(async (req: Request, res: Response) => {
  const query = req.query;
  const result = await DeliveryManServices.getAllApplicationService(
    query as Record<string, string>,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Applications retrieved successfully",
    data: result,
  });
});

const getSingleApplication = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await DeliveryManServices.getSingleApplicationService(
    id as string,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Application retrieved successfully",
    data: result,
  });
});

export const DeliveryManController = {
  applyForDeliveryMan,
  getAllApplications,
  getSingleApplication,
};
