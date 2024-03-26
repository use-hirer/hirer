import { Separator } from "@console/components/ui/separator";
import { validateRequest } from "@console/lib/auth";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Hirer: Profile",
};

export default async function ProfilePage() {
  const { user } = await validateRequest();

  if (!user) {
    return redirect("/login");
  }

  return (
    <div className="flex items-center gap-2">
      <div className="w-full">
        <div className="font-extrabold text-xl">Profile</div>
        <Separator className="my-2" />
      </div>
    </div>
  );
}
