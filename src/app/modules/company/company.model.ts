import { model, Schema } from "mongoose";
import { CompanyStatus, ICompany } from "./company.interface";

const companySchema = new Schema<ICompany>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    companyName: { type: String, required: true },
    address: { type: String, required: true },
    tradeLisence: { type: String },
    isApproved: {
      type: String,
      enum: Object.values(CompanyStatus),
      default: CompanyStatus.PENDING,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const Company = model<ICompany>("Company", companySchema);
