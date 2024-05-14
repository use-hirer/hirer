import { api } from "@/lib/api/server";
import { validateRequest } from "@/lib/auth";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import GeneralJobConfigurationView from "../../../_components/configuration/general-configuration-view";

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
