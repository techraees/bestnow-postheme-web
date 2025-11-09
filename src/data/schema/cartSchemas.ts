import { z } from "zod";

export const placePreOrderSchema = z.object({
  new_active_phone_number: z
    .string()
    .min(11, "Phone number must be exactly 11 digits")
    .max(11, "Phone number must be exactly 11 digits")
    .regex(/^\d{11}$/, "Phone number must contain exactly 11 digits"),
  new_type_city: z.string().optional(),
  whole_adress_from_user_tblchart: z.string().optional(),

  fldCustomerName: z.string(),

  fldPhone: z.string().optional(),
});
