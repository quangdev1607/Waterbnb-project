import { categoryItems } from "@/lib/category-items";
import Image from "next/image";

export function CategoryShowCase({ categoryName }: { categoryName: string }) {
  const category = categoryItems.find((item) => item.name === categoryName);
  return (
    <div className="flex items-center">
      <Image
        src={category?.imageUrl as string}
        alt="category image"
        width={44}
        height={44}
      />
      <div className="ml-4 flex flex-col">
        <span className="text-lg font-semibold">{category?.title}</span>
        <span className="text-sm text-muted-foreground">
          {category?.description}
        </span>
      </div>
    </div>
  );
}
