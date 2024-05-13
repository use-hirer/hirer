"use client";

import React from "react";

interface CreateJobCardProps {
  event_data: string;
  date: string;
}

type CreateJobEventType = {
  job_id: string;
  job_title: string;
  job_slug: string;
  job_creator: string;
};

const CreateJobCard: React.FC<CreateJobCardProps> = ({ event_data, date }) => {
  const data: CreateJobEventType = JSON.parse(event_data);

  return <div className="border rounded-md p-2">{data.job_id}</div>;
};

export default CreateJobCard;
