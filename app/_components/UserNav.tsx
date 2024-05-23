import {
  CalendarCheck,
  Heart,
  List,
  LogInIcon,
  LogOut,
  MenuIcon,
  UserPlus,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { getCurrentUserClient } from "@/utils/getUserClient";
import Link from "next/link";
import { useEffect, useState } from "react";
import { signOut } from "../_actions/auth";

export function UserNav() {
  const [user, setUser] = useState<any>(null);
  useEffect(() => {
    const getData = async () => {
      const currentUser = await getCurrentUserClient();
      setUser(currentUser);
    };
    getData();
  }, []);

  console.log(user);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex cursor-pointer items-center gap-x-2 rounded-full border px-5 py-2">
          <MenuIcon className="h-6 w-6 lg:h-5 lg:w-5" />
          <Avatar className="hidden h-8 w-8 lg:block">
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>{`Hello ${user ? "user!!!" : "guest"}`}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {user ? (
          <>
            <DropdownMenuGroup>
              <DropdownMenuItem asChild>
                <Link href={"/listings"}>
                  <List className="mr-2 h-4 w-4" />
                  My listings
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href={"/favorites"}>
                  <Heart className="mr-2 h-4 w-4" />
                  My favorites
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href={"/reservations"}>
                  <CalendarCheck className="mr-2 h-4 w-4" />
                  My reservations
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => {
                signOut();
                setUser(null);
              }}
              variant="destructive"
            >
              <LogOut className="mr-2 h-4 w-4" />
              <span className="font-bold">Logout</span>
            </DropdownMenuItem>
          </>
        ) : (
          <DropdownMenuGroup>
            <DropdownMenuItem asChild>
              <Link href={"/auth/register"}>
                <UserPlus className="mr-2 h-4 w-4" />
                <span>Register</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href={"/auth/login"}>
                <LogInIcon className="mr-2 h-4 w-4" />
                <span>Login</span>
              </Link>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
