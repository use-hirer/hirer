"use client";

import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";
import { Item } from "./tab-group";

<div className="flex gap-4">
  <div className="p-2 border-b-2 border-black flex items-center">
    <div className="text-sm">Overview</div>
  </div>
  <div className="p-2 border-b-2 border-transparent hover:border-zinc-500 flex items-center text-sm hover:text-zinc-800 text-zinc-500 cursor-pointer">
    Candidates
  </div>
  <div className="p-2 border-b-2 border-transparent hover:border-zinc-500 flex items-center text-sm hover:text-zinc-800 text-zinc-500 cursor-pointer">
    Configuration
  </div>
  <div className="p-2 border-b-2 border-transparent hover:border-zinc-500 flex items-center text-sm hover:text-zinc-800 text-zinc-500 cursor-pointer">
    Metrics
  </div>
  <div className="p-2 border-b-2 border-transparent hover:border-zinc-500 flex items-center text-sm hover:text-zinc-800 text-zinc-500 cursor-pointer">
    Sharing
  </div>
</div>;
export const Tab = ({
  path,
  parallelRoutesKey,
  item,
}: {
  path: string;
  parallelRoutesKey?: string;
  item: Item;
}) => {
  const segment = useSelectedLayoutSegment(parallelRoutesKey);

  const href = item.slug ? path + "/" + item.slug : path;
  const isActive =
    // Example home pages e.g. `/layouts`
    (!item.slug && segment === null) ||
    segment === item.segment ||
    // Nested pages e.g. `/layouts/electronics`
    segment === item.slug;

  if (isActive) {
    return (
      <Link href={href}>
        <div className="p-2 border-b-2 border-black flex items-center">
          <div className="text-sm"> {item.text}</div>
        </div>
      </Link>
    );
  }

  return (
    <Link href={href}>
      <div className="p-2 border-b-2 border-transparent hover:border-zinc-500 flex items-center text-sm hover:text-zinc-800 text-zinc-500 cursor-pointer">
        {item.text}
      </div>
    </Link>
  );
};
