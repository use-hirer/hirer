"use client";
import { JobStatus } from "@/model/job";
import { RouterOutputs } from "@hirer/api";
import { Button } from "@hirer/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@hirer/ui/tooltip";
import { Copy } from "@phosphor-icons/react";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { Column, ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import Link from "next/link";
import * as React from "react";
import { toast } from "sonner";

const JOB_STATUS_COLOUR: Record<JobStatus, string> = {
  ["Active"]: "emerald",
  ["Closed"]: "orange",
};

interface SortableColumnProps {
  column: Column<RouterOutputs["candidate"]["getMany"][number]>;
  children: React.ReactNode;
}

export function SortableColumn({ column, children }: SortableColumnProps) {
  return (
    <Button
      variant="ghost"
      onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
    >
      {children}
      <CaretSortIcon className="ml-2 h-4 w-4" />
    </Button>
  );
}

export const CANDIDATES_TABLE_COLUMNS: ColumnDef<
  RouterOutputs["candidate"]["getMany"][number]
>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <SortableColumn column={column}>Name</SortableColumn>
    ),
    cell: ({ row }) => (
      <div className="flex items-center gap-1">
        <Link
          className="text-left text-sm font-medium select-none hover:underline"
          href={`candidate/${row.original.id}`}
        >
          {row.getValue("name")}
        </Link>
        <TooltipProvider>
          <Tooltip delayDuration={200}>
            <TooltipTrigger asChild>
              <Copy
                size={12}
                className="text-zinc-400 cursor-pointer"
                onClick={() => {
                  const url = `https://hirer.so/candidate/${row.original.id}`;
                  navigator.clipboard.writeText(url).then(
                    () => {
                      toast.info(`Added candidate URL to clipboard.`);
                    },
                    () => {
                      toast.error("An error occurred copying URL to clipboard");
                    }
                  );
                }}
              />
            </TooltipTrigger>
            <TooltipContent>
              <p>Copy Candidate Link</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>{" "}
      </div>
    ),
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <SortableColumn column={column}>Email</SortableColumn>
    ),
    cell: ({ row }) => (
      <div className="text-left text-sm">{row.getValue("email")}</div>
    ),
  },
  {
    accessorKey: "applications",
    header: ({ column }) => (
      <SortableColumn column={column}>Applied Jobs</SortableColumn>
    ),
    cell: ({ row }) => (
      <div className="text-left text-sm">
        {row.original._count.applications}
      </div>
    ),
  },
  {
    accessorKey: "latestApplicationDate",
    header: ({ column }) => (
      <SortableColumn column={column}>Latest Application Date</SortableColumn>
    ),
    cell: ({ row }) => {
      const latestApplication = row.original.applications.slice(-1)[0];
      if (latestApplication) {
        const formattedDate = format(
          latestApplication.createdAt as Date,
          "dd MMM yyyy h:mma"
        );
        return (
          <div className="text-left text-sm text-zinc-500">{formattedDate}</div>
        );
      }
      return <div className="text-left text-sm text-zinc-500">-</div>;
    },
  },
  {
    accessorKey: "notes",
    header: ({ column }) => (
      <SortableColumn column={column}>Notes</SortableColumn>
    ),
    cell: ({ row }) => {
      const latestApplication = row.original.applications.slice(-1)[0];
      if (latestApplication) {
        return (
          <div className="text-left text-sm">{latestApplication.notes}</div>
        );
      }
      return <div className="text-left text-sm">-</div>;
    },
  },
];
