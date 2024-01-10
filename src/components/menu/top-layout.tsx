"use client";

import { Icon } from "@phosphor-icons/react";
import {
  Briefcase,
  Calendar,
  ChatsCircle,
  House,
  SealQuestion,
  Users,
  Webcam,
} from "@phosphor-icons/react/dist/ssr";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";
import FeatureModal from "./feature-modal";
import NavAction from "./nav-action";
import NavLink from "./nav-link";

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

const TopMenuLayout: React.FC = () => {
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
      title: "Question Pool",
      icon: SealQuestion,
      path: "/question-pool",
      type: "Link",
    },
    {
      title: "Screeners",
      icon: Webcam,
      path: "/screeners",
      type: "Link",
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
                selected={pathname === item.path}
                collapsed={false}
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
                selected={pathname === item.path}
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
