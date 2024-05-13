"use server";

import { api } from "@/lib/api/server";
import { ColumnMap } from "./candidates/column";
import CandidatesBoard from "./page-client";

export default async function CandidatesTab({
  params,
}: {
  params: { slug: string; id: string };
}) {
  const stage = await api.job.getCandidatesByStage({
    id: params.id,
  });

  const list: ColumnMap = {};

  stage.map((stage) => {
    list[stage.id] = {
      title: stage.name,
      color: stage.color || undefined,
      items: stage.applications.map((application) => ({
        name: application.candidate.name,
        location: "Melbourne, Australia",
        score: 84,
        itemId: application.id,
      })),
      columnId: stage.id,
    };
  });

  const columnOrder = Object.values(list).map((column) => column.columnId);

  return (
    <CandidatesBoard
      jobId={params.id}
      stageData={list}
      columnOrder={columnOrder}
    />
  );
}
