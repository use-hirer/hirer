import { Separator } from "@console/components/ui/separator";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hirer: Question Pool",
};

export default function QuestionPoolPage() {
  return (
    <div className="flex items-center gap-2">
      <div className="w-full">
        <div className="font-extrabold text-xl">Question Pool</div>
        <Separator className="mt-2 mb-4" />
      </div>
    </div>
  );
}
