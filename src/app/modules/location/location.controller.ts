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

export const LocationController = {
  getAllDivision,
};
