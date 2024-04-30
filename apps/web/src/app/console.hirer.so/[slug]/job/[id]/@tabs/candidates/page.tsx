"use client";

import { cn } from "@hirer/ui";

export default function CandidateTab() {
  return (
    <div className="h-full overflow-x-auto whitespace-nowrap min-h-[600px] border-l border-r border-b rounded-b-md bg-zinc-50 shadow-sm scroll-bar">
      <div className="w-[300px] inline-block">
        <ColumnHeading title="To Review" />
      </div>
      <div className="w-[300px] inline-block">
        <ColumnHeading title="Pre Select" badgeColor="#ED843A" />
      </div>
      <div className="w-[300px] inline-block">
        <ColumnHeading title="Interview" badgeColor="#646FD9" />
      </div>
      <div className="w-[300px] inline-block">
        <ColumnHeading title="Assignment" badgeColor="#35795F" />
      </div>
      <div className="w-[300px] inline-block">
        <ColumnHeading title="Hired" badgeColor="#67D374" />
      </div>
      <div className="w-[300px] inline-block">
        <ColumnHeading title="Rejected" badgeColor="#FF6961" />
      </div>
    </div>
  );
}

const ColumnHeading = ({
  title,
  badgeColor,
}: {
  title: string;
  badgeColor?: string;
}) => {
  return (
    <div className="font-medium text-md flex items-center gap-2 pt-3 pl-4">
      <div
        className={cn([
          badgeColor === undefined && "border border-zinc-700 border-dashed",
          "w-3 h-3 rounded-full  flex items-center",
        ])}
        style={{ backgroundColor: badgeColor }}
      />
      {title} <span className="text-sm text-zinc-500 font-light">0</span>
    </div>
  );
};
