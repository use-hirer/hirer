"use client";
import { api } from "@/lib/api/react";
import { RouterOutputs } from "@hirer/api";
import { cn } from "@hirer/ui";
import { Button } from "@hirer/ui/button";
import {
  ListBullets,
  MagnifyingGlass,
  Plus,
  Spinner,
  SquaresFour,
} from "@phosphor-icons/react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import JobCard from "./job-card";
import { JobsTable } from "./jobs-table";
import NoJobsExist from "./no-jobs-exist";
import NoJobsFound from "./no-jobs-found";

interface JobsViewProps {
  jobs: RouterOutputs["job"]["getMany"];
}

const JobsView: React.FC<JobsViewProps> = ({ jobs }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { slug } = useParams() as { slug?: string };
  const [view, setView] = useState<"TABLE" | "CARD">("TABLE");
  const [searchValue, setSearchValue] = useState("");
  const [debouncedSearchValue] = useDebounce(searchValue, 500);
  const [previousResults, setPreviousResults] =
    useState<RouterOutputs["job"]["getMany"]>(jobs);

  useEffect(() => {
    if (debouncedSearchValue) {
      const params = new URLSearchParams(searchParams.toString());
      params.set("search", debouncedSearchValue);
      router.push(`/${slug}/jobs?${params.toString()}`);
    } else {
      router.push(`/${slug}/jobs`);
    }
  }, [debouncedSearchValue, router, searchParams, slug]);

  const jobsApi = api.job.getMany.useQuery(
    { teamId: slug as string, title: debouncedSearchValue },
    {
      initialData: previousResults,
      enabled: !!debouncedSearchValue,
    }
  );

  useEffect(() => {
    if (jobsApi.isFetched && jobsApi.data !== previousResults) {
      setPreviousResults(jobsApi.data);
    }

    if (debouncedSearchValue === "") {
      setPreviousResults(jobs);
    }
  }, [
    jobsApi.isFetched,
    jobsApi.data,
    previousResults,
    debouncedSearchValue,
    jobs,
  ]);

  function switchView() {
    setView(view === "TABLE" ? "CARD" : "TABLE");
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex gap-2 pb-4">
        <div className="flex items-center gap-2 h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors disabled:cursor-not-allowed disabled:opacity-50">
          {jobsApi.isFetching ? (
            <Spinner className="animate-spin" />
          ) : (
            <MagnifyingGlass />
          )}
          <input
            className="w-full h-full transition-colors outline-none"
            placeholder="Search Jobs ..."
            onChange={(e) => setSearchValue(e.currentTarget.value)}
            value={searchValue}
          />
        </div>
        <div className="md:flex gap-1 hidden">
          <Button
            size="icon"
            className={cn([view === "TABLE" ? "bg-black" : "bg-white border"])}
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
            className={cn([view === "CARD" ? "bg-black" : "bg-white border"])}
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
          {jobsApi.data?.length === 0 && !jobsApi.isLoading && (
            <NoJobsFound
              searchValue={debouncedSearchValue}
              className="bg-zinc-50 py-12"
            />
          )}
          {jobsApi.data && jobsApi.data?.length > 0 && (
            <div>
              {view === "TABLE" && (
                <>
                  <div className="hidden md:block">
                    <JobsTable />
                  </div>
                  <div className="md:hidden">
                    <div className="grid grid-cols-1 gap-4">
                      {jobsApi.data.map((job) => (
                        <JobCard key={job.id} job={job} />
                      ))}
                    </div>
                  </div>
                </>
              )}
              {view === "CARD" && (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                  {jobsApi.data.map((job) => (
                    <JobCard key={job.id} job={job} />
                  ))}
                </div>
              )}
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
