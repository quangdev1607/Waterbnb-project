/**
 * An array of routes that are accessible to the public
 * These routes do not require authentication
 * @type {string[]}
 */
export const publicRoutes = ["/"];
/**
 * An array of routes that are used for authentication
 * These routes will redirect loggedIn user to /app/inbox
 * @type {string[]}
 */
export const authRoutes = [
  "/auth/login",
  "/auth/register",
  "/auth/error",
  "/auth/callback",
];

/**
 * The default redirect path when user login
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/";
