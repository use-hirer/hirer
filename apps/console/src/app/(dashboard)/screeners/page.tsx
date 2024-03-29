import { validateRequest } from "@console/lib/auth";
import { Separator } from "@hirer/ui/separator";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Hirer: Screeners",
};

export default async function ScreenersPage() {
  const { user } = await validateRequest();

  if (!user) {
    return redirect("/login");
  }

  return (
    <div className="flex items-center gap-2">
      <div className="w-full">
        <div className="font-extrabold text-xl">Screeners</div>
        <Separator className="mt-2 mb-4" />
      </div>
    </div>
  );
}
