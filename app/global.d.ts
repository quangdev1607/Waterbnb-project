import type { Database } from "@/types/supabase";

declare global {
  type Home = Database["public"]["Tables"]["home"]["Row"];
  interface AdvancedHome extends Home {
    favorite: Favorite[];
    profiles: Profiles;
    reservation: Reservation[];
  }
  type User = Database["public"]["Tables"]["profiles"]["Row"];
  type Favorite = Database["public"]["Tables"]["favorite"]["Row"];
  interface AdvancedFavorite extends Favorite {
    home: AdvancedHome;
  }

  type Profiles = Database["public"]["Tables"]["profiles"]["Row"];
  type Reservation = Database["public"]["Tables"]["reservation"]["Row"];
  interface AdvancedReservation extends Reservation {
    home: AdvancedHome;
  }
}
