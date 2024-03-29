"use client";

import { useCollapse } from "@/context/collapse-context";
import { CaretLeft } from "@phosphor-icons/react";
import React from "react";

interface NavCollapseButtonProps {}

const NavCollapseButton: React.FC<NavCollapseButtonProps> = () => {
  const { isCollapsed, toggleCollapse } = useCollapse();

  return (
    <div
      className="absolute hidden lg:ml-[242px] w-5 h-5 lg:flex items-center justify-center bg-neutral-100 rounded-full mt-[50px] cursor-pointer shadow-md border-neutral-200 border"
      onClick={() => toggleCollapse()}
    >
      <CaretLeft color="black" size={12} />
    </div>
  );
};

export default NavCollapseButton;
