import { Request, Response } from "express";
import httpStatus from "http-status-codes";
import { catchAsync } from "../../utils/catchASync";
import { sendResponse } from "../../utils/sendResponse";
import { ParcelHistoryServices } from "./parcelHistory.service";

const getSingleParcelHistory = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await ParcelHistoryServices.getSingleParcelhistoryService(
      id as string,
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Parcel History retrieved successfully",
      data: result,
    });
  },
);

export const ParcelHistoryController = {
  getSingleParcelHistory,
};
