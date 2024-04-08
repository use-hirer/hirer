"use client";
import { JobStatus } from "@/model/Job";
import { RouterOutputs } from "@hirer/api";
import { Button } from "@hirer/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@hirer/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@hirer/ui/tooltip";
import { Copy, DotsThree } from "@phosphor-icons/react";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { Column, ColumnDef } from "@tanstack/react-table";
import { Badge } from "@tremor/react";
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import * as React from "react";
import { toast } from "sonner";

const JOB_STATUS_COLOUR: Record<JobStatus, string> = {
  ["Active"]: "emerald",
  ["Closed"]: "orange",
};

interface SortableColumnProps {
  column: Column<RouterOutputs["job"]["getMany"][number]>;
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

export const JOBS_TABLE_COLUMNS: ColumnDef<
  RouterOutputs["job"]["getMany"][number]
>[] = [
  {
    accessorKey: "title",
    header: ({ column }) => (
      <SortableColumn column={column}>Job Title</SortableColumn>
    ),
    cell: ({ row }) => (
      <div className="flex items-center gap-1">
        <Link
          className="text-left text-sm font-medium select-none hover:underline"
          href={`job/${row.original.slug}`}
        >
          {row.getValue("title")}
        </Link>
        <TooltipProvider>
          <Tooltip delayDuration={200}>
            <TooltipTrigger asChild>
              <Copy
                size={12}
                className="text-zinc-400 cursor-pointer"
                onClick={() => {
                  const url = `https://hirer.so/${row.original.slug}`;
                  navigator.clipboard.writeText(url).then(
                    () => {
                      toast.info(`Added URL, ${url} to clipboard.`);
                    },
                    () => {
                      toast.error("An error occurred copying URL to clipboard");
                    }
                  );
                }}
              />
            </TooltipTrigger>
            <TooltipContent>
              <p>Copy Public Link</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <SortableColumn column={column}>Status</SortableColumn>
    ),
    cell: ({ row }) => {
      const status = row.getValue("status") as JobStatus;
      return (
        <Badge className="rounded-md" color={JOB_STATUS_COLOUR[status]}>
          {status}
        </Badge>
      );
    },
  },
  {
    accessorKey: "location",
    header: ({ column }) => (
      <SortableColumn column={column}>Location</SortableColumn>
    ),
    cell: ({ row }) => (
      <div className="text-left text-sm">{row.getValue("location")}</div>
    ),
  },
  {
    accessorKey: "applications",
    header: ({ column }) => (
      <SortableColumn column={column}>Applications</SortableColumn>
    ),
    cell: ({ row }) => (
      <div className="text-left text-sm">
        {row.original._count.applications}
      </div>
    ),
  },
  {
    accessorKey: "department",
    header: ({ column }) => (
      <SortableColumn column={column}>Department</SortableColumn>
    ),
    // TODO: Update to include actual departments.
    cell: ({ row }) => <div className="text-left text-sm">Engineering</div>,
  },
  {
    accessorKey: "hiringManager",
    header: ({ column }) => (
      <SortableColumn column={column}>Hiring Manager</SortableColumn>
    ),
    cell: ({ row }) => (
      <div className="text-left text-sm flex gap-1 items-center">
        <Image
          src={row.original.creator.image as string}
          height={24}
          width={24}
          alt="Avatar Image"
          className="rounded-full"
        />
        {row.original.creator.name}
      </div>
    ),
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <SortableColumn column={column}>Creation Date</SortableColumn>
    ),
    cell: ({ row }) => {
      const createdAt = row.getValue("createdAt");
      const formattedDate = format(createdAt as Date, "dd MMM yyyy h:mma");
      return (
        <div className="text-left text-sm text-zinc-500">{formattedDate}</div>
      );
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <DotsThree size={16} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem
              className="flex gap-1"
              onClick={() => {
                const url = `https://hirer.so/${row.original.slug}`;
                navigator.clipboard.writeText(url).then(
                  () => {
                    toast.info(`Added URL, ${url} to clipboard.`);
                  },
                  () => {
                    toast.error("An error occurred copying URL to clipboard");
                  }
                );
              }}
            >
              <div>Copy Link</div>
              <Copy />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
