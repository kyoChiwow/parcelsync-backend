import { z } from "zod";
import { Types } from "mongoose";
import { ApplicationStatus, DeliveryManStatus, VehicleType } from "./deliveryMan.interface";

// Custom validator for Mongoose ObjectId
const objectIdSchema = z.string().refine((val) => Types.ObjectId.isValid(val), {
  message: "Invalid Mongoose ObjectId",
});

export const deliveryManSchema = z.object({
  _id: z.string(),
  userId: objectIdSchema,
  hubId: objectIdSchema.optional(),
  divisionId: objectIdSchema.optional(),
  districtId: objectIdSchema.optional(),
  areaId: objectIdSchema.optional(),
  vehicleType: z.enum(VehicleType).optional(),
  status: z.enum(DeliveryManStatus).optional(),
  isApproved: z.enum(ApplicationStatus).optional(),
});

export type IDeliveryManZod = z.infer<typeof deliveryManSchema>;
