"use client";

import { CaretUpDown, CreditCard, Gear, User } from "@phosphor-icons/react";
import { signOut } from "next-auth/react";
import Image from "next/image";
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
  email: string;
  avatarUrl: string;
}

const NavUser: React.FC<NavUserProps> = ({ name, role, email, avatarUrl }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="outline-none min-w-full">
        <div className="flex items-center gap-2 text-left">
          {avatarUrl ? (
            <Image
              src={avatarUrl}
              height={32}
              width={32}
              alt="Avatar Image"
              className="rounded-full"
            />
          ) : (
            <Image
              src={"/user-image-default.png"}
              height={32}
              width={32}
              alt="Avatar Image"
              className="rounded-full"
            />
          )}
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
          <div className="text-xs font-normal">{email}</div>
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
        <DropdownMenuItem onClick={async () => await signOut()}>
          Log Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NavUser;
