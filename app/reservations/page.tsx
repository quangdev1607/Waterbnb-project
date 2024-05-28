// import { redirect } from "next/navigation";
// import { unstable_noStore as noStore } from "next/cache";

import { getCurrentUserServer } from "@/utils/getUserServer";
import { getReservations } from "../_actions/reservations";
import ListingCard from "../_components/ListingCard";
import NoItems from "../_components/NoItems";

export default async function ReservationsRoute() {
  const user = await getCurrentUserServer();

  const data = await getReservations(user?.id as string);

  return (
    <section className="mx-atuo container mt-10 px-5 lg:px-10">
      <h2 className="text-3xl font-semibold tracking-tight">
        Your Reservations
      </h2>

      {data?.length === 0 ? (
        <NoItems
          title="Hey you dont have any Reservations"
          description="Please add a reservation to see it right here..."
        />
      ) : (
        <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {data?.map((item) => (
            <ListingCard
              key={item.home?.id}
              description={item.home?.description as string}
              location={item.home?.country as string}
              pathName="/reservations"
              homeId={item.home?.id}
              imagePath={item.home?.photo as string}
              price={item.home?.price as number}
              userId={user?.id}
              favoriteId={item.home?.favorite[0]?.id}
              isInFavoriteList={
                (item.home?.favorite.length as number) > 0 ? true : false
              }
              startDate={item.start_date}
              endDate={item.end_date}
            />
          ))}
        </div>
      )}
    </section>
  );
}
