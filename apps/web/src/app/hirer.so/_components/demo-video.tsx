"use client";

import { Play } from "@phosphor-icons/react";
import { toast } from "sonner";

export default function DemoVideo() {
  return (
    <div className="bg-[url('/hirer-dashboard.png')] bg-cover rounded-lg border h-[250px] md:h-[500px] flex items-center justify-center">
      <div
        className="bg-white rounded-full p-2 bg-zinc hover:bg-zinc-300 ease-in-out cursor-pointer "
        onClick={() => {
          toast(
            "Glad you're interested in Hirer! Video will be coming soon. ✨"
          );
        }}
      >
        <Play size={30} weight="light" className="text-black" />
      </div>
    </div>
  );
}
