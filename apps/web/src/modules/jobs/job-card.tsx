"use client";
import { RouterOutputs } from "@hirer/api";
import { $Enums } from "@hirer/database/types";
import { DotsThree } from "@phosphor-icons/react";
import { Badge } from "@tremor/react";
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";
import { useParams } from "next/navigation";

enum JobStatus {
  Draft = "Draft",
  Open = "Open",
  Closed = "Closed",
}

interface JobCardProps {
  job: RouterOutputs["job"]["getMany"][number];
}

const JobCard: React.FC<JobCardProps> = ({ job }) => {
  const createdAtRelative = formatDistanceToNow(job.createdAt, {
    addSuffix: true,
  });
  const { slug } = useParams() as { slug?: string };

  const getStatusColor = (status: $Enums.JobStatus) => {
    switch (status) {
      case JobStatus.Draft:
        return "gray";
      case JobStatus.Open:
        return "emerald";
      case JobStatus.Closed:
        return "red";
      default:
        return "gray";
    }
  };

  const getStatusText = (status: $Enums.JobStatus) => {
    switch (status) {
      case JobStatus.Draft:
        return "Draft";
      case JobStatus.Open:
        return "Active";
      case JobStatus.Closed:
        return "Closed";
      default:
        return "";
    }
  };

  return (
    <div className="border rounded-md p-4 shadow-sm hover:shadow-md duration-150 flex flex-col relative">
      <div className="flex justify-between items-center mb-2">
        <Link
          className="font-bold text-md hover:underline"
          href={`/${slug}/job/${job.slug}`}
        >
          {job.title}
        </Link>
        <div className="flex items-center space-x-2">
          <Badge color={getStatusColor(job.status)}>
            {getStatusText(job.status)}
          </Badge>
          <button className="p-1 rounded-full hover:bg-gray-200">
            <DotsThree size={16} />
          </button>
        </div>
      </div>
      <div className="text-xs">{job.location}</div>
      <div className="text-xs mt-2">
        {job._count.applications} application
        {job._count.applications !== 1 ? "s" : ""}
      </div>
      <div className="text-xs mt-auto pt-8 text-zinc-500">
        Created {createdAtRelative}
      </div>
    </div>
  );
};

export default JobCard;
