"use client";

import { PlayCircle } from "@phosphor-icons/react";

export default function DemoVideo() {
  return (
    <div className="bg-zinc-50 rounded-lg border h-[250px] md:h-[500px] flex items-center justify-center">
      <PlayCircle size={50} weight="thin" className="text-zinc-300" />
    </div>
  );
}
