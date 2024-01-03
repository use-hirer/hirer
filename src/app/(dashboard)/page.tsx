"use client";

import KPICard from "@/components/dashboard/kpi-card";
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
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <KPICard
              increase="positive"
              percentageChange={3.7}
              value="3277"
              timePeriod="Last 4 weeks"
              title="Vistors"
              deltaType="moderateIncrease"
            />
            <KPICard
              increase="negative"
              percentageChange={1.8}
              value="52"
              timePeriod="Last 4 weeks"
              title="Applications"
              deltaType="moderateIncrease"
            />
            <KPICard
              increase="positive"
              percentageChange={12.8}
              value="41"
              timePeriod="Last 4 weeks"
              title="Active Applications"
              deltaType="increase"
            />
            <KPICard
              increase="positive"
              percentageChange={0}
              value="89"
              timePeriod="Last 4 weeks"
              title="Total Followers"
              deltaType="unchanged"
            />
          </div>
        </div>
      </div>
    </>
  );
}
