"use client";

import { Button } from "@hirer/ui/button";
import { FlagPennant } from "@phosphor-icons/react";
import { useParams, useRouter } from "next/navigation";
import React from "react";

interface NoCandidatesExistProps {
  className?: string;
}

const NoCandidatesExist: React.FC<NoCandidatesExistProps> = ({ className }) => {
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
            No Candidates Exist
          </h3>
          <p className="text-sm text-muted-foreground">
            Add your first candidate manually to Hirer for tracking &
            assessment.
          </p>
          <Button
            className="mt-4"
            onClick={() => router.push(`/${slug}/candidates/create`)}
          >
            Add Candidate
          </Button>
        </div>
      </div>
    </>
  );
};

export default NoCandidatesExist;
