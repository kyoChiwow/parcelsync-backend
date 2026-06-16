import { Types } from "mongoose";

export interface IHubAdmin {
    districtId: Types.ObjectId;
    divisionId: Types.ObjectId;
    hubId: Types.ObjectId;
    userId: Types.ObjectId;
    phone?: string;
    address?: string;
}