import { z } from 'zod';
import mongoose from 'mongoose';
import { paymentMethod } from './parcel.interface';

const objectIdSchema = z.string().refine((val) => mongoose.isValidObjectId(val), {
  message: 'Invalid MongoDB ObjectID',
});

const parcelSchemaShape = z.object({
  parcelTypeId: objectIdSchema.optional(),
  companyId: objectIdSchema.optional(),
  
  // Logistics (Optional during initial creation, assigned by Admin later)
  pickupHubId: objectIdSchema.optional(),
  deiveryHubId: objectIdSchema.optional(), 
  
  // Pricing & Metrics
  weight: z.number().positive('Weight must be a positive number').optional(),
  deliveryCharge: z.number().nonnegative().optional(),
  totalCost: z.number().nonnegative().optional(),
  
  // Addresses
  pickUpAddress: z.string().trim().min(1, "Pickup address is required").optional(),
  deliveryAddress: z.string().trim().min(1, "Delivery address is required").optional(),
  
  // Payment Method using Native Enum
  paymentMethod: z.enum(paymentMethod).optional(),
});

export const createParcelValidationSchema = z.object({
  body: parcelSchemaShape,
});

export const updateParcelValidationSchema = z.object({
  body: parcelSchemaShape.partial(),
});
