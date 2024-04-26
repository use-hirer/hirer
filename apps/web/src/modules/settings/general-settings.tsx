"use client";

import { api } from "@/lib/api/react";
import { RouterOutputs } from "@hirer/api";
import { useParams } from "next/navigation";
import OrganisationDescriptionCard from "./cards/organisation-description";
import OrganisationLogoCard from "./cards/organisation-logo";
import OrganisationNameCard from "./cards/organisation-name";
import OrganisationSlugCard from "./cards/organisation-slug";

interface SettingsViewProps {
  org: RouterOutputs["settings"]["getGeneral"];
}

const GeneralSettingsView: React.FC<SettingsViewProps> = ({ org }) => {
  const params = useParams() as { slug: string };

  const orgClient = api.settings.getGeneral.useQuery(
    { orgId: params.slug as string },
    { initialData: org }
  );

  return (
    <div className="flex gap-6 flex-col">
      <OrganisationNameCard name={orgClient.data!.name} />
      <OrganisationSlugCard slug={orgClient.data!.slug} />
      <OrganisationLogoCard logo={orgClient.data!.avatar} />
      <OrganisationDescriptionCard description={orgClient.data!.bio || ""} />
    </div>
  );
};

export default GeneralSettingsView;
