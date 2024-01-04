import KPICard from "@/components/dashboard/kpi-card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { TableBody, TableCell, TableRow } from "@/components/ui/table";
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
            <table className="min-w-full border-separate border-spacing-0 mt-2">
              <thead className="bg-gray-100/50">
                <tr>
                  <th className="pl-2 py-2.5 text-left text-sm font-medium text-muted-foreground border border-r-0 rounded-sm">
                    Job Title
                  </th>
                  <th className="pl-2 py-2 text-left text-sm font-medium text-muted-foreground border border-l-0 border-r-0">
                    Status
                  </th>
                  <th className="pl-2 py-2 text-left text-sm font-medium text-muted-foreground border border-l-0 border-r-0">
                    Location
                  </th>
                  <th className="pl-2 py-2 text-left text-sm font-medium text-muted-foreground border border-l-0 border-r-0">
                    Department
                  </th>
                  <th className="pl-2 py-2 text-left text-sm font-medium text-muted-foreground border border-l-0 border-r-0">
                    Hiring Manager
                  </th>
                  <th className="pl-2 py-2 text-left text-sm font-medium text-muted-foreground border border-l-0 rounded-sm" />
                </tr>
              </thead>
              <TableBody className="text-gray-600">
                <TableRow className="w-full border-none">
                  <TableCell className="font-bold text-black">
                    Senior Product Designer
                  </TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Location</TableCell>
                  <TableCell>Department</TableCell>
                  <TableCell>Hiring Manager</TableCell>
                  <TableCell>
                    <Button>Archive</Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </table>
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
