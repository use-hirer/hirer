"use client";

import { Job, JobStatus } from "@console/model/Job";
import { Button } from "@hirer/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@hirer/ui/dropdown-menu";
import { Copy } from "@phosphor-icons/react";
import { CaretSortIcon, DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Column, ColumnDef } from "@tanstack/react-table";
import { Badge } from "@tremor/react";
import * as React from "react";

const JOB_STATUS_COLOUR: Record<JobStatus, string> = {
  ["Active"]: "emerald",
  ["Closed"]: "orange",
};

interface SortableColumnProps {
  column: Column<Job>;
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

export const JOBS_TABLE_COLUMNS: ColumnDef<Job>[] = [
  {
    accessorKey: "title",
    header: ({ column }) => (
      <SortableColumn column={column}>Job Title</SortableColumn>
    ),
    cell: ({ row }) => (
      <div className="text-left text-sm font-medium select-none">
        {row.getValue("title")}
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
    accessorKey: "department",
    header: ({ column }) => (
      <SortableColumn column={column}>Department</SortableColumn>
    ),
    cell: ({ row }) => (
      <div className="text-left text-sm">{row.getValue("department")}</div>
    ),
  },
  {
    accessorKey: "hiringManager",
    header: ({ column }) => (
      <SortableColumn column={column}>Hiring Manager</SortableColumn>
    ),
    cell: ({ row }) => (
      <div className="text-left text-sm">{row.getValue("hiringManager")}</div>
    ),
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
              <DotsHorizontalIcon className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem className="flex gap-1">
              <div>Copy Link</div>
              <Copy />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
