import { createClient } from "./supabase/client";

export async function getCurrentUserClient() {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error || !data.user) {
    // console.log("No user found");
    // console.log({ error });
    return;
  }

  return data.user;
}
