"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function addToFavorite(formdata: FormData) {
  const homeId = formdata.get("homeId") as string;
  const userId = formdata.get("userId") as string;
  const pathName = formdata.get("pathName") as string;

  const supabase = createClient();
  const { error } = await supabase
    .from("favorite")
    .insert({ userid: userId, homeid: homeId });

  revalidatePath(pathName);
}

export async function removeFromFavorite(formdata: FormData) {
  const favoriteId = formdata.get("favoriteId") as string;
  const pathName = formdata.get("pathName") as string;
  const userId = formdata.get("userId") as string;

  const supabase = createClient();
  const { error } = await supabase
    .from("favorite")
    .delete()
    .eq("userid", userId)
    .eq("id", favoriteId);

  revalidatePath(pathName);
}

export async function getFavoriteData({
  userId,
}: {
  userId: string | undefined;
}) {
  const supabase = createClient();
  const { data, error } = (await supabase
    .from("favorite")
    .select("*,home(id,title,price,country,description, photo, favorite(*))")
    .eq("userid", userId)) as unknown as {
    data: AdvancedFavorite[];
    error: any;
  };

  return data;
}
