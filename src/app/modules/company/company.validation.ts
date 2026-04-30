import { z } from "zod";

export const createCompanyZodSchema = z.object({
  body: z.object({
    companyName: z.string().min(1, { message: "Company name is required" }),
    address: z.string().min(1, { message: "Address is required" }),
    tradeLisence: z.url({ message: "Invalid URL" }).optional(),
    isApproved: z.boolean().optional(),
  }),
});

export const updateCompanyZodSchema = z.object({
  body: z.object({
    companyName: z.string().min(2).optional(),
    address: z.string().optional(),
    tradeLisence: z.url("Invalid license image URL").optional(),
    isApproved: z.boolean().optional(),
  }),
});
