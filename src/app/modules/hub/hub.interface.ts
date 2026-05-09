import { Types } from "mongoose";

export interface IHub {
    _id: string;
    hubName: string;
    divisionId: Types.ObjectId;
    districtId: Types.ObjectId;
    areaId: Types.ObjectId;
    hubAdminId: Types.ObjectId;
}