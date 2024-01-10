"use server";

import { authOptions } from "@/lib/auth";
import { Sparkle } from "@phosphor-icons/react/dist/ssr";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { Separator } from "../ui/separator";
import BottomMenuLayout from "./bottom-layout";
import NavUser from "./nav-user";
import { TeamSelect } from "./team-select";
import TopMenuLayout from "./top-layout";

const NavigationMenu: React.FC<{ collapsed: boolean }> = async ({
  collapsed,
}) => {
  const session = await getServerSession(authOptions);

  return (
    <>
      <nav
        data-collapsed={collapsed}
        className="hidden lg:flex flex-shrink-0 flex-col top-0 left-0 justify-between h-screen fixed w-[250px] pt-5 px-3 overflow-y-auto scroll-bar data-[collapsed=true]:w-[60px]"
      >
        <div>
          <Link
            data-collapsed={collapsed}
            className="flex items-center data-[collapsed=true]:justify-center select-none"
            href="/"
          >
            <div className="flex items-center justify-center w-7 h-7 bg-black text-white rounded-full text-md font-extrabold">
              <Sparkle />
            </div>
            {!collapsed && <div className="font-bold text-xl ml-1">Hirer</div>}
          </Link>
          <Separator className="my-3" />
          {/* <Input className="bg-white h-8" placeholder="Search" /> */}
          {!collapsed && (
            <>
              <TeamSelect />
              <Separator className="my-3" />
            </>
          )}
          <TopMenuLayout collapsed={collapsed} />
        </div>
        <div className="mb-3 pt-10">
          <BottomMenuLayout collapsed={collapsed} />
          <Separator className="mt-2 mb-3" />
          <NavUser
            avatarUrl={session?.user?.image || ""}
            name={session?.user?.name as string}
            email={session?.user?.email as string}
            role="Admin"
            collapsed={collapsed}
          />
        </div>
      </nav>
    </>
  );
};

export default NavigationMenu;
