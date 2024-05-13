import { api } from "@/lib/api/server";
import { validateRequest } from "@/lib/auth";
import { MoneyWavy } from "@phosphor-icons/react/dist/ssr";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Hirer: Settings",
};

export default async function BillingSettingsPage({
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

  return (
    <div className="flex gap-6 flex-col">
      <div className="shadow-sm border p-4 bg-zinc-50 rounded-md border-dashed flex items-center justify-center min-h-48 text-zinc-500 text-sm flex-col gap-2">
        <MoneyWavy size={24} />
        Pro & Enterprise plans are not yet available.
      </div>
    </div>
  );
}
