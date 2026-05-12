import { Types } from "mongoose";

export enum CompanyStatus {
    PENDING = "PENDING",
    APPROVED = "APPROVED",
    REJECTED = "REJECTED",
}

export interface ICompany {
    _id: Types.ObjectId;
    userId: Types.ObjectId;
    companyName: string;
    address: string;
    tradeLisence?: string;
    isApproved: CompanyStatus;
    createdAt?: Date
}