"use client";

import { cn } from "@hirer/ui";
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
      <div
        className={cn([
          "p-4 border border-orange-300 rounded-md bg-orange-100 mb-3 text-xs",
          collapsed && "hidden",
        ])}
      >
        Hirer is in Alpha. We&apos;re actively working on improving the
        experience. If you have any feedback, please reach out to us on{" "}
        <a
          href="https://cal.com/hirer/feedback"
          target="_blank"
          className="text-blue-500 underline"
        >
          Cal.com
        </a>
        .
      </div>
      <NavLink
        icon={Info}
        label="Help"
        href={`/${slug}/help`}
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
