"use server";

import { api } from "@/lib/api/server";
import CandidatesBoard from "./page-client";

export default async function CandidatesTab({
  params,
}: {
  params: { slug: string; id: string };
}) {
  const stage = await api.job.getCandidatesByStage({
    id: params.id,
  });

  return <CandidatesBoard jobId={params.id} apiData={stage} />;
}
