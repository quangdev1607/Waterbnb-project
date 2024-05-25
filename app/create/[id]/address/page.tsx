"use client";
import { createLocation } from "@/app/_actions/home";
import CreationBottomBar from "@/app/_components/CreationBottomBar";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { useCountries } from "@/lib/get-countries";
import dynamic from "next/dynamic";
import { useState } from "react";

export default function AddressPage({ params }: { params: { id: string } }) {
  const { getAllCountry } = useCountries();
  const [locationValue, setLocationValue] = useState("");

  const LazyMap = dynamic(() => import("@/app/_components/Map"), {
    ssr: false,
    loading: () => <Skeleton className="h-[50vh] w-full" />,
  });
  return (
    <>
      <div className="mx-auto w-3/5">
        <h1 className="mb-10 text-3xl font-semibold tracking-tight transition-colors">
          Where is your home located?
        </h1>
      </div>
      <form action={createLocation}>
        <input type="hidden" name="homeId" value={params.id} />
        <input type="hidden" name="country" value={locationValue} />
        <div className="mx-auto mb-36 w-3/5">
          <div className="mb-5">
            <Select required onValueChange={(value) => setLocationValue(value)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a country" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Countries</SelectLabel>
                  {getAllCountry().map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                      {item.flag} {item.label} / {item.region}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <LazyMap locationValue={locationValue} />
        </div>
        <CreationBottomBar />
      </form>
    </>
  );
}
