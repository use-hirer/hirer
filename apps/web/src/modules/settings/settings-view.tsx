"use client";

import { api } from "@/lib/api/react";
import { RouterOutputs } from "@hirer/api";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Toaster } from "sonner";
import OrganisationDescriptionCard from "./cards/organisation-description";
import OrganisationLogoCard from "./cards/organisation-logo";
import OrganisationNameCard from "./cards/organisation-name";
import OrganisationSlugCard from "./cards/organisation-slug";

interface SettingsViewProps {
  org: RouterOutputs["settings"]["getGeneral"];
}

const SettingsView: React.FC<SettingsViewProps> = ({ org }) => {
  const params = useParams() as { slug: string };

  const orgClient = api.settings.getGeneral.useQuery(
    { orgId: params.slug as string },
    { initialData: org }
  );

  return (
    <div className="flex w-full flex-col">
      <main className="flex flex-1 flex-col gap-4 pt-6">
        <div className="ml-2 grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[140px_1fr]">
          <nav
            className="grid gap-4 text-sm text-muted-foreground"
            x-chunk="dashboard-04-chunk-0"
          >
            <Link href="#" className="font-semibold text-primary">
              General
            </Link>
            <Link href="#">Team</Link>
            <Link href="#">Domains</Link>
            <Link href="#">Billing</Link>
            <Link href="#">Support</Link>
          </nav>
          <div className="grid gap-6">
            <OrganisationNameCard name={orgClient.data!.name} />
            <OrganisationSlugCard slug={orgClient.data!.slug} />
            <OrganisationLogoCard logo={orgClient.data!.avatar} />
            <OrganisationDescriptionCard
              description={orgClient.data!.bio || ""}
            />
          </div>
        </div>
      </main>
      <Toaster richColors position="top-right" closeButton />
    </div>
  );
};

export default SettingsView;
