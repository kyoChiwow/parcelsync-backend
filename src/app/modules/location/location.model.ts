import { model, Schema } from "mongoose";

// 1. Division
const divisionSchema = new Schema({
  name: { type: String, required: true, unique: true },
});
export const Division = model("Division", divisionSchema);

// 2. District
const districtSchema = new Schema({
  name: { type: String, required: true },
  divisionId: { type: Schema.Types.ObjectId, ref: "Division", required: true },
});
export const District = model("District", districtSchema);

// 3. Area (Upazila/Thana)
const areaSchema = new Schema({
  name: { type: String, required: true },
  districtId: { type: Schema.Types.ObjectId, ref: "District", required: true },
});
export const Area = model("Area", areaSchema);
