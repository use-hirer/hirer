import CandidatesTable from "@/components/dashboard/candidates-table";
import JobsTable from "@/components/dashboard/jobs-table";
import KPICard from "@/components/dashboard/kpi-card";
import { Separator } from "@/components/ui/separator";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
// import { Metadata } from "next";
import Link from "next/link";

// export const metadata: Metadata = {
//   title: "Hirer: Dashboard",
// };

export default function DashboardPage() {
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
            <JobsTable />
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
            <CandidatesTable />
          </div>
        </div>
      </div>
    </>
  );
}
