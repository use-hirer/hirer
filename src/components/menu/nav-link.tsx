"use client";

import { cn } from "@/lib/utils";
import { IconProps } from "@phosphor-icons/react";
import Link from "next/link";

interface NavLinkProps {
  icon: React.ElementType<IconProps>;
  label: string;
  suffix?: React.ReactNode;
  selected?: boolean;
  href: string;
}

const NavLink: React.FC<NavLinkProps> = ({
  icon: Icon,
  label,
  suffix,
  selected = false,
  href,
}) => {
  return (
    <Link
      className={cn([
        "flex items-center px-2 py-2 rounded-md cursor-pointer",
        selected && "bg-black",
        !selected && "hover:bg-zinc-300/30",
      ])}
      href={href}
    >
      <Icon className="h-4 w-4" color={selected ? "white" : "black"} />
      <div
        className={cn(["pl-2 text-sm font-medium", selected && "text-white"])}
      >
        {label}
      </div>
      {suffix}
    </Link>
  );
};

export default NavLink;
