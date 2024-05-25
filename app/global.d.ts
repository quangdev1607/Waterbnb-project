import type { Database } from "@/types/supabase";

declare global {
  type Home = Database["public"]["Tables"]["home"]["Row"];
  type User = Database["public"]["Tables"]["profiles"]["Row"];
  type Favorite = Database["public"]["Tables"]["favorite"]["Row"];
}
