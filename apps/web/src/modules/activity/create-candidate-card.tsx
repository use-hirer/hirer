"use client";

import React from "react";

interface CreateCandidateCardProps {
  event_data: string;
  date: string;
}

type CreateCandidateEventType = {
  candidate_name: string;
  candidate_email: string;
};

const CreateCandidateCard: React.FC<CreateCandidateCardProps> = ({
  event_data,
  date,
}) => {
  const data: CreateCandidateEventType = JSON.parse(event_data);

  return <div className="border rounded-md p-2">{data.candidate_name}</div>;
};

export default CreateCandidateCard;
