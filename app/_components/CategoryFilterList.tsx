"use client";

import { categoryItems } from "@/lib/category-items";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useCallback } from "react";

export function CategoryFilterList() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const search = searchParams.get("filter");
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);
      return params.toString();
    },
    [searchParams],
  );
  return (
    <div className="no-scroll-bar mt-5 flex justify-between gap-x-10 overflow-x-scroll">
      {categoryItems.map((item) => {
        return (
          <Link
            key={item.id}
            className={cn(
              search === item.name
                ? "flex-shrink-0 border-b-2 border-primary pb-2 font-bold"
                : "flex-shrink-0 opacity-70 hover:border-b-2 hover:border-black hover:border-opacity-30 hover:opacity-100 ",
              "flex h-14 flex-col items-center gap-y-3 ",
            )}
            href={pathname + "?" + createQueryString("filter", item.name)}
          >
            <div className="relative h-6 w-6">
              <Image
                src={item.imageUrl}
                alt="category item"
                width={24}
                height={24}
              />
            </div>
            <p className="text-xs font-medium ">{item.title}</p>
          </Link>
        );
      })}
    </div>
  );
}
