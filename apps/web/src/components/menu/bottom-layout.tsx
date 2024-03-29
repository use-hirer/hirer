"use client";

import { Gear, Info } from "@phosphor-icons/react";
import { usePathname } from "next/navigation";
import React from "react";
import NavLink from "./nav-link";

const BottomMenuLayout: React.FC<{ collapsed: boolean }> = ({ collapsed }) => {
  const pathname = usePathname();

  return (
    <>
      <NavLink
        icon={Info}
        label="Help"
        href="/settings"
        selected={pathname === "/help"}
        collapsed={collapsed}
      />
      <NavLink
        icon={Gear}
        label="Settings"
        href="/settings"
        selected={pathname === "/settings"}
        collapsed={collapsed}
      />
    </>
  );
};

export default BottomMenuLayout;
