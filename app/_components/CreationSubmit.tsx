"use client";
import { Button } from "@/components/ui/button";
import { Heart, Loader2Icon } from "lucide-react";
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
          <Loader2Icon className="h-4 w-4 animate-spin text-primary" />
        </Button>
      ) : (
        <Button
          variant={"outline"}
          size={"icon"}
          className="bg-primary-foreground"
          type="submit"
        >
          <Heart className="h-4 w-4 text-primary" fill="#E21C49" />
        </Button>
      )}
    </>
  );
}
