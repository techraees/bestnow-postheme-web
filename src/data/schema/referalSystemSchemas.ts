import { z } from "zod";
import { ALLOWED_SIGNUP_REFERAL_USERS_ROLES } from "@/data/coreData/coreData";

export const createNewReferrersSchema = z.object({
  full_name: z
    .string()
    .min(1, { message: "Full Nmae is required" })
    .refine((val) => typeof val === "string", {
      message: "Full Nmae must be a string",
    }),

  CNIC: z
    .string()
    .length(13, { message: "CNIC must be exactly 13 characters" })
    .refine((val) => typeof val === "string", {
      message: "CNIC must be a string",
    }),

  address: z
    .string()
    .optional()
    .nullable()
    .refine((val) => val === null || typeof val === "string", {
      message: "Address must be a string",
    }),

  district: z
    .string()
    .optional()
    .nullable()
    .refine((val) => val === null || typeof val === "string", {
      message: "City must be a string",
    }),

  province: z
    .string()
    .optional()
    .nullable()
    .refine((val) => val === null || typeof val === "string", {
      message: "Province must be a string",
    }),

  district: z
    .string()
    .optional()
    .nullable()
    .refine((val) => val === null || typeof val === "string", {
      message: "District must be a string",
    }),

  referal_role: z
    .string()
    .refine((val) => val === ALLOWED_SIGNUP_REFERAL_USERS_ROLES.REFERRER, {
      message: `Role must be one of: ${ALLOWED_SIGNUP_REFERAL_USERS_ROLES.REFERRER}`,
    }),

  active_phone_number: z
    .string()
    .min(11, { message: "Phone Number must be exactly 11 characters long" })
    .max(11, { message: "Phone Number must be exactly 11 characters long" })
    .refine((val) => /^[0-9]+$/.test(val), {
      message: "Phone Number must contain only numbers",
    }),

  active_email_address: z
    .string()
    .email({ message: "Email should be proper email" })
    .optional(),

  // Profile image validation
  profile_image: z
    .object({
      size: z.number(),
    })
    .catchall(z.unknown())
    .refine(
      (file) => {
        // Check if the file is provided
        if (!file || Object.keys(file).length === 0) {
          throw new Error(
            "Please upload an image containing only a single, clearly visible face."
          );
        }

        // Allowed MIME types and max file size
        const allowedMimeTypes = ["image/jpeg", "image/png"];
        const MAX_SIZE = 5 * 1024 * 1024; // 5MB

        // Check if the file type is allowed
        if (!allowedMimeTypes.includes(file.mimetype || file.type)) {
          throw new Error(
            "Profile Image is invalid. Allowed types: jpeg, png."
          );
        }

        // Check if the file size is within the limit
        if (file.size > MAX_SIZE) {
          throw new Error("Profile Image is too large. Max size: 5MB.");
        }

        return true;
      },
      {
        message:
          "Profile Image is invalid. Allowed types: jpeg, png. Max size: 5MB", // Custom error message if validation fails
      }
    ),
});

// Example validation for profile image (this would need to be integrated with your middleware in a different way)
const validateProfileImage = (file) => {
  const allowedMimeTypes = ["image/jpeg", "image/png"];
  const MAX_SIZE = 5 * 1024 * 1024; // 5MB

  if (!file) {
    return { error: "Profile Image is required" };
  }

  if (!allowedMimeTypes.includes(file.mimetype)) {
    return { error: "Invalid Profile Image type. Allowed types: jpeg, png" };
  }

  if (file.size > MAX_SIZE) {
    return { error: "Profile Image is too large. Max size is 5MB" };
  }

  return { success: true };
};
