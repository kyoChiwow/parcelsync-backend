import { model, Schema } from "mongoose";
import { IParcelHistory } from "./parcelHistory.interface";

const parcelHistorySchema = new Schema<IParcelHistory>(
  {
    hubId: { type: Schema.Types.ObjectId, ref: "Hub" },
    parcelId: { type: Schema.Types.ObjectId, ref: "Parcel", required: true },
    updatedBy: { type: Schema.Types.ObjectId, ref: "User" },
    status: { type: String },
    remarks: { type: String },
    timeStamp: { type: Date, default: Date.now },
  },
  { timestamps: true, versionKey: false },
);

export const ParcelHistory = model<IParcelHistory>(
  "ParcelHistory",
  parcelHistorySchema,
);
