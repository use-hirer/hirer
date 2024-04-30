"use server";

import { api } from "@/lib/api/server";
import { Card } from "@hirer/ui/card";
import { BarList } from "@tremor/react";

const ReferrersMetricsCard = async ({
  orgId,
  jobId,
}: {
  jobId: string;
  orgId: string;
}) => {
  const referrers = await api.analytics.getReferrersForJob({
    teamId: orgId,
    jobId: jobId.split("-")[0],
  });

  const referrersData = referrers.data.map(({ referer, count }) => ({
    name: referer,
    value: count,
  }));

  return (
    <Card className="rounded p-4 border-neutral-200 flex-grow-0 shadow-sm">
      <div className="font-bold text-sm">Referrers</div>
      {referrersData.length > 0 && (
        <BarList className="mt-4" color="amber" data={referrersData} />
      )}
      {referrersData.length === 0 && (
        <div className="text-center text-sm min-h-[120px] flex items-center justify-center text-zinc-500">
          No referrers data available.
        </div>
      )}
    </Card>
  );
};

export default ReferrersMetricsCard;
