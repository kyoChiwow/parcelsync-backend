import { Types } from "mongoose";

export interface IHubAdmin {
    hubId: Types.ObjectId;
    userId: Types.ObjectId;
    phone?: string;
    address?: string;
}