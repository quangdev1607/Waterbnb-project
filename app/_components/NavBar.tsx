import desktopLogo from "@/public/desktop-waterbnb-logo.png";
import mobileLogo from "@/public/mobilewaterbnblogo.png";
import Image from "next/image";
import Link from "next/link";
import { UserNav } from "./UserNav";

export function Navbar() {
  return (
    <div className=" container mx-auto mt-2 flex items-center justify-between px-5 lg:px-10">
      <Link href={"/"}>
        <Image
          src={desktopLogo}
          alt="logo"
          className="hidden w-[200px] lg:block"
        />
        <Image src={mobileLogo} alt="logo" className="block w-20 lg:hidden" />
      </Link>
      <div className=" hidden rounded-full border px-5 py-2 lg:block">
        <span>Search box coming soon...</span>
      </div>
      <UserNav />
    </div>
  );
}
