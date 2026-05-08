import { Types } from "mongoose";

export interface IParcel {
    _id: string;
    parcelTypeId?: Types.ObjectId;
    companyId?: Types.ObjectId;
    pickupHubId?: Types.ObjectId;
    deiveryHubId?: Types.ObjectId;
    weight?: number;
    deliveryCharge?: number;
    totalCost?: number;
    pickUpAddress?: string;
    deliveryAddress?: string;
    paymentMethod?: string;
}