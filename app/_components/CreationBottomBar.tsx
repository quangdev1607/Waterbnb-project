import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CreationSubmit } from "./CreationSubmit";

export default function CreationBottomBar() {
  return (
    <div className="fixed bottom-0 z-10 h-24 w-full border-t bg-white">
      <div className="mx-auto flex h-full items-center justify-between px-5 lg:px-10">
        <Button variant={"secondary"} size={"lg"} asChild>
          <Link href={"/"}>Cancel</Link>
        </Button>
        <CreationSubmit />
      </div>
    </div>
  );
}
