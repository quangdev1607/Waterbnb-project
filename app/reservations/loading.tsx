import SkeletonCard from "@/app/_components/SkeletonCard";

export default function Favoritesloading() {
  return (
    <section className="mx-atuo container mt-10 px-5 lg:px-10">
      <h2 className="text-3xl font-semibold tracking-tight">
        Your Reservations
      </h2>

      <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
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
    </section>
  );
}
