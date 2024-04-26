import { authCheck } from "@/actions/auth";
import KPICard from "@/components/dashboard/kpi-card";
import { api } from "@/lib/api/server";
import { Card } from "@hirer/ui/card";
import { Separator } from "@hirer/ui/separator";
import { AreaChart } from "@tremor/react";
import { Metadata } from "next";

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
                  : item.data[0].total_views_current /
                    item.data[0].total_views_previous
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
