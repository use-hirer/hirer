import { validateRequest } from "@/lib/auth";
import NoJobsExist from "@/modules/jobs/no-jobs-exist";
import { Separator } from "@hirer/ui/separator";
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
