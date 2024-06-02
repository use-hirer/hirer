"use client";

import { Button } from "@hirer/ui/button";
import { Separator } from "@hirer/ui/separator";
import { ArrowSquareOut } from "@phosphor-icons/react";
import Link from "next/link";
import React from "react";

interface CreateCandidateCardProps {
  event_data: string;
  date: string;
}

type CreateCandidateEventType = {
  job_title: string;
  job_slug: string;
};

const CreateCandidateCard: React.FC<CreateCandidateCardProps> = ({
  event_data,
  date,
}) => {
  console.log(event_data);

  const data: CreateCandidateEventType = JSON.parse(event_data);
  const dateString = new Date(date).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  return (
    <div className="rounded-md flex items-center justify-between">
      <div className="flex items-center">
        <div className="text-xs font-bold p-2 rounded-md mr-2 w-[92px] flex justify-center">
          {dateString}
        </div>
        <Separator orientation="vertical" className="h-[32px] mr-2" />
        <div className="text-xs pr-2 h-full w-[120px]">Job Created</div>
        <Separator orientation="vertical" className="h-[32px] mr-2" />
        <div className="text-xs pr-2 h-full">{data.job_title}</div>
      </div>
      <Link href={`job/${data.job_slug}`}>
        <Button size={"sm"} className="mt-2 sm:mt-0 flex gap-2 items-center">
          View <ArrowSquareOut />
        </Button>
      </Link>
    </div>
  );
};

export default CreateCandidateCard;
