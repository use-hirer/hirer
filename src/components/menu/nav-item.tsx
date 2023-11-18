"use client";

import { cn } from "@/lib/utils";
import { IconProps } from "@phosphor-icons/react";

interface NavItemProps {
  icon: React.ElementType<IconProps>;
  label: string;
  suffix?: React.ReactNode;
  onClick?: () => void;
  selected?: boolean;
}

const NavItem: React.FC<NavItemProps> = ({
  icon: Icon,
  label,
  onClick,
  suffix,
  selected = false,
}) => {
  return (
    <div
      className={cn([
        "flex items-center px-2 py-2 rounded-md cursor-pointer",
        selected && "bg-black",
        !selected && "hover:bg-zinc-300/30",
      ])}
      onClick={onClick}
    >
      <Icon className="h-4 w-4" color={selected ? "white" : "black"} />
      <div
        className={cn(["pl-2 text-sm font-medium", selected && "text-white"])}
      >
        {label}
      </div>
      {suffix}
    </div>
  );
};

export default NavItem;
