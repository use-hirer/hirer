"use client";

import {
  Briefcase,
  Calendar,
  ChatsCircle,
  Gear,
  House,
  Icon,
  Info,
  SealQuestion,
  Sparkle,
  Users,
  Webcam,
} from "@phosphor-icons/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Badge } from "../ui/badge";
import { Input } from "../ui/input";
import { Separator } from "../ui/separator";
import FeatureModal from "./feature-modal";
import NavAction from "./nav-action";
import NavLink from "./nav-link";
import NavUser from "./nav-user";

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

const NavigationMenu: React.FC = () => {
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
      <div className="hidden md:flex flex-shrink-0 flex-col top-0 left-0 justify-between h-screen fixed w-[250px] pt-5 px-3 overflow-y-auto">
        <div>
          <Link className="flex items-center select-none" href="/">
            <div className="flex items-center justify-center w-7 h-7 bg-black text-white rounded-full text-md font-extrabold">
              <Sparkle />
            </div>
            <div className="font-bold text-xl ml-1">Hirer</div>
          </Link>
          <Separator className="my-3" />
          <Input className="bg-white h-8" placeholder="Search" />
          <Separator className="my-3" />
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
        </div>
        <div className="mb-3 pt-10">
          <NavLink icon={Info} label="Help" href="/settings" />
          <NavLink
            icon={Gear}
            label="Settings"
            href="/settings"
            selected={pathname === "/settings"}
          />
          <Separator className="mt-2 mb-3" />
          <NavUser
            avatarUrl="https://github.com/NickMandylas.png"
            name="Nick Mandylas"
            role="Admin"
            fallbackInitials="NM"
          />
        </div>
      </div>
      <FeatureModal open={interviewModal} setOpen={setInterviewModal} />
    </>
  );
};

export default NavigationMenu;
