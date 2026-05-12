import httpStatus from "http-status-codes";
import AppError from "../../errorHelpers/appError";
import { QueryBuilder } from "../../utils/queryBuilder";
import { CompanyStatus } from "../company/company.interface";
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

    // Security Check: Ensure this company belongs to the user
    if (isCompanyExist.userId.toString() !== payload.userId?.toString()) {
      throw new AppError(
        httpStatus.FORBIDDEN,
        "You do not have permission to create a parcel for this company",
      );
    }

    if (isCompanyExist.isApproved !== CompanyStatus.APPROVED) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        "Company is not active or approved",
      );
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

const getAllParcelService = async (query: Record<string, string>) => {
  const queryBuilder = new QueryBuilder(Parcel.find(), query);

  const parcels = await queryBuilder
    .filter()
    .search([])
    .sort()
    .fields()
    .paginate();

  const [data, meta] = await Promise.all([parcels.build(), parcels.getMeta()]);

  return { data, meta };
};

const getSingleParcelService = async (id: string) => {
  const parcel = await Parcel.findById(id);

  return parcel;
};

export const ParcelServices = {
  createParcelService,
  getAllParcelService,
  getSingleParcelService,
};
