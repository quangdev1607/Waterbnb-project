import { getCurrentUserServer } from "@/utils/getUserServer";
import { redirect } from "next/navigation";
import { getFavoriteData } from "../_actions/favorite";
import ListingCard from "../_components/ListingCard";
import NoItems from "../_components/NoItems";

export default async function FavoritePage() {
  const currentUser = await getCurrentUserServer();
  if (!currentUser) redirect("/");
  const favData = await getFavoriteData({ userId: currentUser?.id });

  return (
    <section className="container mx-auto mt-10 px-5 lg:px-10">
      <h2 className="text-3xl font-bold tracking-tight">Your Favorites</h2>
      {favData?.length === 0 ? (
        <NoItems
          title="Sorry, no favorites are found!"
          description="You can mark a home as a favorite for later booking"
        />
      ) : (
        <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {favData?.map((item) => {
            return (
              <ListingCard
                key={item.homeid}
                description={item.home?.description as string}
                imagePath={item.home?.photo as string}
                location={item.home?.country as string}
                price={item.home?.price as number}
                userId={currentUser?.id}
                homeId={item.home.id}
                favoriteId={item.home?.favorite[0].id}
                isInFavoriteList={
                  (item.home?.favorite.length as number) > 0 ? true : false
                }
                pathName={"/favorites"}
              ></ListingCard>
            );
          })}
        </div>
      )}
    </section>
  );
}
