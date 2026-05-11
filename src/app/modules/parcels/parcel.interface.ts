import { Types } from "mongoose";

export enum paymentMethod {
    COD = "COD",
    PREPAID = "PREPAID",
}

export interface IParcel {
    _id: string;
    companyId?: Types.ObjectId;
    pickupHubId?: Types.ObjectId;
    deiveryHubId?: Types.ObjectId;
    weight?: number;
    deliveryCharge?: number;
    totalCost?: number;
    pickUpAddress?: string;
    deliveryAddress?: string;
    paymentMethod?: paymentMethod;
}