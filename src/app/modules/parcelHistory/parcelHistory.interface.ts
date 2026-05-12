import { Types } from "mongoose";

export enum ParcelStatus {
    CREATED = "Parcel has been created!",
    HUB_ASSIGNED = "Parcel has been assigned to a hub!",
    PICKUP_ASSIGNED = "Pickup has been assigned to a driver!",
    PICKUP_COMPLETED = "Driver has picked up the parcel!",
    PARCEL_OUT_TO_DELIVERY_HUB = "Parcel is out to delivery hub!",
    RECEIVED_AT_DELIVERY_HUB = "Parcel has been received at delivery hub!",
    DELIVERY_MAN_ASSIGNED = "Delivery man has been assigned!",
    PARCEL_OUT_FOR_DELIVERY = "Parcel is out for delivery!",
    DELIVERED = "Parcel has been delivered!",
    CANCELLED = "Parcel has been cancelled!",
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