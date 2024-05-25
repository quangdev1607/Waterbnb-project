"use client";

import { Card, CardHeader } from "@/components/ui/card";
import { categoryItems } from "@/lib/category-items";
import Image from "next/image";
import { useState } from "react";

export function SelectedCategory() {
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(
    undefined,
  );
  return (
    <div className="mx-auto mb-36 mt-10 grid w-3/5 gap-8 md:grid-cols-2 lg:grid-cols-4">
      <input type="hidden" name="category" value={selectedCategory as string} />
      {categoryItems.map((item) => (
        <div key={item.id} className="cursor-pointer">
          <Card
            className={
              selectedCategory === item.name ? "border-2 border-primary" : ""
            }
            onClick={() => setSelectedCategory(item.name)}
          >
            <CardHeader>
              <Image
                src={item.imageUrl}
                alt={item.name}
                width={32}
                height={32}
                className="h-8 w-8"
              />
              <h3 className="font-semibold">{item.title}</h3>
            </CardHeader>
          </Card>
        </div>
      ))}
    </div>
  );
}
