import { Request, Response } from "express";
import httpStatus from "http-status-codes";
import { JwtPayload } from "jsonwebtoken";
import { catchAsync } from "../../utils/catchASync";
import { sendResponse } from "../../utils/sendResponse";
import { ParcelServices } from "./parcel.service";

const createParcel = catchAsync(async (req: Request, res: Response) => {
  const { userId } = req.user as JwtPayload;
  const payload = { ...req.body, userId };

  const result = await ParcelServices.createParcelService(payload);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Parcel created successfully",
    data: result,
  });
});

const getAllParcels = catchAsync(async (req: Request, res: Response) => {
  const query = req.query;
  const result = await ParcelServices.getAllParcelService(
    query as Record<string, string>,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Parcels retrieved successfully",
    data: result.data,
    meta: result.meta,
  });
});

const getSingleParcel = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await ParcelServices.getSingleParcelService(id as string);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Parcel retrieved successfully",
    data: result,
  });
});

export const ParcelController = {
  createParcel,
  getAllParcels,
  getSingleParcel,
};
