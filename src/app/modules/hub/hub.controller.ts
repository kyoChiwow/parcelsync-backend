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

const getAllHubs = catchAsync(async (req: Request, res: Response) => {
  const query = req.query;
  const result = await HubServices.getAllHubsServices(
    query as Record<string, string>,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Hubs retrieved successfully",
    data: result,
  });
});

const getSingleHub = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await HubServices.getSingleHubService(id as string);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Hub retrieved successfully",
    data: result,
  });
});

const updateSingleHub = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const payload = req.body;

  const result = await HubServices.updateSingleHubService(
    id as string,
    payload,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Hub updated successfully",
    data: result,
  });
});

const deleteSingleHub = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await HubServices.deleteSingleHubService(id as string);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Hub deleted successfully",
    data: result,
  });
});

export const HubController = {
  createHub,
  getAllHubs,
  getSingleHub,
  updateSingleHub,
  deleteSingleHub,
};
