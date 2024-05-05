"use client";

import { RouterOutputs } from "@hirer/api";
import { Separator } from "@hirer/ui/separator";
import { Empty } from "@phosphor-icons/react";
import Link from "next/link";

interface JobsListProps {
  org: RouterOutputs["public"]["getOrganisation"];
}

const JobsList: React.FC<JobsListProps> = ({ org }) => {
  if (org?.jobs.length === 0) {
    return (
      <div className="bg-white shadow-sm container mt-6 rounded-2xl p-4 max-w-[1000px] flex items-center justify-center min-h-28 flex-col gap-2 border">
        <Empty size={24} weight="duotone" />
        <div className="text-sm font-medium">No Active Jobs</div>
      </div>
    );
  }

  return (
    <div className="bg-white shadow-sm container mt-6 rounded-2xl p-4 max-w-[1000px] border">
      {org?.jobs.map((job, index) => (
        <Link
          key={job.id}
          className="hover:text-blue-500"
          href={`/job/${job.slug}`}
        >
          <div className="p-2">
            <div className="font-bold text-lg">{job.title}</div>
            <div className="text-xs font-normal text-zinc-600">
              {job.location}
            </div>
          </div>
          {org.jobs.length - 1 !== index && <Separator />}
        </Link>
      ))}
      {/* <div className="flex items-center justify-center pt-4 gap-2">
        <Button variant={"ghost"} disabled>
          Back
        </Button>
        <Button variant={"outline"}>Next</Button>
      </div> */}
    </div>
  );
};

export default JobsList;
