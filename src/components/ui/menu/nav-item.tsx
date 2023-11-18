"use client";

import { IconProps } from "@phosphor-icons/react";

interface NavItemProps {
  icon: React.ElementType<IconProps>;
  label: string;
  suffix?: React.ReactNode;
  onClick?: () => void;
}

const NavItem: React.FC<NavItemProps> = ({
  icon: Icon,
  label,
  onClick,
  suffix,
}) => {
  return (
    <div
      className="flex items-center px-2 py-2 hover:bg-zinc-300/30 rounded-md cursor-pointer"
      onClick={onClick}
    >
      <Icon className="h-4 w-4" />
      <div className="pl-2 text-sm font-medium">{label}</div>
      {suffix}
    </div>
  );
};

export default NavItem;
