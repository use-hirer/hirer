import { api } from "@/lib/api/server";
import { validateRequest } from "@/lib/auth";
import GeneralJobConfigurationView from "@/modules/job/configuration/general-configuration-view";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Hirer: Settings",
};

export default async function SettingsPage({
  params,
}: {
  params: { slug: string; id: string };
}) {
  const { user } = await validateRequest();

  if (!user) {
    return redirect("/login");
  }

  const job = await api.job.get({ id: params.id });

  return <GeneralJobConfigurationView job={job} />;
}
