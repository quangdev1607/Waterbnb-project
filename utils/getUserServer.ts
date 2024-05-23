import { createClient } from "./supabase/server";

export async function getCurrentUserServer() {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error || !data.user) {
    console.log("No user found");
    console.log({ error });
  }

  return data.user;
}
