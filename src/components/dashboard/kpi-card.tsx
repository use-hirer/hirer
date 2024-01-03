import { BadgeDelta } from "@tremor/react";
import React from "react";
import { Card } from "../ui/card";

interface KPICardProps {
  title: string;
  timePeriod: string;
  value: string;
  percentageChange: number;
  increase: "negative" | "positive";
  deltaType:
    | "increase"
    | "moderateIncrease"
    | "decrease"
    | "moderateDecrease"
    | "unchanged";
}

const KPICard: React.FC<KPICardProps> = ({
  title,
  timePeriod,
  value,
  percentageChange,
  increase,
  deltaType,
}) => {
  return (
    <Card className="shadow-none rounded p-4 border-neutral-200 flex-grow-0">
      <div className="font-bold text-sm">{title}</div>
      <div className="text-xs font-light text-zinc-500">{timePeriod}</div>
      <div className="flex justify-between items-center pt-2">
        <div className="text-3xl font-extrabold">{value}</div>
        <BadgeDelta
          deltaType={deltaType}
          isIncreasePositive={increase === "positive"}
          size="xs"
          className="rounded-md"
        >
          {increase === "positive" ? "+" : "-"}
          {percentageChange}%
        </BadgeDelta>
      </div>
    </Card>
  );
};

export default KPICard;
