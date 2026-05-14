import { Request, Response } from "express";
import httpStatus from "http-status-codes";
import { JwtPayload } from "jsonwebtoken";
import { catchAsync } from "../../utils/catchASync";
import { sendResponse } from "../../utils/sendResponse";
import { AdminServices } from "./admin.service";

const approveCompany = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.body;

  const result = await AdminServices.approveCompanyService(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Company has been approved successfully!",
    data: result,
  });
});

const rejectCompany = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.body;

  const result = await AdminServices.rejectCompanyService(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Company has been rejected successfully!",
    data: result,
  });
});

const approveDeliveryMan = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.body;

  const result = await AdminServices.approveDeliveryManService(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Delivery man has been approved successfully!",
    data: result,
  });
});

const rejectDeliveryMan = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.body;

  const result = await AdminServices.rejectDeliveryManService(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Delivery man has been rejected successfully!",
    data: result,
  });
});

const assignPickupHubToParcel = catchAsync(
  async (req: Request, res: Response) => {
    const { hubId, remarks, parcelId } = req.body;
    const { userId: adminId } = req.user as JwtPayload;

    const result = await AdminServices.assignPickupHubToParcelService(
      parcelId,
      hubId,
      adminId,
      remarks,
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Pickup hub assigned and history timeline updated successfully!",
      data: result,
    });
  },
);

const assignDeliveryHubToParcel = catchAsync(
  async (req: Request, res: Response) => {
    const { parcelId, hubId, remarks } = req.body;
    const { userId: hubAdminId } = req.user as JwtPayload;

    const result = await AdminServices.assignDeliveryHubToParcelService(
      parcelId,
      hubId,
      hubAdminId,
      remarks,
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Delivery hub assigned successfully!",
      data: result,
    });
  },
);

export const AdminController = {
  approveCompany,
  rejectCompany,
  approveDeliveryMan,
  rejectDeliveryMan,
  assignPickupHubToParcel,
  assignDeliveryHubToParcel,
};
