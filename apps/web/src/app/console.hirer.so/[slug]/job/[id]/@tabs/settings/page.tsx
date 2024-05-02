import { api } from "@/lib/api/server";
import JobConfigurationClientPage from "./client-page";

export default async function JobConfigurationTab({
  params,
}: {
  params: { slug: string; id: string };
}) {
  const data = await api.job.get({ id: params.id });

  return <JobConfigurationClientPage />;
}
