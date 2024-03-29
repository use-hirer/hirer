"use client";

import { Sparkle } from "@phosphor-icons/react";
import { motion } from "framer-motion";
import React from "react";

export const AnimatedLogo: React.FC = () => {
  return (
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
  );
};
