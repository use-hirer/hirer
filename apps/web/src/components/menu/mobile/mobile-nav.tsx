"use client";

import { logout } from "@/actions/logout";
import HirerLogo from "@/components/icons/hirer-logo";
import { useCollapse } from "@/context/collapse-context";
import { Button } from "@hirer/ui/button";
import { Separator } from "@hirer/ui/separator";
import { Sheet, SheetContent } from "@hirer/ui/sheet";
import { CircleNotch, List, SignOut } from "@phosphor-icons/react";
import { useState } from "react";
import MobileMenuLayout from "../mobile-layout";

export default function MobileNav() {
  const { isMobileMenuOpen, toggleMobileMenu } = useCollapse();
  const [loading, setLoading] = useState(false);

  return (
    <div className="lg:hidden flex items-center min-h-12 gap-2 bg-zinc-50">
      <div
        className="bg-black h-full flex items-center justify-center w-12 cursor-pointer hover:bg-zinc-800"
        onClick={() => toggleMobileMenu()}
      >
        <List weight="bold" size={20} color="white" />
      </div>
      <div className="font-bold">
        <HirerLogo width={80} />
      </div>
      <Sheet open={isMobileMenuOpen} onOpenChange={() => toggleMobileMenu()}>
        <SheetContent side={"left"} className="bg-zinc-50">
          <div className="flex flex-col h-full">
            <div className="flex items-center data-[collapsed=true]:justify-center select-none cursor-pointer">
              <HirerLogo width={80} />
            </div>
            <Separator className="my-3" />
            <div className="flex-grow">
              <MobileMenuLayout />
            </div>
            <div className="flex justify-center mb-4">
              <Button
                className="w-full"
                disabled={loading}
                onClick={async () => {
                  setLoading(true);
                  await logout();
                }}
              >
                Sign Out{" "}
                {loading ? (
                  <CircleNotch className="ml-2 animate-spin" />
                ) : (
                  <SignOut className="ml-2" />
                )}
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
