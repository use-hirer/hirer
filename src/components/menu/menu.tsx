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
import { usePathname } from "next/navigation";
import { Badge } from "../ui/badge";
import { Input } from "../ui/input";
import { Separator } from "../ui/separator";
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

const MenuLayout: MenuItem[] = [
  {
    title: "Home",
    icon: House,
    path: "/dashboard",
    type: "Link",
  },
  {
    title: "Activity",
    icon: Calendar,
    path: "/dashboard/activity",
    type: "Link",
  },
  {
    type: "Separator",
  },
  {
    title: "Jobs",
    icon: Briefcase,
    path: "/dashboard/jobs",
    type: "Link",
  },
  {
    title: "Candidates",
    icon: Users,
    path: "/dashboard/candidates",
    type: "Link",
  },
  {
    type: "Separator",
  },
  {
    title: "Question Pool",
    icon: SealQuestion,
    path: "/dashboard/question-pool",
    type: "Link",
  },
  {
    title: "Screeners",
    icon: Webcam,
    path: "/dashboard/screeners",
    type: "Link",
  },
  {
    title: "Interviews",
    icon: ChatsCircle,
    path: "/dashboard/interviews",
    suffix: (
      <Badge variant="outline" className="ml-2 text-[10px]">
        Coming Soon
      </Badge>
    ),
    type: "Link",
  },
];

const NavigationMenu: React.FC = () => {
  const pathname = usePathname();

  return (
    <div className="flex flex-shrink-0 flex-col justify-between min-h-[600px] h-full w-[250px] pt-5 px-3">
      <div>
        <div className="flex items-center">
          <div className="flex items-center justify-center w-7 h-7 bg-black text-white rounded-full text-md font-extrabold">
            <Sparkle />
          </div>
          <div className="font-bold text-xl ml-1">Hirer</div>
        </div>
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
      <div className="mb-3">
        <NavLink icon={Info} label="Help" href="/dashboard/help" />
        <NavLink
          icon={Gear}
          label="Settings"
          href="/dashboard/settings"
          selected={pathname === "/dashboard/settings"}
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
  );
};

export default NavigationMenu;
