import { validateRequest } from "@/lib/auth";
import { Separator } from "@hirer/ui/separator";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import HelpView from "./page-client";

export const metadata: Metadata = {
  title: "Hirer: Screeners",
};

export default async function HelpPage() {
  const { user } = await validateRequest();

  if (!user) {
    return redirect("/login");
  }

  return (
    <div className="flex items-center gap-2">
      <div className="w-full">
        <div className="font-extrabold text-xl">Help</div>
        <Separator className="mt-2 mb-4" />
        <HelpView />
      </div>
    </div>
  );
}
