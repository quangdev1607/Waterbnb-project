import { getCurrentUserServer } from "@/utils/getUserServer";
import { createClient } from "@/utils/supabase/server";
import { CategoryFilterList } from "./_components/CategoryFilterList";

export default async function Home() {
  const currentUser = await getCurrentUserServer();

  return (
    <div className="container mx-auto px-5 lg:px-10">
      <CategoryFilterList />
    </div>
  );
}
