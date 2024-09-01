/**
 * Defines the structure for a route
 * It can be either a string for exact matches or a RegExp for pattern matching
 */
export type Route = string | RegExp;

/**
 * An array of routes that are accessible to the public
 * These routes do not require authentication
 */
export const publicRoutes: Route[] = [
  "/",
  /^\/home(\/.*)?$/, // This will match "/home" and any path starting with "/home/"
];

/**
 * An array of routes that are used for authentication
 * These routes will redirect logged-in users to DEFAULT_LOGIN_REDIRECT
 */
export const authRoutes: string[] = [
  "/auth/login",
  "/auth/register",
  "/auth/error",
  "/auth/callback",
];

/**
 * The default redirect path when a user logs in
 */
export const DEFAULT_LOGIN_REDIRECT = "/";
