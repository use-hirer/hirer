import KPICard from "@/components/kpi-card";
import { api } from "@/lib/api/server";
import { Card } from "@hirer/ui/card";
import { AreaChart } from "@tremor/react";
import DeviceMetricsCard from "../../_components/metrics/device-metrics-card";
import LocationsMetricsCard from "../../_components/metrics/locations-metrics-card";
import ReferrersMetricsCard from "../../_components/metrics/referrers-metrics-card";

export default async function MetricsTab({
  params,
}: {
  params: { slug: string; id: string };
}) {
  const slug = params.slug;
  const id = params.id;

  const data = await api.analytics.getViewsByDayForJob({
    teamId: slug,
    jobId: id.split("-")[0],
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

  const item = await api.analytics.getTotalViewsForJob({
    teamId: params.slug,
    jobId: id.split("-")[0],
  });

  return (
    <div className="mt-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2">
        <KPICard
          increase={
            item.data[0].total_views_current > item.data[0].total_views_previous
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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4 mt-4">
        <LocationsMetricsCard orgId={params.slug} jobId={id} />
        <ReferrersMetricsCard orgId={params.slug} jobId={id} />
        <DeviceMetricsCard orgId={params.slug} jobId={id} />
      </div>
    </div>
  );
}
