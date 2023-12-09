"use server";

import { Gear, Info, Sparkle } from "@phosphor-icons/react/dist/ssr";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { Input } from "../ui/input";
import { Separator } from "../ui/separator";
import MenuLayout from "./layout";
import NavLink from "./nav-link";
import NavUser from "./nav-user";

const NavigationMenu: React.FC = async () => {
  const session = await getServerSession();

  return (
    <>
      <div className="hidden md:flex flex-shrink-0 flex-col top-0 left-0 justify-between h-screen fixed w-[250px] pt-5 px-3 overflow-y-auto scroll-bar">
        <div>
          <Link className="flex items-center select-none" href="/">
            <div className="flex items-center justify-center w-7 h-7 bg-black text-white rounded-full text-md font-extrabold">
              <Sparkle />
            </div>
            <div className="font-bold text-xl ml-1">Hirer</div>
          </Link>
          <Separator className="my-3" />
          <Input className="bg-white h-8" placeholder="Search" />
          <Separator className="my-3" />
          <MenuLayout />
        </div>
        <div className="mb-3 pt-10">
          <NavLink icon={Info} label="Help" href="/settings" />
          <NavLink
            icon={Gear}
            label="Settings"
            href="/settings"
            selected={"/settings" === "/settings"}
          />
          <Separator className="mt-2 mb-3" />
          <NavUser
            avatarUrl={session?.user?.image || ""}
            name={session?.user?.name as string}
            role="Admin"
            fallbackInitials="NM"
          />
        </div>
      </div>
    </>
  );
};

export default NavigationMenu;
