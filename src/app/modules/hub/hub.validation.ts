import { z } from 'zod';
import mongoose from 'mongoose';

const objectIdSchema = z.string().refine((val) => mongoose.isValidObjectId(val), {
  message: 'Invalid MongoDB ObjectID',
});

export const createHubValidationSchema = z.object({
  hubName: z.string().trim(),
  divisionId: objectIdSchema,
  districtId: objectIdSchema,
  areaId: objectIdSchema,
  hubAdminId: objectIdSchema.optional(),
});

export const updateHubValidationSchema = z.object({
  hubName: z.string().trim().optional(),
  divisionId: objectIdSchema.optional(),
  districtId: objectIdSchema.optional(),
  areaId: objectIdSchema.optional(),
  hubAdminId: objectIdSchema.optional(),
});
