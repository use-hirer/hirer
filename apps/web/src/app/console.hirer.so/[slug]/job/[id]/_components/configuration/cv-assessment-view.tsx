"use client";

import { api } from "@/lib/api/react";
import { RouterOutputs } from "@hirer/api";
import { useParams } from "next/navigation";
import AssessmentCriteriaCard from "./cards/assessment-criteria-card";

interface SettingsViewProps {
  job: RouterOutputs["job"]["get"];
}

const CVAssessmentView: React.FC<SettingsViewProps> = ({ job }) => {
  const params = useParams() as { slug: string; id: string };

  const jobClient = api.job.get.useQuery(
    { id: params.id as string },
    { initialData: job }
  );

  return (
    <div className="flex gap-6 flex-col">
      <AssessmentCriteriaCard name={jobClient.data.title} />
    </div>
  );
};

export default CVAssessmentView;
