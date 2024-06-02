import { createReservation, getHomeDetail } from "@/app/_actions/home";
import { CategoryShowCase } from "@/app/_components/CategoryShowcase";
import { ReservationSubmitButton } from "@/app/_components/CreationSubmit";
import { HomeMap } from "@/app/_components/HomeMap";
import { Review } from "@/app/_components/Review";
import { SelectCalendar } from "@/app/_components/SelectMap";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatCurrency } from "@/lib/formatters";
import { useCountries } from "@/lib/get-countries";
import { getCurrentUserServer } from "@/utils/getUserServer";
import { CookingPot, Luggage, Snowflake, Tv, Waves, Wifi } from "lucide-react";
import { unstable_noStore as noStore } from "next/cache";
import Image from "next/image";
import { BiSolidWasher } from "react-icons/bi";
import { FaWater } from "react-icons/fa";
import { GiDesk } from "react-icons/gi";
import { MdOutlineBalcony } from "react-icons/md";

export default async function HomePage({ params }: { params: { id: string } }) {
  noStore();
  const homeData = await getHomeDetail(params.id);

  const { getCountryByValues } = useCountries();
  const country = getCountryByValues(homeData?.country as string);

  const currentUser = await getCurrentUserServer();

  return (
    <div className="mx-auto mb-12 mt-10 w-[75%]">
      <span className="text-2xl font-bold  ">{homeData?.title}</span>
      <div className="relative mt-5 h-[550px]">
        <Image
          src={`https://nkjoctfetwapsohrvzxv.supabase.co/storage/v1/object/public/images/${homeData?.photo}`}
          alt="detail home"
          fill
          className="h-full w-full rounded-lg object-cover"
        />
      </div>
      <div className="mt-6  flex justify-between gap-x-24">
        <div className="lg:w-2/3">
          <span className="text-xl font-medium">
            {country?.flag} {country?.label} / {country?.region}
          </span>
          <div className="flex gap-x-2 text-muted-foreground">
            <span>{homeData?.guests} guests,</span>
            <span>{homeData?.bedrooms} room(s),</span>
            <span>{homeData?.bathrooms} bathroom(s)</span>
          </div>
          <div className="mt-6 flex">
            <Image
              src={
                (homeData?.profiles?.avatar_url as string) ??
                "https://github.com/shadcn.png"
              }
              alt="user profile"
              className="h-11 w-11 rounded-full"
            />
            <div className="ml-4 flex flex-col">
              <span className="text-lg font-semibold">
                Hosted by {homeData?.profiles?.first_name}{" "}
              </span>
              <span className="text-sm italic text-muted-foreground">
                Since 2024{" "}
              </span>
            </div>
          </div>
          <Separator className="my-6" />
          <CategoryShowCase
            hostName={homeData.profiles.first_name as string}
            categoryName={homeData?.category_name as string}
          />
          <Separator className="my-6" />
          <div className="flex flex-col gap-y-4">
            <h1 className="text-2xl font-semibold">About this page</h1>
            <span className="text-muted-foreground">
              {homeData?.description}
            </span>
          </div>
          <Separator className="my-6" />
          <div className="flex flex-col gap-y-4">
            <h1 className="text-2xl font-semibold">What this place offers</h1>
            <div className="line-clamp-4 grid  gap-y-4  lg:grid-cols-2">
              <div className="flex items-center gap-x-2 font-normal ">
                <Waves />
                <span>Sea view</span>
              </div>
              <div className="flex items-center gap-x-2 font-normal">
                <CookingPot />
                <span>Kitchen</span>
              </div>
              <div className="flex items-center gap-x-2 font-normal">
                <GiDesk className="h-[24px] w-[24px]" />
                <span>Dedicated workspace</span>
              </div>
              <div className="flex items-center gap-x-2 font-normal">
                <BiSolidWasher className="h-[24px] w-[24px]" />
                <span>Washer</span>
              </div>
              <div className="flex items-center gap-x-2 font-normal">
                <MdOutlineBalcony className="h-[24px] w-[24px]" />
                <span>Patio or balcony</span>
              </div>

              <div className="flex items-center gap-x-2 font-normal">
                <FaWater className="h-[24px] w-[24px]" />
                <span>Waterfront</span>
              </div>
              <div className="flex items-center gap-x-2 font-normal">
                <Wifi />
                <span>Fast wifi – 221 Mbps</span>
              </div>
              <div className="flex items-center gap-x-2 font-normal">
                <Tv />
                <span>TV with standard cable</span>
              </div>
              <div className="flex items-center gap-x-2 font-normal">
                <Snowflake />
                <span>Air conditioning</span>
              </div>
              <div className="flex items-center gap-x-2 font-normal">
                <Luggage />
                <span>Luggage dropoff allowed</span>
              </div>
            </div>
          </div>
        </div>
        <div className="hidden md:block">
          <Card className="sticky top-6 ">
            <CardContent>
              <div className="mt-2 flex items-center gap-x-2 text-xl">
                <span className="text-muted-foreground line-through">{`${formatCurrency(homeData.price as number)}`}</span>
                <span className="font-bold">{`${formatCurrency(Math.round((homeData.price as number) * 0.8))}`}</span>
                <span className="tracking-tight">night</span>
              </div>
              <form action={createReservation}>
                <input type="hidden" name="homeId" value={params.id} />
                <input type="hidden" name="userId" value={currentUser?.id} />
                <SelectCalendar
                  userId={currentUser?.id as string}
                  reservation={homeData?.reservation}
                />
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
      <Separator className="my-6" />
      <Review />
      <Separator className="my-6" />
      <HomeMap locationValue={country?.value as string} />
    </div>
  );
}
