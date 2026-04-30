import { Types } from "mongoose";

export interface ICompany {
    _id: Types.ObjectId;
    userId: Types.ObjectId;
    companyName: string;
    address: string;
    tradeLisence?: string;
    isApproved: boolean;
    createdAt?: Date
}