"use client";

// Use usePathname for catching route name.
import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import { Navbar } from "./NavBar";

export const LayoutProvider = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();
  const isAuthPages = pathname.includes("/auth");
  return (
    <>
      {!isAuthPages && <Navbar />}
      {children}
    </>
  );
};
