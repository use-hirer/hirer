"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Briefcase,
  Calendar,
  ChatsCircle,
  Gear,
  House,
  Info,
  SealQuestion,
  Sparkle,
  Users,
  Webcam,
} from "@phosphor-icons/react";

export default function DashboardPage() {
  return (
    <>
      <div className="h-screen w-full bg-zinc-50 flex">
        <div className="flex flex-col justify-between h-full w-[250px] pt-5 px-3">
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
            <div>
              <div className="flex items-center px-2 py-2 hover:bg-zinc-300/30 rounded-md cursor-pointer">
                <House className="h-4" />
                <div className="pl-2 text-sm font-medium">Home</div>
              </div>
              <div className="flex items-center px-2 py-2 hover:bg-zinc-300/30 rounded-md cursor-pointer">
                <Calendar className="h-4" />
                <div className="pl-2 text-sm font-medium">Activity</div>
              </div>
            </div>
            <Separator className="my-2" />
            <div className="flex items-center px-2 py-2 hover:bg-zinc-300/30 rounded-md cursor-pointer">
              <Briefcase className="h-4" />
              <div className="pl-2 text-sm font-medium">Jobs</div>
            </div>
            <div className="flex items-center px-2 py-2 hover:bg-zinc-300/30 rounded-md cursor-pointer">
              <Users className="h-4" />
              <div className="pl-2 text-sm font-medium">Candidates</div>
            </div>
            <Separator className="my-2" />
            <div className="flex items-center px-2 py-2 hover:bg-zinc-300/30 rounded-md cursor-pointer">
              <SealQuestion className="h-4" />
              <div className="pl-2 text-sm font-medium">Question Pool</div>
            </div>
            <div className="flex items-center px-2 py-2 hover:bg-zinc-300/30 rounded-md cursor-pointer">
              <Webcam className="h-4" />
              <div className="pl-2 text-sm font-medium">Screeners</div>
            </div>
            <div className="flex items-center px-2 py-2 hover:bg-zinc-300/30 rounded-md cursor-pointer">
              <ChatsCircle className="h-4" />
              <div className="pl-2 text-sm font-medium">Interviews</div>
              <Badge variant="outline" className="ml-2 text-[10px]">
                Coming Soon
              </Badge>
            </div>
          </div>
          <div className="mb-3">
            <div className="flex items-center px-2 py-2 hover:bg-zinc-300/30 rounded-md cursor-pointer">
              <Info className="h-4 w-4" />
              <div className="pl-2 text-sm font-medium">Help</div>
            </div>
            <div className="flex items-center px-2 py-2 hover:bg-zinc-300/30 rounded-md cursor-pointer">
              <Gear className="h-4 w-4" />
              <div className="pl-2 text-sm font-medium">Settings</div>
            </div>
            <Separator className="mt-2 mb-3" />
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8 bg-black">
                <AvatarImage src="https://github.com/NickMandylas.png" />
                <AvatarFallback>NM</AvatarFallback>
              </Avatar>
              <div>
                <div className="text-sm font-medium">Nick Mandylas</div>
                <div className="text-xs font-normal">Admin</div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-auto bg-white mt-3 rounded-tl-2xl shadow-sm border-zinc-950/5 border"></div>
      </div>
    </>
  );
}
