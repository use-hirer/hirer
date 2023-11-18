"use client";

import { CaretUpDown, CreditCard, Gear, User } from "@phosphor-icons/react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

interface NavUserProps {
  name: string;
  role: string;
  avatarUrl: string;
  fallbackInitials: string;
}

const NavUser: React.FC<NavUserProps> = ({
  name,
  role,
  avatarUrl,
  fallbackInitials,
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="outline-none min-w-full">
        <div className="flex items-center gap-2 text-left">
          <Avatar className="h-8 w-8 bg-black">
            <AvatarImage src={avatarUrl} />
            <AvatarFallback>{fallbackInitials}</AvatarFallback>
          </Avatar>
          <div>
            <div className="text-sm font-medium">{name}</div>
            <div className="text-xs font-normal">{role}</div>
          </div>
          <CaretUpDown className="ml-auto" size={20} />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent side="top" align="end">
        <DropdownMenuLabel>
          <div className="text-sm font-medium">{name}</div>
          <div className="text-xs font-normal">nickmandylas@gmail.com</div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          Profile
          <User className="ml-auto" />
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          Settings
          <Gear className="ml-auto" />
        </DropdownMenuItem>
        <DropdownMenuItem>
          Billing
          <CreditCard className="ml-auto" />
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Log Out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NavUser;
