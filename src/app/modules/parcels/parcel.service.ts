import httpStatus from "http-status-codes";
import AppError from "../../errorHelpers/appError";
import { Company } from "../company/company.model";
import { ParcelStatus } from "../parcelHistory/parcelHistory.interface";
import { ParcelHistory } from "../parcelHistory/parcelHistory.model";
import { IParcel } from "./parcel.interface";
import { Parcel } from "./parcel.model";

const createParcelService = async (payload: Partial<IParcel>) => {
  const session = await Parcel.startSession();
  session.startTransaction();

  try {
    const isCompanyExist = await Company.findById(payload.companyId);
    if (!isCompanyExist) {
      throw new AppError(httpStatus.NOT_FOUND, "Company not found");
    }

    if (!isCompanyExist.isApproved) {
      throw new AppError(httpStatus.BAD_REQUEST, "Company is not active");
    }

    const [parcel] = await Parcel.create([payload], { session });

    await ParcelHistory.create(
      [
        {
          parcelId: parcel._id,
          status: ParcelStatus.CREATED,
        },
      ],
      { session },
    );

    await session.commitTransaction();
    session.endSession();

    return parcel;
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

export const ParcelServices = {
  createParcelService,
};
