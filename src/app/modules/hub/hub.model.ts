import { model, Schema } from "mongoose";
import { IHub } from "./hub.interface";

const hubSchema = new Schema<IHub>({
    hubName: { type: String, required: true },
    divisionId: { type: Schema.Types.ObjectId, ref: "Division", required: true },
    districtId: { type: Schema.Types.ObjectId, ref: "District", required: true },
    areaId: { type: Schema.Types.ObjectId, ref: "Area", required: true },
    hubAdminId: { type: Schema.Types.ObjectId, ref: "User", required: true },
})

export const Hub = model<IHub>("Hub", hubSchema);