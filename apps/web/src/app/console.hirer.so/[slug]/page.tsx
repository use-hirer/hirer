import { authCheck } from "@/actions/auth";
import KPICard from "@/components/kpi-card";
import { api } from "@/lib/api/server";
import { Alert, AlertDescription, AlertTitle } from "@hirer/ui/alert";
import { Card } from "@hirer/ui/card";
import { Separator } from "@hirer/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@hirer/ui/tooltip";
import { HandWaving } from "@phosphor-icons/react/dist/ssr";
import { AreaChart, BadgeDelta } from "@tremor/react";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Hirer: Dashboard",
};

export default async function DashboardPage({
  params,
}: {
  params: { slug: string };
}) {
  await authCheck();

  const data = await api.analytics.getViewsByDayForOrg({
    teamId: params.slug,
  });

  const { data: viewData } = data;

  // Get the current date
  const currentDate = new Date();

  // Create an array of dates for the past 30 days
  const dates = Array.from({ length: 30 }, (_, i) => {
    const date = new Date(currentDate);
    date.setDate(date.getDate() - i);
    return date.toISOString().slice(0, 10);
  });

  // Create the chart data object
  const chartData = dates
    .map((date) => {
      const viewItem = viewData.find((item) => item.date === date);
      const visitors = viewItem?.unique_visitors || 0;
      const views = viewItem?.total_views || 0;
      return {
        date: date.slice(5), // Extract the month and day (e.g., "Apr 22")
        visitors,
        views,
        applications: 0, // Set applications to 0 since no data is provided
      };
    })
    .reverse();

  const item = await api.analytics.getTotalViewsForOrg({ teamId: params.slug });

  return (
    <>
      <div className="flex items-center gap-2 overflow-x-hidden">
        <div className="w-full">
          <div className="font-extrabold text-xl">Dashboard</div>
          <Separator className="mt-2 mb-4" />
          <div className="my-4 text-sm">
            <Alert className="bg-zinc-50">
              <HandWaving className="h-5 w-5" />
              <AlertTitle>We&apos;re glad to have you here!</AlertTitle>
              <AlertDescription>
                Here&apos;s where you can find your public job board,{" "}
                <Link
                  className="font-medium hover:text-blue-700 hover:underline"
                  href={`https://${params.slug}.hirer.so`}
                  target="_blank"
                  rel="noreferrer"
                >
                  https://{params.slug}.hirer.so
                </Link>
                . Click{" "}
                <Link
                  className="hover:underline"
                  href={`https://console.hirer.so/${params.slug}/jobs/create`}
                >
                  here
                </Link>{" "}
                to create a new job.
              </AlertDescription>
            </Alert>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2">
            <KPICard
              increase={
                item.data[0].total_views_current >
                item.data[0].total_views_previous
                  ? "positive"
                  : "negative"
              }
              percentageChange={
                item.data[0].total_views_previous === 0
                  ? 0
                  : Math.round(
                      (item.data[0].total_views_current /
                        item.data[0].total_views_previous) *
                        10
                    ) / 10
              }
              value={String(item.data[0].total_views_current)}
              timePeriod="Last 4 weeks"
              title="Visitors"
              deltaType={
                item.data[0].total_views_previous === 0
                  ? "unchanged"
                  : item.data[0].total_views_current >
                    item.data[0].total_views_previous
                  ? "moderateIncrease"
                  : "moderateDecrease"
              }
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
            <TooltipProvider>
              <Tooltip delayDuration={200}>
                <TooltipTrigger asChild>
                  <Card className="rounded p-4 border-neutral-200 border-dashed flex-grow-0 shadow-sm bg-zinc-50">
                    <div className="font-bold text-sm">Followers</div>
                    <div className="text-xs font-light text-zinc-500">
                      Last 4 Weeks
                    </div>
                    <div className="flex justify-between items-center pt-2">
                      <div className="text-3xl font-extrabold">0</div>
                      <BadgeDelta
                        deltaType="unchanged"
                        size="xs"
                        className="rounded-md"
                      >
                        +0%
                      </BadgeDelta>
                    </div>
                  </Card>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Feature In Progress 🚧</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <Card className="rounded p-4 border-neutral-200 flex-grow-0 shadow-sm mt-4">
            <div className="font-bold text-sm">Visitor Statistics</div>
            <AreaChart
              data={chartData}
              className="mt-2"
              categories={["visitors", "views", "applications"]}
              index="date"
              curveType="monotone"
              colors={["indigo", "pink", "emerald"]}
            />
          </Card>
        </div>
      </div>
    </>
  );
}
