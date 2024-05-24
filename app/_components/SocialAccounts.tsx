import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/client";
import { wait } from "@/utils/wait";
import { revalidatePath } from "next/cache";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

import { Loader2Icon } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { signInWithGithub } from "../_actions/auth";

export function SocialAccounts() {
  const [isPending, startTransition] = useTransition();
  const handleSubmit = () => {
    startTransition(() => {
      signInWithGithub();
    });
  };
  return (
    <div className="flex w-full flex-col gap-x-2 gap-y-4">
      <form onSubmit={() => handleSubmit()}>
        {isPending ? (
          <Button disabled variant={"outline"} className="flex w-full gap-x-2">
            <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
            Please wait
          </Button>
        ) : (
          <Button variant={"outline"} className="flex w-full gap-x-2">
            <FaGithub />
            <span>Continue with Github</span>
          </Button>
        )}
      </form>
      {/* <Button
        onClick={() => {}}
        variant={"outline"}
        className="flex w-full gap-x-2"
      >
        <FcGoogle />
        <span>Continue with Google</span>
      </Button> */}
    </div>
  );
}
