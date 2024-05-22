import { Button } from "@/components/ui/button";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

export function SocialAccounts() {
  return (
    <div className="flex w-full flex-col gap-x-2 gap-y-4">
      <Button
        onClick={() => {}}
        variant={"outline"}
        className="flex w-full gap-x-2"
      >
        <FcGoogle />
        <span>Continue with Google</span>
      </Button>
      <Button
        onClick={() => {}}
        variant={"outline"}
        className="flex w-full gap-x-2"
      >
        <FaGithub />
        <span>Continue with Github</span>
      </Button>
    </div>
  );
}
