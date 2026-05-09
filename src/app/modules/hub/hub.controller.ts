import { Request, Response } from "express";
import httpStatus from "http-status-codes";
import { catchAsync } from "../../utils/catchASync";
import { sendResponse } from "../../utils/sendResponse";
import { HubServices } from "./hub.service";

const createHub = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;

  const result = await HubServices.createHubService(payload);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Hub created successfully",
    data: result,
  });
});

export const HubController = { createHub };
