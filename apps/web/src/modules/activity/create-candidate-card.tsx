"use client";

import { Button } from "@hirer/ui/button";
import { Separator } from "@hirer/ui/separator";
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
  const dateString = new Date(date).toLocaleTimeString();

  return (
    <div className="rounded-md flex items-center justify-between p-2">
      <div className="flex items-center">
        <div className="text-xs font-bold bg-zinc-100 p-2 rounded-md mr-2 w-[70px] text-zinc-600 flex justify-center">
          {dateString}
        </div>
        <div className="text-xs pr-2 h-full">Candidate Created</div>
        <Separator orientation="vertical" className="h-[32px] mr-2" />
        <div className="text-xs pr-2 h-full">
          {data.candidate_name} ({data.candidate_email})
        </div>
      </div>
      <Button size={"sm"}>View Candidate</Button>
    </div>
  );
};

export default CreateCandidateCard;
