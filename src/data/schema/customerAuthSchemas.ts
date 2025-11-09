import { z } from "zod";

/**
 * 🧩 Enum placeholders — Replace these with actual enums from your app later.
 * Example: z.enum(["KARACHI", "LAHORE", "ISLAMABAD"])
 */
const cityEnum = z.enum(["cityEnum"]);
const spEnum = z.enum(["spEnum"]);
const courierEnum = z.enum(["courierEnum"]);

/**
 * 🧾 Register With Email Schema
 */
export const registerNewCustomerSchema = z.object({
  // Blank/Cash Name ---- Required
  fldName: z
    .string()
    .min(5, "Customer name must be at least 5 characters.")
    .refine((value) => value.trim().length > 0, {
      message: "Customer name cannot be empty.",
    }),

  // Customer Name ---- Required
  fldTitleName: z.enum(["CUSTOMER"]),

  // Contact No. 1 & Person Name(1) ---- Both Required
  fldTel: z
    .string()
    .length(11, "Contact No. 1 must be exactly 11 characters.")
    .refine((value) => value.trim().length > 0, {
      message: "Contact No. 1 is required.",
    }),

  fldPerson: z
    .string()
    .min(4, "Person Name must be at least 4 characters.")
    .refine((value) => value.trim().length > 0, {
      message: "Person Name is required.",
    }),

  // Contact No. 2 & Person Name (2) ---- Both are Optional
  fldCell2: z.string().optional().nullable(),
  fldPerson2: z
    .string()
    .optional()
    .refine((value) => typeof value === "string" || value === undefined, {
      message: "If provided, Person Name 2 must be a string.",
    }),

  // Whatsapp No. & Person Name (3) ---- Both are required
  fldWhatsapp: z
    .string()
    .length(11, "Whatsapp No. must be exactly 11 characters.")
    .refine((value) => value.trim().length > 0, {
      message: "Whatsapp No. is required.",
    }),

  fldPerson3: z
    .string()
    .min(4, "Person Name 3 must be at least 4 characters.")
    .refine((value) => value.trim().length > 0, {
      message: "Person Name 3 is required.",
    }),

  // Shop No., Floor, Plaza ---- All optional
  fldShop: z
    .string()
    .nullable()
    .optional()
    .refine((value) => value === null || typeof value === "string", {
      message: "If provided, Shop name must be a string.",
    }),
  fldFloor: z
    .string()
    .optional()
    .refine((value) => typeof value === "string" || value === undefined, {
      message: "If provided, Floor name must be a string.",
    }),
  fldPlaza: z
    .string()
    .optional()
    .refine((value) => typeof value === "string" || value === undefined, {
      message: "If provided, Plaza name must be a string.",
    }),

  // Area ---- Required
  fldArea: z.string().refine((value) => value.trim().length > 0, {
    message: "Area is required.",
  }),

  // Province & District ---- Optional
  fldProvince: z
    .string()
    .optional()
    .refine((value) => typeof value === "string" || value === undefined, {
      message: "If provided, Province must be a string.",
    }),
  fldDistrict: z
    .string()
    .optional()
    .refine((value) => typeof value === "string" || value === undefined, {
      message: "If provided, District must be a string.",
    }),

  // City, Sale Person, Courier Mode ---- All optional
  fldCity: z
    .union([cityEnum, z.string()])
    .optional()
    .refine(
      (value) =>
        value === undefined ||
        typeof value === "string" ||
        cityEnum.options.includes(value),
      {
        message: `If provided, City must be one of: ${cityEnum.options.join(
          ", "
        )} or a custom string.`,
      }
    ),

  fldSP: z
    .union([spEnum, z.string()])
    .optional()
    .refine(
      (value) =>
        value === undefined ||
        typeof value === "string" ||
        spEnum.options.includes(value),
      {
        message: `If provided, Sales Person must be one of: ${spEnum.options.join(
          ", "
        )} or a custom string.`,
      }
    ),

  fldCourier: z
    .union([courierEnum, z.string()])
    .nullable()
    .optional()
    .refine(
      (value: any) =>
        value === null ||
        typeof value === "string" ||
        courierEnum.options.includes(value),
      {
        message: `If provided, Courier must be one of: ${courierEnum.options.join(
          ", "
        )} or a custom string.`,
      }
    ),

  // Remarks ---- Optional
  fldRemarks: z
    .string()
    .nullable()
    .optional()
    .refine((value) => value === null || typeof value === "string", {
      message: "If provided, Remarks must be a string or null.",
    }),

  // Active Customer & China ---- Both are checkbox required default false
  fldChina: z
    .boolean()
    .optional()
    .default(false)
    .refine((value) => value !== null, {
      message: "fldChina cannot be null.",
    }),

  fldActive: z
    .boolean()
    .optional()
    .default(false)
    .refine((value) => value !== null, {
      message: "fldActive cannot be null.",
    }),

  // Media Uploads
  images: z
    .array(z.string({ message: "Please upload valid image URLs" }))
    .min(1, "Please upload at least one picture of shop")
    .max(5, "Please upload max 5 images")
    .nonempty("Please upload at least one picture of shop"),

  videos: z
    .array(z.string({ message: "Please upload valid video URLs" }))
    .max(2, "Please upload max 2 videos")
    .optional(),

  // Password ---- Required (with confirmation in UI)
  fldPass: z
    .string()
    .min(4, "Password must be at least 4 characters long.")
    .refine((value) => value !== null, {
      message: "Password is required and cannot be null.",
    }),

  // Username ---- Required
  fldUsername: z
    .string()
    .min(3, "Username must be at least 3 characters long.")
    .refine((value) => value !== null, {
      message: "Username is required and cannot be null.",
    }),
});

/**
 * 🧩 Login Schema
 */
export const loginCustomerSchema = z.object({
  fldUsername: z
    .string()
    .min(1, "Username must be at least 1 character long.")
    .refine((value) => value !== null, {
      message: "Username is required and cannot be null.",
    }),

  fldPass: z
    .string()
    .min(4, "Password must be at least 4 characters long.")
    .refine((value) => value !== null, {
      message: "Password is required and cannot be null.",
    }),
});

/**
 * ✅ Infer Types from Schema
 */
export type RegisterNewCustomerSchemaType = z.infer<
  typeof registerNewCustomerSchema
>;
export type LoginCustomerSchemaType = z.infer<typeof loginCustomerSchema>;
