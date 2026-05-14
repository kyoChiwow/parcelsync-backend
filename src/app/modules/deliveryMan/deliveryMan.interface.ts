import { Types } from "mongoose";

export enum DeliveryManStatus {
    AVAILABLE = "AVAILABLE",
    OFFLINE = "OFFLINE",
    ON_DELIVERY = "ON_DELIVERY",
}

export enum VehicleType {
    BIKE = "BIKE",
    CYCLE = "CYCLE",
}

export enum ApplicationStatus {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
}

export interface IDeliveryMan {
    _id: string;
    userId: Types.ObjectId;
    hubId?: Types.ObjectId;
    divisionId?: Types.ObjectId;
    districtId?: Types.ObjectId;
    areaId?: Types.ObjectId;
    vehicleType?: VehicleType;
    status?: DeliveryManStatus;
    isApproved?: ApplicationStatus;
}