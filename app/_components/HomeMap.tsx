import { Skeleton } from "@/components/ui/skeleton";
import dynamic from "next/dynamic";

export function HomeMap({ locationValue }: { locationValue: string }) {
  const LazyMap = dynamic(() => import("@/app/_components/Map"), {
    ssr: false,
    loading: () => <Skeleton className="h-50 w-full" />,
  });
  return <LazyMap locationValue={locationValue} />;
}
