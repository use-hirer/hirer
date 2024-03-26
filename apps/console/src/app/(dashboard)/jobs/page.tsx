import { Separator } from "@console/components/ui/separator";
import { validateRequest } from "@console/lib/auth";
import NoJobsExist from "@console/modules/jobs/no-jobs-exist";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Hirer: Jobs",
};

export default async function JobsPage() {
  const { user } = await validateRequest();

  if (!user) {
    return redirect("/login");
  }

  return (
    <div className="flex flex-col h-full">
      <div className="w-full">
        <div className="font-extrabold text-xl">Jobs</div>
        <Separator className="my-2" />
      </div>
      <div className="flex-1">
        <NoJobsExist className="h-full" />
      </div>
    </div>
  );
}
