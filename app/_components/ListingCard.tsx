"use client";

import Image from "next/image";
import Link from "next/link";

import { useCountries } from "@/lib/get-countries";

import { addToFavorite, removeFromFavorite } from "../_actions/favorite";
import {
  AddToFavoriteButton,
  RemoveFromFavoriteButton,
} from "./CreationSubmit";

type HomeItem = {
  imagePath: string;
  description: string;
  location: string;
  price: number;
  userId: string | undefined;
  isInFavoriteList: boolean;
  favoriteId: string | number;
  homeId: string | number;
  pathName: string;
  startDate?: string;
  endDate?: string;
};

export default function ListingCard({
  description,
  imagePath,
  price,
  location,
  userId,
  isInFavoriteList,
  favoriteId,
  homeId,
  pathName,
  startDate,
  endDate,
}: HomeItem) {
  const { getCountryByValues } = useCountries();
  const country = getCountryByValues(location);

  const formatStartDate = startDate?.split("T")[0];
  const formatEndDate = endDate?.split("T")[0];
  return (
    <div className="flex flex-col">
      <div className="relative h-72">
        <Image
          src={`https://nkjoctfetwapsohrvzxv.supabase.co/storage/v1/object/public/images/${imagePath}`}
          alt="Image of house"
          fill
          className="mb-3 h-full rounded-lg object-cover"
        />
        {pathName !== "/reservations" && (
          <>
            {userId && (
              <div className="absolute right-2 top-2 z-10">
                {isInFavoriteList ? (
                  <form action={removeFromFavorite}>
                    <input type="hidden" name="favoriteId" value={favoriteId} />
                    <input type="hidden" name="userId" value={userId} />
                    <input type="hidden" name="pathName" value={pathName} />
                    <RemoveFromFavoriteButton />
                  </form>
                ) : (
                  <form action={addToFavorite}>
                    <input type="hidden" name="homeId" value={homeId} />
                    <input type="hidden" name="userId" value={userId} />
                    <input type="hidden" name="pathName" value={pathName} />

                    <AddToFavoriteButton />
                  </form>
                )}
              </div>
            )}
          </>
        )}
      </div>
      <Link
        className={`flex ${startDate && endDate ? "items-start" : "items-center"} justify-between`}
        href={`/home/${homeId}`}
      >
        <div className=" mt-2">
          <span className="font-semibold">
            {country?.label} / {country?.region}
          </span>
          <p className="line-clamp-1 text-sm text-muted-foreground">
            {description}
          </p>
          <p className="italic text-muted-foreground">
            $<span className="font-semibold text-black">{price}</span>/night
          </p>
        </div>
        {startDate && endDate && (
          <div className="mt-2 flex flex-col ">
            <small>
              <span className="font-semibold">From:</span> {formatStartDate}
            </small>
            <small>
              <span className="font-semibold">To:</span> {formatEndDate}
            </small>
          </div>
        )}
      </Link>
    </div>
  );
}
