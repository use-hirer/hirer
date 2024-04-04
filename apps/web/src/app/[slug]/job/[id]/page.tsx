import { JobsTable } from "@/components/tables/jobs-table";
import { validateRequest } from "@/lib/auth";
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
    <div className="flex items-center gap-2">
      <div className="w-full">
        <div className="font-extrabold text-xl">Jobs</div>
        <Separator className="my-2" />
        <JobsTable />
      </div>
    </div>
  );
}
