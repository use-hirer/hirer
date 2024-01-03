"use client";

import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { List } from "@phosphor-icons/react/dist/ssr";
// import { Metadata } from "next";
import { signOut } from "next-auth/react";

// export const metadata: Metadata = {
//   title: "Hirer: Dashboard",
// };

export default function DashboardPage() {
  return (
    <>
      <div className="flex items-center gap-2">
        <button
          className="bg-zinc-100 rounded-full p-2 md:hidden"
          onClick={() => signOut()}
        >
          <List weight="bold" size={20} />
        </button>
        <div className="w-full">
          <div className="font-extrabold text-xl">Dashboard</div>
          <Separator className="mt-2 mb-4" />
          <div className="grid grid-cols-4 gap-4">
            <Card className="shadow-none rounded p-4 border-neutral-200">
              <div className="font-bold text-sm">Vistors last 30 days</div>
              <div className="text-xs font-light text-zinc-500">
                Last 4 weeks
              </div>
              <div className="text-3xl font-extrabold pt-2">3277</div>
            </Card>
            <Card className="shadow-none rounded p-4 border-neutral-200">
              2
            </Card>
            <Card className="shadow-none rounded p-4 border-neutral-200">
              3
            </Card>
            <Card className="shadow-none rounded p-4 border-neutral-200">
              4
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
