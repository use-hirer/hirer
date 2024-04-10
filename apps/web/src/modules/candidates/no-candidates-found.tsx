"use client";

import { Button } from "@hirer/ui/button";
import { Empty } from "@phosphor-icons/react";
import { useParams, useRouter } from "next/navigation";
import React from "react";

interface NoCandidatesFoundProps {
  className?: string;
}

const NoCandidatesFound: React.FC<NoCandidatesFoundProps> = ({ className }) => {
  const router = useRouter();
  const { slug } = useParams() as { slug?: string };

  return (
    <>
      <div
        className={`flex flex-col items-center justify-center rounded-lg border border-dashed ${className}`}
      >
        <div className="flex flex-col items-center gap-1 text-center">
          <Empty size={32} />
          <h3 className="text-2xl font-bold tracking-tight">
            No Candidates Found
          </h3>
          <p className="text-sm text-muted-foreground">
            Your search did not return any results.
          </p>
          <Button
            className="mt-4"
            onClick={() => router.push(`/${slug}/jobs/create`)}
          >
            Create Job
          </Button>
        </div>
      </div>
    </>
  );
};

export default NoCandidatesFound;
