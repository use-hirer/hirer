"use client";
import { Badge } from "@hirer/ui/badge";
import { Separator } from "@hirer/ui/separator";
import { Icon } from "@phosphor-icons/react";
import {
  Briefcase,
  Calendar,
  ChatsCircle,
  House,
  Users,
  Webcam,
} from "@phosphor-icons/react/dist/ssr";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import FeatureModal from "./feature-modal";
import NavAction from "./nav-action";
import NavLink from "./nav-link";

function getSlug(urlPath: string): string | null {
  const regex = /^\/([^\/]+)(\/|$)/;
  const match = urlPath.match(regex);
  return match ? match[1] : null;
}

function removeSlug(str: string): string {
  const parts = str.split("/");
  if (parts.length > 2) {
    return "/" + parts.slice(2).join("/");
  }
  return str;
}

type LinkMenuItem = {
  title: string;
  icon: Icon;
  path: string;
  suffix?: React.ReactNode;
  type: "Link";
};

type ActionMenuItem = {
  title: string;
  icon: Icon;
  path: string;
  action: () => void;
  suffix?: React.ReactNode;
  type: "Action";
};

type SeparatorMenuItem = {
  type: "Separator";
};

type MenuItem = LinkMenuItem | SeparatorMenuItem | ActionMenuItem;

const TopMenuLayout: React.FC<{ collapsed: boolean }> = ({ collapsed }) => {
  const pathname = usePathname();
  const [interviewModal, setInterviewModal] = useState(false);

  const MenuLayout: MenuItem[] = [
    { title: "Home", icon: House, path: "/", type: "Link" },
    { title: "Activity", icon: Calendar, path: "/activity", type: "Link" },
    { type: "Separator" },
    { title: "Jobs", icon: Briefcase, path: "/jobs", type: "Link" },
    { title: "Candidates", icon: Users, path: "/candidates", type: "Link" },
    { type: "Separator" },
    {
      title: "Screeners",
      icon: Webcam,
      path: "/screeners",
      type: "Link",
      suffix: (
        <Badge variant="outline" className="ml-2 text-[10px]">
          Coming Soon
        </Badge>
      ),
    },
    {
      title: "Interviews",
      icon: ChatsCircle,
      path: "/interviews",
      action: () => {
        setInterviewModal(true);
      },
      suffix: (
        <Badge variant="outline" className="ml-2 text-[10px]">
          Coming Soon
        </Badge>
      ),
      type: "Action",
    },
  ];

  const slug = getSlug(pathname);

  function isSelected(path: string, slug: string | null) {
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
      {MenuLayout.map((item, index) => {
        switch (item.type) {
          case "Link":
            return (
              <NavLink
                key={index}
                icon={item.icon}
                label={item.title}
                href={`/${slug}${item.path}`}
                suffix={item.suffix}
                selected={isSelected(item.path, slug)}
                collapsed={collapsed}
              />
            );
          case "Action":
            return (
              <NavAction
                key={index}
                icon={item.icon}
                label={item.title}
                onClick={item.action}
                suffix={item.suffix}
                selected={isSelected(item.path, slug)}
                collapsed={collapsed}
              />
            );
          case "Separator":
            return <Separator className="my-2" key={index} />;
        }
      })}
      <FeatureModal open={interviewModal} setOpen={setInterviewModal} />
    </>
  );
};

export default TopMenuLayout;
