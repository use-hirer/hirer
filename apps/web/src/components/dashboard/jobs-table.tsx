import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@hirer/ui/dropdown-menu";
import { Copy, DotsThree } from "@phosphor-icons/react/dist/ssr";
import { Badge } from "@tremor/react";
import Link from "next/link";
import React from "react";

type Job = {
  title: string;
  status: string;
  location: string;
  department: string;
  published: string;
  hiringManager: string;
};

const jobsData: Job[] = [
  {
    title: "Senior Software Engineer",
    status: "Active",
    location: "Melbourne, AU",
    department: "Engineering",
    published: "04 Jan 2024",
    hiringManager: "Nick Mandylas",
  },
  {
    title: "Receptionist",
    status: "Closed",
    location: "Sydney, AU",
    department: "Sales",
    published: "03 Jan 2024",
    hiringManager: "Nick Mandylas",
  },
  {
    title: "Head of HR",
    status: "Active",
    location: "Melbourne, AU",
    department: "HR",
    published: "02 Jan 2024",
    hiringManager: "Nick Mandylas",
  },
  {
    title: "Frontend Engineer",
    status: "Active",
    location: "Remote",
    department: "Engineering",
    published: "02 Jan 2024",
    hiringManager: "Nick Mandylas",
  },
];

interface JobsTableProps {}

const JobsTable: React.FC<JobsTableProps> = () => {
  return (
    <table className="min-w-full border-separate border-spacing-0 mt-2">
      <thead className="bg-gray-100/50 shadow-sm">
        <tr>
          <th className="pl-2 py-2 text-left text-sm font-semibold text-muted-foreground border border-r-0 rounded-l-sm">
            Job Title
          </th>
          <th className="pl-2 py-2 text-left text-sm font-semibold text-muted-foreground border border-l-0 border-r-0">
            Status
          </th>
          <th className="pl-2 py-2 text-left text-sm font-semibold text-muted-foreground border border-l-0 border-r-0">
            Location
          </th>
          <th className="pl-2 py-2 text-left text-sm font-semibold text-muted-foreground border border-l-0 border-r-0">
            Department
          </th>
          <th className="pl-2 py-2 text-left text-sm font-semibold text-muted-foreground border border-l-0 border-r-0">
            Published
          </th>
          <th className="pl-2 py-2 text-left text-sm font-semibold text-muted-foreground border border-l-0 border-r-0">
            Hiring Manager
          </th>
          <th className="pl-2 py-2 text-left text-sm font-semibold text-muted-foreground border border-l-0 rounded-r-sm"></th>
        </tr>
      </thead>
      <tbody>
        {jobsData.map((job, index) => (
          <tr key={index} className="border-b border-b-red-700">
            <td className="px-2 py-3 text-left text-sm border-b font-medium select-none">
              <Link href={"/"}>{job.title}</Link>
            </td>
            <td className="px-2 py-3 text-left text-sm border-b">
              {job.status === "Active" ? (
                <Badge className="rounded-md" color="emerald">
                  {job.status}
                </Badge>
              ) : (
                <Badge className="rounded-md" color="orange">
                  {job.status}
                </Badge>
              )}
            </td>
            <td className="px-2 py-3 text-left text-sm border-b">
              {job.location}
            </td>
            <td className="px-2 py-3 text-left text-sm border-b">
              {job.department}
            </td>
            <td className="px-2 py-3 text-left text-sm border-b">
              {job.published}
            </td>
            <td className="px-2 py-3 text-left text-sm border-b">
              {job.hiringManager}
            </td>
            <td className="px-2 py-4 text-left text-sm border-b flex items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <DotsThree size={18} />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem className="flex gap-1">
                    <div>Copy Link</div>
                    <Copy />
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default JobsTable;
