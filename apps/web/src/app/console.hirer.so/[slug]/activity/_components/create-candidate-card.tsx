"use client";

import { Button } from "@hirer/ui/button";
import { Separator } from "@hirer/ui/separator";
import { ArrowSquareOut } from "@phosphor-icons/react";
import React from "react";

interface CreateCandidateCardProps {
  event_data: string;
  date: string;
}

type CreateCandidateEventType = {
  candidate_name: string;
  candidate_email: string;
  candidate_id: string;
};

const CreateCandidateCard: React.FC<CreateCandidateCardProps> = ({
  event_data,
  date,
}) => {
  const data: CreateCandidateEventType = JSON.parse(event_data);
  const dateString = new Date(date).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  return (
    <div className="rounded-md flex flex-col items-start justify-between sm:flex-row sm:items-center">
      <div className="flex flex-col items-start sm:flex-row sm:items-center w-full">
        <div className="text-xs font-bold p-2 rounded-md mr-2 w-[92px] flex justify-center">
          {dateString}
        </div>
        <Separator
          orientation="vertical"
          className="hidden sm:block h-[32px] sm:mr-2"
        />
        <div className="text-xs mb-2 sm:pr-2 sm:mb-0 h-full w-[120px]">
          Candidate Created
        </div>
        <Separator
          orientation="vertical"
          className="hidden sm:block h-[32px] sm:mr-2"
        />
        <div className="text-xs mb-2 sm:pr-2 sm:mb-0 h-full">
          {data.candidate_name} ({data.candidate_email})
        </div>
      </div>
      <Button size={"sm"} className="mt-2 sm:mt-0 flex gap-2 items-center">
        View <ArrowSquareOut />
      </Button>
    </div>
  );
};

export default CreateCandidateCard;
