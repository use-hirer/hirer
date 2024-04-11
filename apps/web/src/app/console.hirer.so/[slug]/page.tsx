import { authCheck } from "@/actions/auth";
import CandidatesTable from "@/components/dashboard/candidates-table";
import KPICard from "@/components/dashboard/kpi-card";
import { JobsTable } from "@/components/tables/jobs-table";
import { Button } from "@hirer/ui/button";
import { Card } from "@hirer/ui/card";
import { Separator } from "@hirer/ui/separator";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { LineChart } from "@tremor/react";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Hirer: Dashboard",
};

export default async function DashboardPage() {
  await authCheck();

  return (
    <>
      <div className="flex items-center gap-2">
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
          <Card className="rounded p-4 border-neutral-200 flex-grow-0 shadow-sm mt-4">
            <div className="font-bold text-sm">Visitor Statistics</div>
            <LineChart
              data={[
                { date: "Feb 23", visitors: 12, applications: 1 },
                { date: "Mar 23", visitors: 41, applications: 3 },
                { date: "Apr 23", visitors: 84, applications: 8 },
                { date: "May 23", visitors: 138, applications: 12 },
                { date: "Jun 23", visitors: 294, applications: 26 },
                { date: "Jul 23", visitors: 83, applications: 11 },
                { date: "Aug 23", visitors: 64, applications: 3 },
                { date: "Sep 23", visitors: 132, applications: 14 },
                { date: "Oct 23", visitors: 120, applications: 19 },
                { date: "Nov 23", visitors: 187, applications: 22 },
                { date: "Dec 23", visitors: 119, applications: 10 },
                { date: "Jan 24", visitors: 14, applications: 1 },
              ]}
              className="mt-2"
              categories={["visitors", "applications"]}
              index="date"
              curveType="natural"
              colors={["emerald", "indigo"]}
            />
          </Card>
          <div className="mt-4">
            <div className="flex gap-2 items-center justify-between">
              <div className="font-bold text-xl flex w-full gap-2 items-center">
                Jobs
                <Link
                  href={"/jobs"}
                  className="flex items-center font-light text-xs text-neutral-700 gap-1"
                >
                  <div>view all jobs</div>
                  <ArrowRight />
                </Link>
              </div>
              <Button size="sm" variant="outline">
                Create Job
              </Button>
            </div>
            <JobsTable preview />
          </div>
          <div className="mt-4">
            <div className="flex items-center justify-between">
              <div className="font-bold text-xl flex gap-2 items-center">
                Candidates
                <Link
                  href={"/candidates"}
                  className="flex items-center font-light text-xs text-neutral-700 gap-1"
                >
                  <div>view all candidates</div>
                  <ArrowRight />
                </Link>
              </div>
              <Button size="sm" variant="outline">
                Create Candidate
              </Button>
            </div>
            <CandidatesTable />
          </div>
        </div>
      </div>
    </>
  );
}
