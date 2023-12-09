"use client";

import { Gear, Info } from "@phosphor-icons/react";
import { usePathname } from "next/navigation";
import React from "react";
import NavLink from "./nav-link";

const BottomMenuLayout: React.FC = () => {
  const pathname = usePathname();

  return (
    <>
      <NavLink
        icon={Info}
        label="Help"
        href="/settings"
        selected={pathname === "/help"}
      />
      <NavLink
        icon={Gear}
        label="Settings"
        href="/settings"
        selected={pathname === "/settings"}
      />
    </>
  );
};

export default BottomMenuLayout;
