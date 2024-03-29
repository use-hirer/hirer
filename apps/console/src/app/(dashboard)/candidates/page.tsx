import { CandidatesTable } from "@console/components/tables/candidates";
import { validateRequest } from "@console/lib/auth";
import { Separator } from "@hirer/ui/separator";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Hirer: Candidates",
};

export default async function CandidatesPage() {
  const { user } = await validateRequest();

  if (!user) {
    return redirect("/login");
  }

  return (
    <div className="flex items-center gap-2">
      <div className="w-full">
        <div className="font-extrabold text-xl">Candidates</div>
        <Separator className="mt-2 mb-4" />
        <CandidatesTable />
      </div>
    </div>
  );
}
