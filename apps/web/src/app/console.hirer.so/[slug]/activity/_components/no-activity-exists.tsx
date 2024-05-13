"use client";

import { FlagPennant } from "@phosphor-icons/react";
import { useParams, useRouter } from "next/navigation";
import React from "react";

interface NoActivityExistsProps {
  className?: string;
}

const NoActivityExists: React.FC<NoActivityExistsProps> = ({ className }) => {
  const router = useRouter();
  const { slug } = useParams() as { slug?: string };

  return (
    <>
      <div
        className={`flex flex-col items-center justify-center rounded-lg border border-dashed ${className}`}
      >
        <div className="flex flex-col items-center gap-1 text-center">
          <FlagPennant size={32} />
          <h3 className="text-2xl font-bold tracking-tight">
            No Activity Exists
          </h3>
          <p className="text-sm text-muted-foreground">
            All Hirer actions (i.e. job creation, candidate applications, etc)
            will be listed in here.
          </p>
        </div>
      </div>
    </>
  );
};

export default NoActivityExists;
