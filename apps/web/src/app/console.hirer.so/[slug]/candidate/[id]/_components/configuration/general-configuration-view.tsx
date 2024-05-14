"use client";

import { api } from "@/lib/api/react";
import { RouterOutputs } from "@hirer/api";
import { useParams } from "next/navigation";
import JobDeleteCard from "./cards/job-delete-card";
import JobDescriptionCard from "./cards/job-description-card";
import JobLocationCard from "./cards/job-location-card";
import JobNameCard from "./cards/job-name-card";
import JobStatusCard from "./cards/job-status-card";

interface SettingsViewProps {
  job: RouterOutputs["job"]["get"];
}

const GeneralJobConfigurationView: React.FC<SettingsViewProps> = ({ job }) => {
  const params = useParams() as { slug: string; id: string };

  const jobClient = api.job.get.useQuery(
    { id: params.id as string },
    { initialData: job }
  );

  return (
    <div className="flex gap-6 flex-col">
      <JobStatusCard status={jobClient.data.status} />
      <JobNameCard name={jobClient.data.title} />
      <JobLocationCard location={jobClient.data.location} />
      <JobDescriptionCard description={jobClient.data.description} />
      <JobDeleteCard />
    </div>
  );
};

export default GeneralJobConfigurationView;
