"use client";

import { RouterOutputs } from "@hirer/api";
import { cn } from "@hirer/ui";
import { Button } from "@hirer/ui/button";
import { Input } from "@hirer/ui/input";
import { ListBullets, Plus, SquaresFour } from "@phosphor-icons/react";
import { useParams, useRouter } from "next/navigation";
import React, { useState } from "react";
import JobCard from "./job-card";
import { JobsTable } from "./jobs-table";
import NoJobsExist from "./no-jobs-exist";

interface JobsViewProps {
  jobs: RouterOutputs["job"]["getMany"];
}

const JobsView: React.FC<JobsViewProps> = ({ jobs }) => {
  const router = useRouter();
  const { slug } = useParams() as { slug?: string };

  const [view, setView] = useState<"TABLE" | "CARD">("TABLE");

  function switchView() {
    setView(view === "TABLE" ? "CARD" : "TABLE");
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex gap-2 pb-4">
        <Input placeholder="Search Jobs..." className="w-full h-[38px]" />
        <div className="flex gap-1">
          <Button
            size="icon"
            className={cn([view === "TABLE" ? "bg-black" : "bg-white"])}
            variant={view === "TABLE" ? "default" : "secondary"}
            onClick={switchView}
          >
            <ListBullets
              size={16}
              className={cn([view === "TABLE" ? "text-white" : "text-black"])}
            />
          </Button>
          <Button
            size="icon"
            className={cn([view === "CARD" ? "bg-black" : "bg-white"])}
            variant={view === "CARD" ? "default" : "secondary"}
            onClick={switchView}
          >
            <SquaresFour
              size={16}
              className={cn([view === "CARD" ? "text-white" : "text-black"])}
            />
          </Button>
        </div>
        <Button
          onClick={() => router.push(`/${slug}/jobs/create`)}
          className="flex items-center justify-center gap-1"
        >
          <Plus />
          <div className="hidden sm:block">New Job</div>
        </Button>
      </div>
      {jobs.length > 0 ? (
        <div>
          {view === "TABLE" && <JobsTable />}
          {view === "CARD" && (
            <div className="grid grid-cols-3 gap-4">
              {jobs.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          )}
        </div>
      ) : (
        <NoJobsExist className="flex-1" />
      )}
    </div>
  );
};

export default JobsView;
