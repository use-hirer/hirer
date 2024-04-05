"use client";

import { Gear, Info } from "@phosphor-icons/react";
import { useParams, usePathname } from "next/navigation";
import React from "react";
import NavLink from "./nav-link";

function removeSlug(str: string): string {
  const parts = str.split("/");
  if (parts.length > 2) {
    return "/" + parts.slice(2).join("/");
  }
  return str;
}

const BottomMenuLayout: React.FC<{ collapsed: boolean }> = ({ collapsed }) => {
  const pathname = usePathname();
  const { slug } = useParams() as { slug?: string };

  function isSelected(path: string, slug: string | undefined) {
    const modifiedPath = removeSlug(path);
    const modifiedPathname = removeSlug(pathname);

    if (modifiedPath === "/") {
      return modifiedPathname === "/" || modifiedPathname === `/${slug}`;
    } else {
      return modifiedPathname.startsWith(modifiedPath);
    }
  }

  return (
    <>
      <NavLink
        icon={Info}
        label="Help"
        href={`/${slug}/settings`}
        selected={isSelected("/help", slug)}
        collapsed={collapsed}
      />
      <NavLink
        icon={Gear}
        label="Settings"
        href={`/${slug}/settings`}
        selected={isSelected("/settings", slug)}
        collapsed={collapsed}
      />
    </>
  );
};

export default BottomMenuLayout;
