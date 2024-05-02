"use client";

import {
  Edge,
  attachClosestEdge,
  extractClosestEdge,
} from "@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge";
import { combine } from "@atlaskit/pragmatic-drag-and-drop/combine";
import {
  draggable,
  dropTargetForElements,
} from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { cn } from "@hirer/ui";
import { memo, useEffect, useRef, useState } from "react";
import invariant from "tiny-invariant";
import { Card } from "./card";

export type Item = {
  name: string;
  location: string;
  score: number;
  itemId: string;
};

export type ColumnType = {
  title: string;
  color?: string;
  columnId: string;
  items: Item[];
};

export type ColumnMap = { [columnId: string]: ColumnType };

export const Column = memo(function Column({ column }: { column: ColumnType }) {
  const columnId = column.columnId;
  const columnRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardListRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [closestEdge, setClosestEdge] = useState<Edge | null>(null);

  useEffect(() => {
    invariant(columnRef.current);
    invariant(headerRef.current);
    invariant(cardListRef.current);

    return combine(
      draggable({
        element: columnRef.current,
        dragHandle: headerRef.current,
        getInitialData: () => ({ columnId, type: "column" }),
      }),
      dropTargetForElements({
        element: cardListRef.current,
        getData: () => ({ columnId }),
        canDrop: (args) => args.source.data.type === "card",
        getIsSticky: () => true,
        onDragEnter: () => setIsDragging(true),
        onDragLeave: () => setIsDragging(false),
        onDragStart: () => setIsDragging(true),
        onDrop: () => setIsDragging(false),
      }),
      dropTargetForElements({
        element: columnRef.current,
        canDrop: (args) => args.source.data.type === "column",
        getIsSticky: () => true,
        getData: ({ input, element }) => {
          const data = {
            columnId,
          };
          return attachClosestEdge(data, {
            input,
            element,
            allowedEdges: ["left", "right"],
          });
        },
        onDragEnter: (args) => {
          setClosestEdge(extractClosestEdge(args.self.data));
        },
        onDrag: (args) => {
          setClosestEdge(extractClosestEdge(args.self.data));
        },
        onDragLeave: () => {
          setClosestEdge(null);
        },
        onDrop: () => {
          setClosestEdge(null);
        },
      })
    );
  }, [columnId]);

  return (
    <div
      className="w-[300px] flex flex-col flex-shrink-0  min-h-[calc(100vh-203px)]"
      ref={columnRef}
    >
      <div ref={headerRef}>
        <ColumnHeading
          title={column.title}
          badgeColor={column.color}
          itemCount={column.items.length}
        />
      </div>
      <div
        className={cn(
          "p-2 flex-1 overflow-y-auto flex gap-1 flex-col",
          isDragging && "bg-zinc-100 rounded-md"
        )}
        ref={cardListRef}
      >
        {column.items.map((item) => (
          <Card item={item} key={item.itemId} />
        ))}
      </div>
    </div>
  );
});

const ColumnHeading = ({
  title,
  badgeColor,
  itemCount,
}: {
  title: string;
  badgeColor?: string;
  itemCount: number;
}) => {
  return (
    <div className="font-medium text-md flex items-center gap-2 pt-3 pl-4">
      <div
        className={cn([
          badgeColor === undefined && "border border-zinc-700 border-dashed",
          "w-3 h-3 rounded-full flex items-center",
        ])}
        style={{ backgroundColor: badgeColor }}
      />
      {title}{" "}
      <span className="text-sm text-zinc-500 font-light">{itemCount}</span>
    </div>
  );
};
