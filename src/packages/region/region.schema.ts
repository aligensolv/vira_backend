import { z } from "zod";

export const createRegionSchema = z.object({
  name: z.string("Name is required").min(1, "Name must be at least 1 character long"),
});


export const updateRegionSchema = z.object({
  name: z.optional(
    z.string().min(1, "Name must be at least 1 character long")
  )
});