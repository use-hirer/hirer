import { api } from "@/lib/api/server";
import SharingTabView from "./client-page";

export default async function SharingTab({
  params,
}: {
  params: { slug: string; id: string };
}) {
  const data = await api.job.get({ id: params.id });

  return <SharingTabView job={data} />;
}
