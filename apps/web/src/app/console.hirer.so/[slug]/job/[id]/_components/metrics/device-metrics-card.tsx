"use server";

import { api } from "@/lib/api/server";
import { Card } from "@hirer/ui/card";
import { BarList } from "@tremor/react";

const DeviceMetricsCard = async ({
  orgId,
  jobId,
}: {
  jobId: string;
  orgId: string;
}) => {
  const devices = await api.analytics.getDevicesForJob({
    teamId: orgId,
    jobId: jobId.split("-")[0],
  });

  const devicesData = devices.data.map(({ device, count }) => ({
    name: device,
    value: count,
  }));

  return (
    <Card className="rounded p-4 border-neutral-200 flex-grow-0 shadow-sm">
      <div className="font-bold text-sm">Devices</div>
      {devicesData.length > 0 && (
        <BarList className="mt-4" color="green" data={devicesData} />
      )}
      {devicesData.length === 0 && (
        <div className="text-center text-sm min-h-[120px] flex items-center justify-center text-zinc-500">
          No devices data available.
        </div>
      )}
    </Card>
  );
};

export default DeviceMetricsCard;
