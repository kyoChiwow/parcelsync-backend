import { model, Schema } from "mongoose";
import { ICompany } from "./company.interface";

const companySchema = new Schema<ICompany>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    companyName: { type: String, required: true },
    address: { type: String, required: true },
    tradeLisence: { type: String },
    isApproved: { type: Boolean, default: false },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const Company = model<ICompany>("Comapany", companySchema);
