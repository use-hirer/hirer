"use client";

import { Avatar, AvatarFallback, AvatarImage } from "../avatar";

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
    <div className="flex items-center gap-2">
      <Avatar className="h-8 w-8 bg-black">
        <AvatarImage src={avatarUrl} />
        <AvatarFallback>{fallbackInitials}</AvatarFallback>
      </Avatar>
      <div>
        <div className="text-sm font-medium">{name}</div>
        <div className="text-xs font-normal">{role}</div>
      </div>
    </div>
  );
};

export default NavUser;
