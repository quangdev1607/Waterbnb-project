"use client";
import { Button } from "@/components/ui/button";
import { eachDayOfInterval } from "date-fns";
import { Link, Loader2 } from "lucide-react";
import { useState } from "react";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { useFormStatus } from "react-dom";
import { ReservationSubmitButton } from "./CreationSubmit";
export function SelectCalendar({
  reservation,
  userId,
}: {
  userId: string;
  reservation:
    | {
        start_date: string;
        end_date: string;
      }[]
    | undefined;
}) {
  const [state, setState] = useState<any>([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  let disabledDates: Date[] = [];
  reservation?.forEach((reservationItem) => {
    const dateRange = eachDayOfInterval({
      start: new Date(reservationItem.start_date),
      end: new Date(reservationItem.end_date),
    });
    disabledDates = [...disabledDates, ...dateRange];
  });

  const { pending } = useFormStatus();
  let currentState = state[0].startDate;

  let isDisable = disabledDates.some(
    (item) =>
      item.toISOString().split("T")[0] ===
      currentState.toISOString().split("T")[0],
  );

  return (
    <>
      <input
        type="hidden"
        name="startDate"
        value={state[0].startDate.toISOString()}
      />
      <input
        type="hidden"
        name="endDate"
        value={state[0].endDate.toISOString()}
      />
      <DateRange
        date={new Date()}
        showDateDisplay={false}
        rangeColors={["#FF5A5F"]}
        ranges={state}
        onChange={(item) => setState([item.selection] as any)}
        minDate={new Date()}
        direction="vertical"
        disabledDates={disabledDates}
      />

      {userId ? (
        <>
          {pending ? (
            <Button className="w-full" disabled>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait...
            </Button>
          ) : (
            <Button disabled={isDisable} className="w-full" type="submit">
              Make a Reservation!
            </Button>
          )}
        </>
      ) : (
        <Button>
          <Link href={"/auth/login"}>Make a reservation</Link>
        </Button>
      )}
    </>
  );
}
