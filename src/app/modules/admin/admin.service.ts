import httpStatus from "http-status-codes";
import AppError from "../../errorHelpers/appError";
import { CompanyStatus } from "../company/company.interface";
import { Company } from "../company/company.model";
import {
  ApplicationStatus,
  DeliveryManStatus,
} from "../deliveryMan/deliveryMan.interface";
import { DeliveryMan } from "../deliveryMan/deliveryMan.model";
import { ParcelStatus } from "../parcelHistory/parcelHistory.interface";
import { logParcelHistory } from "../parcelHistory/parcelHistory.utils";
import { Parcel } from "../parcels/parcel.model";
import { Role } from "../user/user.interface";
import { User } from "../user/user.model";
import { HubAdmin } from "./admin.model";
import { Hub } from "../hub/hub.model";
import { QueryBuilder } from "../../utils/queryBuilder";

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

const assignPickupHubToParcelService = async (
  parcelId: string,
  hubId: string,
  adminId: string,
  remarks?: string,
) => {
  const session = await Parcel.startSession();
  session.startTransaction();

  try {
    const updatedParcel = await Parcel.findByIdAndUpdate(
      parcelId,
      {
        pickupHubId: hubId,
      },
      { session, runValidators: true, returnDocument: "after" },
    );

    if (!updatedParcel) {
      throw new AppError(httpStatus.NOT_FOUND, "Parcel not found!");
    }

    await logParcelHistory(
      {
        parcelId,
        status: ParcelStatus.PICKUP_HUB_ASSIGNED,
        hubId,
        updatedBy: adminId,
        remarks,
      },
      session,
    );

    await session.commitTransaction();
    session.endSession();

    return updatedParcel;
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

const assignDeliveryHubToParcelService = async (
  parcelId: string,
  hubId: string,
  hubAdminId: string,
  remarks?: string,
) => {
  const session = await Parcel.startSession();
  session.startTransaction();

  try {
    const updatedParcel = await Parcel.findByIdAndUpdate(
      parcelId,
      {
        deliveryHubId: hubId,
      },
      { session, runValidators: true, returnDocument: "after" },
    );

    if (!updatedParcel) {
      throw new AppError(httpStatus.NOT_FOUND, "Parcel not found!");
    }

    await logParcelHistory(
      {
        parcelId,
        status: ParcelStatus.DELIVERY_HUB_ASSIGNED,
        hubId,
        updatedBy: hubAdminId,
        remarks,
      },
      session,
    );

    await session.commitTransaction();
    session.endSession();

    return updatedParcel;
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

const makeHubAdminService = async (
  userId: string,
  payload: {
    divisionId: string;
    districtId: string;
    hubId: string;
    phone?: string;
    address?: string;
  },
) => {
  const session = await User.startSession();

  session.startTransaction();

  try {
    // Change User role
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        $addToSet: { role: Role.HUB_ADMIN },
      },
      { session, runValidators: true, returnDocument: "after" },
    );

    if (!updatedUser) {
      throw new AppError(httpStatus.NOT_FOUND, "User not found!");
    }

    // Check and add hub admin to HubAdmin collection
    const isHubAdminExist = await HubAdmin.findOne({
      userId: updatedUser._id,
    }).session(session);

    if (isHubAdminExist) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        "User is already a hub admin!",
      );
    }

    const [newHubAdmin] = await HubAdmin.create(
      [
        {
          ...payload,
          userId: updatedUser._id,
        },
      ],
      { session },
    );

    // Add hub admin id to hub collection
    await Hub.findByIdAndUpdate(
      payload.hubId,
      {
        $addToSet: { hubAdminId: newHubAdmin._id },
      },
      { session },
    );

    await session.commitTransaction();

    return { user: updatedUser, hubAdmin: newHubAdmin };
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    await session.endSession();
  }
};

const getAllHubAdminsService = async (query: Record<string, string>) => {
  const queryBuilder = new QueryBuilder(HubAdmin.find(), query);

  const hubAdmins = await queryBuilder
    .filter()
    .search(["name"])
    .sort()
    .fields()
    .paginate();

  const [data, meta] = await Promise.all([
    hubAdmins.build(),
    hubAdmins.getMeta()
  ])

  return { data, meta };
}

const deleteHubAdminService = async (userId: string) => {
  const session = await User.startSession();
  session.startTransaction();

  try {
    
    const deletedHubAdmin = await HubAdmin.findOneAndDelete(
      { userId },
      { session },
    );

    if (!deletedHubAdmin) {
      throw new AppError(httpStatus.NOT_FOUND, "Hub admin not found!");
    }

    await Hub.findByIdAndUpdate(
      deletedHubAdmin.hubId,
      {
        $pull: { hubAdminId: deletedHubAdmin._id },
      },
      { session },
    );

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        $pull: { role: Role.HUB_ADMIN },
      },
      { session, runValidators: true, returnDocument: "after" },
    );

    if (!updatedUser) {
      throw new AppError(httpStatus.NOT_FOUND, "User not found!");
    }

    await session.commitTransaction();

    return { user: updatedUser, hubAdmin: deletedHubAdmin };
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    await session.endSession();
  }
};

export const AdminServices = {
  approveCompanyService,
  rejectCompanyService,
  approveDeliveryManService,
  rejectDeliveryManService,
  assignPickupHubToParcelService,
  assignDeliveryHubToParcelService,
  makeHubAdminService,
  deleteHubAdminService,
  getAllHubAdminsService
};
