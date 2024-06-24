"use client";
import { Separator } from "@hirer/ui/separator";
import { Icon } from "@phosphor-icons/react";
import {
  Briefcase,
  Calendar,
  House,
  Users,
} from "@phosphor-icons/react/dist/ssr";
import { useParams, usePathname } from "next/navigation";
import React, { useState } from "react";
import InterviewFeatureModal from "./interview-feature-modal";
import NavLink from "./nav-link";
import ScreenerFeatureModal from "./screener-feature-modal";

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

const MobileMenuLayout: React.FC<{}> = ({}) => {
  const pathname = usePathname();
  const [interviewModal, setInterviewModal] = useState(false);
  const [screenerModal, setScreenerModal] = useState(false);

  const MenuLayout: MenuItem[] = [
    { title: "Home", icon: House, path: "/", type: "Link" },
    { title: "Activity", icon: Calendar, path: "/activity", type: "Link" },
    { type: "Separator" },
    { title: "Jobs", icon: Briefcase, path: "/jobs", type: "Link" },
    { title: "Candidates", icon: Users, path: "/candidates", type: "Link" },
  ];

  const { slug } = useParams() as { slug?: string };

  function isSelected(path: string, slug: string | undefined) {
    const modifiedPath = removeSlug(path);
    const modifiedPathname = removeSlug(pathname);

    if (modifiedPath === "/") {
      return modifiedPathname === "/" || modifiedPathname === `/${slug}`;
    } else if (modifiedPath === "/jobs") {
      return (
        modifiedPathname.startsWith("/jobs") ||
        modifiedPathname.startsWith("/job")
      );
    } else if (modifiedPath === "/candidates") {
      return (
        modifiedPathname.startsWith("/candidates") ||
        modifiedPathname.startsWith("/candidate")
      );
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
              />
            );
          case "Separator":
            return <Separator className="my-2" key={index} />;
        }
      })}
      <ScreenerFeatureModal open={screenerModal} setOpen={setScreenerModal} />
      <InterviewFeatureModal
        open={interviewModal}
        setOpen={setInterviewModal}
      />
    </>
  );
};

export default MobileMenuLayout;
