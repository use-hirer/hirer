import { api } from "@/lib/api/server";
import { validateRequest } from "@/lib/auth";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import GeneralSettingsView from "../_components/general-settings";

export const metadata: Metadata = {
  title: "Hirer: Settings",
};

export default async function SettingsPage({
  params,
}: {
  params: { slug: string };
}) {
  const { user } = await validateRequest();

  if (!user) {
    return redirect("/login");
  }

  const org = await api.settings.getGeneral({
    orgId: params.slug as string,
  });

  return <GeneralSettingsView org={org} />;
}
