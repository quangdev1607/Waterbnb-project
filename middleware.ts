import { updateSession } from "@/utils/supabase/middleware";
import { NextResponse, type NextRequest } from "next/server";
import { DEFAULT_LOGIN_REDIRECT, authRoutes, publicRoutes } from "./routes";
import { createClient } from "./utils/supabase/server";

export async function middleware(request: NextRequest) {
  const { nextUrl } = request;

  const supabase = createClient();

  const { data } = await supabase.auth.getUser();
  const isLoggedIn = !!data.user;
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return NextResponse.next();
  }
  if (!isLoggedIn && !isPublicRoute) {
    return Response.redirect(new URL("/auth/login", nextUrl));
  }

  return await updateSession(request);
}

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
