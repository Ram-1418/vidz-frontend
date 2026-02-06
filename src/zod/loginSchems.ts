import { z } from "zod";

export const loginSchema = z.object({
  value: z
    .string()
    .min(1, "Email or Username is required")
    .refine(
      (val) =>
        val.includes("@")
          ? /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)
          : val.length >= 3,
      {
        message: "Enter a valid email or username",
      }
    ),

  password: z
    .string()
    .min(6, "Password must be at least 6 characters"),
});

export type LoginFormData = z.infer<typeof loginSchema>;
