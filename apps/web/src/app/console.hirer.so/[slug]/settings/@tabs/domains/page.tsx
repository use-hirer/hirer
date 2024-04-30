import { validateRequest } from "@/lib/auth";
import DomainsSettingsView from "@/modules/settings/domain-settings";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Hirer: Settings",
};

export default async function DomainSettingsPage({
  params,
}: {
  params: { slug: string };
}) {
  const { user } = await validateRequest();

  if (!user) {
    return redirect("/login");
  }

  return <DomainsSettingsView />;
}
