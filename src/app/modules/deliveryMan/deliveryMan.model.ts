import { model, Schema } from "mongoose";
import {
    ApplicationStatus,
  DeliveryManStatus,
  IDeliveryMan,
  VehicleType,
} from "./deliveryMan.interface";

const deliveryManSchema = new Schema<IDeliveryMan>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    hubId: { type: Schema.Types.ObjectId, ref: "Hub" },
    divisionId: { type: Schema.Types.ObjectId, ref: "Division" },
    districtId: { type: Schema.Types.ObjectId, ref: "District" },
    areaId: { type: Schema.Types.ObjectId, ref: "Area" },
    vehicleType: {
      type: String,
      enum: Object.values(VehicleType),
      default: VehicleType.CYCLE,
    },
    status: {
      type: String,
      enum: Object.values(DeliveryManStatus),
    },
    isApproved: {
      type: String,
      enum: Object.values(ApplicationStatus),
      default: ApplicationStatus.PENDING,
    },
  },
  { timestamps: true, versionKey: false },
);

export const DeliveryMan = model<IDeliveryMan>(
  "DeliveryMan",
  deliveryManSchema,
);
