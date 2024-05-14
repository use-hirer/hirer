"use server";

import { api } from "@/lib/api/server";
import { Card } from "@hirer/ui/card";
import LocationsMetricsChart from "./locations-metrics-chart";

const LocationsMetricsCard = async ({
  orgId,
  jobId,
}: {
  jobId: string;
  orgId: string;
}) => {
  const countries = await api.analytics.getCountriesForJob({
    teamId: orgId,
    jobId: jobId.split("-")[0],
  });

  return (
    <Card className="rounded p-4 border-neutral-200 flex-grow-0 shadow-sm">
      <div className="font-bold text-sm">Locations</div>
      {countries.data.length > 0 && (
        <LocationsMetricsChart data={countries.data} />
      )}
      {countries.data.length === 0 && (
        <div className="text-center text-sm min-h-[120px] flex items-center justify-center text-zinc-500">
          No location data available.
        </div>
      )}
    </Card>
  );
};

export default LocationsMetricsCard;
