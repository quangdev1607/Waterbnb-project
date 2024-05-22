import { LoginSchema } from "@/schemas/LoginSchema";
import * as z from "zod";
export function login(values: z.infer<typeof LoginSchema>) {
  const validatedData = LoginSchema.safeParse(values);
  const { success, data, error } = validatedData;
  console.log({ success, data, error });
  return { success };
}
