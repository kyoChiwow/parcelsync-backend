import { z } from 'zod';
import mongoose from 'mongoose';

const objectIdSchema = z.string().refine((val) => mongoose.isValidObjectId(val), {
  message: 'Invalid MongoDB ObjectID',
});

const hubSchemaShape = z.object({
  hubName: z.string().trim(),
  divisionId: objectIdSchema,
  districtId: objectIdSchema,
  areaId: objectIdSchema,
  hubAdminId: objectIdSchema,
});

export const createHubValidationSchema = z.object({
  body: hubSchemaShape,
});

export const updateHubValidationSchema = z.object({
  body: hubSchemaShape.partial(),
});
