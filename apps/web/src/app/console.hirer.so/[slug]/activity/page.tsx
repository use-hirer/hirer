import { api } from "@/lib/api/server";
import { validateRequest } from "@/lib/auth";
import { Separator } from "@hirer/ui/separator";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Hirer: Activity Log",
};

export default async function ActivityPage({
  params,
}: {
  params: { slug: string };
}) {
  const { user } = await validateRequest();

  if (!user) {
    return redirect("/login");
  }

  const activity = await api.activity.getActivityByOrgId({
    teamId: params.slug,
  });

  console.log(activity);

  return (
    <div className="flex items-center gap-2">
      <div className="w-full">
        <div className="font-extrabold text-xl">Activity</div>
        <Separator className="mt-2 mb-4" />
      </div>
    </div>
  );
}
