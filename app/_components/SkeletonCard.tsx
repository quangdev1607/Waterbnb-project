import { Skeleton } from "@/components/ui/skeleton";

export default function SkeletonCard() {
  return (
    <div className="flex flex-col space-y-3">
      <Skeleton className="h-72 w-full rounded-lg" />
      <div className=" mx-auto w-full max-w-sm rounded-md p-4 shadow">
        <div className="flex animate-pulse space-x-4">
          <div className="flex-1 space-y-6 py-1">
            <div className="h-2 rounded bg-muted"></div>
            <div className="space-y-3">
              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-2 h-2 rounded bg-muted"></div>
                <div className="col-span-1 h-2 rounded bg-muted"></div>
              </div>
              <div className="h-2 rounded bg-muted"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
