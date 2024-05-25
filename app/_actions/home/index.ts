"use server";

import { Database } from "@/types/supabase";
import { createClient } from "@/utils/supabase/server";

import { redirect } from "next/navigation";

export async function createHome({ userId }: { userId: string }) {
  const supabase = createClient();
  // Fetch the most recent home
  const { data: homes, error: fetchError } = (await supabase
    .from("home")
    .select("*")
    .eq("userid", userId)
    .order("created_at", { ascending: false })
    .limit(1)) as unknown as { data: Home[]; error: any };

  if (fetchError) {
    console.log({ error: fetchError });
    return;
  }

  if (homes.length === 0) {
    // Insert new home
    const { data: newHomeData, error: upsertError } = (await supabase
      .from("home")
      .upsert({ userid: userId })
      .select()
      .limit(1)) as unknown as { data: Home[]; error: any };

    if (upsertError) {
      throw new Error(upsertError.message);
    }

    return redirect(`/create/${newHomeData[0].id}/structure`);
  } else {
    const home = homes[0];
    if (
      !home.added_category &&
      !home.added_description &&
      !home.added_location
    ) {
      return redirect(`/create/${home.id}/structure`);
    } else if (home.added_category && !home.added_description) {
      return redirect(`/create/${home.id}/description`);
    } else if (
      home.added_category &&
      home.added_description &&
      !home.added_location
    ) {
      return redirect(`/create/${home.id}/address`);
    } else if (
      home.added_category &&
      home.added_description &&
      home.added_location
    ) {
      console.log("Im here");
      const { data: insertedHome, error: insertError } = (await supabase
        .from("home")
        .insert({ userid: userId })
        .select()
        .limit(1)) as unknown as { data: Home[]; error: any };

      if (insertError) {
        throw new Error(insertError.message);
      }
      return redirect(`/create/${insertedHome[0].id}/structure`);
    }
  }
}

export async function createCategory(formdata: FormData) {
  const categoryName = formdata.get("category") as string;
  const homeId = formdata.get("homeId") as string;

  const supabase = createClient();

  const { error } = await supabase
    .from("home")
    .update({
      category_name: categoryName,
      added_category: true,
    })
    .eq("id", homeId);

  return redirect(`/create/${homeId}/description`);
}

export async function createDescription(formdata: FormData) {
  const title = formdata.get("title") as string;
  const description = formdata.get("description") as string;
  const price = formdata.get("price");
  const imageFile = formdata.get("image") as File;
  const homeId = formdata.get("homeId") as string;

  const guestNumber = formdata.get("guest") as string;
  const roomNumber = formdata.get("room") as string;
  const bathroomNumber = formdata.get("bathroom") as string;

  const supabase = createClient();
  const { data: imageData } = await supabase.storage
    .from("images")
    .upload(`${imageFile.name}-${new Date()}`, imageFile, {
      cacheControl: "2592000",
      contentType: "image/png",
    });

  const { data } = await supabase
    .from("home")
    .update({
      title: title,
      description: description,
      price: price,
      guests: guestNumber,
      bedrooms: roomNumber,
      bathrooms: bathroomNumber,
      photo: imageData?.path,
      added_description: true,
    })
    .eq("id", homeId);
  return redirect(`/create/${homeId}/address`);
}

export async function createLocation(formdata: FormData) {
  const countryValue = formdata.get("country") as string;
  const homeId = formdata.get("homeId") as string;
  const supabase = createClient();
  const { data } = await supabase
    .from("home")
    .update({
      added_location: true,
      country: countryValue,
    })
    .eq("id", homeId);

  return redirect("/");
}

//----------------------

export async function getHomeData({
  searchParams,
  userId,
}: {
  userId: string | undefined;
  searchParams?: { filter?: string };
}) {
  const supabase = createClient();

  let query = supabase
    .from("home")
    .select(`photo, id, title, description, price, country`)
    .eq("added_category", true)
    .eq("added_description", true)
    .eq("added_location", true);

  if (searchParams?.filter) {
    query = query.eq("category_name", searchParams.filter);
  }

  const { data, error } = await query;
  if (error) {
    throw new Error();
  }

  return data;
}