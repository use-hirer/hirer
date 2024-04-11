import { api } from "@/lib/api/server";
import { validateRequest } from "@/lib/auth";
import CandidatesView from "@/modules/candidates/candidates-view";
import { Separator } from "@hirer/ui/separator";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "Hirer: Candidates",
};

export default async function JobsPage({
  params,
}: {
  params: { slug: string };
}) {
  const { user } = await validateRequest();

  if (!user) {
    return redirect("/login");
  }

  const candidates = await api.candidate.getMany({
    teamId: params.slug,
  });

  return (
    <div className="flex flex-col h-full">
      <div className="w-full">
        <div className="font-extrabold text-xl">Candidates</div>
        <Separator className="my-2" />
      </div>
      <div className="flex-1">
        <CandidatesView candidates={candidates} />
      </div>
      <Toaster richColors position="top-right" closeButton />
    </div>
  );
}
