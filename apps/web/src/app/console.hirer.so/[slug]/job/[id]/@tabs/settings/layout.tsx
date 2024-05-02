import { validateRequest } from "@/lib/auth";
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

  return (
    <div className="flex items-center gap-2">
      <div className="w-full">{tabs}</div>
    </div>
  );
}
