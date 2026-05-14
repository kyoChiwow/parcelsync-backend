import httpStatus from "http-status-codes";
import AppError from "../../errorHelpers/appError";
import { QueryBuilder } from "../../utils/queryBuilder";
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

const getAllApplicationService = async (query: Record<string, string>) => {
  const queryBuilder = new QueryBuilder(DeliveryMan.find(), query);
  const applications = await queryBuilder
    .filter()
    .search([])
    .sort()
    .fields()
    .paginate();
  const [data, meta] = await Promise.all([
    applications.build(),
    applications.getMeta(),
  ]);
  return { data, meta };
};

const getSingleApplicationService = async (applicationId: string) => {
  const application = await DeliveryMan.findById(applicationId);
  if (!application) {
    throw new AppError(httpStatus.NOT_FOUND, "Application not found!");
  }
  return application;
};

export const DeliveryManServices = {
  applyForDeliveryManService,
  getAllApplicationService,
  getSingleApplicationService,
};
