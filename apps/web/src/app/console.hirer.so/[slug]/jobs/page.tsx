import { api } from "@/lib/api/server";
import { validateRequest } from "@/lib/auth";
import JobsView from "@/modules/jobs/jobs-view";
import { Separator } from "@hirer/ui/separator";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import { Toaster } from "sonner";

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

  const jobs = await api.job.getMany({
    teamId: params.slug,
  });

  return (
    <div className="flex flex-col h-full">
      <div className="w-full">
        <div className="font-extrabold text-xl">Jobs</div>
        <Separator className="my-2" />
      </div>
      <div className="flex-1">
        <JobsView jobs={jobs} />
      </div>
      <Toaster richColors position="top-right" closeButton />
    </div>
  );
}
