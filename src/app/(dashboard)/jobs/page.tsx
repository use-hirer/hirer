import { Separator } from "@/components/ui/separator";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hirer: Jobs",
};

export default function JobsPage() {
  return (
    <div className="flex items-center gap-2">
      <div className="w-full">
        <div className="font-extrabold text-xl">Jobs</div>
        <Separator className="mt-2 mb-4" />
      </div>
    </div>
  );
}
