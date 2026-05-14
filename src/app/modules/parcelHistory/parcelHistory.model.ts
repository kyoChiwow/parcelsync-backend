import { model, Schema } from "mongoose";
import { IParcelHistory, IStatusTimeline, ParcelStatus } from "./parcelHistory.interface"; // Update path

// Sub-schema for the timeline array elements
const statusTimelineSchema = new Schema<IStatusTimeline>(
  {
    status: {
      type: String,
      enum: Object.values(ParcelStatus),
      required: true,
    },
    hubId: {
      type: Schema.Types.ObjectId,
      ref: "Hub",
    },
    updatedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    remarks: {
      type: String,
    },
    timeStamp: {
      type: Date,
      default: Date.now,
      required: true,
    },
  },
  { _id: false },
);

// Main schema matching IParcelHistory
const parcelHistorySchema = new Schema<IParcelHistory>(
  {
    parcelId: {
      type: Schema.Types.ObjectId,
      ref: "Parcel",
      required: true,
    },
    timeline: {
      type: [statusTimelineSchema],
      default: [],
    },
  },
  { 
    timestamps: true, 
    versionKey: false,
  },
);

export const ParcelHistory = model<IParcelHistory>(
  "ParcelHistory",
  parcelHistorySchema,
);
