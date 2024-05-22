import * as z from "zod";

export const RegisterSchema = z
  .object({
    firstName: z
      .string()
      .trim()
      .refine(
        (value) => {
          const allowedChars = /^[a-zA-Z]+(?: [a-zA-Z]+)*$/; // Allow spaces between words
          return allowedChars.test(value);
        },
        { message: "Name can only contain letters and spaces" },
      ),
    lastName: z
      .string()
      .trim()
      .refine(
        (value) => {
          const allowedChars = /^[a-zA-Z]+(?: [a-zA-Z]+)*$/; // Allow spaces between words
          return allowedChars.test(value);
        },
        { message: "Name can only contain letters and spaces" },
      ),
    email: z.string().email(),
    password: z
      .string()
      .min(1, { message: "Password can not be empty" })
      .min(6, { message: "Password must be greater than 6 characters" }),
    // .refine((password) => {
    //     return /^(?=.*[A-Z])(?=.*[!@#$%^&*()\-+=]).*$/.test(password);
    // }, "Password must contain 1 uppercase and 1 special character"),
    passwordConfirm: z
      .string()
      .min(1, { message: "Password can not be empty" }),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.passwordConfirm) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["passwordConfirm"],
        message: "Password does not match",
      });
    }
  });
