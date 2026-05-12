import { Types } from "mongoose";

export enum ParcelStatus {
    CREATED = "CREATED",
    HUB_ASSIGNED = "HUB_ASSIGNED",
    PICKUP_ASSIGNED = "PICKUP_ASSIGNED",
    PICKUP_COMPLETED = "PICKUP_COMPLETED",
    PARCEL_OUT_TO_DELIVERY_HUB = "PARCEL_OUT_TO_DELIVERY_HUB",
    RECEIVED_AT_DELIVERY_HUB = "RECEIVED_AT_DELIVERY_HUB",
    DELIVERY_MAN_ASSIGNED = "DELIVERY_MAN_ASSIGNED",
    PARCEL_OUT_FOR_DELIVERY = "PARCEL_OUT_FOR_DELIVERY",
    DELIVERED = "DELIVERED",
    CANCELLED = "CANCELLED",
}

export interface IParcelHistory {
    _id: string;
    parcelId: Types.ObjectId;
    hubId?: Types.ObjectId;
    updatedBy?: Types.ObjectId;
    status?: ParcelStatus;
    remarks?: string;
    timeStamp: Date;
}