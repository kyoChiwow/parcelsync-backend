import { ClientSession, Types } from "mongoose";
import { ParcelHistory } from "./parcelHistory.model";
import { IStatusTimeline, ParcelStatus } from "./parcelHistory.interface";

interface IHistoryLogPayload extends Omit<IStatusTimeline, 'hubId' | 'updatedBy' | 'timeStamp' | 'remarks'> {
  parcelId: string | Types.ObjectId;
  hubId?: string | Types.ObjectId;
  updatedBy?: string | Types.ObjectId;
  remarks?: string;
}

// Helper object
const defaultRemarks: Record<ParcelStatus, string> = {
  [ParcelStatus.CREATED]: "Parcel created successfully.",
  [ParcelStatus.PICKUP_HUB_ASSIGNED]: "Pickup hub assigned.",
  [ParcelStatus.PICKUP_ASSIGNED]: "Delivery person assigned for pickup.",
  [ParcelStatus.PICKUP_COMPLETED]: "Parcel successfully collected.",
  [ParcelStatus.DELIVERY_HUB_ASSIGNED]: "Destination delivery hub assigned.",
  [ParcelStatus.PARCEL_OUT_TO_DELIVERY_HUB]: "Parcel is in transit to the delivery hub.",
  [ParcelStatus.RECEIVED_AT_DELIVERY_HUB]: "Parcel received at the destination hub.",
  [ParcelStatus.DELIVERY_MAN_ASSIGNED]: "Delivery person assigned for final delivery.",
  [ParcelStatus.PARCEL_OUT_FOR_DELIVERY]: "Parcel is out for delivery.",
  [ParcelStatus.DELIVERED]: "Parcel delivered successfully.",
  [ParcelStatus.CANCELLED]: "Parcel has been cancelled.",
};

export const logParcelHistory = async (
  payload: IHistoryLogPayload,
  session?: ClientSession
) => {
  const { parcelId, hubId, updatedBy, status, remarks } = payload;

  const timelineStep: IStatusTimeline = {
    status,
    remarks: remarks?.trim() || defaultRemarks[status], 
    timeStamp: new Date(),
    hubId: hubId ? new Types.ObjectId(hubId) : undefined,
    updatedBy: updatedBy ? new Types.ObjectId(updatedBy) : undefined,
  };

  return await ParcelHistory.findOneAndUpdate(
    { parcelId },
    { $push: { timeline: timelineStep } },
    { session, new: true }
  );
};
