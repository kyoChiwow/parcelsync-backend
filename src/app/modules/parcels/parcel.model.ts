import { model, Schema } from "mongoose";
import { IParcel } from "./parcel.interface";

const parcelSchema = new Schema<IParcel>(
    {
        companyId: { type: Schema.Types.ObjectId, ref: "Company", required: true },
    }
)

export const Parcel = model<IParcel>("Parcel", parcelSchema);