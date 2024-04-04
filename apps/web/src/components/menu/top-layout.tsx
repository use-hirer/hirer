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

function removeFirstPart(str: string): string {
  const index = str.indexOf("/");
  if (index !== -1) {
    return str.slice(index + 1);
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
    {
      title: "Home",
      icon: House,
      path: "/",
      type: "Link",
    },
    {
      title: "Activity",
      icon: Calendar,
      path: "/activity",
      type: "Link",
    },
    {
      type: "Separator",
    },
    {
      title: "Jobs",
      icon: Briefcase,
      path: "/jobs",
      type: "Link",
    },
    {
      title: "Candidates",
      icon: Users,
      path: "/candidates",
      type: "Link",
    },
    {
      type: "Separator",
    },
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

  const isSelected = (path: string) => {
    const modifiedPath = removeFirstPart(path);
    if (modifiedPath === "/") {
      return pathname === "/";
    } else {
      return pathname.startsWith(modifiedPath);
    }
  };

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
                href={item.path}
                suffix={item.suffix}
                selected={isSelected(item.path)} // Update this line
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
                selected={isSelected(item.path)}
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
