import { z } from "zod";

export const createPlaceSchema = z.object({
  name: z
    .string("Name is required")
    .min(2, "Name must be at least 2 characters long"),
    
  price_per_hour: z.number({
    error: (iss) => {
      if (iss.input == undefined) {
        return { message: "Price per hour is required" };
      }
      return { message: "Invalid input: Please enter a valid number" };
    },
  })
  .min(0, "Price per hour must be non-negative"),

  min_duration_minutes: z.number({
    error: (iss) => {
      if (iss.input == undefined) {
        return { message: "Minimum duration is required" };
      }
      return { message: "Invalid input: Please enter a valid number" };
    }
  }).min(10, "Minimum duration must be at least 10 minutes"),

  is_active: z.boolean().optional(),
  region_id: z.number().optional().nullable(),
});


export const updatePlaceSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters long").optional(),
  price_per_hour: z.number().min(0, "Price per hour must be non-negative").optional(),
  min_duration_minutes: z.number().min(15, "Minimum duration must be at least 15 minutes").optional(),
  is_active: z.boolean().optional(),
  region_id: z.number().nullable().optional(),
});
