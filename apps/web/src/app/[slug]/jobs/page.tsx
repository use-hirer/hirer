import { api } from "@/lib/api/server";
import { validateRequest } from "@/lib/auth";
import JobsView from "@/modules/jobs/jobs-view";
import NoJobsExist from "@/modules/jobs/no-jobs-exist";
import { Separator } from "@hirer/ui/separator";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Hirer: Jobs",
};

export default async function JobsPage({
  params,
}: {
  params: { slug: string };
}) {
  const { user } = await validateRequest();

  if (!user) {
    return redirect("/login");
  }

  const jobs = await api.job.getMany({ teamId: params.slug });

  return (
    <div className="flex flex-col h-full">
      <div className="w-full">
        <div className="font-extrabold text-xl">Jobs</div>
        <Separator className="my-2" />
      </div>
      <div className="flex-1">
        {jobs.length > 0 ? (
          <div className="h-full">
            <JobsView jobs={jobs} />
          </div>
        ) : (
          <NoJobsExist className="h-full" />
        )}
      </div>
    </div>
  );
}
