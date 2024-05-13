"use client";
import { RouterOutputs } from "@hirer/api";
import { $Enums } from "@hirer/database/types";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@hirer/ui/tooltip";
import { Copy, DotsThree } from "@phosphor-icons/react";
import { Badge } from "@tremor/react";
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";
import { useParams } from "next/navigation";
import { toast } from "sonner";

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
        return "blue";
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

  function addToClipboard() {
    const url = `https://${slug}.hirer.so/${job.slug}`;

    navigator.clipboard.writeText(url).then(
      () => {
        toast.info(`Added URL, ${url} to clipboard.`);
      },
      () => {
        toast.error("An error occurred copying URL to clipboard");
      }
    );
  }

  return (
    <div className="border rounded-md p-4 shadow-sm hover:shadow-md duration-150 flex flex-col relative">
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center gap-1">
          <Link
            className="font-bold text-md hover:underline"
            href={`/${slug}/job/${job.slug}`}
          >
            {job.title}
          </Link>
          <TooltipProvider>
            <Tooltip delayDuration={200}>
              <TooltipTrigger asChild>
                <Copy
                  size={12}
                  className="text-zinc-400 cursor-pointer"
                  onClick={addToClipboard}
                />
              </TooltipTrigger>
              <TooltipContent>
                <p>Copy Public Link</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
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
