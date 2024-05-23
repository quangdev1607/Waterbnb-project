import { getCurrentUserServer } from "@/utils/getUserServer";
import { createClient } from "@/utils/supabase/server";

export default async function Home() {
  const currentUser = await getCurrentUserServer();

  return (
    <>
      <h1>Hello {currentUser?.email}</h1>
    </>
  );
}
