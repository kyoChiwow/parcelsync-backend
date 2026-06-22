import { model, Schema } from "mongoose";
import { IHubAdmin } from "./admin.interface";

const hubAdminSchema = new Schema<IHubAdmin>({
  hubId: { type: Schema.Types.ObjectId, ref: "Hub", required: true },
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  phone: { type: String },
  address: { type: String },
});

export const HubAdmin = model<IHubAdmin>("HubAdmin", hubAdminSchema);
