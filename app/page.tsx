import { getCurrentUserServer } from "@/utils/getUserServer";
import { Suspense } from "react";
import { getHomeData } from "./_actions/home";
import { CategoryFilterList } from "./_components/CategoryFilterList";
import ListingCard from "./_components/ListingCard";
import NoItems from "./_components/NoItems";
import SkeletonCard from "./_components/SkeletonCard";

export default function Home({
  searchParams,
}: {
  searchParams?: {
    filter?: string;
  };
}) {
  return (
    <div className=" container mx-auto px-5 lg:px-10">
      <CategoryFilterList />
      <Suspense key={searchParams?.filter} fallback={<SkeletonLoading />}>
        <ShowItems searchParams={searchParams} />
      </Suspense>
    </div>
  );
}

async function ShowItems({
  searchParams,
}: {
  searchParams?: {
    filter?: string;
  };
}) {
  const currentUser = await getCurrentUserServer();
  const homeData = await getHomeData({
    searchParams: searchParams,
    userId: currentUser?.id,
  });

  return (
    <>
      {homeData.length === 0 ? (
        <NoItems
          title="Sorry, no home for this category!"
          description="Please check for other category or you can create your own home"
        />
      ) : (
        <div className="mt-8 grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {homeData.map((item) => (
            <ListingCard
              key={item.id}
              description={item.description as string}
              imagePath={item.photo as string}
              location={item.country as string}
              price={item.price as number}
              userId={currentUser?.id}
              favoriteId={item.favorite[0]?.id}
              isInFavoriteList={item.favorite.length > 0 ? true : false}
              homeId={item.id}
              pathName={"/"}
            />
          ))}
        </div>
      )}
    </>
  );
}

function SkeletonLoading() {
  return (
    <div className="mt-8 grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
    </div>
  );
}
