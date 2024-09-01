import { updateSession } from "@/utils/supabase/middleware";
import { NextResponse, type NextRequest } from "next/server";
import {
  authRoutes,
  DEFAULT_LOGIN_REDIRECT,
  publicRoutes,
  Route,
} from "./routes";
import { createClient } from "./utils/supabase/server";

export async function middleware(request: NextRequest) {
  const { nextUrl } = request;

  const supabase = createClient();

  const { data } = await supabase.auth.getUser();
  const isLoggedIn = !!data.user;

  // Type-safe check for public routes
  const isPublicRoute = publicRoutes.some((route: Route) => {
    if (typeof route === "string") {
      return nextUrl.pathname === route;
    }
    // If it's a RegExp, test it against the pathname
    return route instanceof RegExp && route.test(nextUrl.pathname);
  });

  // Type-safe check for auth routes
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  if (isAuthRoute) {
    if (isLoggedIn) {
      return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return NextResponse.next();
  }

  if (!isLoggedIn && !isPublicRoute) {
    return NextResponse.redirect(new URL("/auth/login", nextUrl));
  }

  return await updateSession(request);
}

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/home(.*)", "/(api|trpc)(.*)"],
};
