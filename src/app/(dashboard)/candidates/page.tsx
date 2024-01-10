import CandidatesTable from "@/components/dashboard/candidates-table";
import { Separator } from "@/components/ui/separator";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hirer: Candidates",
};

export default function CandidatesPage() {
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
