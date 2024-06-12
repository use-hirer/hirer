"use client";

import { api } from "@/lib/api/react";
import { autoScroller } from "@atlaskit/pragmatic-drag-and-drop-autoscroll";
import {
  Edge,
  extractClosestEdge,
} from "@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge";
import { reorderWithEdge } from "@atlaskit/pragmatic-drag-and-drop-hitbox/util/reorder-with-edge";
import { combine } from "@atlaskit/pragmatic-drag-and-drop/combine";
import { monitorForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { RouterOutputs } from "@hirer/api";
import { cn } from "@hirer/ui";
import { Button } from "@hirer/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@hirer/ui/tooltip";
import {
  Kanban,
  ListBullets,
  MagnifyingGlass,
  Spinner,
} from "@phosphor-icons/react";
import { useEffect, useRef, useState } from "react";
import invariant from "tiny-invariant";
import { useDebounce } from "use-debounce";
import { Column, ColumnMap, ColumnType, Item } from "./candidates/column";

export default function CandidatesBoard({
  jobId,
  apiData,
}: {
  jobId: string;
  apiData: RouterOutputs["job"]["getCandidatesByStage"];
}) {
  const [searchValue, setSearchValue] = useState("");
  const [debouncedSearchValue] = useDebounce(searchValue, 500);
  const [view, setView] = useState<"TABLE" | "CARD">("TABLE");

  const candidatesApi = api.job.getCandidatesByStage.useQuery(
    { id: jobId, name: debouncedSearchValue },
    {
      initialData: apiData,
      enabled: !!debouncedSearchValue,
    }
  );

  const stage = candidatesApi.data;

  const [data, setData] = useState<{
    columnMap: ColumnMap;
    orderedColumnIds: string[];
  }>(() => {
    const list: ColumnMap = {};
    stage.map((stage) => {
      list[stage.id] = {
        title: stage.name,
        color: stage.color || undefined,
        items: stage.applications.map((application) => ({
          name: application.candidate.name,
          location: "Melbourne, Australia",
          score: 84,
          itemId: application.id,
        })),
        columnId: stage.id,
      };
    });
    const columnOrder = Object.values(list).map((column) => column.columnId);
    return {
      columnMap: list,
      orderedColumnIds: columnOrder,
    };
  });

  useEffect(() => {
    const list: ColumnMap = {};
    stage.map((stage) => {
      list[stage.id] = {
        title: stage.name,
        color: stage.color || undefined,
        items: stage.applications.map((application) => ({
          name: application.candidate.name,
          location: "Melbourne, Australia",
          score: 84,
          itemId: application.id,
        })),
        columnId: stage.id,
      };
    });
    const columnOrder = Object.values(list).map((column) => column.columnId);
    setData({
      columnMap: list,
      orderedColumnIds: columnOrder,
    });
  }, [stage]);

  const updateApplicantStage = api.stage.moveCandidate.useMutation();

  function switchView(view: "CARD" | "TABLE") {
    setView(view);
    localStorage.setItem(`candidatesView-${jobId}`, view);
  }

  const ref = useRef<HTMLDivElement | null>(null);

  const [isCustomAutoScrollEnabled, setIsCustomAutoScrollEnabled] =
    useState(true);

  useEffect(() => {
    invariant(ref.current);
    return combine(
      monitorForElements({
        onDragStart({ location }) {
          if (isCustomAutoScrollEnabled) {
            autoScroller.start({ input: location.current.input });
          }
        },
        onDrag({ location }) {
          if (isCustomAutoScrollEnabled) {
            autoScroller.updateInput({ input: location.current.input });
          }
        },
        onDrop(args) {
          if (isCustomAutoScrollEnabled) {
            autoScroller.stop();
          }

          const { location, source } = args;
          // didn't drop on anything
          if (!location.current.dropTargets.length) {
            return;
          }
          // need to handle drop

          // 1. remove element from original position
          // 2. move to new position

          if (source.data.type === "column") {
            const startIndex: number = data.orderedColumnIds.findIndex(
              (columnId) => columnId === source.data.columnId
            );

            const target = location.current.dropTargets[0];
            const indexOfTarget: number = data.orderedColumnIds.findIndex(
              (id) => id === target.data.columnId
            );
            const closestEdgeOfTarget: Edge | null = extractClosestEdge(
              target.data
            );

            const updated = reorderWithEdge({
              list: data.orderedColumnIds,
              startIndex,
              indexOfTarget,
              closestEdgeOfTarget,
              axis: "horizontal",
            });

            setData({ ...data, orderedColumnIds: updated });
          }
          // Dragging a card
          if (source.data.type === "card") {
            const itemId = source.data.itemId;
            invariant(typeof itemId === "string");
            // TODO: these lines not needed if item has columnId on it
            const [, startColumnRecord] = location.initial.dropTargets;
            const sourceId = startColumnRecord.data.columnId;
            invariant(typeof sourceId === "string");
            const sourceColumn = data.columnMap[sourceId];
            const itemIndex = sourceColumn.items.findIndex(
              (item) => item.itemId === itemId
            );
            const item: Item = sourceColumn.items[itemIndex];

            if (location.current.dropTargets.length === 1) {
              const [destinationColumnRecord] = location.current.dropTargets;
              const destinationId = destinationColumnRecord.data.columnId;
              invariant(typeof destinationId === "string");
              const destinationColumn = data.columnMap[destinationId];
              invariant(destinationColumn);

              // reordering in same column
              if (sourceColumn === destinationColumn) {
                const updated = reorderWithEdge({
                  list: sourceColumn.items,
                  startIndex: itemIndex,
                  indexOfTarget: sourceColumn.items.length - 1,
                  closestEdgeOfTarget: null,
                  axis: "vertical",
                });
                const updatedMap = {
                  ...data.columnMap,
                  [sourceColumn.columnId]: {
                    ...sourceColumn,
                    items: updated,
                  },
                };
                setData({ ...data, columnMap: updatedMap });

                return;
              }

              // moving to a new column
              const updatedMap = {
                ...data.columnMap,
                [sourceColumn.columnId]: {
                  ...sourceColumn,
                  items: sourceColumn.items.filter((i) => i.itemId !== itemId),
                },
                [destinationColumn.columnId]: {
                  ...destinationColumn,
                  items: [...destinationColumn.items, item],
                },
              };

              setData({ ...data, columnMap: updatedMap });

              updateApplicantStage.mutate({
                stageId: destinationColumn.columnId,
                applicationId: item.itemId,
              });

              return;
            }

            // dropping in a column (relative to a card)
            if (location.current.dropTargets.length === 2) {
              const [destinationCardRecord, destinationColumnRecord] =
                location.current.dropTargets;
              const destinationColumnId = destinationColumnRecord.data.columnId;
              invariant(typeof destinationColumnId === "string");
              const destinationColumn = data.columnMap[destinationColumnId];

              const indexOfTarget = destinationColumn.items.findIndex(
                (item) => item.itemId === destinationCardRecord.data.itemId
              );
              const closestEdgeOfTarget: Edge | null = extractClosestEdge(
                destinationCardRecord.data
              );

              // case 1: ordering in the same column
              if (sourceColumn === destinationColumn) {
                const updated = reorderWithEdge({
                  list: sourceColumn.items,
                  startIndex: itemIndex,
                  indexOfTarget,
                  closestEdgeOfTarget,
                  axis: "vertical",
                });
                const updatedSourceColumn: ColumnType = {
                  ...sourceColumn,
                  items: updated,
                };
                const updatedMap: ColumnMap = {
                  ...data.columnMap,
                  [sourceColumn.columnId]: updatedSourceColumn,
                };

                setData({ ...data, columnMap: updatedMap });
                return;
              }

              // case 2: moving into a new column relative to a card

              const updatedSourceColumn: ColumnType = {
                ...sourceColumn,
                items: sourceColumn.items.filter((i) => i !== item),
              };
              const updated: Item[] = Array.from(destinationColumn.items);
              const destinationIndex =
                closestEdgeOfTarget === "bottom"
                  ? indexOfTarget + 1
                  : indexOfTarget;
              updated.splice(destinationIndex, 0, item);

              const updatedDestinationColumn: ColumnType = {
                ...destinationColumn,
                items: updated,
              };
              const updatedMap: ColumnMap = {
                ...data.columnMap,
                [sourceColumn.columnId]: updatedSourceColumn,
                [destinationColumn.columnId]: updatedDestinationColumn,
              };

              setData({ ...data, columnMap: updatedMap });

              updateApplicantStage.mutate({
                stageId: destinationColumn.columnId,
                applicationId: item.itemId,
              });
            }
          }
        },
      })
    );
  }, [data, isCustomAutoScrollEnabled, updateApplicantStage]);

  return (
    <div>
      <div className="mt-4 flex gap-2">
        <div className="flex items-center gap-2 h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors disabled:cursor-not-allowed disabled:opacity-50">
          {candidatesApi.isFetching ? (
            <Spinner className="animate-spin" />
          ) : (
            <MagnifyingGlass />
          )}
          <input
            className="w-full h-full transition-colors outline-none"
            placeholder="Search Candidates ..."
            onChange={(e) => setSearchValue(e.currentTarget.value)}
          />
        </div>
        <div className="md:flex gap-1 hidden">
          <Button
            size="icon"
            className={cn([view === "TABLE" ? "bg-black" : "bg-white border"])}
            variant={view === "TABLE" ? "default" : "secondary"}
            onClick={() => switchView("TABLE")}
          >
            <Kanban
              size={16}
              className={cn([view === "TABLE" ? "text-white" : "text-black"])}
            />
          </Button>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="icon"
                  className={cn([
                    view === "CARD"
                      ? "bg-black"
                      : "bg-white border cursor-not-allowed",
                  ])}
                  variant={view === "CARD" ? "default" : "secondary"}
                  onClick={(e) => e.stopPropagation()}
                >
                  <ListBullets
                    size={16}
                    className={cn([
                      view === "CARD" ? "text-white" : "text-black",
                    ])}
                  />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>List view coming soon 🚧</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
      <div className="h-full min-h-[calc(100vh-201px)] overflow-x-auto border rounded-md bg-zinc-50 shadow-sm scroll-bar mt-4">
        <div className="flex gap-1 flex-row h-full" ref={ref}>
          {data.orderedColumnIds.map((columnId) => {
            return <Column column={data.columnMap[columnId]} key={columnId} />;
          })}
        </div>
      </div>
    </div>
  );
}
