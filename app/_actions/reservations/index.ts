import { createClient } from "@/utils/supabase/server";

export async function getReservations(userId: string) {
  const supabase = createClient();

  const { data, error } = (await supabase
    .from("reservation")
    .select(
      "start_date,end_date,home(id, country, photo, description, price, favorite(userid)) ",
    )
    .eq("userId", userId)
    .eq("home.favorite.userid", userId)) as unknown as {
    data: AdvancedReservation[];
    error: any;
  };

  return data;
}
