import { hostname } from "os";

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "a0.muscache.com",
        protocol: "https",
        port: "",
      },
      {
        hostname: "nkjoctfetwapsohrvzxv.supabase.co",
        protocol: "https",
        port: "",
      },
      {
        hostname: "i.imgur.com",
        protocol: "https",
        port: "",
      },
      {
        hostname: "github.com",
        protocol: "https",
        port: "",
      },
      {
        hostname: "avatars.githubusercontent.com",
        protocol: "https",
        port: "",
      },
    ],
  },
};

export default nextConfig;
