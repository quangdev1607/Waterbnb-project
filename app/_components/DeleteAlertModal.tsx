import { Button } from "@/components/ui/button";
import { deleteHome } from "../_actions/home";
import { DeleteButton } from "./CreationSubmit";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Trash } from "lucide-react";

export function DeleteAlertModal({
  id,
  imagePath,
}: {
  id: string | number;
  imagePath: string | null;
}) {
  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger>
          <Button variant={"destructive"} size={"icon"} type="submit">
            <Trash className="h-4 w-4" />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <form action={deleteHome}>
            <input type="hidden" name="imagePath" value={imagePath as string} />
            <input type="hidden" name="homeId" value={id as number} />
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                home and remove your data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction type="submit">Delete</AlertDialogAction>
            </AlertDialogFooter>
          </form>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
