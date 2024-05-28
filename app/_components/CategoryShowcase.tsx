import { categoryItems } from "@/lib/category-items";
import { DoorOpen, Medal, WifiIcon } from "lucide-react";
import Image from "next/image";

export function CategoryShowCase({
  categoryName,
  hostName,
}: {
  categoryName: string;
  hostName: string;
}) {
  const category = categoryItems.find((item) => item.name === categoryName);
  return (
    <div className="flex flex-col gap-y-6">
      <div className="flex items-start">
        <Image
          src={category?.imageUrl as string}
          alt="category image"
          width={30}
          height={30}
        />
        <div className="ml-4 flex flex-col">
          <span className="text-base font-semibold">{category?.title}</span>
          <span className="text-sm text-muted-foreground">
            {category?.description}
          </span>
        </div>
      </div>
      <div className="flex items-start">
        <WifiIcon width={30} height={30} />
        <div className="ml-4 flex flex-col">
          <span className="text-base font-semibold">Fast wifi</span>
          <span className="text-sm text-muted-foreground">
            At 221 Mbps, you can take video calls and stream videos for your
            whole group.
          </span>
        </div>
      </div>
      <div className="flex items-start">
        <DoorOpen width={30} height={30} />
        <div className="ml-4 flex flex-col">
          <span className="text-base font-semibold">Self check-in</span>
          <span className="text-sm text-muted-foreground">
            Check yourself in with the lockbox.
          </span>
        </div>
      </div>
      <div className="flex items-start">
        <Medal width={30} height={30} />
        <div className="ml-4 flex flex-col">
          <span className="text-base font-semibold">
            {hostName} is Superhost
          </span>
          <span className="text-sm text-muted-foreground">
            Superhosts are experienced, highly rated Hosts.
          </span>
        </div>
      </div>
    </div>
  );
}
