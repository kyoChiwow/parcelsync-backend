import httpStatus from "http-status-codes";
import AppError from "../../errorHelpers/appError";
import { Area, District, Division } from "../location/location.model";
import { User } from "../user/user.model";
import { IHub } from "./hub.interface";
import { Hub } from "./hub.model";

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

export const HubServices = {
  createHubService,
};
