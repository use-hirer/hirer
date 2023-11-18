"use client";

import NavItem from "@/components/menu/nav-item";
import NavUser from "@/components/menu/nav-user";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();

  return (
    <>
      <div className="h-screen w-full bg-zinc-50 flex">
        <div className="flex flex-col justify-between min-h-[600px] h-full w-[250px] pt-5 px-3">
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
            <NavItem
              icon={House}
              label="Home"
              onClick={() => router.push("dashboard")}
              selected={true}
            />
            <NavItem
              icon={Calendar}
              label="Activity"
              onClick={() => router.push("activity")}
            />
            <Separator className="my-2" />
            <NavItem
              icon={Briefcase}
              label="Jobs"
              onClick={() => router.push("jobs")}
            />
            <NavItem
              icon={Users}
              label="Candidates"
              onClick={() => router.push("candidates")}
            />
            <Separator className="my-2" />
            <NavItem
              icon={SealQuestion}
              label="Question Pool"
              onClick={() => router.push("question-pool")}
            />
            <NavItem
              icon={Webcam}
              label="Screeners"
              onClick={() => router.push("screeners")}
            />
            <NavItem
              icon={ChatsCircle}
              label="Interviews"
              onClick={() => router.push("interviews")}
              suffix={
                <Badge variant="outline" className="ml-2 text-[10px]">
                  Coming Soon
                </Badge>
              }
            />
          </div>
          <div className="mb-3">
            <NavItem
              icon={Info}
              label="Help"
              onClick={() => router.push("help")}
            />
            <NavItem
              icon={Gear}
              label="Settings"
              onClick={() => router.push("settings")}
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
        <div className="flex-auto bg-white mt-3 rounded-tl-2xl shadow-sm border-zinc-950/5 border p-4">
          <div className="font-extrabold text-xl">Home</div>
          <div className="flex items-center justify-between shadow-sm border-green-500/25 border rounded-md p-3 mt-2 bg-green-50">
            <div>
              <div className="font-bold ">Welcome to Hirer!</div>
              <div className="font-light mt-1">
                Hirer is your go-to AI assistant for managing your
                business&apos;s job postings, candidates and interviews.
              </div>
              <div className="font-light">
                Get started by adding your first job for hire.
              </div>
            </div>
            <Button
              variant="default"
              className="bg-green-900 hover:bg-green-800"
            >
              Create Job
              <Briefcase className="ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
