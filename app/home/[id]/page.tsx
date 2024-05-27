import { createReservation, getHomeDetail } from "@/app/_actions/home";
import { CategoryShowCase } from "@/app/_components/CategoryShowcase";
import { ReservationSubmitButton } from "@/app/_components/CreationSubmit";
import { HomeMap } from "@/app/_components/HomeMap";
import { SelectCalendar } from "@/app/_components/SelectMap";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useCountries } from "@/lib/get-countries";
import { getCurrentUserServer } from "@/utils/getUserServer";
import Image from "next/image";
import Link from "next/link";

export default async function HomePage({ params }: { params: { id: string } }) {
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
        <div className="w-2/3">
          <span className="text-xl font-medium">
            {country?.flag} {country?.label} / {country?.region}
          </span>
          <div className="flex gap-x-2 text-muted-foreground">
            <span>{homeData?.guests} guests,</span>
            <span>{homeData?.bedrooms} room(s),</span>
            <span>{homeData?.bathrooms} bathroom(s)</span>
          </div>
          <div className="mt-6 flex">
            <img
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
          <CategoryShowCase categoryName={homeData?.category_name as string} />
          <Separator className="my-6" />
          <span className="text-muted-foreground">{homeData?.description}</span>
          <Separator className="my-6" />
          <HomeMap locationValue={country?.value as string} />
        </div>
        <form action={createReservation}>
          <input type="hidden" name="homeId" value={params.id} />
          <input type="hidden" name="userId" value={currentUser?.id} />
          <SelectCalendar
            userId={currentUser?.id as string}
            reservation={homeData?.reservation}
          />

          {/* {currentUser?.id ? (
            <ReservationSubmitButton />
          ) : (
            <Button>
              <Link href={"/auth/login"}>Make a reservation</Link>
            </Button>
          )} */}
        </form>
      </div>
    </div>
  );
}
