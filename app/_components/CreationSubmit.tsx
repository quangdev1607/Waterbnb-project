"use client";
import { Button } from "@/components/ui/button";
import { Heart, Loader2, Loader2Icon } from "lucide-react";
import { useFormStatus } from "react-dom";

export function CreationSubmit() {
  const { pending } = useFormStatus();
  return (
    <>
      {pending ? (
        <Button disabled type="submit" size={"lg"}>
          <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
          Please wait
        </Button>
      ) : (
        <Button type="submit" size={"lg"}>
          Save
        </Button>
      )}
    </>
  );
}

export function AddToFavoriteButton() {
  const { pending } = useFormStatus();

  return (
    <>
      {pending ? (
        <Button
          variant={"outline"}
          size={"icon"}
          disabled
          className="bg-primary-foreground"
        >
          <Loader2Icon className="h-4 w-4 animate-spin text-primary" />
        </Button>
      ) : (
        <Button
          variant={"outline"}
          size={"icon"}
          className="bg-primary-foreground"
          type="submit"
        >
          <Heart className="h-4 w-4" />
        </Button>
      )}
    </>
  );
}
export function RemoveFromFavoriteButton() {
  const { pending } = useFormStatus();

  return (
    <>
      {pending ? (
        <Button
          variant={"outline"}
          size={"icon"}
          disabled
          className="bg-primary-foreground"
        >
          <Loader2Icon className="h-4 w-4 animate-spin " />
        </Button>
      ) : (
        <Button
          variant={"outline"}
          size={"icon"}
          className="bg-primary-foreground"
          type="submit"
        >
          <Heart className="h-4 w-4 " fill="#E21C49" />
        </Button>
      )}
    </>
  );
}

export function ReservationSubmitButton() {
  const { pending } = useFormStatus();

  return (
    <>
      {pending ? (
        <Button className="w-full" disabled>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait...
        </Button>
      ) : (
        <Button className="w-full" type="submit">
          Make a Reservation!
        </Button>
      )}
    </>
  );
}
