import * as z from "zod";

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(1, { message: "Field required" })
    .min(6, { message: "Password must contain at least 6 characters" }),
});
