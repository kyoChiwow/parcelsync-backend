import { model, Schema } from "mongoose";
import { IParcel, paymentMethod } from "./parcel.interface";

const parcelSchema = new Schema<IParcel>(
  {
    companyId: { type: Schema.Types.ObjectId, ref: "Company", required: true },
    pickupHubId: { type: Schema.Types.ObjectId, ref: "Hub" },
    deliveryHubId: { type: Schema.Types.ObjectId, ref: "Hub" },
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    weight: { type: Number },
    deliveryCharge: { type: Number },
    totalCost: { type: Number },
    pickUpAddress: { type: String },
    deliveryAddress: { type: String },
    paymentMethod: { type: String, enum: Object.values(paymentMethod) },
  },
  { timestamps: true, versionKey: false },
);

export const Parcel = model<IParcel>("Parcel", parcelSchema);
