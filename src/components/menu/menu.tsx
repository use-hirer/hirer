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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";
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

interface FeatureProps {
  icon: string;
  title: string;
  description: string;
}

const Feature: React.FC<FeatureProps> = ({ icon, title, description }) => {
  return (
    <div className="flex items-start space-x-3">
      <div className="text-xl">{icon}</div>
      <div>
        <h3 className="text-md font-semibold">{title}</h3>
        <p className="text-xs text-gray-600">{description}</p>
      </div>
    </div>
  );
};

const NavigationMenu: React.FC = () => {
  const pathname = usePathname();
  const [interviewModal, setInterviewModal] = useState(false);

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
      <div className="flex flex-shrink-0 flex-col justify-between min-h-[600px] h-full w-[250px] pt-5 px-3">
        <div>
          <Link className="flex items-center select-none" href={"/dashboard"}>
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
      <AlertDialog
        open={interviewModal}
        onOpenChange={(open) => setInterviewModal(open)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Elevate Your Hiring Experience!</AlertDialogTitle>
            <div className="text-zinc-700 text-sm">
              Get ready to revolutionize your interview process with Hirer
              interviews. This innovative tool brings the power of AI directly
              into your hiring sessions, ensuring a more efficient and
              insightful experience.
            </div>
            <div className="py-3 flex gap-3 flex-col">
              <Feature
                icon="📝"
                title="AI-Driven Note-Taking"
                description="Never miss a detail! Our AI system meticulously captures key points from each interview, allowing you to focus fully on the candidate."
              />
              <Feature
                icon="🤔"
                title="Smart Question Suggestions"
                description="Unsure what to ask next? Let AI assist you with context-relevant, tailored questions that delve deeper into candidates' skills and potential."
              />
              <Feature
                icon="🛡️"
                title="Bias-Reduced Assessments"
                description="Our sophisticated algorithms help mitigate unconscious biases, promoting a fair and inclusive evaluation process."
              />
            </div>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction>Close</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default NavigationMenu;
