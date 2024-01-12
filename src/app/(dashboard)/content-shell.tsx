"use client";

import { useCollapse } from "@/context/CollapseContext";
import React from "react";

interface ContentShellProps {
  children: React.ReactNode;
}

const ContentShell: React.FC<ContentShellProps> = ({ children }) => {
  const { isCollapsed } = useCollapse();

  return (
    <div
      data-collapsed={isCollapsed}
      className="overflow-y-scroll flex-auto bg-white mt-[7px] lg:rounded-tl-2xl shadow-sm border-zinc-950/5 border p-4 lg:ml-[250px] lg:data-[collapsed=true]:ml-[60px]"
    >
      {children}
    </div>
  );
};

export default ContentShell;
