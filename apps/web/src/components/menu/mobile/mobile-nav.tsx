"use client";

import HirerIcon from "@/components/icons/hirer-icon";
import HirerLogo from "@/components/icons/hirer-logo";
import { Separator } from "@hirer/ui/separator";
import { Sheet, SheetContent } from "@hirer/ui/sheet";
import { List } from "@phosphor-icons/react";
import { useState } from "react";
import TopMenuLayout from "../top-layout";

export default function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <div className="lg:hidden flex items-center min-h-12 gap-2 bg-zinc-50">
      <div
        className="bg-black h-full flex items-center justify-center w-12 cursor-pointer hover:bg-zinc-800"
        onClick={() => setOpen(true)}
      >
        <List weight="bold" size={20} color="white" />
      </div>
      <div className="font-bold">
        <HirerLogo width={80} />
      </div>
      <Sheet open={open} onOpenChange={() => setOpen(!open)}>
        <SheetContent side={"left"} className="bg-zinc-50">
          <div className="flex items-center data-[collapsed=true]:justify-center select-none cursor-pointer">
            <HirerIcon width={30} />
          </div>
          <Separator className="my-3" />
          <TopMenuLayout collapsed={false} />
        </SheetContent>
      </Sheet>
    </div>
  );
}
