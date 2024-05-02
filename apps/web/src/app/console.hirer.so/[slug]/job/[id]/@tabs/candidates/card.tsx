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
import { Button } from "@hirer/ui/button";
import { Card as UICard } from "@hirer/ui/card";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@hirer/ui/sheet";
import { Info } from "@phosphor-icons/react";
import { Badge } from "@tremor/react";
import { memo, useEffect, useRef, useState } from "react";
import invariant from "tiny-invariant";
import { Item } from "./column";

type DraggableState = "idle" | "generate-preview" | "dragging";

export const Card = memo(function Card({ item }: { item: Item }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const { itemId, location, name, score } = item;
  const [closestEdge, setClosestEdge] = useState<Edge | null>(null);
  const [state, setState] = useState<DraggableState>("idle");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    invariant(ref.current);
    return combine(
      draggable({
        element: ref.current,
        getInitialData: () => ({ type: "card", itemId: itemId }),
        onGenerateDragPreview: ({ source }) => {
          //   scrollJustEnoughIntoView({ element: source.element });
          setState("generate-preview");
        },

        onDragStart: () => setState("dragging"),
        onDrop: () => setState("idle"),
      }),

      dropTargetForElements({
        element: ref.current,
        canDrop: (args) => args.source.data.type === "card",
        getIsSticky: () => true,
        getData: ({ input, element }) => {
          const data = { type: "card", itemId: itemId };

          return attachClosestEdge(data, {
            input,
            element,
            allowedEdges: ["top", "bottom"],
          });
        },
        onDragEnter: (args) => {
          if (args.source.data.itemId !== itemId) {
            setClosestEdge(extractClosestEdge(args.self.data));
          }
        },
        onDrag: (args) => {
          if (args.source.data.itemId !== itemId) {
            setClosestEdge(extractClosestEdge(args.self.data));
          }
        },
        onDragLeave: () => {
          setClosestEdge(null);
        },
        onDrop: () => {
          setClosestEdge(null);
        },
      })
    );
  }, [itemId]);

  return (
    <>
      {closestEdge === "top" && <div className="h-[1px] bg-blue-500" />}
      <UICard
        className={cn([
          "shadow-sm rounded-sm py-2 px-3 text-xs cursor-pointer",
          state === "dragging" && "opacity-50",
        ])}
        ref={ref}
        onClick={() => setOpen(true)}
      >
        <div className="font-medium">{name}</div>
        <Badge size={"xs"} color={"green"} className="mt-2">
          {score}% Match
        </Badge>
        <div className="flex items-center gap-2 pt-2">
          <div className="text-[10px] text-zinc-500">Location</div>
          <div className="text-[10px] text-black">{location}</div>
        </div>
        <div className="pt-2 flex gap-1">
          <Button
            className="text-[8px] font-normal flex items-center h-2 w-[45px] gap-[2px]"
            variant={"outline"}
            onClick={(e) => {
              e.stopPropagation();
              setOpen(true);
            }}
          >
            <Info color="black" size={12} className="flex-shrink-0" /> Info
          </Button>
        </div>
      </UICard>
      {closestEdge === "bottom" && <div className="h-[1px] bg-blue-500" />}
      <Sheet open={open} onOpenChange={() => setOpen(!open)}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Are you absolutely sure?</SheetTitle>
            <SheetDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </>
  );
});
