"use client";

import { Button } from "@console/components/ui/button";
import { Input } from "@console/components/ui/input";
import { Sparkle } from "@phosphor-icons/react/dist/ssr";
import { motion } from "framer-motion";

export default function OnboardingPage() {
  return (
    <>
      <motion.div
        className="flex items-center data-[collapsed=true]:justify-center select-none cursor-pointer my-4"
        initial={{ scale: 0 }}
        animate={{ rotate: 360, scale: 1 }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 20,
        }}
      >
        <div className="flex items-center justify-center w-8 h-8 bg-black text-white rounded-full text-md font-extrabold">
          <Sparkle />
        </div>
        <div className="font-bold text-2xl ml-1">Hirer</div>
      </motion.div>

      <div className="flex flex-col items-center mb-4">
        <div className="font-light text-sm">
          Can you intro yourself first 👋
        </div>
      </div>
      <div className="bg-white rounded-xl shadow-sm border-zinc-950/5 border p-4 min-w-[300px]">
        <Input placeholder="Elon Musk" />
      </div>
      <Button className="min-w-[295px] mt-4">Next</Button>
      {/* <Button className="min-w-[300px] mt-2" variant={"ghost"}>
        Skip for now
      </Button> */}
      <div className="flex gap-1 mt-4">
        <div className="bg-black h-2 w-2 rounded-[50%]"></div>
        <div className="bg-black/10 h-2 w-2 rounded-[50%]"></div>
        <div className="bg-black/10 h-2 w-2 rounded-[50%]"></div>
      </div>
    </>
  );
}
