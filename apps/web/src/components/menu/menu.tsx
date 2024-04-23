"use client";

import { useCollapse } from "@/context/collapse-context";
import type { User } from "@hirer/auth/lucia";
import { Separator } from "@hirer/ui/separator";
import HirerIcon from "../icons/hirer-icon";
import HirerLogo from "../icons/hirer-logo";
import BottomMenuLayout from "./bottom-layout";
import NavUser from "./nav-user";
import TeamSwitcher from "./team-select";
import TopMenuLayout from "./top-layout";

const NavigationMenu: React.FC<{
  userSession: User;
}> = ({ userSession }) => {
  const { isCollapsed, toggleCollapse } = useCollapse();

  return (
    <>
      <nav
        data-collapsed={isCollapsed}
        className="hidden lg:flex flex-shrink-0 flex-col top-0 left-0 justify-between h-screen fixed w-[250px] pt-5 px-3 overflow-y-auto scroll-bar data-[collapsed=true]:w-[60px]"
      >
        <div>
          <div
            data-collapsed={isCollapsed}
            className="flex items-center data-[collapsed=true]:justify-center select-none cursor-pointer"
            onClick={toggleCollapse}
          >
            {isCollapsed && <HirerIcon width={30} />}
            {!isCollapsed && <HirerLogo width={80} />}
          </div>
          <Separator className="my-3" />
          {/* <Input className="bg-white h-8" placeholder="Search" /> */}
          {!isCollapsed && (
            <>
              <TeamSwitcher />
              <Separator className="my-3" />
            </>
          )}
          <TopMenuLayout collapsed={isCollapsed} />
        </div>
        <div className="mb-3 pt-10">
          <BottomMenuLayout collapsed={isCollapsed} />
          <Separator className="mt-2 mb-3" />
          <NavUser
            avatarUrl={userSession?.image || ""}
            name={userSession?.name}
            email={userSession?.email}
            role="Admin"
            collapsed={isCollapsed}
          />
        </div>
      </nav>
    </>
  );
};

export default NavigationMenu;
