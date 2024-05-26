import {
  CalendarCheck,
  Heart,
  Home,
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
import { createHome } from "../_actions/home";

export function UserNav() {
  const [user, setUser] = useState<any>(null);
  useEffect(() => {
    const getData = async () => {
      const currentUser = await getCurrentUserClient();
      setUser(currentUser);
    };
    getData();
  }, []);

  const createAirBnBHome = createHome.bind(null, {
    userId: user?.id as string,
  });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex cursor-pointer items-center gap-x-2 rounded-full border px-5 py-2">
          <MenuIcon className="h-6 w-6 lg:h-5 lg:w-5" />
          <Avatar className="hidden h-8 w-8 lg:block">
            <AvatarImage
              src={
                user && user.user_metadata.avatar_url
                  ? user.user_metadata.avatar_url
                  : "https://github.com/shadcn.png"
              }
              alt="@shadcn"
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        {user &&
          user.user_metadata.first_name &&
          user.user_metadata.first_name && (
            <DropdownMenuLabel>
              👋Hello, {user.user_metadata.first_name}{" "}
              {user.user_metadata.last_name}
            </DropdownMenuLabel>
          )}

        {user && user.user_metadata.full_name && (
          <DropdownMenuLabel>
            👋Hello, {user.user_metadata.full_name}
          </DropdownMenuLabel>
        )}
        {!user && <DropdownMenuLabel>Hello, guest</DropdownMenuLabel>}
        <DropdownMenuSeparator />
        {user ? (
          <>
            <DropdownMenuItem>
              <form
                className="flex w-full items-center"
                action={createAirBnBHome}
              >
                <Home className="mr-2 h-4 w-4" />
                <button type="submit" className="w-full text-start">
                  Airbnb your home
                </button>
              </form>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem asChild>
                <Link href={"/my-list"}>
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
