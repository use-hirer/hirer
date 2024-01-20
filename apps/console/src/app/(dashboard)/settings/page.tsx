import { Separator } from "@console/components/ui/separator";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hirer: Settings",
};

export default function SettingsPage() {
  return (
    <div className="flex items-center gap-2">
      <div className="w-full">
        <div className="font-extrabold text-xl">Settings</div>
        <Separator className="mt-2 mb-4" />
      </div>
    </div>
  );
}
