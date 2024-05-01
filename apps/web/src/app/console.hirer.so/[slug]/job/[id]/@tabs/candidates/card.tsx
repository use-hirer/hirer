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
import { Card as UICard } from "@hirer/ui/card";
import { memo, useEffect, useRef, useState } from "react";
import invariant from "tiny-invariant";
import { Item } from "./column";

type DraggableState = "idle" | "generate-preview" | "dragging";

export const Card = memo(function Card({ item }: { item: Item }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const { itemId, location, name } = item;
  const [closestEdge, setClosestEdge] = useState<Edge | null>(null);
  const [state, setState] = useState<DraggableState>("idle");

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
          "shadow-sm rounded-sm p-1 text-xs",
          state === "dragging" && "opacity-50",
        ])}
        ref={ref}
      >
        <div>{name}</div>
      </UICard>
      {closestEdge === "bottom" && <div className="h-[1px] bg-blue-500" />}
    </>
  );
});
