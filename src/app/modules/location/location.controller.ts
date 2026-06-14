import { Request, Response } from "express";
import httpStatus from "http-status-codes";
import { catchAsync } from "../../utils/catchASync";
import { sendResponse } from "../../utils/sendResponse";
import { LocationServices } from "./location.service";

const getAllDivision = catchAsync(async (req: Request, res: Response) => {
  const query = req.query;

  const result = await LocationServices.getAllDivisions(
    query as Record<string, string>,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Divisions retrieved successfully",
    data: result.data,
    meta: result.meta,
  });
});

const getAllAreas = catchAsync(async (req: Request, res: Response) => {
  const query = req.query;

  const result = await LocationServices.getAllAreas(
    query as Record<string, string>,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Areas retrieved successfully",
    data: result.data,
    meta: result.meta,
  });
});

const getAllDistrict = catchAsync(async (req: Request, res: Response) => {
  const query = req.query;

  const result = await LocationServices.getAllDistrict(
    query as Record<string, string>,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Districts retrieved successfully",
    data: result.data,
    meta: result.meta,
  });
});

export const LocationController = {
  getAllDivision,
  getAllAreas,
  getAllDistrict
};
