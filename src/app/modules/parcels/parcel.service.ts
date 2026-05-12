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
      throw new Error("Company not found");
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
