"use client";

import { api } from "@/lib/api/react";
import { RouterOutputs } from "@hirer/api";
import { cn } from "@hirer/ui";
import { Button } from "@hirer/ui/button";
import {
  ArrowClockwise,
  ListBullets,
  MagnifyingGlass,
  Plus,
  Spinner,
  SquaresFour,
} from "@phosphor-icons/react";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import AddCandidateSheet from "./add-candidate-sheet";
import CandidateCard from "./candidate-card";
import { CandidatesTable } from "./candidates-table";
import NoCandidatesExist from "./no-candidates-exist";
import NoCandidatesFound from "./no-candidates-found";

interface CandidatesViewProps {
  candidates: RouterOutputs["candidate"]["getMany"];
}

const CandidatesView: React.FC<CandidatesViewProps> = ({ candidates }) => {
  const [searchValue, setSearchValue] = useState("");
  const [view, setView] = useState<"TABLE" | "CARD">("TABLE");
  const [openCandidateSheet, setOpenCandidateSheet] = useState<boolean>(false);
  const [debouncedSearchValue] = useDebounce(searchValue, 500);
  const { slug } = useParams() as { slug?: string };
  const [previousResults, setPreviousResults] =
    useState<RouterOutputs["candidate"]["getMany"]>(candidates);

  const candidatesApi = api.candidate.getMany.useQuery(
    { teamId: slug as string },
    {
      initialData: previousResults,
      enabled: !!debouncedSearchValue,
    }
  );

  useEffect(() => {
    const storedView = localStorage.getItem("candidatesView");
    if (storedView === "CARD" || storedView === "TABLE") {
      setView(storedView);
    }
  }, []);

  useEffect(() => {
    if (candidatesApi.isFetched && candidatesApi.data !== previousResults) {
      setPreviousResults(candidatesApi.data);
    }

    if (debouncedSearchValue === "" && candidatesApi.data !== candidates) {
      setPreviousResults(candidatesApi.data);
    }
  }, [
    candidatesApi.isFetched,
    candidatesApi.data,
    previousResults,
    debouncedSearchValue,
    candidates,
  ]);

  function switchView(view: "CARD" | "TABLE") {
    setView(view);
    localStorage.setItem("candidatesView", view);
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex gap-2 pb-4">
        <div className="flex items-center gap-2 h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors disabled:cursor-not-allowed disabled:opacity-50">
          {candidatesApi.isFetching ? (
            <Spinner className="animate-spin" />
          ) : (
            <MagnifyingGlass />
          )}
          <input
            className="w-full h-full transition-colors outline-none"
            placeholder="Search Candidates ..."
            onChange={(e) => setSearchValue(e.currentTarget.value)}
            value={searchValue}
          />
        </div>
        <Button
          disabled={candidatesApi.isRefetching}
          onClick={async () => await candidatesApi.refetch()}
          className="flex items-center justify-center gap-1"
        >
          <ArrowClockwise
            className={cn([candidatesApi.isRefetching ? "animate-spin" : ""])}
          />
          <div className="hidden sm:block ml-1">Refresh</div>
        </Button>
        <div className="md:flex gap-1 hidden">
          <Button
            size="icon"
            className={cn([view === "TABLE" ? "bg-black" : "bg-white border"])}
            variant={view === "TABLE" ? "default" : "secondary"}
            onClick={() => switchView("TABLE")}
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
            onClick={() => switchView("CARD")}
          >
            <SquaresFour
              size={16}
              className={cn([view === "CARD" ? "text-white" : "text-black"])}
            />
          </Button>
        </div>
        <Button
          onClick={() => setOpenCandidateSheet(true)}
          className="flex items-center justify-center gap-1"
        >
          <Plus />
          <div className="hidden sm:block ml-1">New Candidate</div>
        </Button>
      </div>
      {candidates.length > 0 ? (
        <div className="flex h-full">
          {candidatesApi.data?.length === 0 && !candidatesApi.isLoading && (
            <NoCandidatesFound className="bg-zinc-50 flex-1" />
          )}
          {candidatesApi.data && candidatesApi.data?.length > 0 && (
            <div className="w-full">
              {view === "TABLE" && (
                <>
                  <div className="hidden md:block">
                    <CandidatesTable data={candidatesApi.data} />
                  </div>
                  <div className="md:hidden">
                    <div className="grid grid-cols-1 gap-4">
                      {candidatesApi.data.map((candidate) => (
                        <CandidateCard
                          key={candidate.id}
                          candidate={candidate}
                        />
                      ))}
                    </div>
                  </div>
                </>
              )}
              {view === "CARD" && (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                  {candidatesApi.data.map((candidate) => (
                    <CandidateCard key={candidate.id} candidate={candidate} />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      ) : (
        <NoCandidatesExist className="flex-1" />
      )}
      <AddCandidateSheet
        open={openCandidateSheet}
        setOpen={setOpenCandidateSheet}
        orgId={slug as string}
        refetch={candidatesApi.refetch}
      />
    </div>
  );
};

export default CandidatesView;
