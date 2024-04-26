import { api } from "@/lib/api/server";
import { validateRequest } from "@/lib/auth";
import { Separator } from "@hirer/ui/separator";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Hirer: Settings",
};

export default async function SettingsPage({
  params,
  tabs,
}: {
  params: { slug: string };
  tabs: React.ReactNode;
}) {
  const { user } = await validateRequest();

  if (!user) {
    return redirect("/login");
  }

  const org = await api.settings.getGeneral({
    orgId: params.slug as string,
  });

  return (
    <div className="flex items-center gap-2">
      <div className="w-full">
        <div className="font-extrabold text-xl">Settings</div>
        <Separator className="mt-2" />
        {tabs}
      </div>
    </div>
  );
}
