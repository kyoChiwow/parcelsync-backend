import httpStatus from "http-status-codes";
import AppError from "../../errorHelpers/appError";
import { Area, District, Division } from "../location/location.model";
import { User } from "../user/user.model";
import { IHub } from "./hub.interface";
import { Hub } from "./hub.model";
import { QueryBuilder } from "../../utils/queryBuilder";
import { hubSearchableFields } from "./hub.constant";

const createHubService = async (payload: Partial<IHub>) => {
  const { hubName, divisionId, districtId, areaId, hubAdminId } = payload;

  const isHubExist = await Hub.exists({ hubName });
  if (isHubExist) {
    throw new AppError(httpStatus.BAD_REQUEST, "Hub already exist!");
  }

  const [division, district, area, admin] = await Promise.all([
    Division.findById(divisionId),
    District.findById(districtId),
    Area.findById(areaId),
    User.findById(hubAdminId),
  ]);

  if (!division || !district || !area || !admin) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "Division, District, Area or Admin not found!",
    );
  }

  if (area.districtId.toString() !== districtId?.toString()) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "The selected Area does not belong to this District!",
    );
  }

  const result = await Hub.create(payload);
  return result;
};

const getAllHubsServices = async (query: Record<string, string>) => {
   const queryBuilder = new QueryBuilder(Hub.find(), query) 

  const hubs = await queryBuilder
    .filter()
    .search(hubSearchableFields)
    .sort()
    .fields()
    .paginate();

  const [data, meta] = await Promise.all([hubs.build(), hubs.getMeta()]);

  return { data, meta };
}

const getSingleHubService = async (id: string) => {
    const result = await Hub.findById(id);

    return result;
}

const updateSingleHubService = async (id: string, payload: Partial<IHub>) => {
    const hub = await Hub.findById(id);
    if (!hub) {
        throw new AppError(httpStatus.NOT_FOUND, "Hub not found!");
    }

    const result = await Hub.findByIdAndUpdate(id, payload, { new: true });

    return result;
}

const deleteSingleHubService = async (id: string) => {
    const result = await Hub.findByIdAndDelete(id);

    return result;
}

export const HubServices = {
  createHubService,
  getAllHubsServices,
  getSingleHubService,
  updateSingleHubService,
  deleteSingleHubService
};
