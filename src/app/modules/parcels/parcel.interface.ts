import { Types } from "mongoose";

export enum paymentMethod {
    COD = "COD",
    PREPAID = "PREPAID",
}

export interface IParcel {
    _id: string;
    companyId?: Types.ObjectId;
    pickupHubId?: Types.ObjectId;
    deliveryHubId?: Types.ObjectId;
    division?: Types.ObjectId;
    userId?: Types.ObjectId;
    weight?: number;
    deliveryCharge?: number;
    totalCost?: number;
    netCost?: number;
    collectionAmount?: number;
    pickUpAddress?: string;
    deliveryAddress?: string;
    paymentMethod?: paymentMethod;
}