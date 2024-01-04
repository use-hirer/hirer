"use client";

import KPICard from "@/components/dashboard/kpi-card";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ArrowRight, List } from "@phosphor-icons/react/dist/ssr";
// import { Metadata } from "next";
import { signOut } from "next-auth/react";
import Link from "next/link";

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
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2">
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
          <div className="mt-4">
            <div className="flex gap-2 items-center">
              <div className="font-bold text-xl">Jobs</div>
              <Link
                href={"/jobs"}
                className="flex items-center font-light text-xs text-neutral-700 gap-1"
              >
                <div>view all jobs</div>
                <ArrowRight />
              </Link>
            </div>
            <div className="bg-gray-100/50 text-gray-600 border rounded-sm mt-2">
              <Table>
                <TableHeader className="text-gray-600">
                  <TableRow className="w-full border-none ">
                    <TableHead>Job Title</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Hiring Manager</TableHead>
                  </TableRow>
                </TableHeader>
              </Table>
            </div>
            <div className="mt-2 border rounded-sm">
              <Table>
                <TableBody className="text-gray-600">
                  <TableRow className="w-full border-none">
                    <TableCell className="font-bold text-black">
                      Senior Product Designer
                    </TableCell>
                    <TableHead>Status</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Hiring Manager</TableHead>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </div>
          <div className="mt-4">
            <div className="flex gap-2 items-center">
              <div className="font-bold text-xl">Candidates</div>
              <Link
                href={"/candidates"}
                className="flex items-center font-light text-xs text-neutral-700 gap-1"
              >
                <div>view all candidates</div>
                <ArrowRight />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
