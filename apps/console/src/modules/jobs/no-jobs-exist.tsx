"use client";

import { Button } from "@console/components/ui/button";
import { FlagPennant } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";
import React from "react";

interface NoJobsExistProps {
  className?: string;
}

const NoJobsExist: React.FC<NoJobsExistProps> = ({ className }) => {
  const router = useRouter();

  return (
    <div
      className={`flex flex-col items-center justify-center rounded-lg border border-dashed  ${className}`}
    >
      <div className="flex flex-col items-center gap-1 text-center">
        <FlagPennant size={32} />
        <h3 className="text-2xl font-bold tracking-tight">No Jobs Found</h3>
        <p className="text-sm text-muted-foreground">
          You currently have no jobs posted. Start hiring by creating a new job
          listing.
        </p>
        <Button className="mt-4" onClick={() => router.push("/jobs/create")}>
          Create Job
        </Button>
      </div>
    </div>
  );
};

export default NoJobsExist;
