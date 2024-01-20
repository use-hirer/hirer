import { Separator } from "@console/components/ui/separator";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hirer: Profile",
};

export default function JobsPage() {
  return (
    <div className="flex items-center gap-2">
      <div className="w-full">
        <div className="font-extrabold text-xl">Profile</div>
        <Separator className="my-2" />
      </div>
    </div>
  );
}
