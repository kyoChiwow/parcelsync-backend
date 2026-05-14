import httpStatus from "http-status-codes";
import AppError from "../../errorHelpers/appError";
import { CompanyStatus } from "../company/company.interface";
import { Company } from "../company/company.model";
import {
  ApplicationStatus,
  DeliveryManStatus,
} from "../deliveryMan/deliveryMan.interface";
import { DeliveryMan } from "../deliveryMan/deliveryMan.model";
import { Role } from "../user/user.interface";
import { User } from "../user/user.model";

const updateCompanyStatus = async (id: string, status: CompanyStatus) => {
  const updatedCompany = await Company.findByIdAndUpdate(
    id,
    { isApproved: status },
    { returnDocument: "after", runValidators: true },
  );

  if (!updatedCompany) {
    throw new AppError(httpStatus.NOT_FOUND, "Company not found!");
  }

  return updatedCompany;
};

const approveCompanyService = async (id: string) => {
  return await updateCompanyStatus(id, CompanyStatus.APPROVED);
};

const rejectCompanyService = async (id: string) => {
  return await updateCompanyStatus(id, CompanyStatus.REJECTED);
};

const approveDeliveryManService = async (applicationId: string) => {
  const session = await DeliveryMan.startSession();
  session.startTransaction();

  try {
    const application = await DeliveryMan.findByIdAndUpdate(
      applicationId,
      {
        isApproved: ApplicationStatus.APPROVED,
        status: DeliveryManStatus.AVAILABLE,
      },
      { session },
    );
    if (!application) {
      throw new AppError(httpStatus.NOT_FOUND, "Application not found!");
    }

    await User.findByIdAndUpdate(
      application.userId,
      { $addToSet: { role: Role.DELIVERY_AGENT } },
      { session },
    );

    await session.commitTransaction();
    session.endSession();

    return application;
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

const rejectDeliveryManService = async (applicationId: string) => {
  const session = await DeliveryMan.startSession();
  session.startTransaction();

  try {
    const application = await DeliveryMan.findByIdAndUpdate(
      applicationId,
      {
        isApproved: ApplicationStatus.REJECTED,
        status: DeliveryManStatus.OFFLINE,
      },
      { session },
    );
    if (!application) {
      throw new AppError(httpStatus.NOT_FOUND, "Application not found!");
    }

    await session.commitTransaction();
    session.endSession();

    return application;
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

export const AdminServices = {
  approveCompanyService,
  rejectCompanyService,
  approveDeliveryManService,
  rejectDeliveryManService,
};
