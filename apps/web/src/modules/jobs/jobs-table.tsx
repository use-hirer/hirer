"use client";

import { JOB_DATA } from "@/components/tables/job-data";
import { Job } from "@/model/Job";
import { Button } from "@hirer/ui/button";
import {
  ColumnFiltersState,
  SortingState,
  Table,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import * as React from "react";
import { JOBS_TABLE_COLUMNS } from "./job-columns";

interface NavigationPanelProps {
  table: Table<Job>;
}
function NavigationPanel({ table }: NavigationPanelProps) {
  return (
    <div className="flex items-center justify-end space-x-2 py-4">
      <div className="space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  );
}

interface JobsTableProps {
  preview?: boolean;
}

export function JobsTable({ preview }: JobsTableProps) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});

  const table = useReactTable({
    data: JOB_DATA,
    columns: JOBS_TABLE_COLUMNS,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
    },
  });

  return (
    <div className="w-full">
      <div className="rounded-sm overflow-x-scroll scroll-bar">
        <table className="min-w-full border-separate border-spacing-0">
          <thead className="bg-gray-100/50 shadow-sm">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header, index) => {
                  // Determine if it's the first, last, or a middle th
                  const isFirst = index === 0;
                  const isLast = index === headerGroup.headers.length - 1;

                  // Determine class names based on position
                  let className;

                  if (isFirst) {
                    // First th element
                    className =
                      "pl-2 text-left text-sm font-semibold text-muted-foreground border border-r-0 rounded-l-sm";
                  } else if (isLast) {
                    // Last th element
                    className =
                      "pl-2 text-left text-sm font-semibold text-muted-foreground border border-l-0 rounded-r-sm";
                  } else {
                    // Middle th elements
                    className =
                      "pl-2 text-left text-sm font-semibold text-muted-foreground border border-l-0 border-r-0";
                  }
                  return (
                    <React.Fragment key={index}>
                      <th className={className}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </th>
                    </React.Fragment>
                  );
                })}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className="border-b border-b-red-700"
                >
                  {row.getVisibleCells().map((cell) => (
                    <td
                      className="pl-6 pr-2 py-2 text-left text-sm border-b"
                      key={cell.id}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr className="border-b border-b-red-700">
                <td
                  colSpan={JOBS_TABLE_COLUMNS.length}
                  className="h-24 text-center text-sm"
                >
                  No results.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <NavigationPanel table={table} />
    </div>
  );
}
