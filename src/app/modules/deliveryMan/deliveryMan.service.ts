import httpStatus from "http-status-codes";
import AppError from "../../errorHelpers/appError";
import { DeliveryManStatus, IDeliveryMan } from "./deliveryMan.interface";
import { DeliveryMan } from "./deliveryMan.model";

const applyForDeliveryManService = async (
  userId: string,
  payload: Partial<IDeliveryMan>,
) => {
  const existingApp = await DeliveryMan.findOne({ userId });
  if (existingApp) {
    throw new AppError(httpStatus.BAD_REQUEST, "You have already applied!");
  }

  const application = await DeliveryMan.create({
    ...payload,
    userId,
    status: DeliveryManStatus.OFFLINE,
  });
  const result = await DeliveryMan.create(application);
  return result;
};

export const DeliveryManServices = {
  applyForDeliveryManService,
};
