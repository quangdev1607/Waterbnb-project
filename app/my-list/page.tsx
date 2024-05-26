import { getCurrentUserServer } from "@/utils/getUserServer";
import { redirect } from "next/navigation";
import { getHomeData } from "../_actions/home";
import ListingCard from "../_components/ListingCard";
import NoItems from "../_components/NoItems";

export default async function ListingsPage() {
  const currentUser = await getCurrentUserServer();
  if (!currentUser) redirect("/");
  const myHomeData = await getHomeData({ userId: currentUser?.id });
  return (
    <section className="container mx-auto mt-10 px-5 lg:px-10">
      <h2 className="text-3xl font-bold tracking-tight">My Homes</h2>
      {myHomeData.length === 0 ? (
        <NoItems
          title="Sorry, no favorites are found!"
          description="You can mark a home as a favorite for later booking"
        />
      ) : (
        <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {myHomeData.map((item) => {
            return (
              <ListingCard
                key={item.id as string}
                description={item.description as string}
                imagePath={item.photo as string}
                location={item.country as string}
                price={item.price as number}
                userId={currentUser?.id}
                homeId={item.id as string}
                favoriteId={item.favorite[0]?.id as string}
                isInFavoriteList={
                  (item.favorite.length as number) > 0 ? true : false
                }
                pathName={"/listings"}
              ></ListingCard>
            );
          })}
        </div>
      )}
    </section>
  );
}