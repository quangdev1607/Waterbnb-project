"use server";
import * as z from "zod";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { LoginSchema } from "@/schemas/LoginSchema";
import { RegisterSchema } from "@/schemas/RegisterSchema";
import { createClient } from "@/utils/supabase/server";

export async function login(values: z.infer<typeof LoginSchema>) {
  const validatedFields = LoginSchema.safeParse(values);
  if (!validatedFields.success) return { error: "Fail" };
  const supabase = createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: validatedFields.data.email,
    password: validatedFields.data.password,
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    redirect("/error");
  }

  revalidatePath("/", "layout");
  redirect("/");
}

export async function signup(values: z.infer<typeof RegisterSchema>) {
  const validatedFields = RegisterSchema.safeParse(values);
  if (!validatedFields.success) return { error: "Fail" };

  const supabase = createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: validatedFields.data.email,
    password: validatedFields.data.password,
  };

  const moreData = {
    first_name: validatedFields.data.firstName,
    last_name: validatedFields.data.lastName,
    email: validatedFields.data.email,
  };

  const { error } = await supabase.auth.signUp({
    ...data,
    options: {
      data: {
        ...moreData,
      },
    },
  });

  if (error) {
    console.log(error);
    return { error: error.message };
  }

  revalidatePath("/", "layout");

  return { success: "User created successfully" };
}

export async function signOut() {
  const supabase = createClient();
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.log(error);
    redirect("/error");
  }
  revalidatePath("/", "layout");
  redirect("/");
}

export async function signInWithGithub() {
  const supabase = createClient();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "github",
    options: {
      redirectTo: "http://localhost:3000/auth/callback",
    },
  });
  console.log(data);

  if (data.url) {
    revalidatePath("/", "layout");
    redirect(data.url); // use the redirect API for your server framework
  }
}
